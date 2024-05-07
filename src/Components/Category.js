// import { Category } from "@mui/icons-material";
import '../css/Category.css';
import {NavLink} from "react-router-dom";

export default function Category() {
    const activeStyle = {
        color : 'black'
    };

    return(
        <div id = "categoryDiv">
            <h2 id="categoryNa">카테고리</h2>

            
            <div id="categoryList">
                <ul>
                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = '' className="gen">
                        여성
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = ''>
                        상의
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = ''>
                        팬츠
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = ''>
                        스커트
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = ''>
                        원피스
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = ''>
                        악세사리
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = ''>
                        기타
                    </NavLink >


                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = '' className="gen">
                        남성
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = ''>
                        상의
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = ''>
                        팬츠
                    </NavLink >


                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = ''>
                        악세사리
                    </NavLink >

                    <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = ''>
                        기타
                    </NavLink >


                </ul>
            </div>
        </div>
    )
}

