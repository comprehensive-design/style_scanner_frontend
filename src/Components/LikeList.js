import styles from'../css/LikeList.module.css';
import Sidebar from '../Components/Sidebar';

export default function LikeList(){
    return(
        <body className={styles.wrap}>
            <Sidebar></Sidebar>

            <div className={styles.content}>
                <div className={styles.title}>
                    <h2>좋아요</h2>
                    <div className={styles.horizon}></div>
                </div>
            </div>
            
        </body>
    );
}