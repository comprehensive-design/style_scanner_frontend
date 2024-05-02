import './LikeList.css';
import HorizonLine from '../utils/HorizontalLine';

function LikeList(){
    return(
        <div>
            <p id = "like">좋아요</p>
            <HorizonLine />

            <div class = "Frame">
                <div class = "fist-lane" style={{display:'flex'}}>
                    <div class = "first-like">
                        <img
                            src="https://via.placeholder.com/200x200/808080/FFFFFF/?text=Grey+Image"
                            alt="Grey Image"
                            width = '200'
                            height = '200'
                        />

                        <p className ="brandName">brandName</p>
                        <p className ="itemName">itemName itemName item Name</p>
                        <p className = "price">120,000원</p>

                        <div className = "itemprofile" style={{display:'flex'}}>
                            <img 
                                src = {`img/fullHeart.png`}
                                width = '18'
                                height = '18'
                                style={{
                                    margin:5,
                                }}
                            />

                            <p className="heartCount">2233</p>
                        
                            <img
                                src={`img/link.png`}
                                width = '18'
                                height = '18'
                                className = "link"
                            />
                        </div>
                    </div>

                    <div class = "second-like">
                    <img
                            src="https://via.placeholder.com/200x200/808080/FFFFFF/?text=Grey+Image"
                            width = '200'
                            height = '200'
                            alt = "Logo"
                        />

                        <p className ="brandName">brandName</p>
                        <p className ="itemName">itemName itemName item Name</p>
                        <p className = "price">120,000원</p>

                        <div className = "itemprofile" style={{display:'flex'}}>
                            <img 
                                src = {`img/fullHeart.png`}
                                width = '18'
                                height = '18'
                                style={{
                                    margin:5,
                                }}
                            />

                            <p className="heartCount">2233</p>
                        
                            <img
                                src={`img/link.png`}
                                width = '18'
                                height = '18'
                                className = "link"
                            />
                        </div>

                    </div>
                    <div class = "third-like">
                        <img
                            src="https://via.placeholder.com/200x200/808080/FFFFFF/?text=Grey+Image"
                            width = '200'
                            height = '200'
                            alt = "Logo"
                        />
                        <p className ="brandName">brandName</p>
                        <p className ="itemName">itemName itemName item Name</p>
                        <p className = "price">120,000원</p>

                        <div className = "itemprofile" style={{display:'flex'}}>
                            <img 
                                src = {`img/fullHeart.png`}
                                width = '18'
                                height = '18'
                                style={{
                                    margin:5,
                                }}
                            />

                            <p className="heartCount">2233</p>
                        
                            <img
                                src={`img/link.png`}
                                width = '18'
                                height = '18'
                                className = "link"
                            />
                        </div>

                    </div>
                    <div class = "fourth-like">
                        <img
                            src="https://via.placeholder.com/200x200/808080/FFFFFF/?text=Grey+Image"
                            width = '200'
                            height = '200'
                            alt = "Logo"
                        />
                        <p className ="brandName">brandName</p>
                        <p className ="itemName">itemName itemName item Name</p>
                        <p className = "price">120,000원</p>

                        <div className = "itemprofile" style={{display:'flex'}}>
                            <img 
                                src = {`img/fullHeart.png`}
                                width = '18'
                                height = '18'
                                style={{
                                    margin:5,
                                }}
                            />

                            <p className="heartCount">2233</p>
                        
                            <img
                                src={`img/link.png`}
                                width = '18'
                                height = '18'
                                className = "link"
                            />
                        </div>

                    </div>
                    <div class = "fifth-like">
                        <img
                            src="https://via.placeholder.com/200x200/808080/FFFFFF/?text=Grey+Image"
                            width = '200'
                            height = '200'
                            alt = "Logo"
                        />
                        <p className ="brandName">brandName</p>
                        <p className ="itemName">itemName itemName item Name</p>
                        <p className = "price">120,000원</p>

                        <div className = "itemprofile" style={{display:'flex'}}>
                            <img 
                                src = {`img/fullHeart.png`}
                                width = '18'
                                height = '18'
                                style={{
                                    margin:5,
                                }}
                            />

                            <p className="heartCount">2233</p>
                        
                            <img
                                src={`img/link.png`}
                                width = '18'
                                height = '18'
                                className = "link"
                            />
                        </div>

                    </div>
                </div>
                <div class = "second-lane" style={{display:'flex'}}>
                
                
                </div>

            </div>
        </div>
    );
}

export default LikeList;