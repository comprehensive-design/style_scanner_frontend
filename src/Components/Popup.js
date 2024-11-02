import React, { useState } from 'react';

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
            onSave(value); 
        }
    };

    return (
        <div className="mpmPopup" >
            <p className=' subtitle mb2'>
                {title}
            </p>
            {visible && <input type='text' value={value} onChange={handleChange} />}
            {type == "file" &&
                <input type={type} accept=".jpg, .png" onChange={handleChange} />
            }
            {type === "radio" && (
                <div  className="flex" style={{gap:"10px", justifyContent:"center"}}>
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
                <input type={type} value={value} onChange={handleChange}  ></input>

            )}

            {type == "birth" && <input type='text' value={value} onChange={handleChange} placeholder='YYYY-MM-DD' />}
            <div className='mt3 mpmBtnBox' >
                <button onClick={onClose} className='whiteButton'>
                    취소
                </button>
                <button onClick={handleSave} className='whiteButton'>
                    {rightBtn}
                </button>
            </div>
        </div >
    )
}
