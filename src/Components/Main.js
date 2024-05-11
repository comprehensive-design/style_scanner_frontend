import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      <h1>홈</h1>
      <Link to="/Register">가입</Link>
      <Link to="/Login">로그인</Link>
    </div>
  );
};

export default Main;