import React, { useState } from "react";
import Popup from "../../../Components/Popup";
import Sidebar from "../../../Components/Sidebar";
import ManageBox from "../../../Components/ManageBox";
import axios from "axios";
import FeedStore from "../../../stores/FeedStore";

export default function AccountManageForm({
  profilePictureUrl,
  displayName,
  bio,
  password,
  email,
  birthdate,
  gender,
}) {
  const [popupType, setPopupType] = useState(null);
  const openPopup = (type) => {
    setPopupType(type);
  };

  const closePopup = () => {
    setPopupType(null);
  };

  const onSave = async (data) => {
    let postData = {};
    switch (popupType) {
      case "name":
        postData = {
          displayName: data,
        };
        break;
      case "msg":
        postData = {
          bio: data,
        };
        break;
      case "birth":
        postData = {
          birthdate: data,
        };
        break;
      case "password":
        postData = {
          password: data,
        };
        break;
      case "gender":
        postData = {
          gender: data,
        };
        break;
      case "logout":
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        FeedStore.getState().setFeeds([]);
        FeedStore.getState().setTotalCount(0);
        localStorage.removeItem('feed-storage'); 
        break;

      default:
        break;
    }
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (popupType === "image") {
        const formData = new FormData();
        formData.append("profilePictureUrl", data);
        const response = await axios.post("/api/user/updateProfile", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else if (popupType === "logout") {
        setTimeout(() => {
          window.location.href = "/";
        }, 0);
        alert("로그아웃되었습니다.");
      } else if (popupType === "delete") {
        await axios.post("/api/user/withdrawal", postData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 0);
        alert("탈퇴되었습니다.");
      } else {
        await axios.post("/api/user/update", postData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }

      closePopup();
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.data) {
        alert(JSON.stringify(error.response.data.message));
      } else {
        alert(error);
      }
    }
  };

  if (profilePictureUrl == "") profilePictureUrl = "/img/whiteBox.png";

  return (
    <div className="mypageWrapper">
      <Sidebar />
      <div className="mypageMain">
        <div>
          <p className="title left mb05 ml03">계정 관리</p>
          <hr />
        </div>

        <div
          className="mpdprofileBox gridColumns3"
          style={{ width: "100%", margin: "2rem 0.3rem" }}
        >
          <div>
            <img src={profilePictureUrl} ></img>
            <input
              type="image"
              className="mpmFix"
              style={{ margin: "6rem 0rem 0rem 0rem" }}
              onClick={() => openPopup("image")}
              src="/img/fix.png"
            ></input>
          </div>
          <div className="ml2">
            <div className="flex mb1">
              <p className="content">@{displayName}</p>
              <input
                className="mpmFix"
                type="image"
                onClick={() => openPopup("name")}
                src="/img/fix.png"
              ></input>
            </div>
            <div className="flex">
              <p className="caption grayText">{bio}</p>
              <input
                className="mpmFix"
                type="image"
                onClick={() => openPopup("msg")}
                src="/img/fix.png"
              ></input>
            </div>
          </div>
        </div>

        <hr className="grayhr" />
        <div className="mpmManagingBox">
          <ManageBox
            title="이메일 주소"
            content={email}
            visible={false}
          ></ManageBox>
          <ManageBox
            title="생년월일"
            content={birthdate}
            $left="55%"
            onClick={() => openPopup("birth")}
          ></ManageBox>
          <ManageBox
            title="비밀번호"
            content="****"
            $top="65%"
            onClick={() => openPopup("password")}
          ></ManageBox>
          <ManageBox
            title="성별"
            content={gender}
            $left="55%"
            $top="65%"
            onClick={() => openPopup("gender")}
          ></ManageBox>
        </div>

        <div className="mpmBtnBox">
          <button className="button" onClick={() => openPopup("logout")}>
            로그아웃
          </button>
          <button className="button" onClick={() => openPopup("delete")}>
            탈퇴
          </button>
        </div>
      </div>

      {/* 팝업 창 */}
      {popupType && (
        <>
          <div className="mpmBlur"></div>
          <Popup
            title={
              popupType === "image"
                ? "프로필 사진 변경"
                : popupType === "name"
                  ? "이름 수정"
                  : popupType === "msg"
                    ? "소개 수정"
                    : popupType === "birth"
                      ? "생년월일 수정"
                      : popupType === "password"
                        ? "비밀번호 수정"
                        : popupType === "gender"
                          ? "성별 변경"
                          : popupType === "logout"
                            ? "로그아웃 하시겠습니까?"
                            : popupType === "delete"
                              ? "탈퇴 하시겠습니까?"
                              : ""
            }
            onClose={closePopup}
            visible={
              popupType === "name" ? true : popupType === "msg" ? true : false
            }
            type={
              popupType === "image"
                ? "file"
                : popupType === "birth"
                  ? "birth"
                  : popupType === "password"
                    ? "password"
                    : popupType === "gender"
                      ? "radio"
                      : ""
            }
            rightBtn={
              popupType === "logout"
                ? "로그아웃"
                : popupType === "delete"
                  ? "탈퇴"
                  : "저장"
            }
            onSave={onSave}
          />
        </>
      )}
    </div>
  );
}
