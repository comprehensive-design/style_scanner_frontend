import React, { Component } from 'react';
import styles from '../css/CelebBox.module.css';
import Button from './Button';

function CelebBox() {

    return (
        <div className={styles.box}>

            <div className={styles.pBox}>
                <img className={styles.profileImg} src="http://via.placeholder.com/60X60" ></img>
                <div className={styles.mPart}>
                    <div className={styles.uText} >@userName</div>
                    <div className={styles.fText}>343 follower</div>
                </div>
                <div className={styles.btn}>
                    <Button $borderRad ='20px' >팔로우</Button>
                </div>
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