import { useState, useEffect, useCallback } from 'react';
import styles from "../css/MyPageComments.module.css";
import Sidebar from './Sidebar';
import CommentBox from './CommentBox';
import Pagination from './Pagination';
import axios from 'axios';
import Footer from './Footer';

const getComments = async (currentPage, itemsPerPage) => {
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

    try {
        const response = await axios.get('/api/comment/me', config);
        return response.data;
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
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentComment, setCurrentComment] = useState(null);
    const [commentSaved, setCommentSaved] = useState(false);

    const firstItemIndex = (currentPage - 1) * itemsPerPage;
    const lastItemIndex = firstItemIndex + itemsPerPage;
    const currentComments = comments.slice(firstItemIndex, lastItemIndex);

    const fetchComments = useCallback(async () => {
        try {
            const data = await getComments(currentPage, itemsPerPage);
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments, commentSaved]);

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
                setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
                setCommentSaved(true); // 삭제 후 commentSaved 상태를 업데이트
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
            <div>
                <div className={styles.total}>
                    <Sidebar />
                    <div className={styles.content}>
                        <div className={styles.title}>
                            <h2>내가 작성한 댓글</h2>
                            <hr />
                        </div>
                        <div className={styles.commentList}>
                            {currentComments.map(data => {
                                const commentdata = data.comment;
                                return (
                                    <CommentBox
                                        key={commentdata.id}
                                        commentId={commentdata.id}
                                        feedImg={data.feedUrl}
                                        title={data.feedTitle}
                                        content={commentdata.content}
                                        onDelete={() => handleDelete(commentdata.id)}
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
            </div>
            <Footer />
        </body>
    );
}
