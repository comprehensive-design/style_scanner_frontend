import styles from '../css/Search.module.css';
import Channel from '../Components/channel';
import React from 'react';
import Button from './Button';
import { useLocation } from 'react-router-dom';

export default function Search() {
    const location = useLocation();
    const searchResults = location.state?.results;

    console.log('Search component rendered with results: ', searchResults);

    if (!searchResults || typeof searchResults !== 'object') {
        return <p>No results found</p>;
    }

    return (
        <div className={styles.profileBox}>
            <div style={{ display: 'flex' }}>
                <p id={styles.Searchtotal}>전체</p>
            </div>

            <div className={styles.SearchUserRes} style={{ display: 'flex' }}>
                <div className={styles.SearchprofileImg}>
                    <img
                        id={styles.SearchUserImg}
                        src={searchResults.profilePictureUrl}
                        alt="Profile"
                    />
                </div>

                <div className={styles.userInfoWord}>
                    <p id={styles.SearchUserid}>{searchResults.profileName}</p>
                    <p id={styles.profileBio}>{searchResults.profileBio}</p>
                    <div style={{ display: 'flex' }} className={styles.userFollowerInfo}>
                        <p id={styles.FollowerWord}>팔로워</p>
                        <p id={styles.FollowerCountWord}>&nbsp;{searchResults.profileFollowerCount}</p>
                    </div>
                </div>
                <div className={styles.SearchFollow}>
                    <Button id={styles.followButton}>팔로우</Button>
                </div>
            </div>

            <div className={styles.SearchRelRes}>
                <p className={styles.RelResWord}>연관 검색 결과</p>

                <div className={styles.SearchRelChannel}>
                    <Channel />
                    <div className={styles.paddingWidth}></div>
                    <Channel />
                    <div className={styles.paddingWidth}></div>
                    <Channel />
                    <div className={styles.paddingWidth}></div>
                    <Channel />
                </div>
                <div className={styles.paddingHeight}></div>

                <div className={styles.SearchRelChannel}>
                    <Channel />
                    <div className={styles.paddingWidth}></div>
                    <Channel />
                    <div className={styles.paddingWidth}></div>
                    <Channel />
                    <div className={styles.paddingWidth}></div>
                    <Channel />
                </div>
            </div>
        </div>
    );
}
