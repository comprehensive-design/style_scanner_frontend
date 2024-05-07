import React, { useState } from 'react';
import styles from '../css/Popup.module.css';

export default function Popup({ title, onClose, visible=true, leftBtn="취소", rightBtn="저장" }) {
    return (
        <div className={styles.popupBox} >
            <h3>
                {title}
            </h3>
            {visible && <input type='text' className={styles.inputBox} />}
            <div className={styles.buttonBox}>
                <div className={styles.button}  onClick={onClose}>
                    {leftBtn}
                </div>
                <div className={styles.button}>
                    {rightBtn}
                </div>
            </div>
        </div >
    )
}
