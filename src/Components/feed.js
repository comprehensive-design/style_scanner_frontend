import "./feed.css";
function Feed(){
    
    return(
        <div className="profile">
           {/* 프로필 */}
            <div className="child box">
                 <img id='profile' src={process.env.PUBLIC_URL + 'img/profile.png'} width="20px"></img>
            </div>

            <p className="child" id='name'>hi_sseulgi</p>
        </div>
    );
}
export default Feed;