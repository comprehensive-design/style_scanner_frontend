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

// // 유사 이미지 검색
// const findSimilarImages = async (uploadedImageUrl) => {
//     const token = localStorage.getItem("accessToken");
//     const response = await axios.get('http://127.0.0.1:8000/clip', {
//         params: { seg_img_url: uploadedImageUrl, folder_name: 'items/' },
//         headers: { Authorization: `Bearer ${token}` }
//     });
//     return response.data.similar_images;
// };

// 구글렌즈 검색
const findGoogleLensImages = async (uploadedImageUrl) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get('http://127.0.0.1:8000/googleLens', {
        params: { seg_img_url: uploadedImageUrl },
        headers: { Authorization: `Bearer ${token}` }
    });
    console.log(response.data);
    return response.data;
};

const uploadGoogleLensImage = async (requestBody) => {
    const response = await api.post('/api/item/create', requestBody);
    
    const message = response.data.message;
    
    const idMatch = message.match(/ID: (\d+)/);
    
    if (idMatch && idMatch[1]) {
      const itemId = idMatch[1];
      console.log("추가된 아이템 ID:", itemId);
      return itemId;
    } else {
      console.error("ID를 메시지에서 찾을 수 없습니다.");
      return null;
    }
};
const fetchItemData = async (similarImageId) => {
    const response = await api.get(`/api/item/${similarImageId}`);
    return response.data;
};

// feedClick 함수
export async function feedClick(event, imgRef, mediaUrls, setItem, combinedCategory) {
    alert("item click");
    console.log("combinedCategory in feedClick:", combinedCategory);
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
        const googleLensImage = await findGoogleLensImages(uploadedImageUrl);
        
        const requestBody = {
            ...googleLensImage, // googleLensImage의 모든 필드 복사
            category: combinedCategory // category 필드 추가
        };
        console.log(requestBody);
        const similarImageId = await uploadGoogleLensImage(requestBody);
        console.log(similarImageId);
        const item = await fetchItemData(similarImageId);
        setItem(item) ;
       
    } catch (error) {
        console.error('Error processing the image:', error);
    }
}
