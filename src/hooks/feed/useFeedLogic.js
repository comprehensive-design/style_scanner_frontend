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

//         // 이후 API 호출 로직을 여기에 작성
//     };

//     return {
//         currentImageIndex,
//         images,
//         imageWrapperRef,
//         handleClick
//     };
// }
