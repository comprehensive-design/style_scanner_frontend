import React from 'react';
import styles from '../css/NotiBox.module.css';

function NotiBox({ list }) {
    return (
        <>
            {list.map((user, index) => (
                <div key={index}>
                    <div className={styles.box}>
                        <div className={styles.NBox}>
                            <div>
                                {/* formLink(user.postId) */}
                                {/* user.postContent */}
                                <a href={formLink(user.postId)} className={styles.Qtext} >Q {user.postContent}</a>
                            </div>
                            <div>
                                <p className={styles.A}>A.&nbsp;</p>
                                <p className={styles.Atext}>{user.commentContent}</p>
                            </div>
                        </div>
                        <div className={styles.DBox}>
                            {formatDate(user.createdAt)}
                        </div>
                    </div>
                    <hr></hr>
                </div>
            ))}
        </>
    );
}

function formLink(link) {
    console.log(link)
    return `/CommunityFeed/${link}`;
}

function formatDate(createdAt) {
    if (!createdAt || createdAt.length < 3) {
        return 0;
    }


    const year = createdAt[0]
    const month = createdAt[1];
    const day = createdAt[2];

    return `${year}.${month}.${day}`;
}

export default NotiBox;