import styles from '../css/CelebRecommend.module.css';
import Sidebar from './Sidebar';
import CelebBox from './CelebBox';
import Footer from './Footer';

export default function CelebRecommend() {
    return (
        <>
            <body>
                <Sidebar></Sidebar>

                <div className={styles.content}>
                    <div className={styles.title}>
                        <h2>추천 셀럽</h2>
                        <div className={styles.horizon}></div>
                    </div>

                    <div className={styles.wrap}>
                        <CelebBox></CelebBox>
                        <CelebBox></CelebBox>
                        <CelebBox></CelebBox>
                        <CelebBox></CelebBox>
                        <CelebBox></CelebBox>
                        <CelebBox></CelebBox>
                    </div>
                </div>

            </body>
            {/* <Footer></Footer> */}
        </>

    );
}