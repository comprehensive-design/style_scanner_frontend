import React, { useState } from 'react';
import styles from '../css/Popup.module.css';

export default function Popup({ title, onClose }) {
    return (
        <div className={styles.popupBox} >
            <h2>
                {title}
            </h2>
            <input type='text' className={styles.inputBox}></input>
            <div className={styles.buttonBox}>
                <div className={styles.button}>
                    저장
                </div>
                <div className={styles.button} onClick={onClose}>
                    취소
                </div>
            </div>
        </div >
    )
}
