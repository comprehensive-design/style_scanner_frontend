import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', {
                email,
                password,
            });
            console.log(response.data);
            alert('로그인되었습니다!');
            navigate('/homefeed'); 
        } catch (error) {
            alert('이메일 혹은 비밀번호를 확인해 주세요.', error);
        }
    };

    return (
        <body>
            <LoginForm
                email={email} setEmail={setEmail}
                password={password} setPassword={setPassword}
                handleSubmit={handleSubmit}
            />
        </body>
    );
}
