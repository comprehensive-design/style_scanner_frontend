import HorizonLine  from '../utils/HorizontalLine';
import Box from '@material-ui/core/Box';
import './Search.css';
import Channel from './channel';
import React, {useState, useEffect, useRef} from 'react';

function Search(){
    const [loading, setLoading] = useState(false);
    const [channels, setChannels] = useState([]);
    const channelRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting){
                    return;
                }
                if(loading) return;

                loadChannel();
            });
        });
        observer.observe(channelRef.current);

        return() => {
            observer.disconnect();
        };
    }, [loading]);
    const loadChannel = () => {
        setLoading(true);
        const newChannels = [];
        for (let i=0; i<4; i++){
            newChannels.push({
                id:channels + i,
                image : `img/channel${(channels.length + i) % 4 + 1}.png`
            });
        }
        setChannels([...channels, ...newChannels]);
        setLoading(false);
    };


    return(
        <div style={{display:'flex'}} id = "hi">
            
            <div style={{margin: 'auto auto'}} id="profileBox">

                <div style={{display:'flex'}}>
                    <p id = "total">전체</p>
                    <p id="searchCount">2</p>
                </div>
                <Box class = "box1">

                    <div style ={{display:'flex'}}>
                        <Box style={{width:50}}></Box>

                        <img
                            className = "profileImg"
                            src = "https://via.placeholder.com/150x150/808080/FFFFFF/?text=Grey+Image"
                        />

                        <div className = "profileId">
                            <p id="userid">hi_sseulgi</p>
                            <p>팔로워</p>
                            <p>465</p>
                        </div>

                        <button id="followButton">팔로우</button>
                        
                    </div>
                    
                </Box>
            </div>
        </div>
    )
}


export default Search;