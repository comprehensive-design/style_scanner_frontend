export default function UserFeed({ feed }) {
    const handleClick = () => {{
        console.log("Button clicked!");
    }}

    return (
        <div>
            <button onClick={handleClick} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}>
                <img
                    src="https://via.placeholder.com/300x300/808080/FFFFFF/?text=Grey+Image"
                >
                </img>
            </button>
        </div>
    )
}