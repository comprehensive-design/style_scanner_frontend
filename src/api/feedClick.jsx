import axios from 'axios';
import api from './axios';

// 이미지 분할 요청
const requestSegmentation = async (x, y, imgUrl) => {
    const response = await axios.post('http://127.0.0.1:8000/seg', null, {
        params: { x, y, img_url: imgUrl },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        responseType: 'blob'
    });
    return response.data;
};

// 분할된 이미지 업로드
const uploadSegmentedImage = async (segmentedBlob) => {
    const formData = new FormData();
    formData.append('image_file', new File([segmentedBlob], 'segmented_image.jpg', { type: segmentedBlob.type }));

    const response = await axios.post('http://127.0.0.1:8000/uploadSegImg', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.image_url;
};

// 유사 이미지 검색
const findClipImages = async (uploadedImageUrl) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get('http://127.0.0.1:8000/clip', {
        params: { seg_img_url: uploadedImageUrl, folder_name: 'items/' },
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.similar_images;
};

// 구글렌즈 검색
const findGoogleLensImages = async (uploadedImageUrl) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get('http://127.0.0.1:8000/googleLens', {
        params: { seg_img_url: uploadedImageUrl },
        headers: { Authorization: `Bearer ${token}` }
    });
    console.log(response.data.results);
    return response.data.results;
};

const uploadGoogleLensImages = async (requestBody) => {
    const response = await api.post('/api/item/create', requestBody);
    const message = response.data.message;
    const idMatch = message.match(/ID: (\d+)/);
    if (idMatch && idMatch[1]) {
        const itemId = idMatch[1];
        return itemId;
    } else {
        return null;
    }
};
const fetchItemData = async (similarImageIds) => {
    const fetchPromises = similarImageIds.map(async (similarImageId) => {
        const response = await api.get(`/api/item/${similarImageId}`);
        return response.data;
    });
    return await Promise.all(fetchPromises);
};
const fetchClipItemData = async (id) => {
    const response = await api.get(`/api/item/${id}`);
    return response.data;
};

// feedClick 함수
export async function feedClick(event, imgRef, mediaUrls, setItems, combinedCategory, setItemLoading) {
    alert("item click");
    if (!imgRef || !imgRef.current) return;

    const imageElement = imgRef.current.querySelector('#feedImage');
    if (!imageElement) return;

    const imageKey = imageElement.getAttribute('data-key');

    const { clientX, clientY } = event;
    const rect = imageElement.getBoundingClientRect();
    const xInImage = Math.floor(clientX - rect.left);
    const yInImage = Math.floor(clientY - rect.top);

    if (xInImage < 0 || xInImage > imageElement.clientWidth || yInImage < 0 || yInImage > imageElement.clientHeight) {
        alert("다시 클릭해주세요!");
        return;
    }

    try {
        // Segmentation 요청
        const segmentedBlob = await requestSegmentation(xInImage, yInImage, mediaUrls[imageKey]);
        const uploadedImageUrl = await uploadSegmentedImage(segmentedBlob);

        //앞에 3개 
        const googleLensImages = await findGoogleLensImages(uploadedImageUrl);

        const uploadPromises = googleLensImages.map(async (googleLensImage) => {
            const requestBody = {
                title: googleLensImage.title,
                imageUrl: googleLensImage.image_url,
                cost: parseInt(googleLensImage.cost.replace(/[^0-9]/g, ""), 10),
                shoppingLink: googleLensImage.shopping_link,
                sellerIcon: googleLensImage.seller_icon,
                sellerName: googleLensImage.seller_name,
                category: combinedCategory
            };
            return await uploadGoogleLensImages(requestBody);
        });

        const similarImageIds = await Promise.all(uploadPromises);
        console.log(similarImageIds);
        const itemDataArray = await fetchItemData(similarImageIds);

        //뒤에 1개
        const clipImages = await findClipImages(uploadedImageUrl);
        const clipItemData = await fetchClipItemData(clipImages[0][0]);
        const combinedItems = [...itemDataArray, ...[clipItemData]];
        setItems(combinedItems);
        console.log("최종 아이템 배열:", combinedItems);
        setItemLoading(false);

    } catch (error) {
        console.error('Error processing the image:', error);
    }
}
