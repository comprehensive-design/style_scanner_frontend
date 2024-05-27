import { useEffect, useState } from "react";
import axios from "axios";
import CommunityNotiForm from './CommunityNotiForm';

export const getPosts = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data;
};

export default function CommunityNoti() {

    const [notifications, setNotifications] = useState([]);

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const firstItemIndex = (currentPage - 1) * itemsPerPage;
    const lastItemIndex = firstItemIndex + itemsPerPage;
    const currentItems = posts.slice(firstItemIndex, lastItemIndex);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts(currentPage, itemsPerPage);
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [currentPage, itemsPerPage]);

    const urls = notifications.map(notification => notification.profilePictureUrl);
    const titles = notifications.map(notification => notification.brandName);
    const replys = notifications.map(notification => notification.itemName);
    const dates = notifications.map(notification => notification.itemOption);
    return (
        <CommunityNotiForm
            urls={urls}
            titles={titles}
            replys={replys}
            posts={posts}
            dates={dates}

            currentItems={currentItems}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
        />
    );
}
