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
  } = useHomeItemLogic();
  const [isClicked, setIsClicked] = useState(false);
  const [counter, setCounter] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const imgRef = useRef(null);

  let showPrevBtn = counter > 0;
  let showNextBtn =counter !== proxyImageUrls.length - 4 && proxyImageUrls.length > 4;

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
  //더보기 api필요
  const morePage = () => {
    // setItemsToShow((prevItemsToShow) => prevItemsToShow + itemsPerPage);
    alert("더보기");
  };
  const handleImageClick = (event) => {
    setIsClicked(true);
    feedClick(event, imgRef, mediaUrls);
  };
  return (
    <div className="mainWrapper">
      <FeedWrapper className="p1">
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
          {/* {mediaUrls && profile_url && username && media_id && (
                        <Feed
                            key={media_id}
                            media_url_list={mediaUrls}
                            profile_url={profile_url}
                            username={username}
                            media_id={media_id}
                            home={false}
                            currentIndex={currentImageIndex}
                            width={'30rem'}
                        />
                    )} */}
          {/* <Item
                        key={0}
                        itemId={0}
                        brand={"wow"}
                        name={"wow"}
                        price={100000000}
                        itemImage={"https://via.placeholder.com/200"}
                        shoppingLink={""}
                        likeCount={9999999}
                        index={0}
                        width={'20rem'}
                    />
                    <Item
                        key={1}
                        itemId={0}
                        brand={"이렇게 긴 이름의 브랜드가 있을까요?? 있다면 말 줄임표"}
                        name={"이렇게 긴 이름의 제품명은 많겠죠? 있따면 말줄임표"}
                        price={100000000}
                        itemImage={"https://via.placeholder.com/200"}
                        shoppingLink={""}
                        likeCount={999}
                        index={0}
                        width={'20rem'}
                    />
                    <Item
                        key={2}
                        itemId={0}
                        brand={"wow"}
                        name={"wow"}
                        price={100000000}
                        itemImage={`img/feed1.png`}
                        shoppingLink={""}
                        likeCount={999999}
                        index={0}
                        width={'20rem'}

                    />
                    <Item
                        key={3}
                        itemId={0}
                        brand={"wow"}
                        name={"wow"}
                        price={100000000}
                        itemImage={"img/image1.png"}
                        shoppingLink={""}
                        likeCount={10}
                        index={0}
                        width={'20rem'}
                    /> */}
        </ItemList>
        <ButtonList>
          <button className="whiteButton" onClick={morePage}>
            더보기
          </button>
          <CommunityBtn onClick={openPopup}>
            찾는 제품이 없으신가요?
          </CommunityBtn>
        </ButtonList>
        {isPopupOpen && (
        
          <WritePopup
            proxy_url={proxyImageUrls[currentImageIndex]}
            feed_code={feedCodes[currentImageIndex]}
            username ={username}
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
  display: flex;
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
