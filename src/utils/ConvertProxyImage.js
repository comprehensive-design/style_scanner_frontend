import api from '../api/axios';

export const fetchProxyImages = async (thumbnailUrls) => {
    try {
        const urls = Array.isArray(thumbnailUrls)
            ? await Promise.all(thumbnailUrls.map(fetchImage))
            : [await fetchImage(thumbnailUrls)];

        return urls;
    } catch (error) {
        console.error('프록시 이미지 가져오기 실패:', error);
        return [];
    }
};

const fetchImage = async (thumbnailUrl) => {
    try {
        const response = await api.get('/api/insta/proxyImage', {
            params: { imageUrl: thumbnailUrl },
            responseType: 'blob',
        });
        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
    } catch (error) {
        console.error(`${thumbnailUrl}에서 이미지 가져오기 실패:`, error);
        return thumbnailUrl;
    }
};
