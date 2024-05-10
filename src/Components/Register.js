import { useState, useEffect } from 'react';
import styles from '../css/Register.module.css';
import axios from 'axios';

export default function Register() {

    // BE로 값 넘기기
    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setID] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [gender, setGender] = useState('1');

    const handleSubmin = async (e) => {
        e.preventDefault();
        try {
            const birthdate = year + '-' + month + '-' + day; // 생년월일을 합치기
            alert(`email: ${email}\npassword: ${password}\ndisplayName: ${displayName}\nbirthdate: ${birthdate}\ngender: ${gender}`);

            const response = await axios.post('http://localhost:8080/signup', {
                email,
                password,
                displayName,
                birthdate,
                gender
            }); console.log(response.data);
            // 회원가입 성공 시 처리
        } catch (error) {
            console.error('회원가입 오류:', error);
            // 회원가입 실패 시 처리
        }
    }


    // 생일 설정
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
            <div className={styles.content}>
                <h1>회원가입</h1>
                <form onSubmit={handleSubmin}>
                    <label for="email">이메일 주소</label>
                    <input className={styles.inputBox} type="text"
                        value={email} onChange={(e) => setMail(e.target.value)} />
                    <label for="password" >비밀번호</label>
                    <input className={styles.inputBox} type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    <label for="id">아이디</label>
                    <input className={styles.inputBox} type="text" value={displayName}
                        onChange={(e) => setID(e.target.value)} />

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
                        <p> 성별</p>
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
            </div>
        </body>
    );
}