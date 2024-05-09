import React, { Component } from 'react';
import styles from '../css/CelebBox.module.css';

function CelebBox() {

    return (
        <div className={styles.box}>

            <div className={styles.pBox}>
                <img className={styles.profileImg} src="http://via.placeholder.com/60X60" ></img>
                <div className={styles.mPart}>
                    <div className={styles.uText}>userName</div>
                    <div className={styles.fText}>343 follower</div>
                </div>
                <button className={styles.button}>팔로우</button>
            </div>
            
            <div className={styles.iBox}>
                <img className={styles.fimage} src="http://via.placeholder.com/200X250" ></img>
                <img className={styles.fimage} src="http://via.placeholder.com/200X250" ></img>
                <img className={styles.fimage} src="http://via.placeholder.com/200X250" ></img>
            </div>
        </div >
    )

}
export default CelebBox;