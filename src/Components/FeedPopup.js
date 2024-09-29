import React, { useState, useEffect } from "react";
import styles from "../css/FeedPopup.module.css";
import axios from "axios";
import Button from "./Button";
import UserFeed from "./UserFeed";

export default function FeedPopup({ user, onClose }) {
  const [feeds, setFeeds] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [follows, setFollows] = useState(0);
  const [userbio, setBio] = useState("");
  const [totalFeeds, setTotalFeeds] = useState(0);
  const [profileImage, setProfileImage] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const followeeId = user.profileName;

  const accessToken = localStorage.getItem("accessToken");

  const handleFollow = () => {
    if (!accessToken) {
        console.error('Access token is missing');
        return;
    }

    axios.post('/api/follow/following', { followeeId }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(() => {
            console.log('Followed successfully');
            setIsFollowing(true);
        })
        .catch(error => {
            console.error('Error while following:', error);
        });
};

  const formatFollowerCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    } else {
      return count;
    }
  };

  useEffect(() => {
    if (!user || !user.profileName) {
      console.error("User or profile name is missing");
      return;
    }
  
    axios
      .get(`/api/insta/${user.profileName}`)
      .then((response) => {
        const { profile, feedList } = response.data;
  
        setFollowers(profile.profileFollowerCount);
        setFollows(profile.profileFollowingCount);
        setBio(profile.profileBio);
        setTotalFeeds(feedList.length);
        setFeeds(feedList);
  
        // 프로필 이미지를 로드합니다.
        loadProfileImage(profile.profilePictureUrl)
          .then(() => checkFollowingStatus()); // 프로필 이미지 로드 후 팔로우 상태 체크
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중에 오류가 발생했습니다:", error);
      });
  }, [user]);
  

  const loadProfileImage = async (imageUrl) => {
    if (!imageUrl) return;

    try {
      const proxyResponse = await axios.get("/api/insta/proxyImage", {
        params: { imageUrl },
        responseType: "blob",
      });
      const url = URL.createObjectURL(proxyResponse.data);
      setProfileImage(url);
    } catch (error) {
      console.error("Error loading profile image:", error);
    }
  };

  const handleUnfollow = (userId) => {
    if (!accessToken) {
      console.error("Access token is missing");
      return;
    }

    axios
      .post(
        "/api/follow/unfollowing",
        { userId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        window.location.reload(); // 성공시 새로고침
        console.log("Unfollowed successfully");
      })
      .catch((error) => {
        console.error("Error while unfollowing:", error);
      });
  };

  const checkFollowingStatus = () => {
    if (!accessToken) {
      console.error("Access token is missing");
      return;
    }
  
    axios
      .get(`/api/follow/checkFollowing?keyword=${user.profileName}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Follow status response:", response.data); // 응답 확인
        setIsFollowing(response.data === true);
      })
      .catch((error) => {
        console.error("Error while checking follow status:", error);
      });
  };
  

  return (
    <div className='popupWrap'> 
      <div className='popupContent'>
        <div className='closeButtonDiv'>
          <button className="closeButton" onClick={onClose} >
            X
          </button>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userProfileImgDiv}>
            <img
              src={profileImage}
              width={"210rem"}
              height={"210rem"}
              className={styles.userProfileImg}
              alt={`${user.profileName}'s profile`}
            />
          </div>

          <div className={styles.userInfoWord}>
            <div className={styles.userFollow}>
              <p className={styles.userId}>{user.profileName}</p>
              {!isFollowing && (
                <div className={styles.FollowButton}>
                  <Button onClick={handleFollow}>팔로우</Button>
                </div>
              )}
              {isFollowing && (
                <div className={styles.FollowButton}>
                  <Button
                    id={styles.buttonDelete}
                    $BackColor="#d9d9d9"
                    $txtColor="black"
                    $hovColor="black"
                    $hovTxtColor="white"
                    className="whiteButton"
                    style={{width:"5rem"}}
                    onClick={() => handleUnfollow(user.profileName)}
                  >
                    언팔로우
                  </Button>
                </div>
              )}
            </div>

            <div className='flex'>
              <p>게시물</p>
              <p>&nbsp;{totalFeeds}</p>

              <p className='ml1'>팔로워</p>
              <p>&nbsp;{formatFollowerCount(followers)}</p>

              <p className='ml1'>팔로우</p>
              <p>&nbsp;{follows}</p>
            </div>

            <div>
              <p className='left zero mt1'>{userbio}</p>
            </div>
          </div>
        </div>
        <HorizonLine />

        <div className='feedGrid'>
          {feeds.map((feed) => (
            <UserFeed key={feed.id} feed={feed} />
          ))}
        </div>
      </div>
    </div>
  );
}

const HorizonLine = () => {
  return (
    <div
      style={{
        width: "100%",
        borderBottom: "2px solid #DEDEDE",
        lineHeight: "0.1rem",
        margin: "10px 0 20px",
      }}
    />
  );
};
