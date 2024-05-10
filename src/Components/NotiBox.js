import React, { Component } from 'react';
import styles from '../css/NotiBox.module.css';

function NotiBox() {

    return (
        <div className={styles.box}>
            <div className={styles.content}>
                <div className={styles.NBox}>
                    <div>
                        <p className={styles.Q}>Q. </p>
                        <p className={styles.Qtext} >로제 반지 어디 건가요?</p>
                    </div>
                    <div>
                        <p className={styles.A}>A. </p>
                        <p className={styles.Atext}>저도 너무 궁금;;; 제발 알려주세요</p>
                    </div>
                </div>
                <div className={styles.DBox}>
                    2024.04.05
                </div>
            </div >
            <hr></hr>
        </div>
    )

}
export default NotiBox;