import styles from '../css/CelebRecommend.module.css';
import CelebBox from './CelebBox';
import Footer from './Footer';

export default function CelebRecommend() {
    return (
        <div>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h2>회원님을 위한 추천</h2>
                    <p>@asdf님이 좋아하실만한 셀럽을 모아 봤어요!</p>
                </div>
                <div className={styles.boxwrap}>
                    <CelebBox></CelebBox>
                    <CelebBox></CelebBox>
                    <CelebBox></CelebBox>
                    <CelebBox></CelebBox>
                    <CelebBox></CelebBox>
                    <CelebBox></CelebBox>
                </div>
            </div>
            <Footer></Footer> 
        </div>

    );
}
