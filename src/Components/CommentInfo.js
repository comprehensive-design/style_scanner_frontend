import styles from '../css/CommentInfo.module.css'

export default function CommentInfo(){
    const handleClick = () => {
        alert('하트 눌렀다!');
    };
    return(
        <div className={styles.commentBox}>
            <div className={styles.commentWriterprofile}>
                <div className={styles.fakeBox}>
                    <div className={styles.commentProfileBox}>
                        <img id='commentWriterImage' src={process.env.PUBLIC_URL + 'img/profile.png'}></img>
                    </div>
                </div>
                <div className={styles.fakeBox3}>
                    <span className={styles.commentWriterId} id='commentWriterName'>hi_sseulgi</span>
                    <span className={styles.commentContents} id="commentContents">하파 크리스틴 찾아보세요</span>
                </div>
                <div className={styles.heartBox} onClick={handleClick}>
                    <img id={styles.commentHeart} src={process.env.PUBLIC_URL + 'img/heart.png'}></img>
                </div>
              
            </div>
            
        </div>
    )

}