import { useState, useEffect, useCallback } from 'react';
import styles from "../css/MyPageComments.module.css";
import Sidebar from './Sidebar';
import CommentBox from './CommentBox';
import Pagination from './Pagination';
import axios from 'axios';
import Footer from './Footer';

const token = localStorage.getItem("accessToken");

if (!token) {
    console.error("토큰이 없습니다.");
    throw new Error("토큰이 없습니다.");
}
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

const getComments = async (currentPage, itemsPerPage) => {


    try {
        const response = await axios.get('/api/comment/me', config);
        return response.data; // feeds 배열을 직접 반환


    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios 에러: 게시물 가져오기 실패:', error.response?.data || error.message);
            console.error('응답 상태:', error.response?.status); // 상태 코드 로그
            console.error('응답 헤더:', error.response?.headers); // 헤더 로그
        } else {
            console.error('예상치 못한 에러: 게시물 가져오기 실패:', error);
        }
        throw error;
    }
};



export default function MyPageComments() {
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentComment, setCurrentComment] = useState(null);
    const [commentSaved, setCommentSaved] = useState(false);

    const firstItemIndex = (currentPage - 1) * itemsPerPage;
    const lastItemIndex = firstItemIndex + itemsPerPage;
    const currentComments = comments.slice(firstItemIndex, lastItemIndex);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getComments(currentPage, itemsPerPage);
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
    
        fetchComments();

        if (commentSaved) {
            closePopup();
            setCommentSaved(false); // 상태를 리셋
        }


    }, [currentPage, commentSaved]);

    const openPopup = useCallback((comment = null) => {
        setCurrentComment(comment);
        setIsPopupOpen(true);
    }, []);

    const closePopup = useCallback(() => {
        setIsPopupOpen(false);
        setCurrentComment(null);
    }, []);

    const handleDelete = async (commentId) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('로그인이 필요합니다.');
            return;
        }

        try {
            const response = await axios.delete(
                `/api/comment/delete/${commentId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
            if (response.status === 200) {
                alert('삭제되었습니다.');
                setComments(comments.filter(comment => comment.id !== commentId));
            }
        } catch (error) {
            alert('삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
            console.error('삭제 오류:', error);
        }
    };

    const handleSave = (updatedComment) => {
        setComments((prevComments) => {
            const newComments = prevComments.map(comment => (comment.id === updatedComment.id ? updatedComment : comment));
            setCommentSaved(true); // 상태가 업데이트되었음을 표시
            return newComments;
        });
    };

    return (
        <body>
            <div className={styles.total}>
                <Sidebar />
                <div className={styles.content}>
                    <div className={styles.title}>
                        <h2>내가 작성한 댓글</h2>
                        <hr />
                    </div>
                    <div className={styles.commentList}>
                        
                        {currentComments.map(data => {
                            const commentdata = data.comment
                            return (
                                <CommentBox

                                    commentId={commentdata.id}
                                    feedImg={data.feedUrl}
                                    title={data.feedTitle}
                                    content={commentdata.content}
                                    onDelete={() => handleDelete(commentdata.id)}
                                // onEdit={() => openPopup(comment)}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className={styles.heightPadding}></div>
            <div className={styles.footerBox}>
                <div className={styles.leftBtween} />
                <div className={styles.footer}>
                    <Pagination
                        itemsNum={comments.length}
                        itemsPerPage={itemsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
            </div>
            {/* {isPopupOpen && (
                <CommunityInfo comment={currentPost} onSave={handleSave} onClose={closePopup} />
            )} */}
            <Footer />

        </body>


    );
}
