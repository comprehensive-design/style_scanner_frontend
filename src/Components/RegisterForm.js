import React from 'react';
import styles from '../css/Register.module.css';

export default function RegisterForm({ email1, email2, password, password2, displayName, year, month, day, gender, setEmail1, setEmail2, setPassword, setPassword2, setDisplayName, setYear, setMonth, setDay, setGender, handleSubmit, handleCheckDuplicate, years, months, days }) {

    const handleDuplicateCheck = (e) => {
        e.preventDefault();
        handleCheckDuplicate(email1, email2);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">이메일 주소</label>
            <div className={styles.mailBox}>
                <input className={styles.inputBox} style={{ margin: 'auto 0' }} type="text"
                    value={email1} onChange={(e) => setEmail1(e.target.value)} />
                <p>@</p>
                <input className={styles.inputBox} style={{ margin: 'auto 0' }} type="text"
                    value={email2} onChange={(e) => setEmail2(e.target.value)} />
                <p onClick={handleDuplicateCheck}>중복확인</p> {/* 중복 확인 버튼 */}
            </div>
            <label htmlFor="password">비밀번호</label>
            <input className={styles.inputBox} type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="password2">비밀번호 확인</label>
            <input className={styles.inputBox} type="password" value={password2}
                onChange={(e) => setPassword2(e.target.value)} />
            <label htmlFor="id">아이디</label>
            <input className={styles.inputBox} type="text" placeholder='영어만 사용' value={displayName}
                onChange={(e) => setDisplayName(e.target.value)} />
            <div className={styles.birthBox}>
                <p>생년월일</p>
                <select className={styles.box} name="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)} style={{ marginLeft: '20px' }}>
                    <option disabled value="">출생 연도</option>
                    {years}
                </select>
                <select className={styles.box} name="month"
                    value={month} onChange={(e) => setMonth(e.target.value)} style={{ marginLeft: '20px' }}>
                    <option disabled value="">월</option>
                    {months}
                </select>
                <select className={styles.box} name="day"
                    value={day}
                    onChange={(e) => setDay(e.target.value)} style={{ marginLeft: '20px' }}>
                    <option disabled value="">일</option>
                    {days}
                </select>

            </div>
            <div className={styles.genderBox}>
                <p>성별</p>
                <div>
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="1"
                        checked={gender === '1'}
                        onChange={() => setGender('1')}
                    />
                    <label htmlFor="male">남성</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="0"
                        checked={gender === '0'}
                        onChange={() => setGender('0')}
                    />
                    <label htmlFor="female">여성</label>
                </div>
            </div>
            <input className={styles.submitBox} type="submit" value="가입하기"></input>
        </form>
    );
}
