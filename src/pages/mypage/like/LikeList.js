// https://codesandbox.io/p/sandbox/react-pagination-lcw6pw?file=%2Fsrc%2Fcomponents%2FFilterablePostList.jsx%3A18%2C9-18%2C23
import Sidebar from "../../../Components/Sidebar";
import { useEffect, useState } from "react";
import ItemsList from "./item/ItemsList";
import Pagination from "../../../Components/Pagination";
import api from "../../../api/axios.jsx";

export default function LikeList() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [totalLikes, setTotalLikes] = useState(0);
  useEffect(() => {

    api
      .get("/api/itemLike/me")
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
        setTotalLikes(response.data.length);
      })
      .catch((error) => {
        // 에러 처리
        console.error("데이터를 가져오는 중에 오류가 발생했습니다:", error);
      });
  }, []);

  const firstItemIndex = (currentPage - 1) * itemsPerPage;
  const lastItemIndex = firstItemIndex + itemsPerPage;
  const currentItems = items.slice(firstItemIndex, lastItemIndex);

  // jsondata 쉽게 받아오려고 이렇게 해놨습니다 일부러 그랬습니다..
  return (
    <div className="mypageWrapper">
      <Sidebar />
      <div className="mypageMain">
        <div>
          <p className="title left mb05 ml03">좋아요</p>
          <hr />
        </div>
        <p className="content left mt1 mb1 ml03">전체 {totalLikes}</p>
        <div className="mb3">
          <ItemsList list={currentItems} />
        </div>
        <Pagination
          itemsNum={items.length}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
