import styles from "../css/MyPageComments.module.css";
import Sidebar from './Sidebar';
import CommentBox from './CommentBox';

export default function MyPageComments(){
    return (
        <body>
            <Sidebar></Sidebar>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h3>내가 작성한 댓글</h3>
                    <hr></hr>
                </div>
                <CommentBox/>
                <CommentBox/>
                <CommentBox/>
            </div>
        </body>
    );
}