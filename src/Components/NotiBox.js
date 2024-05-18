import React, { Component } from 'react';
import styles from '../css/NotiBox.module.css';

function NotiBox( { link="http://localhost:3000/CommunityInfo", title="로제 폰케이스 뭔가요?", reply="저도 너무 궁금해요.....", date="2024.04.05"}) {

    return (
        <div>
            <div className={styles.box}>
                <div className={styles.NBox}>
                    <div>
                        <a href={link} className={styles.Qtext} >Q {title}</a>
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