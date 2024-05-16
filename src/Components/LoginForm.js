import styles from '../css/Login.module.css';
import { NavLink } from "react-router-dom";


export default function Register({email, password, setEmail, setPassword}) {
    return (
        <body>
            <div className={styles.content}>
                <h1>Style Scanner</h1>
                <p> 당신의 취향을 만들어 드릴게요! </p>

                <form>
                    <label for="email" >이메일 주소</label>
                    <input type="text" name="email" />

                    <label for="password" >비밀번호</label>
                    <input type="password" name="password" />

                    <input className={styles.submitButton} type="submit" value="로그인"></input>
                </form>
                <div style={{textAlign:'right', width: '70%', margin: '0 auto' }}>
                    <NavLink exact to='/Register' style={{fontSize:'14px'}}>회원가입</NavLink>
                </div>

            </div>
        </body >

    );
}