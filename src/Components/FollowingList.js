import styles from '../css/FollowingList.module.css';
import Sidebar from "./Sidebar"
import React, {useState, useEffect, useRef} from 'react';
import Pagination from './Pagination';
import axios from "axios";
import UsersList from './UsersList';
import Footer from './Footer';

export default function FollowingList() {
    const [followings, setFollowings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); 
    const [totalFollowings, setTotalFollowings] = useState(0);
   
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                setFollowings(response.data);
                setTotalFollowings(response.data.length);
            })
            .catch((error) => {
                // 에러 처리
                console.error('데이터를 가져오는 중에 오류가 발생했습니다:', error);
            });
    }, []);

    const firstItemIndex = (currentPage - 1) * itemsPerPage;
    const lastItemIndex = firstItemIndex + itemsPerPage;
    const currentItems = followings.slice(firstItemIndex, lastItemIndex);
    
    return(
        <body>
            <div style={{display:'flex'}}>
                <Sidebar></Sidebar>
                <div className={styles.wrap}>
                    <h3 className={styles.Following}>팔로잉</h3>
                    <HorizonLine></HorizonLine> 
                    <div className={styles.word}>
                        <p>전체</p>
                        <p>&nbsp;{totalFollowings}</p>
                    </div>

                    <div>
                        <UsersList list={currentItems}/>
                        <UsersList list={currentItems}/>
                        <UsersList list={currentItems}/>
                        <UsersList list={currentItems}/>
                        <UsersList list={currentItems}/>
                        <UsersList list={currentItems}/>

                    </div>

                    <footer className={styles.footer}>
                        <div style={{ height: "50px" }}></div>
                        <Pagination
                            itemsNum={followings.length}
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    </footer>

                </div>
            </div>

            <Footer></Footer>
        </body>
    );
}


const HorizonLine = () => {
    return (
      <div
        style={{
          width: "100%",
          borderBottom: "2px solid black",
          lineHeight: "0.1em",
          margin: "10px 0 20px",
        }}
      >
      </div>
    );
  };