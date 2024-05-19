import React, { useState, useEffect, useRef } from 'react';
import ComFeed from './comfeed.js';
import CommentInfo from './CommentInfo.js';
import styles from '../css/CommunityInfo.module.css';
// import Button from './Button';

export default function CommunityInfo(){
    const [comments, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const commentListRef = useRef(); 
    const sendClick = () => {
        alert("작성버튼 누름")
     };
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                if (loading) return;
                
                commentLoadItems();
            });
        });
        observer.observe(commentListRef.current);

        return () => {
            observer.disconnect();
        };

    }, [loading]); 

    const commentLoadItems = () => {
        setLoading(true); 
        const newComments = [];
        for (let i = 0; i < 3; i++) {
            newComments.push({
                id: comments.length + i,
                image: ' '
            });
        }
        setItems([...comments, ...newComments]);
        setLoading(false); 
    };

   
    return(
        <div>
            
            <div className={styles.contents}>
                
                <ComFeed goDir={"navigateToHomeInfo"}></ComFeed>
                <div className={styles.commentDecoBox}>
                    <div className={styles.totalItem} ref={commentListRef}>
                        {comments.map(comment=> (
                        <CommentInfo key={comment.id} image={comment.image} />
                        ))}
                        <div style={{height: '10px'}} />
                    </div>
                    <div className={styles.comInputBox}>
                        <div className={styles.comProfileBox}>
                            <img id='comProfileImage' src={process.env.PUBLIC_URL + 'img/profile.png'}></img>
                        </div>
                        <div className={styles.inputBox}>
                            <input className={styles.comInput} type="text" placeholder="댓글을 입력하세요"></input>
                        </div>
                         <div >
                            <img  className={styles.writeBtn} src={`img/send.png`} onClick={sendClick}></img>
                         </div>
                    </div>
                </div>
                
            </div>
            
        </div>
        
    )
}