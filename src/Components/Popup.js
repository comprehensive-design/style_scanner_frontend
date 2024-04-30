import React, { useState } from 'react';
import styles from '../css/Popup.module.css';

const Popup = (props) => {
    const { onClose } = props;

    return (
        <>
            <div className={styles.popupBox}>
                <h2>
                    타이틀
                </h2>
                <input type='text' className={styles.inputBox}></input>
                <div className={styles.buttonBox}>
                    <div className={styles.button}>
                        저장
                    </div>
                    <div className={styles.button} onClick={() => { onClose(false) }}>
                        취소
                    </div>
                </div>
            </div>
        </>
    )
}

export default Popup;