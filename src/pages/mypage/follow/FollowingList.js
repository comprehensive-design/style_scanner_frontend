import Sidebar from "../../../Components/Sidebar";
import React, { useState, useEffect } from "react";
import Pagination from "../../../Components/Pagination";
import api from "../../../api/axios.jsx";
import UsersList from "./UsersList";
import Loading from "../../../Components/loading/loading";

export default function FollowingList() {
  const [followings, setFollowings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalFollowings, setTotalFollowings] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowings = async () => {

      try {
        const response = await api.get("/api/follow/followingList");
        const { following_list } = response.data;
        const updatedFollowings = await Promise.all(
          following_list.map(async (following) => {
            try {
              const proxyResponse = await api.get("/api/insta/proxyImage", {
                params: {
                  imageUrl: following.profilePictureUrl,
                },
                responseType: "blob",
              });
              const imageUrl = URL.createObjectURL(proxyResponse.data);
              following.profilePictureUrl = imageUrl;
            } catch (error) {
              console.error("Error proxying image:", error);
            }
            return following;
          })
        );
        setTotalFollowings(following_list.length);
        setFollowings(following_list);
      } catch (error) {
        console.error("데이터를 가져오는 중에 오류가 발생했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowings();
  }, []);

  const firstItemIndex = (currentPage - 1) * itemsPerPage;
  const lastItemIndex = firstItemIndex + itemsPerPage;
  const currentItems = followings.slice(firstItemIndex, lastItemIndex);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mypageWrapper">
      <Sidebar />
      <div className="mypageMain">
        <div>
          <p className="title left mb05 ml03">팔로잉</p>
          <hr />
        </div>
        <p className="content left mt1 mb1 ml03">전체 {totalFollowings}</p>
        <div className="ml03 mb3">
          <UsersList list={currentItems} />
        </div>
        <Pagination
          itemsNum={totalFollowings}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
