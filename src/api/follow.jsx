import api from "./axios";

export const followUser = async (followeeId) => {
    const response = await api.post('/api/follow/following', {followeeId});
    console.log("팔로우 성공");
    return response.data;
};

export const unfollowUser = async (followeeId) => {
    const response = await api.post('/api/follow/unfollowing', { followeeId });
    console.log("언팔 성공");
    return response.data;
};

export const checkFollowing = async (followeeId) => {
    const response =  await api.get(`/api/follow/checkFollowing?keyword=${followeeId}`);
    console.log(response.data);
    return response.data;
};