import styles from './CommunityNoti.module.css';
import Sidebar from '../../../Components/Sidebar';
import NotiBox from '../../../Components/NotiBox';
import Pagination from '../../../Components/Pagination';
import Footer from '../../../Components/Footer';

export default function CommunityNotiForm({ noti, itemsNum, itemsPerPage, setCurrentPage, currentPage }) {
    return (
        <body>
            <div className={styles.total}>
                <Sidebar/>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <h2>알림</h2>
                        <hr />
                    </div>
                    <div className={styles.wrap}>
                        {noti.length === 0 ? (
                            <p style={{marginTop:"20px"}}>알림이 없습니다.</p>
                        ) : (
                            <NotiBox noti={noti} />
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.heightPadding}></div>
            <div className={styles.footerBox}>
                <div className={styles.leftBtween} />
                <div className={styles.footer}>
                    <Pagination
                        itemsNum={itemsNum}
                        itemsPerPage={itemsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
            </div>
            <Footer />
        </body>
    );
}
