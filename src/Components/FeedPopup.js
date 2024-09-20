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

  const accessToken = localStorage.getItem("accessToken");

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
        setProfileImage(profile.profilePictureUrl);
        setFeeds(feedList);

        checkFollowingStatus();
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중에 오류가 발생했습니다:", error);
      });
  }, [user]);

  const handleUnfollow = (userId) => {
    // const accessToken = localStorage.getItem('accessToken');
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
        // Handle error
        console.error("Error while unfollowing:", error);
      });
  };

  const checkFollowingStatus = () => {
    // const accessToken = localStorage.getItem('accessToken');
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
        // console.log(response.data);
        // setIsFollowing(response.data.isFollowing);
        if (response.data === false) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      })
      .catch((error) => {
        console.error("Error while checking follow status:", error);
      });
  };

  return (
    <div className={styles.totalWrap}>
      <div className={styles.popupContent}>
        <div className={styles.closeButtonDiv}>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userProfileImgDiv}>
            <img
              src={profileImage}
              width={"200px"}
              height={"200px"}
              className={styles.userProfileImg}
            />
          </div>

          <div className={styles.userInfoWord}>
            <div className={styles.userFollow}>
              <p className={styles.userId}>{user.profileName}</p>
              {!isFollowing && (
                <div className={styles.FollowButton}>
                  <Button>팔로우</Button>
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
                    onClick={() => handleUnfollow(user.profileName)}
                  >
                    언팔로우
                  </Button>
                </div>
              )}
            </div>

            <div className={styles.followsInfo}>
              <p>게시물</p>
              <p>{totalFeeds}</p>

              <p className={styles.followsInfoWord}>팔로워</p>
              <p>{formatFollowerCount(followers)}</p>

              <p className={styles.followsInfoWord}>팔로우</p>
              <p>{follows}</p>
            </div>

            <div>
              <p className={styles.userbio}>{userbio}</p>
            </div>
          </div>
        </div>
        <HorizonLine />

        <div className={styles.feedGrid}>
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
