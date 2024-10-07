import React, { useState } from 'react';
import api from '../../api/axios';
import LoginForm from './LoginForm';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 로그인 화면으로 오면 토큰들 삭제 -> 로그아웃
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (email !== '' && password !== '') {
                const response = await api.post('/api/user/login', {
                    "email": email,
                    "password": password
                });
                const accessToken = response.data.access_token;
                const refreshToken = response.data.refresh_token;
                
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);

                window.location.replace("/");
            }
            else {
                alert('이메일 혹은 비밀번호를 입력해 주세요.');
            }
        } catch (error) {
            alert('이메일 혹은 비밀번호를 확인해 주세요.', error);
        }
    };

    return (
        <LoginForm
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            handleSubmit={handleSubmit}
        />
    );
}