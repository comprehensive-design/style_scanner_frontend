import styles from '../css/CommunityNoti.module.css';
import Sidebar from './Sidebar';
import NotiBox from './NotiBox';
import Pagination from './Pagination';
import Footer from './Footer';

export default function CommunityNotiForm({ urls=[], titles = [], replys = [], dates = [], currentItems, posts, itemsPerPage, setCurrentPage, currentPage}) {
    return (
        <body>
            <div className={styles.total}>
                <Sidebar />
                <div className={styles.content}>
                    <div className={styles.title}>
                        <h2>알림</h2>
                        <hr />
                    </div>
                    <div className={styles.wrap}>
                        {currentItems.map(index => (
                            <NotiBox key={index}
                            url={urls[index]}
                            title={titles[index]}
                            reply={replys[index]}
                            date={dates[index]}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.heightPadding}></div>
            <div className={styles.footerBox}>
                <div className={styles.leftBtween} />
                <div className={styles.footer}>
                    <Pagination
                        itemsNum={posts.length}
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
