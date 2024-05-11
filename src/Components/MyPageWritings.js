import styles from "../css/MyPageWritings.module.css";
import Sidebar from './Sidebar';
import WritingBox from './WritingBox';
export default function MyPageWritings(){
    return (
        <body>
            <Sidebar></Sidebar>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h3>내가 작성한 글</h3>
                    <hr></hr>
                </div>
                <WritingBox></WritingBox>
                <WritingBox></WritingBox>
                <WritingBox></WritingBox>
            </div>
        </body>
    );
}