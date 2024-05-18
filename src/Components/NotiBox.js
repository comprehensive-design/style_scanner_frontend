import React, { Component } from 'react';
import styles from '../css/NotiBox.module.css';

function NotiBox( {title="로제 폰케이스 뭔가요?", reply="저도 너무 궁금해요.....", date="2024.04.05"}) {

    return (
        <div>
            <div className={styles.box}>
                <div className={styles.NBox}>
                    <div>
                        <p className={styles.Q}>Q.&nbsp;</p>
                        <p className={styles.Qtext} >{title}</p>
                    </div>
                    <div>
                        <p className={styles.A}>A.&nbsp;</p>
                        <p className={styles.Atext}>{reply}</p>
                    </div>
                </div>
                <div className={styles.DBox}>
                    {date}
                </div>
            </div >
            <hr></hr>
        </div>
    )

}
export default NotiBox;