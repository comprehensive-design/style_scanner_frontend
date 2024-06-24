import { useNavigate } from "react-router";

export default function UserFeed({ id, feed }) {
    const navigate = useNavigate();

    const handleClick = async (imageUrl, images, coords) => {
        console.log("Button clicked!");

        // coords 객체에서 필요한 값만 추출
        const { x, y } = coords;

        navigate("/HomeInfo", {
            state: {
                mediaUrls: images,
                feedUrl: imageUrl,
                media_id : feed.id,
                profile_url : feed.profile_url,
                coords: coords, // 필요한 값만 전달
            }
        });
    }

    return (
        <div>
            <button onClick={() => handleClick(feed.media_url_list, feed.media_url_list, { x: 100, y: 200 })} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                <img
                    src={feed.media_url_list}
                    width={"300px"}
                    height={"300px"}
                    style={{ objectFit: "cover" }}
                >
                </img>
            </button>
        </div>
    )
}
