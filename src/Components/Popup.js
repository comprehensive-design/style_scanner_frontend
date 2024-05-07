import React, { useState } from 'react';
import styles from '../css/Popup.module.css';

export default function Popup({ title, onClose, visible = true,  rightBtn = "저장", type = "text" }) {
    return (
        <div className={styles.popupBox} >
            <h3>
                {title}
            </h3>
            {visible && <input type={type} className={styles.inputBox} />}
            {type == "file" &&
                <input type={type} className={styles.inputBox} accept=".jpg, .png" />}
            <div className={styles.buttonBox}>
                <div className={styles.button} onClick={onClose}>
                    취소
                </div>
                <div className={styles.button} >
                    {rightBtn}
                </div>
            </div>
        </div >
    )
}
