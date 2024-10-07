import MypageDefaultForm from "./MypageDefaultForm";
import api from "../../../utils/axios.jsx";
import React, { useState, useEffect } from "react";
import Loading from "../../../Components/loading/loading";

export default function MypageDefault() {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [totalFollowings, setTotalFollowings] = useState(0);

  const [followings, setFollowings] = useState([]);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token is missing");
      return;
    }
    api
      .get("/api/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setDisplayName(response.data.displayName);
        setBio(response.data.bio);
        setProfilePictureUrl(response.data.profilePictureUrl);
        if (response.data.profilePictureUrl == null)
          setProfilePictureUrl("/img/profile.png");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    api
      .get("/api/follow/followingList", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(async (response) => {
        const { following_list } = response.data;
        setTotalFollowings(following_list.length);
        setFollowings(following_list.slice(0, 5));
        const updatedFollowings = await Promise.all(
          following_list.map(async (following) => {
            try {
              const proxyResponse = await api.get("/api/insta/proxyImage", {
                params: {
                  imageUrl: following.profilePictureUrl,
                },
                responseType: "blob",
              });
              const imageUrl = URL.createObjectURL(proxyResponse.data);
              following.profilePictureUrl = imageUrl;
            } catch (error) {
              console.error("Error proxying image:", error);
            }
            return following;
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    api
      .get("/api/itemLike/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setLikes(response.data.slice(0, 2));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const followingURLs = followings.map(
    (following) => following.profilePictureUrl
  );
  const followingIDs = followings.map((following) => following.profileName);

  const likeURLs = likes.map((like) => like.itemUrl);
  const brand = likes.map((like) => like.brand);
  const itemNames = likes.map((like) => like.name);
  const itemOption = likes.map((like) => like.itemOption);
  const itemPrices = likes.map((like) => like.price.toLocaleString());
  const likeCounts = likes.map((like) => like.likeCount.toLocaleString());

  if (loading) {
    return <Loading />;
  }

  return (
    <MypageDefaultForm
      displayName={displayName}
      bio={bio}
      profilePictureUrl={profilePictureUrl}
      followingNum={totalFollowings}
      followingURLs={followingURLs}
      followingIDs={followingIDs}
      imgUrls={likeURLs}
      brandNames={brand}
      itemNames={itemNames}
      itemOptions={itemOption}
      itemPrices={itemPrices}
      likeCounts={likeCounts}
    />);
}
