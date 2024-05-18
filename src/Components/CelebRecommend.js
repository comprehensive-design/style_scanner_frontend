import styles from '../css/CelebRecommend.module.css';
import Sidebar from './Sidebar';
import CelebBox from './CelebBox';
import Footer from './Footer';

export default function CelebRecommend() {
    return (
        <body>
            <div style={{ display: 'flex' }} className={styles.total}>
                <Sidebar></Sidebar>
                <div className={styles.content}>
                    <h3 className={styles.title}>추천 셀럽</h3>
                    <div className={styles.horizon}></div>
                    <div className={styles.boxwrap}>
                        <CelebBox></CelebBox>
                        <CelebBox></CelebBox>
                        <CelebBox></CelebBox>
                        <CelebBox></CelebBox>
                        <CelebBox></CelebBox>
                        <CelebBox></CelebBox>
                    </div>
                    {/* <Footer></Footer> Footer가 total 안에 위치 */}
                </div>
            </div>
            <Footer></Footer> {/* Footer가 total 안에 위치 */}
        </body>

    );
}
