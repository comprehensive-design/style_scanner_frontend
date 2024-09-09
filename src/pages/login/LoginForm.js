import "../../style/style.css";
import { NavLink } from "react-router-dom";
export default function Register({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
}) {
  return (
    <body>
      <div className="loginContent mt3">
        <h1 className="title mb05">Style Scanner</h1>
        <p className="caption mb3"> 당신의 취향을 만들어 드릴게요! </p>

        <form className="loginForm" onSubmit={handleSubmit}>
          <label className="boldContent" htmlFor="email">
            이메일 주소
          </label>
          <input
            className="underLine"
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="boldContent" htmlFor="password">
            비밀번호
          </label>
          <input
            className="underLine"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input className="button mb05" type="submit" value="로그인"></input>
        </form>

        <div
          className="loginRegister"
          style={{ textAlign: "right", width: "70%", margin: "0 auto" }}
        >
          <NavLink exact={true.toString()} to="/Register">
            회원가입
          </NavLink>
        </div>
      </div>
    </body>
  );
}
