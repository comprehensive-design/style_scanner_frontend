import { useState, useEffect } from 'react';
import api from '../utils/axios';

const useProxyImage = (thumbnail_urls) => {
    const [proxyImageUrls, setProxyImageUrls] = useState([]);

    useEffect(() => {
        const fetchProxyImages = async () => {
            const fetchImage = async (url) => {
                try {
                    const response = await api.get('/api/insta/proxyImage', {
                        params: { imageUrl: url },
                        responseType: 'arraybuffer'
                    });

                    const blob = new Blob([response.data], { type: 'image/png' });
                    return URL.createObjectURL(blob);
                } catch (error) {
                    console.error(error);
                    return url; 
                }
            };

            const proxyUrls = await Promise.all(thumbnail_urls.map(fetchImage));
            setProxyImageUrls(proxyUrls);
        };

        fetchProxyImages();
    }, [thumbnail_urls]);

    return proxyImageUrls;
};

export default useProxyImage;
