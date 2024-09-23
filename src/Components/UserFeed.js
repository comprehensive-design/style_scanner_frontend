import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { fetchProxyImages } from '../utils/ConvertProxyImage';

export default function UserFeed({ id, feed }) {
    const navigate = useNavigate();
    const [proxyImageUrls, setProxyImageUrls] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const loadImages = async () => {
            if (feed.media_url_list) {
                try {
                    const urls = await fetchProxyImages([feed.media_url_list]);
                    setProxyImageUrls(urls);
                    setImagesLoaded(true);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        loadImages();
    }, [feed.media_url_list]);

    const handleClick = async (imageUrl, images, coords) => {
        console.log("Button clicked!");

        // coords 객체에서 필요한 값만 추출
        const { x, y } = coords;

        navigate("/HomeInfo", {
            state: {
                mediaUrls: images,
                feedUrl: imageUrl,
                media_id: feed.id,
                profile_url: feed.profile_url,
                coords: coords, // 필요한 값만 전달
            }
        });
    };

    return (
        <div>
            <button onClick={() => handleClick(proxyImageUrls[0], proxyImageUrls, { x: 100, y: 200 })} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                {imagesLoaded ? (
                    <img
                        src={proxyImageUrls[0]}
                        width={"300px"}
                        height={"300px"}
                        style={{ objectFit: "cover" }}
                    />
                ) : (
                    <p>로딩 중...</p>
                )}
            </button>
        </div>
    );
}
