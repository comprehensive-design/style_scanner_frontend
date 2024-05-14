import styles from "../css/Pagination.module.css";
import Button from './Button';

export default function Pagination({
    itemsNum,
    itemsPerPage,
    setCurrentPage,
    currentPage
}) {
    const pageList = [];
    const totalpages = Math.ceil(itemsNum / itemsPerPage);

    // 한 화면에 표시될 최대 페이지 수
    const maxPage = 10;

    // 현재 페이지 그룹을 계산
    const currentPageGroup = Math.ceil(currentPage / maxPage);
    const startPage = (currentPageGroup - 1) * maxPage + 1;
    const endPage = Math.min(startPage + maxPage - 1, totalpages);

    for (let i = startPage; i <= endPage; i++) {
        pageList.push(i);
    }

    const goToNextPage = () => {
        setCurrentPage(Math.min(currentPage + 1, totalpages));
    };

    const goToPrevPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 1));
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
                    onClick={() => setCurrentPage(page)}
                    className={`${currentPage === page ? "active" : ""} ${styles.buttonshape}`}
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
