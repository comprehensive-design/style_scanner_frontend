import axios from "axios";
import React, { useState, useEffect } from "react";
import Item from "../../../../Components/item/Item";

export default function ItemsList({ list = [] }) {
  const [likeStatuses, setLikeStatuses] = useState(
    list.map((item) => ({
      id: item.id,
      isLiked: true,
      likeCount: item.likeCount,
    }))
  );

  useEffect(() => {
    setLikeStatuses(
      list.map((item) => ({
        id: item.id,
        isLiked: true,
        likeCount: item.likeCount,
      }))
    );
  }, [list]);

  const token = localStorage.getItem("accessToken");

  const handleClick = (id) => {
    setLikeStatuses((prevStatuses) =>
      prevStatuses.map((status) => {
        if (status.id === id) {
          const newIsLiked = !status.isLiked;
          const newLikeCount = newIsLiked
            ? status.likeCount + 1
            : status.likeCount - 1;

          if (newIsLiked) {
            axios
              .post(
                `/api/itemLike/${id}`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((response) => {
                console.log(`Liked item ${id}`);
              })
              .catch((error) => {
                console.error(`Error liking item ${id}:`, error);
              });
          } else {
            axios
              .delete(`/api/itemLike/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                console.log(`Unliked item ${id}`);
              })
              .catch((error) => {
                console.error(`Error unliking item ${id}:`, error);
              });
          }

          return { ...status, isLiked: newIsLiked, likeCount: newLikeCount };
        }
        return status;
      })
    );
  };

  const handleImageError = (e) => {
    console.error(`Error loading image: ${e.target.src}`);
    e.target.src = "https://via.placeholder.com/240x240/808080/FFFFFF/?text=";
  };

  return (
    <div className="mplGrid">
      {list.map((item) => {
        const { id, name, price, brand, itemUrl, likeCount, shoppingLink } =
          item;
        const status = likeStatuses.find((status) => status.id === id) || {
          isLiked: false,
          likeCount: 0,
        };

        return (
          <div key={id}>
            <Item
              key={id}
              itemId={id}
              brand={brand}
              name={name}
              price={price}
              itemImage={itemUrl}
              shoppingLink={shoppingLink}
              likeCount={likeCount}
            />
          </div>
        );
      })}
    </div>
  );
}
