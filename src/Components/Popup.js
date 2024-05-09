import React, { useState } from 'react';
import styles from '../css/Popup.module.css';
import AccountManage from './AccountManage'

export default function Popup({ title, onClose, onSave, visible = true, rightBtn = "저장", type = "text" }) {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSave = () => {
        onSave(value); // 저장 버튼을 눌렀을 때 값 전달
    };

    return (
        <div className={styles.popupBox} >
            <h3>
                {title}
            </h3>
            {visible && <input type='text' className={styles.inputBox} value={value} onChange={handleChange} />}
            {type == "file" &&
                <input type={type} className={styles.inputBox} accept=".jpg, .png" value={value} onChange={handleChange} />}
            {type === "radio" && (
                <div className={styles.genderBox}>
                    <div>
                        <input type="radio" name="gender" value="male" id="male" />
                        <label style={{ fontSize: '16px' }} htmlFor="male">남성</label>
                    </div>
                    <div>
                        <input type="radio" name="gender" value="female" id="female" />
                        <label htmlFor="female">여성</label>
                    </div>
                </div>
            )}
            {type == "password" && (
                    <input type={type} className={styles.inputBox} value={value} onChange={handleChange}  ></input>

            )}
            
            {type=="birth" && <input type='text' className={styles.inputBox} value={value} onChange={handleChange} placeholder='YYYY/MM/DD' />}
            <div className={styles.buttonBox}>
                <div className={styles.button} onClick={onClose}>
                    취소
                </div>
                <div className={styles.button} onClick={handleSave} >
                    {rightBtn}
                </div>
            </div>
        </div >
    )
}