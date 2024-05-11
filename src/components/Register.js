import { useState, useEffect } from 'react';
import styles from '../css/Register.module.css';

export default function Register() {
    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
    const [days, setDays] = useState([]);

    useEffect(() => {
        // 출생 년도 생성
        const yearOptions = [];
        for (let i = 2022; i >= 1960; i--) {
            yearOptions.push(<option key={i} value={i}> {i}</option>);
        }
        setYears(yearOptions);

        // 출생 월 생성
        const monthOptions = [];
        for (let i = 1; i <= 12; i++) {
            monthOptions.push(<option key={i} value={i}>{i}</option>);
        }
        setMonths(monthOptions);

        // 출생 일 생성 (31일까지)
        const dayOptions = [];
        for (let i = 1; i <= 31; i++) {
            dayOptions.push(<option key={i} value={i}>{i}</option>);
        }
        setDays(dayOptions);
    }, []);

    return (
        <body>
            <header>메뉴바</header>
            <div className={styles.content}>
                <h1>회원가입</h1>
                <form>
                    <label for="email">이메일 주소</label>
                    <input className={styles.inputBox} type="text" name="email" />
                    <label for="password" >비밀번호</label>
                    <input className={styles.inputBox} type="password" name="password" />

                    <label for="id">아이디</label>
                    <input className={styles.inputBox} type="text" name="id" />

                    <div className={styles.birthBox}>
                        <p>생년월일</p>
                        <select className={styles.box} name="year" style={{ marginLeft: '20px' }}>
                            <option disabled selected>출생 연도</option>
                            {years}
                        </select>
                        <select className={styles.box} name="month" style={{ marginLeft: '20px' }}>
                            <option disabled selected>월</option>
                            {months}
                        </select>
                        <select className={styles.box} name="day" style={{ marginLeft: '20px' }}>
                            <option disabled selected>일</option>
                            {days}
                        </select>
                    </div>


                    <div className={styles.genderBox}>
                        <p> 성별</p>
                        <div>
                            <input type="radio" name="gender" value="male"></input>
                            <label style={{ fontSize: '16px' }} for="male">남성</label>
                        </div>
                        <div>
                            <input type="radio" name="gender" value="female"></input>
                            <label for="female">여성</label>
                        </div>
                    </div>
                    <input className={styles.submitBox} type="submit" value="가입하기"></input>
                </form>
            </div>
        </body>
    );
}