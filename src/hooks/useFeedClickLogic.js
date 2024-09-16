//파이썬이라서 api대신 axios
import axios from 'axios';

export function useFeedClickLogic(imgRef) {

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
    const findSimilarImages = async (uploadedImageUrl) => {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get('http://127.0.0.1:8000/clip', {
            params: { seg_img_url: uploadedImageUrl, folder_name: 'items/' },
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.similar_images;
    };

    const handleClick = async (event) => {
        alert("item click");

        if (!imgRef || !imgRef.current) return;

        const imageElement = imgRef.current.querySelector('#feedImage');
        if (!imageElement) return;

        const { clientX, clientY } = event;
        const rect = imageElement.getBoundingClientRect();
        const xInImage = clientX - rect.left;
        const yInImage = clientY - rect.top;

        if (xInImage < 0 || xInImage > imageElement.clientWidth || yInImage < 0 || yInImage > imageElement.clientHeight) {
            alert("다시 클릭해주세요!");
            return;
        }
        try {
            // Segmentation 요청
            const segmentedBlob = await requestSegmentation(xInImage, yInImage, imageElement.src);
            const uploadedImageUrl = await uploadSegmentedImage(segmentedBlob);
            const similarImages = await findSimilarImages(uploadedImageUrl);


        } catch (error) {
            console.error('Error processing the image:', error);
        }
    };

    return {
        handleClick,
        imgRef,
    };
}
