import "../css/feed.css";
function Feed(){
    
    return(
        <div className="completeFeed">
            <div className="profile">
                <div className="box">
                    <img id='profileImage' src={process.env.PUBLIC_URL + 'img/profile.png'}></img>
                </div>
                <p className="child" id='name'>hi_sseulgi</p>
            </div>
            <div className="feedMain">
                <img id='feedImage' src={process.env.PUBLIC_URL + 'img/feed1.png'}></img>
            </div>
        </div>
    );
}
export default Feed;