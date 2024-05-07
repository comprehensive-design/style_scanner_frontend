import "./channel.css";

function Channel(){
    return(
        <div className = "channelDiv">
            <div>
                <img 
                    id = "channelImg"
                    src = "https://via.placeholder.com/180x240/808080/FFFFFF/?text=Grey+Image"
                />
            </div>

            <div className = "channelProfile" style={{display : 'flex'}}>
                <img
                    id="channelProfileImg"
                    src = "https://via.placeholder.com/50x50/808080/FFFFFF/?text="
                />

                <div className="channelProfileWord" style={{justifyContent : 'center', alignItems:'center'}}>
                    <p id="channelId">Aiggjo_32</p>
                    <p className="channelFoll">팔로워</p>
                    <p className="channelFoll">456</p>
                </div>

            </div>
        </div>
    );
}

export default Channel;