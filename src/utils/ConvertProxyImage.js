import api from './axios';

export const fetchProxyImages = async (thumbnailUrls) => {
    try {
        const urls = Array.isArray(thumbnailUrls)
            ? await Promise.all(thumbnailUrls.map(fetchImage))
            : [await fetchImage(thumbnailUrls)];

        return urls;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const fetchImage = async (thumbnailUrl) => {
    try {
        const response = await api.get('/api/insta/proxyImage', {
            params: { imageUrl: thumbnailUrl },
            responseType: 'arraybuffer',
        });
        const blob = new Blob([response.data], { type: 'image/png' });
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error(`Error fetching image from ${thumbnailUrl}:`, error);
        return thumbnailUrl;
    }
};
