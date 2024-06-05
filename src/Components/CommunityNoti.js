import { useEffect, useState } from "react";
import axios from "axios";
import CommunityNotiForm from './CommunityNotiForm';

export default function CommunityNoti() {
    const [followings, setFollowings] = useState([{}]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalFollowings, setTotalFollowings] = useState(0);

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('Access token is missing');
            return;
        }

        axios.get("/api/notification/me", {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                setFollowings(response.data);
            })
            .catch((error) => {
                // 에러 처리
                console.error('데이터를 가져오는 중에 오류가 발생했습니다:', error);
            });
    }, []);

    const firstItemIndex = (currentPage - 1) * itemsPerPage;
    const lastItemIndex = firstItemIndex + itemsPerPage;
    const currentItems = followings.slice(firstItemIndex, lastItemIndex);

    return (
        <CommunityNotiForm
            list={currentItems}

            length={followings.length}
            currentItems={currentItems}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
        />
    );
}