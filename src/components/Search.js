import styles from'../css/Search.module.css';
import Channel from '../Components/Channel'
import React, {useState, useEffect, useRef} from 'react';
import Button from './Button';
import { Widgets } from '@mui/icons-material';

function Search(){

    // useEffect(() => {
    //     const searchUser = setSearchUser(() => {
    //         setStatus((pre) => {
    //             // 유사도 계산
    //             // return channelRec.
    //         }
    //     }
    // }, );

    return(
        <body>
            <div id={styles.profileBox}>

                <div style={{display:'flex'}}>
                    <p id = {styles.Searchtotal}>전체</p>
                    <p id={styles.searchCount}>&nbsp;2</p>
                </div>
                <div className = {styles.SearchUserRes} style={{display:'flex'}}>

                    <div className = {styles.SearchprofileImg}>
                        <img
                            id={styles.SearchUserImg}
                            src = "https://via.placeholder.com/100x100/808080/FFFFFF/?text=Grey+Image"
                        />
                    </div>

                    <div className = {styles.userInfoWord}>
                        <p id={styles.SearchUserid}>hi_sseulgi</p>
                        <div styles= {{display:'flex'}} className={styles.userFollowerInfo}>
                            <p id={styles.FollowerWord}>팔로워</p>
                            <p id={styles.FollowerCountWord}>&nbsp;434</p>
                        </div>
                    </div>    
                    <div className={styles.SearchFollow}>
                        <Button id={styles.followButton}>팔로우</Button>
                    </div>
                </div>

                <div className={styles.SearchRelRes}>
                    <p className={styles.RelResWord}>연관 검색 결과</p>

                    <div className={styles.SearchRelChannel}>
                        <Channel></Channel>
                        <div className={styles.paddingWidth}></div>
                        <Channel></Channel>
                        <div className={styles.paddingWidth}></div>
                        <Channel></Channel>
                        <div className={styles.paddingWidth}></div>
                        <Channel></Channel>
                    </div>
                    <div className={styles.paddingHeight}></div>

                    <div className={styles.SearchRelChannel}>
                        <Channel></Channel>
                        <div className={styles.paddingWidth}></div>
                        <Channel></Channel>
                        <div className={styles.paddingWidth}></div>
                        <Channel></Channel>
                        <div className={styles.paddingWidth}></div>
                        <Channel></Channel>
                    </div>
                </div>
            </div>
        </body>
    )
}


export default Search;