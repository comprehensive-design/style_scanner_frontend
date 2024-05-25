import React, { useState } from 'react';
import styles from '../css/Popup.module.css';
import Button from './Button';

export default function Popup({ title, onClose, onSave, visible = true, rightBtn = "저장", type = "text" }) {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        if (type === "file") {
            const file = e.target.files[0];
            setValue(file);
        }
        else
            setValue(e.target.value);
    };
    const handleSave = () => {
        if (type === "radio") {
            const genderValue = document.querySelector('input[name="gender"]:checked').value;
            onSave(genderValue);
        } else {
            onSave(value); // 다른 경우, 입력한 값을 전달
        }
    };

    return (
        <div className={styles.popupBox} >
            <h3>
                {title}
            </h3>
            {visible && <input type='text' className={styles.inputBox} value={value} onChange={handleChange} />}
            {type == "file" &&
                <input type={type} className={styles.inputBox} accept=".jpg, .png" onChange={handleChange} />
            }
            {type === "radio" && (
                <div className={styles.genderBox}>
                    <div>
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="1"
                            onChange={handleChange}
                        />
                        <label htmlFor="male">남성</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="0"
                            onChange={handleChange}
                        />
                        <label htmlFor="female">여성</label>
                    </div>
                </div>
            )}
            {type == "password" && (
                <input type={type} className={styles.inputBox} value={value} onChange={handleChange}  ></input>

            )}

            {type == "birth" && <input type='text' className={styles.inputBox} value={value} onChange={handleChange} placeholder='YYYY-MM-DD' />}
            <div className={styles.buttonBox}>
                <Button onClick={onClose} BackColor="#d9d9d9" txtColor='black' border='1px solid black' hovColor='black' hovTxtColor='white'>
                    취소
                </Button>
                <Button onClick={handleSave} BackColor="#d9d9d9" txtColor='black' border='1px solid black' hovColor='black' hovTxtColor='white'>
                    {rightBtn}
                </Button>
            </div>
        </div >
    )
}
