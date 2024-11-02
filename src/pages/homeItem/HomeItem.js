import styled from "styled-components";
import Feed from "../../Components/feed/Feed.js";
import Item from "../../Components/item/Item.js";
import WritePopup from "../community/popup/WritePopup.js";
import { useHomeItemLogic } from "../../hooks/useHomeItemLogic";
import { feedClick } from "../../api/feedClick.jsx";
import { useState, useRef } from "react";
import { FaBoxArchive } from "react-icons/fa6";
import Loading from "../../Components/loading/loading";
import TopButton from "../../Components/button/TopButton.jsx";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { theme } from "../../style/theme.js";

export default function HomeItem() {
  const {
    mediaUrls,
    proxyImageUrls,
    imagesLoaded,
    username,
    profile_url,
    feedCodes,
    item,
    itemLoading,
    setItem,
    setItemLoading,
  } = useHomeItemLogic();

  const categories = [
    "아우터",
    "상의",
    "팬츠",
    "스커트",
    "원피스",
    "신발",
    "가방",
    "악세사리"
  ];
  const genderMap = {
    W: "WOMEN",
    M: "MEN",
  };

  const categoryMap = {
    아우터: "OUTER",
    상의: "TOP",
    팬츠: "PANTS",
    스커트: "SKIRT",
    원피스: "ONE_PIECE",
    신발: "SHOES",
    가방: "BAG",
    악세사리: "ACC",
  };
  const [isClicked, setIsClicked] = useState(false);
  const [counter, setCounter] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const itemsPerPage = 4;
  const [itemsToShow, setItemsToShow] = useState(itemsPerPage);

  const imgRef = useRef(null);

  let showPrevBtn = counter > 0;
  let showNextBtn = counter !== proxyImageUrls.length - 4 && proxyImageUrls.length > 4;

  if (!imagesLoaded) {
    return <Loading />;
  }
  const nextBtn = () => {
    setCounter(counter + 1);
  };
  const prevBtn = () => {
    setCounter(counter - 1);
  };
  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const thumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };
  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  // const morePage = () => {
  //   setItemsToShow((prevItemsToShow) => {
  //     const newCount = prevItemsToShow + itemsPerPage;
  //     return newCount <= items.length ? newCount : items.length;
  //   });
  // };
  const handleImageClick = (event) => {
    setIsClicked(true);
    const combinedCategory = `${genderMap[selectedGender]}_${categoryMap[selectedCategory]}`;
    console.log("combinedCategory:", combinedCategory);
    feedClick(event, imgRef, mediaUrls, setItem, combinedCategory);
  };
  return (
    <div className="mainWrapper">
      <FeedWrapper className="p1">
        <CategoryWrapper className="borderRad mr3">
          <div className="flex">
            <CategoryBtn  className={selectedGender === 'M' ? 'active boldContent' : 'boldContent'} onClick={() => handleGenderClick('M')}>M</CategoryBtn>
            <CategoryBtn className={selectedGender === 'W' ? 'active boldContent' : 'boldContent'} onClick={() => handleGenderClick('W')}>W</CategoryBtn>
          </div>
          {categories.map((category, index) => (
            <CategoryBtn key={index} className={selectedCategory === category ? 'active' : ''} onClick={() => handleCategoryClick(category)}>{category}</CategoryBtn>
          ))}
        </CategoryWrapper>
        {proxyImageUrls && profile_url && username && feedCodes && (
          <Feed
            key={currentImageIndex}
            profile_url={profile_url}
            username={username}
            className={"homeitem"}
            currentIndex={currentImageIndex}
            thumbnail_url={proxyImageUrls[currentImageIndex]}
            handleImageClick={handleImageClick}
            width="30rem"
            height="36rem"
            carousel_count={proxyImageUrls.length}
            imgRef={imgRef}
          />
        )}
        <ThumbnailScrollable className="ml3">
          {proxyImageUrls.length > 1 && (
            <ThumbnailWrapper>
              {proxyImageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  onClick={() => thumbnailClick(index)}
                  className="mb05 borderRad"
                  style={{ transform: `translateY(-${7.5 * counter}em)` }}
                />
              ))}
            </ThumbnailWrapper>
          )}
          {showPrevBtn && (
            <div
              className="carousel boxShadow"
              style={{ position: "absolute", top: 0 }}
            >
              <FaAngleUp onClick={prevBtn} color={theme.colors.gray} />
            </div>
          )}
          {showNextBtn && (
            <div
              className="carousel boxShadow"
              style={{ position: "absolute", bottom: 0 }}
            >
              <FaAngleDown onClick={nextBtn} color={theme.colors.gray} />
            </div>
          )}
        </ThumbnailScrollable>
      </FeedWrapper>

      <ItemWrapper style={{ display: isClicked ? "block" : "none" }}>
        <div className="pageTitleDiv">
          <FaBoxArchive size="1.5rem" />
          <p className="boldSubTitle ml03">아이템 정보</p>
        </div>
        <ItemList className="mb05">
          {itemLoading ? (
            <div style={{ width: '88rem' }}><Loading /></div>
          ) : (
            <Item
            key={item.id}
            brand={item.brand}
            name={item.name}
            price={item.price}
            itemImage={item.itemUrl}
            shoppingLink={item.shoppingLink}
            likeCount={item.likeCount}
            index={item.id}
            width={'20rem'}
          />
          )}
        </ItemList>
        <ButtonList style={{ display: !itemLoading ? "block" : "none" }}>
          <CommunityBtn onClick={openPopup}>
            찾는 제품이 없으신가요?
          </CommunityBtn>
        </ButtonList>
        {isPopupOpen && (

          <WritePopup
            proxy_url={proxyImageUrls[currentImageIndex]}
            feed_code={feedCodes[currentImageIndex]}
            username={username}
            onClose={closePopup}
          />
        )}
      </ItemWrapper>
      <TopButton />
    </div>
  );
}
const FeedWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  height: 42rem;
  float: left;
  margin-bottom: 5rem;
`;
const CategoryWrapper = styled.div`
  width: 7rem;
  height: 50%;
  background-color: ${({ theme }) => theme.colors.gray};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CategoryBtn = styled.p`
  color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    margin: 0.5rem;
    &:hover,
    &.active{
    color: ${({ theme }) => theme.colors.black};
    }
`;
const ThumbnailScrollable = styled.div`
  width: 5rem;
  height: 70%;
  justify-content: center;
  align-items: center;
  position: relative;
  display: flex;
  flex-direction: column;
`;
const ThumbnailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 95%;
  img {
    width: 5rem;
    height: 7rem;
    object-fit: cover;
    transform: translateY(-${(props) => props.offset}rem);
    transition: transform 0.3s ease;
  }
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
`;
const ItemList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 20rem);
  gap: 2rem;
  align-items: center;
  justify-content: center;
  min-height: 30rem;
  min-width: 88rem;

`;
const ButtonList = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
`;
const CommunityBtn = styled.p`
  position: absolute;
  right: 0;
  color: ${({ theme }) => theme.colors.gray};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.black};
    border: none;
  }
`;
