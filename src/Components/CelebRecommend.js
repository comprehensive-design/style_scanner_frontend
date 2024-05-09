import styles from '../css/CelebRecommend.module.css';
import Sidebar from './Sidebar';
import CelebBox from './CelebBox';

export default function CelebRecommend() {
    return (
        <body>

            <Sidebar></Sidebar>

            <div className={styles.content}>
                <div className={styles.title}>
                    <h2>추천 셀럽</h2>
                    <hr></hr>
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
    );
}