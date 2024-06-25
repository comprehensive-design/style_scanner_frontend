export default function UserFeed({ id, feed }) {
    const handleClick = () => {{
        console.log("Button clicked!");
        console.log(feed);
    }}

    return (
        <div>
            <button onClick={handleClick} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}>
                <img
                    src={feed.media_url_list}
                    width={"300px"}
                    height={"300px"}
                    style={{objectFit:"cover"}}
                >
                </img>
            </button>
        </div>
    )
}