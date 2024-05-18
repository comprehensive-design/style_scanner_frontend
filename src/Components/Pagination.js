import styles from "../css/Pagination.module.css";
import { useEffect, useState } from "react";

export default function Pagination({
    itemsNum,
    itemsPerPage,
    setCurrentPage,
    currentPage
}) {
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
    
    const handleButtonClick = (index) => {
        setCurrentPage(index); // 페이지 변경
        setSelectedButtonIndex(index); // 선택된 버튼 인덱스 업데이트
    };

    const pageList = [];
    const totalpages = Math.ceil(itemsNum / itemsPerPage);
    const maxPage = 10;

    const currentPageGroup = Math.ceil(currentPage / maxPage);
    const startPage = (currentPageGroup - 1) * maxPage + 1;
    const endPage = Math.min(startPage + maxPage - 1, totalpages);

    for (let i = startPage; i <= endPage; i++) {
        pageList.push(i);
    }

    const goToNextPage = () => {
        setCurrentPage(Math.min(currentPage + 1, totalpages)); // 다음 페이지로 이동
        setSelectedButtonIndex(currentPage + 1); // 다음 페이지로 이동한 버튼을 선택된 상태로 표시
    };

    const goToPrevPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 1)); // 이전 페이지로 이동
        setSelectedButtonIndex(currentPage - 1); // 이전 페이지로 이동한 버튼을 선택된 상태로 표시
    };

    if (totalpages <= 1) {
        return null;
    }

    return (
        <div className={styles.pageButton}>
            <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={styles.buttonshape}
            >&lt;</button>

            {pageList.map((page) => (
                <button
                    key={page}
                    onClick={() => handleButtonClick(page)} // 페이지 번호를 전달하여 페이지 변경
                    className={`${selectedButtonIndex === page ? styles.active : ""} ${styles.buttonshape}`}
                >{page}</button>
            ))}

            <button
                onClick={goToNextPage}
                disabled={currentPage === totalpages}
                className={styles.buttonshape}
            >&gt;</button>
        </div>
    );
}