import { Route, Routes } from 'react-router-dom';
import Main from './Components/Main';
import Register from './Components/Register';
import Login from './Components/Login';
import MypageDefault from './Components/MypageDefault';
import Feed from './Components/feed.js';
const App = () => {
  return (
    // <Routes>
    // <Route path="/" element={<Main />} />
    //   <Route path="/Register" element={<Register />} />
    //   <Route path="/Login" element={<Login />} />
    //   <Route path="/MypageDefault" element={<MypageDefault />} />
      
    // </Routes>
    <Feed></Feed>
  );
};

export default App;