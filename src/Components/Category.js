import '../css/Category.css';
import {Link} from "react-router-dom";

export default function Category() {
    const activeStyle = {
        color : 'black'
    };

    return(
        <div id = "categoryDiv">
            <h2 id="categoryNa">카테고리</h2>
            <HorizonLine></HorizonLine>
            
            <div id="categoryList">
                <ul className="categoryUl">
                    <li><Link to="" className="gen lists">여성</Link></li>
                    <li><Link to="" className="lists">상의</Link></li>
                    <li><Link to="" className="lists">팬츠</Link></li>
                    <li><Link to="" className="lists">스커트</Link></li>
                    <li><Link to="" className="lists">원피스</Link></li>
                    <li><Link to="" className="lists">악세사리</Link></li>
                    <li><Link to="" className="lists lastlists">기타</Link></li>

                    <li><Link to="" className="gen lists">남성</Link></li>
                    <li><Link to="" className="lists">상의</Link></li>
                    <li><Link to="" className="lists">팬츠</Link></li>
                    <li><Link to="" className="lists">악세사리</Link></li>
                    <li><Link to="" className="lists lastlists">기타</Link></li>

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
  