import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "../../Components/item/Item.js";

export default function Ranking({
  selectedCategory = "ALL",
  selectedSubcategory = "ALL",
}) {
  const [items, setItems] = useState([]);
  const [rankingType, setRankingType] = useState(0);

  useEffect(() => {
    const categoryParam =
      selectedCategory === "ALL" && selectedSubcategory === "ALL"
        ? "ALL_ALL"
        : `${selectedCategory}_${selectedSubcategory || "ALL"}`;

    const fetchRankingItems = async () => {
      try {
        const response = await axios.get("/api/item/ranking", {
          params: {
            category: categoryParam,
            timeFilter: rankingType,
          },
        });

        let sortedItems = response.data;

        // 클라이언트에서 정렬하기
        switch (rankingType) {
          case 0:
            sortedItems.sort((a, b) => a.id - b.id);
            break;
          case 1:
            sortedItems.sort((a, b) => b.likeCount - a.likeCount);
            break;
          case 2:
            sortedItems.sort((a, b) => a.price - b.price);
            break;
          default:
            break;
        }

        setItems(sortedItems);
      } catch (error) {
        console.error("Error fetching ranking items:", error);
      }
    };

    fetchRankingItems();
  }, [selectedCategory, selectedSubcategory, rankingType]);

  const handleRankingTypeChange = (type) => {
    setRankingType(type);
  };

  return (
    <div className="body ml1">
      <div>
        <h1 className="title">BEST</h1>
        <p className="caption">인기 있는 아이템</p>
      </div>

      <div className="mt5 flexColumnn">
        <div className="right mb1 mr3">
          <ul className="rightAlign">
            <ul className="mainUl">
              <li>
                <a
                  className="blackText mainUl mainNav"
                  style={{ fontWeight: rankingType === 0 ? "bold" : "normal" }}
                  href="#"
                  onClick={() => handleRankingTypeChange(0)}
                >
                  실시간
                </a>
              </li>
              <li className="ml05">
                <a
                  className="blackText mainUl mainNav"
                  style={{ fontWeight: rankingType === 1 ? "bold" : "normal" }}
                  href="#"
                  onClick={() => handleRankingTypeChange(1)}
                >
                  일간
                </a>
              </li>
              <li className="ml05">
                <a
                  className="blackText mainUl mainNav"
                  style={{ fontWeight: rankingType === 2 ? "bold" : "normal" }}
                  href="#"
                  onClick={() => handleRankingTypeChange(2)}
                >
                  주간
                </a>
              </li>

            </ul>
          </ul>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {items.map((item, index) => (
            <div key={item.id} style={{ position: "relative" }}>
              {/* 랭킹 순위 표시 */}
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  padding: "0.3rem",
                  borderRadius: "0.3rem",
                  zIndex: "9999",
                  width: "1.5rem",
                }}
              >
                {index + 1}
              </div>
              <Item
                itemId={item.id}
                brand={item.brand}
                name={item.name}
                price={item.price}
                itemImage={item.itemUrl}
                shoppingLink={item.shoppingLink}
                likeCount={item.likeCount}
                width={"15rem"}
                height={"15rem"}
                borderRad={"0.5rem"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
