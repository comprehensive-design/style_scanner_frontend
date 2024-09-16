import api from './axios';

export const fetchProxyImages = async (thumbnailUrls) => {
    try {
        const urls = await Promise.all(thumbnailUrls.map(async (thumbnail_url) => {
            try {
                const response = await api.get('/api/insta/proxyImage', {
                    params: { imageUrl: thumbnail_url },
                    responseType: 'arraybuffer' 
                });
                const blob = new Blob([response.data], { type: 'image/png' });
                return URL.createObjectURL(blob);
            } catch (error) {
                console.error(error);
                return thumbnail_url;
            }
        }));
        return urls;
    } catch (error) {
        console.error(error);
        return [];
    }
};