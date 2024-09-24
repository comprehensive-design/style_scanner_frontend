import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserFeed({ id, feed }) {
    const navigate = useNavigate();
    const [proxyImageUrls, setProxyImageUrls] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const loadImages = async () => {
            if (feed.media_url_list) {
                try {
                    const urls = await Promise.all(
                        feed.media_url_list.map(async (imageUrl) => {
                            const proxyResponse = await axios.get("/api/insta/proxyImage", {
                                params: { imageUrl },
                                responseType: "blob",
                            });
                            return URL.createObjectURL(proxyResponse.data);
                        })
                    );

                    setProxyImageUrls(urls);
                    setImagesLoaded(true);
                } catch (error) {
                    console.error("Error loading images:", error);
                }
            }
        };

        loadImages();
    }, [feed.media_url_list]);

    const handleClick = async (imageUrl, images, coords) => {
        console.log("Button clicked!");

        const { x, y } = coords;

        navigate("/HomeInfo", {
            state: {
                mediaUrls: images,
                feedUrl: imageUrl,
                media_id: feed.id,
                profile_url: feed.profile_url,
                coords: coords,
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
