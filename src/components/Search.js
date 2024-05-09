import HorizonLine  from '../utils/HorizontalLine';
// import Box from '@material-ui/core/Box';
import '../css/Search.css';
import Channel from '../Components/channel'
import React, {useState, useEffect, useRef} from 'react';

function Search(){
    const [channels, setChannels] = useState([]);


    // useEffect(() => {
    //     const searchUser = setSearchUser(() => {
    //         setStatus((pre) => {
    //             // 유사도 계산
    //             // return channelRec.
    //         }
    //     }
    // }, );

    return(
        <div style={{display:'flex'}} id = "hi">
            
            <div style={{margin: 'auto auto'}} id="profileBox">

                <div style={{display:'flex'}}>
                    <p id = "Searchtotal">전체</p>
                    <p id="searchCount">2</p>
                </div>
                <div className = "SearchUserRes" style={{display:'flex'}}>
                    <img
                            id="SearchUserImg"
                            className = "SearchprofileImg"
                            src = "https://via.placeholder.com/150x150/808080/FFFFFF/?text=Grey+Image"
                    />

                    <div className = "SearchUserProfile">
                        <p id="SearchUserid">hi_sseulgi</p>
                        <p>팔로워</p>
                        <p>465</p>
                    </div>    
                    <div className='SearchFollow'>
                        <button id="followButton">팔로우</button>
                    </div>
                </div>

                <div className='SearchRelRes'>
                    <p >연관 검색 결과</p>

                    <div className='SearchRelChannel'>
                        <Channel channels = {channels}/>
                            {channels.map(channel => (
                            <Channel key={channel.id} image={channel.image} />
                        ))}

                        <div style={{width:"120px"}}></div>

                        <Channel channels = {channels}/>
                        {channels.map(channel => (
                            <Channel key={channel.id} image={channel.image} />
                        ))}

                        <div style={{width:"120px"}}></div>

                        <Channel channels = {channels}/>
                        {channels.map(channel => (
                            <Channel key={channel.id} image={channel.image} />
                        ))}

                        <div style={{width:"120px"}}></div>

                        <Channel channels = {channels}/>
                        {channels.map(channel => (
                            <Channel key={channel.id} image={channel.image} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Search;