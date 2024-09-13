import React from "react";
import "../../style/style.css";

export default function RegisterForm({
  email1,
  emailRes,
  emailChecked,
  password,
  validPassword,
  passwordValidRes,
  password2,
  passwordRes,
  passwordMatch,
  displayName,
  year,
  month,
  day,
  gender,
  setEmail1,
  setPassword,
  setPassword2,
  setDisplayName,
  setYear,
  setMonth,
  setDay,
  setGender,
  handleSubmit,
  handleCheckDuplicate,
  handlePasswordCheck,
  years,
  months,
  days,
}) {
  const handleDuplicateCheck = (email) => {
    // 중복 체크 함수 호출
    handleCheckDuplicate(email);
  };

  return (
    <div className="registerMiddleDiv">
      <form onSubmit={handleSubmit} className="loginForm">
        <div className="registersmallBox">
          <label className="boldContent" htmlFor="email">
            이메일 주소
          </label>
          <div style={{ marginBottom: "0" }}>
            <input
              className="underLine"
              type="text"
              value={email1}
              onChange={(e) => setEmail1(e.target.value)} // 입력 시 상태 업데이트만 함
              onBlur={() => handleDuplicateCheck(email1)} // 입력이 끝나고 포커스가 벗어나면 중복 확인 실행
            />
          </div>
          <p
            className="caption "
            style={{
              color: emailChecked ? "green" : "red",
            }}
          >
            {emailRes}
          </p>
        </div>
        <div className="registersmallBox">
          <label className="boldContent" htmlFor="password">
            비밀번호
          </label>
          <input
            className="underLine"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePasswordCheck} // 비밀번호 유효성 검사 및 일치 여부 검사
          />
          <p
            className="caption"
            style={{
              color: validPassword ? "green" : "red", // 유효성과 비밀번호 일치 여부에 따라 색상 변경
            }}
          >
            {passwordValidRes} {/* 비밀번호 유효성 검사 및 일치 여부 메시지 */}
          </p>
        </div>
        <div className="registersmallBox">
          <label className="boldContent" htmlFor="password2">
            비밀번호 확인
          </label>
          <input
            className="underLine"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            onBlur={handlePasswordCheck}
          />
          <p
            className="caption "
            style={{
              color: passwordMatch ? "green" : "red",
            }}
          >
            {passwordRes}
          </p>
        </div>

        <div className="registersmallBox" style={{ marginBottom: "2em" }}>
          <label className="boldContent" htmlFor="id">
            닉네임
          </label>
          <input
            className="underLine"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <label className="boldContent" htmlFor="id">
          부가정보
        </label>
        <div className="registerBirthBox caption">
          <select
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option disabled value="">
              출생 연도
            </option>
            {years}
          </select>
          <p>년</p>
          <select
            name="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option disabled value="">
              월
            </option>
            {months}
          </select>
          <p>월</p>
          <select
            name="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option disabled value="">
              일
            </option>
            {days}
          </select>
          <p>일</p>
          <div className="registerBirthBox" style={{ marginBottom: "0" }}>
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="1"
                checked={gender === "1"}
                onChange={() => setGender("1")}
              />
              <label htmlFor="male" className="mr2">
                남성
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="0"
                checked={gender === "0"}
                onChange={() => setGender("0")}
              />
              <label htmlFor="female">여성</label>
            </div>
          </div>
        </div>
        <input className="button mt3" type="submit" value="가입하기"></input>
      </form>
    </div>
  );
}
