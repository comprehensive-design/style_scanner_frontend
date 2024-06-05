import { useEffect, useState } from "react";
import axios from "axios";
import CommunityNotiForm from './CommunityNotiForm';

export default function CommunityNoti() {
    const [notis, setNotis] = useState([{}]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

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
        }).then((response) => {
            setNotis(response.data);
        }).catch((error) => {
            console.error('데이터를 가져오는 중에 오류가 발생했습니다:', error);
        });
    }, []);

    const firstItemIndex = (currentPage - 1) * itemsPerPage;
    const lastItemIndex = firstItemIndex + itemsPerPage;
    const currentItems = notis.slice(firstItemIndex, lastItemIndex);

    return (
        <CommunityNotiForm
            noti={currentItems}

            itemsNum={notis.length}
            currentItems={currentItems}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
        />
    );
}