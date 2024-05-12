import styles from "../css/Pagination.module.css";

export default function Pagination({
    itemsNum,
    itemsPerPage,
    setCurrentPage,
    currentPage
}){
    const pageList = [];
    const totalpages = Math.ceil(itemsNum/itemsPerPage);

    for (let i=1; i<=totalpages; i++){
        pageList.push(i);
    }

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const goToPrevPage = () => {
        setCurrentPage(currentPage -1);
    };

    if (totalpages <= 0){
        return null;
    }

    if (totalpages === 1){
        return null;
    }

    return(
        // 페이지 이동 버튼
        <div className={styles.pageButton} >
            <button 
                onClick={goToPrevPage} disabled = {currentPage === 1}
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
            className={styles.buttonshape}
            onClick={goToNextPage} disabled={currentPage === pageList.length}>&gt;</button>
        </div>
    )
}   