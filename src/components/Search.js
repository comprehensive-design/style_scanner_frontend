import HorizonLine  from '../utils/HorizontalLine';
import Box from '@material-ui/core/Box';
import '../css/Search.css';
import Channel from '../Components/Channel'
import React, {useState, useEffect, useRef} from 'react';

function Search(){
    const [channels, setChannels] = useState([]);


    useEffect(() => {
        const searchUser = setSearchUser(() => {
            setStatus((pre) => {
                // 유사도 계산
                // return channelRec.
            }
        }
    }, );

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

                <Box id = "padding"> </Box>

                <div>
                    <Channel channels = {channels}/>
                    {channels.map(channel => (
                            <Channel key={channel.id} image={channel.image} />
                        ))}
                </div>
            </div>
        </div>
    )
}


export default Search;