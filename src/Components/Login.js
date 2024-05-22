import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (email != '' && password != '') {
                const response = await axios.post('/api/user/login', {
                    "email": email,
                    "password": password
                });
                const accessToken = response.data.access_token;
                localStorage.setItem("accessToken", accessToken);
                console.log(response.data);
                alert('로그인되었습니다!');
                // navigate('/homefeed');
                window.location.replace("/homefeed");
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