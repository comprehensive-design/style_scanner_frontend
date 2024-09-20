import React, { useState, useEffect } from "react";
import api from "../../utils/axios.jsx";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email1, setEmail1] = useState("");
  const [emailRes, setEmailRes] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordRes, setPasswordRes] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordValidRes, setPasswordValidRes] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [gender, setGender] = useState("1");
  const [emailChecked, setEmailChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckDuplicate = async (email1) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      // 이메일 형식이 올바른지 확인
      if (!emailRegex.test(email1)) {
        setEmailRes("유효한 이메일 주소를 입력해 주세요.");
        setEmailChecked(false);
        return;
      }

      if (email1 === "") {
        setEmailRes("이메일을 채워 주세요");
        setEmailChecked(false);
      } else {
        const email = email1;
        const response = await api.get(`/api/user/emailcheck`, {
          params: {
            email: email,
          },
        });

        if (response.data) {
          setEmailRes("이미 사용 중인 이메일입니다."); // 이미 사용 중인 이메일인 경우
          setEmailChecked(false);
        } else {
          setEmailRes("사용 가능한 이메일입니다."); // 사용 가능한 이메일인 경우
          setEmailChecked(true);
        }
      }
    } catch (error) {
      setEmailRes(`이메일 중복 확인 오류: ${error.message}`);
      setEmailChecked(false);
    }
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  const handlePasswordCheck = () => {
    if (!validatePassword(password)) {
      setPasswordValidRes(
        "비밀번호는 영문, 숫자, 특수문자를 포함한 8자리 이상이어야 합니다."
      );
      setValidPassword(false);
      return;
    } else {
      setPasswordValidRes("");
      setValidPassword(true);
    }

    if (password === "" || password2 === "") {
      setPasswordRes("비밀번호를 입력해 주세요.");
      setPasswordMatch(false);
    } else if (password === password2) {
      setPasswordRes("비밀번호가 일치합니다.");
      setPasswordMatch(true);
    } else {
      setPasswordRes("비밀번호가 일치하지 않습니다.");
      setPasswordMatch(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const birthdate =
        year +
        "-" +
        String(month).padStart(2, "0") +
        "-" +
        String(day).padStart(2, "0");
      const email = email1;

      if (validPassword && passwordMatch && emailChecked) {
        const response = await api.post("/api/user/signup", {
          email: email,
          displayName: displayName,
          password: password,
          birthdate: birthdate,
          gender: gender,
        });
        alert("가입되었습니다!");
        navigate("/Login");
      } else if (
        !email1 ||
        !password ||
        !password2 ||
        !displayName ||
        !year ||
        !month ||
        !day
      ) {
        alert("모든 항목을 작성해 주세요");
      } else if (!emailChecked) {
        alert("이메일을 확인해 주세요");
      } else if (!passwordMatch) {
        alert("비밀번호를 확인해 주세요");
      }
    } catch (error) {
      alert(
        "회원가입 오류: " + (error.response?.data?.message || error.message)
      );
    }
  };

  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const yearOptions = [];
    for (let i = 2022; i >= 1960; i--) {
      yearOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    setYears(yearOptions);

    const monthOptions = [];
    for (let i = 1; i <= 12; i++) {
      monthOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    setMonths(monthOptions);

    const dayOptions = [];
    for (let i = 1; i <= 31; i++) {
      dayOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    setDays(dayOptions);
  }, []);

  return (
    <div className="mainWrapper">
      <h1>회원가입</h1>
      <RegisterForm
        email1={email1}
        setEmail1={setEmail1}
        emailChecked={emailChecked}
        emailRes={emailRes}
        password={password}
        setPassword={setPassword}
        passwordValidRes={passwordValidRes}
        password2={password2}
        setPassword2={setPassword2}
        passwordRes={passwordRes}
        passwordMatch={passwordMatch}
        validPassword={validPassword}
        displayName={displayName}
        setDisplayName={setDisplayName}
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
        day={day}
        setDay={setDay}
        gender={gender}
        setGender={setGender}
        handleSubmit={handleSubmit}
        handleCheckDuplicate={handleCheckDuplicate}
        handlePasswordCheck={handlePasswordCheck}
        years={years}
        months={months}
        days={days}
      />
    </div>
  );
}
