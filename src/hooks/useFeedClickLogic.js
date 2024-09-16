export function useFeedClickLogic(imgRef) {

    const handleClick = async (event) => {
        alert("item click");
        if (!imgRef) return;

        const imageElement = imgRef.current.querySelector('#feedImage');
        if (!imageElement) return;
        
        const { clientX, clientY } = event;

         const rect = imageElement.getBoundingClientRect();
         const imageX = rect.left;
         const imageY = rect.top;
         const imageWidth = imageElement.clientWidth;
         const imageHeight = imageElement.clientHeight;
 
         const xInImage = clientX - imageX;
         const yInImage = clientY - imageY;
 
         if (xInImage >= 0 && xInImage <= imageWidth && yInImage >= 0 && yInImage <= imageHeight) {
            //  console.log(`좌표: (${xInImage}, ${yInImage})`);
         } else {
             alert("다시 클릭해주세요!")
         }

        //  try {
        //     // 1. Segmentation 요청
        //     const segResponse = await axios.post('http://127.0.0.1:8000/seg', null, {
        //         params: {
        //             x: xInImage,
        //             y: yInImage,
        //             img_url: currentImageUrl 
        //         },
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //         },
        //         responseType: 'blob'  // blob으로 응답 받기
        //     });

        //     const segmentedBlob = segResponse.data;
        //     const segmentedFile = new File([segmentedBlob], 'segmented_image.jpg', { type: segmentedBlob.type });

        //     // 2. Segmentation된 이미지 업로드
        //     const formData = new FormData();
        //     formData.append('image_file', segmentedFile);

        //     const uploadResponse = await axios.post('http://127.0.0.1:8000/uploadSegImg', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         }
        //     });

        //     const uploadedImageUrl = uploadResponse.data.image_url;

        //     // 3. 유사 이미지 검색
        //     const token = localStorage.getItem("accessToken");
        //     const config = {
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         }
        //     };

        //     const similarImagesResponse = await axios.get('http://127.0.0.1:8000/clip', {
        //         params: {
        //             seg_img_url: uploadedImageUrl,
        //             folder_name: 'items/'
        //         },
        //         ...config
        //     });

        //     const similarImages = similarImagesResponse.data.similar_images;
        //     console.log(similarImages);
        //     navigate("/HomeInfo", {
        //         state: {
        //             mediaUrls: images,
        //             feedUrl: currentImageUrl,
        //             media_id: media_id,
        //             username: username,
        //             profile_url: profile_url,
        //             coords: coords,
        //             similarImages: similarImages
        //         }
        //     });
        // } catch (error) {
        //     console.error('Error processing the image:', error);
        // }
      
    };

    return {
        handleClick,
        imgRef,
    };
}
