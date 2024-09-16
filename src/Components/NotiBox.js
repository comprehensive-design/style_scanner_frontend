import React from 'react';

function NotiBox({ noti }) {
    return (
        <>
            {noti.map((user, index) => (
                <div key={index}>
                    <div className='mpnBox'>
                        <div>
                            <div className='flex mb1'>
                                <p className="title">Q.&nbsp;</p>
                                <a href={formLink(user.postId)} className="subtitle blackText rowCenter ml03" >{user.postContent}</a>
                            </div>
                            <div className='flex'>
                                <p className="title grayText">A.&nbsp;</p>
                                <p className="content rowCenter ml1">{user.commentContent}</p>
                            </div>
                        </div>
                        <div className='grayText caption'>
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
    return `/CommunityFeed/${link}`;
}

function formatDate(createdAt) {
    if (!createdAt || createdAt.length < 3) return 0;
    const year = createdAt[0]
    const month = createdAt[1];
    const day = createdAt[2];
    return `${year}. ${month}. ${day}`;
}

export default NotiBox;