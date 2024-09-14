// import { useState, useRef } from 'react';
// import { useNavigate } from "react-router-dom";

// export function useFeedLogic({username,  home }) {
//     const navigate = useNavigate();
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const images = media_url_list;
//     const imageWrapperRef = useRef(null);

//     const handleClick = async (event) => {
//         if (home) {
//             navigate("/HomeItem", {
//                 state: {
//                     mediaUrls: images,
//                     feedUrl: images[currentImageIndex],
//                     media_id: media_id,
//                     username: username,
//                     profile_url: profile_url,
//                 }
//             });
//             return;
//         }

//         const imageElement = imageWrapperRef.current.querySelector('img');
//         const imageRect = imageElement.getBoundingClientRect();

//         const offsetX = event.clientX - imageRect.left;
//         const offsetY = event.clientY - imageRect.top;

//         const xRatio = imageElement.naturalWidth / imageRect.width;
//         const yRatio = imageElement.naturalHeight / imageRect.height;

//         let coords = { x: offsetX * xRatio, y: offsetY * yRatio };
//         const resizedWidth = 350;
//         const resizedHeight = 542.5;

//         coords = {
//             x: Math.floor(coords.x * (resizedWidth / imageElement.naturalWidth)),
//             y: Math.floor(coords.y * (resizedHeight / imageElement.naturalHeight))
//         };

//         if (coords.x < 0 || coords.y < 0 || coords.x > resizedWidth || coords.y > resizedHeight) {
//             console.error('Invalid coordinates:', coords);
//             return;
//         }

//         const currentImageUrl = images[currentImageIndex];
//         console.log(coords.x, coords.y);
//         alert("click!");

//         try {
//             // 1. Segmentation 요청
//             const segResponse = await axios.post('http://127.0.0.1:8000/seg', null, {
//                 params: {
//                     x: coords.x,
//                     y: coords.y,
//                     img_url: currentImageUrl // 인코딩 하지 않음
//                 },
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//                 responseType: 'blob'  // blob으로 응답 받기
//             });

//             const segmentedBlob = segResponse.data;
//             const segmentedFile = new File([segmentedBlob], 'segmented_image.jpg', { type: segmentedBlob.type });

//             // 2. Segmentation된 이미지 업로드
//             const formData = new FormData();
//             formData.append('image_file', segmentedFile);

//             const uploadResponse = await axios.post('http://127.0.0.1:8000/uploadSegImg', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 }
//             });

//             const uploadedImageUrl = uploadResponse.data.image_url;

//             // 3. 유사 이미지 검색
//             const token = localStorage.getItem("accessToken");
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 }
//             };

//             const similarImagesResponse = await axios.get('http://127.0.0.1:8000/clip', {
//                 params: {
//                     seg_img_url: uploadedImageUrl,
//                     folder_name: 'items/'
//                 },
//                 ...config
//             });

//             const similarImages = similarImagesResponse.data.similar_images;
//             console.log(similarImages);
//             navigate("/HomeInfo", {
//                 state: {
//                     mediaUrls: images,
//                     feedUrl: currentImageUrl,
//                     media_id: media_id,
//                     username: username,
//                     profile_url: profile_url,
//                     coords: coords,
//                     similarImages: similarImages
//                 }
//             });
//         } catch (error) {
//             console.error('Error processing the image:', error);
//         }
//     };

//     return {
//         currentImageIndex,
//         images,
//         imageWrapperRef,
//         handleClick
//     };
// }
