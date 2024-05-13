// 회원가입 기능 구현
import React, { useState, useEffect } from 'react';
import styles from '../css/Register.module.css';
import axios from 'axios';
import RegisterForm from './RegisterForm';
import { NavLink } from "react-router-dom";

export default function Register() {
    const [email1, setEmail1] = useState('');
    const [email2, setEmail2] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [gender, setGender] = useState('1');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const birthdate = year + '-' + month + '-' + day;
            const email = email1 + '@' + email2;
            if(password==password2){
                alert(`email: ${email}\npassword: ${password}\ndisplayName: ${displayName}\nbirthdate: ${birthdate}\ngender: ${gender}`);
                const response = await axios.post('http://localhost:8080/signup', {
                    email,
                    password,
                    displayName,
                    birthdate,
                    gender
                }); console.log(response.data);
                <NavLink exact to='/Login'></NavLink>
                alert('가입되었습니다!')}
            else{
                alert('비밀번호를 다시 확인해 주세요')
            }

        } catch (error) {
            console.error('회원가입 오류:', error);
        }
    }

    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
    const [days, setDays] = useState([]);

    useEffect(() => {
        const yearOptions = [];
        for (let i = 2022; i >= 1960; i--) {
            yearOptions.push(<option key={i} value={i}> {i}</option>);
        }
        setYears(yearOptions);

        const monthOptions = [];
        for (let i = 1; i <= 12; i++) {
            monthOptions.push(<option key={i} value={i}>{i}</option>);
        }
        setMonths(monthOptions);

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
                <RegisterForm
                    email1={email1} setEmail1={setEmail1}
                    email2={email2} setEmail2={setEmail2}
                    password={password} setPassword={setPassword}
                    password2={password2} setPassword2={setPassword2}
                    displayName={displayName} setDisplayName={setDisplayName}
                    year={year} setYear={setYear}
                    month={month} setMonth={setMonth}
                    day={day} setDay={setDay}
                    gender={gender} setGender={setGender}
                    handleSubmit={handleSubmit}
                    years={years} months={months} days={days}
                />
            </div>
        </body>
    );
}
