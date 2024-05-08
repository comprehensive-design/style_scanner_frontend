// import { Category } from "@mui/icons-material";
import '../css/Category.css';
// import HorizonLine from '../utils/HorizontalLine';
import {NavLink} from "react-router-dom";

export default function Category() {
    const activeStyle = {
        color : 'black'
    };

    return(
        <div id = "categoryDiv">
            <h2 id="categoryNa">카테고리</h2>
            <HorizonLine></HorizonLine>
            
            <div id="categoryList">
                <ul>
                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = '' className="gen lists">
                        여성
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = '' className = "lists">
                        상의
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = '' className = "lists">
                        팬츠
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = '' className = "lists">
                        스커트
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = '' className = "lists">
                        원피스
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = '' className = "lists">
                        악세사리
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = '' className = "lists lastlists">
                        기타
                    </NavLink >


                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = '' className="gen lists">
                        남성
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = '' className = "lists">
                        상의
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = '' className = "lists">
                        팬츠
                    </NavLink >


                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = '' className = "lists">
                        악세사리
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = '' className = "lists">
                        기타
                    </NavLink >


                </ul>
            </div>
        </div>
    )
}

const HorizonLine = () => {
    return (
      <div
        style={{
          width: "100%",
          borderBottom: "2px solid #aaa",
          lineHeight: "0.1em",
          margin: "10px 0 20px",
        }}
      >
      </div>
    );
  };
  