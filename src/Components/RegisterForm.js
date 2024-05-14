// 회원가입 UI 구현
import React from 'react';
import styles from '../css/Register.module.css';

export default function RegisterForm({ email, password, displayName, year, month, day, gender, setEmail, setPassword, setDisplayName, setYear, setMonth, setDay, setGender, handleSubmit, years, months, days }) {
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">이메일 주소</label>
            <input className={styles.inputBox} type="text"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">비밀번호</label>
            <input className={styles.inputBox} type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="id">아이디</label>
            <input className={styles.inputBox} type="text" value={displayName}
                onChange={(e) => setDisplayName(e.target.value)} />
            <div className={styles.birthBox}>
                <p>생년월일</p>
                <select className={styles.box} name="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)} style={{ marginLeft: '20px' }}>
                    <option disabled selected>출생 연도</option>
                    {years}
                </select>
                <select className={styles.box} name="month"
                    value={month} onChange={(e) => setMonth(e.target.value)} style={{ marginLeft: '20px' }}>
                    <option disabled selected>월</option>
                    {months}
                </select>
                <select className={styles.box} name="day"
                    value={day}
                    onChange={(e) => setDay(e.target.value)} style={{ marginLeft: '20px' }}>
                    <option disabled selected>일</option>
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
