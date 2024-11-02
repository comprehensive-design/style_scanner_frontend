import styles from "../css/Pagination.module.css";
import { useState } from "react";

export default function Pagination({
    itemsNum,
    itemsPerPage,
    setCurrentPage,
    currentPage
}) {
    const totalpages = Math.ceil(itemsNum / itemsPerPage); // 총 페이지 수
    const maxPage = 10;

    // 현재 페이지 그룹 계산
    const currentPageGroup = Math.ceil(currentPage / maxPage);
    const startPage = (currentPageGroup - 1) * maxPage + 1;
    const endPage = Math.min(startPage + maxPage - 1, totalpages);

    // 페이지 리스트 생성
    const pageList = [];
    for (let i = startPage; i <= endPage; i++) {
        pageList.push(i);
    }

    // 이전 페이지로 이동
    const goToPrevPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 1)); // 1페이지 이하로는 못 내려감
    };

    // 다음 페이지로 이동
    const goToNextPage = () => {
        setCurrentPage(Math.min(currentPage + 1, totalpages)); // 총 페이지 이상으로는 못 올라감
    };

    // 페이지가 없을 때
    if (totalpages < 1) {
        return null;
    }

    return (
        <div className={styles.pageButton}>
            {/* 이전 페이지 버튼 */}
            <button
                onClick={goToPrevPage}
                disabled={currentPage === 1} // 첫 페이지면 비활성화
                className={styles.buttonshape}
            >
                &lt;
            </button>

            {/* 페이지 번호 버튼 */}
            {pageList.map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)} // 페이지 변경
                    className={`${currentPage === page ? styles.active : ""} ${styles.buttonshape}`}
                >
                    {page}
                </button>
            ))}

            {/* 다음 페이지 버튼 */}
            <button
                onClick={goToNextPage}
                disabled={currentPage === totalpages} // 마지막 페이지면 비활성화
                className={styles.buttonshape}
            >
                &gt;
            </button>
        </div>
    );
}
