import styles from '../css/AccountManage.module.css';
import React, { useState } from "react";
import Popup from './Popup';
import Sidebar from './Sidebar';
import ManageBox from './ManageBox';
import Button from './Button';
import Footer from './Footer';

export default function AccountManage({profilePictureUrl, displayName, bio, email, password, birthdate, gender}) {
    const [popupType, setPopupType] = useState(null);

    const openPopup = (type) => {
        setPopupType(type);
    };

    const closePopup = () => {
        setPopupType(null);
    };


    return (
        <body>
            <div className={styles.total}>
                <Sidebar />
                <div className={styles.content}>
                    <div className={styles.title}>
                        <h2>계정 관리</h2>
                        <hr className={styles.horizon}></hr>
                    </div>

                    <div className={styles.profileBox}>
                        <div className={styles.profileBox1}>
                            <img id={styles.profileImg} src={profilePictureUrl} ></img>
                            <input type="image" id={styles.changeImg} onClick={() => openPopup("image")} src="/img/fix.png" ></input>
                        </div>
                        <div className={styles.profileBox2}>
                            <div>
                                <p>@&nbsp;</p>
                                <p id="userID">{displayName}</p>
                                <input type="image" id={styles.changeName} onClick={() => openPopup("name")} src="/img/fix.png"></input>
                            </div>
                            <div>
                                <p >{bio}</p>
                                <input type="image" id={styles.changeMsg} onClick={() => openPopup("msg")} src="/img/fix.png"></input>
                            </div>
                        </div>
                    </div>
                    <hr className={styles.horizon}></hr>
                    <div className={styles.managingBox}>
                        <ManageBox title='이메일' content={email} visible={false}></ManageBox>
                        <ManageBox title='생년월일' content={birthdate} left='55%' onClick={() => openPopup("birth")}></ManageBox>
                        <ManageBox title='비밀번호' content="****" top='45%' onClick={() => openPopup("password")}></ManageBox>
                        <ManageBox title='성별' content={gender} left='55%' top='45%' onClick={() => openPopup("gender")}></ManageBox>
                    </div>

                    <div className={styles.buttonBox}>
                        <Button onClick={() => openPopup("logout")}>로그아웃</Button>
                        <Button onClick={() => openPopup("delete")}>탈퇴</Button>
                    </div>
                </div>
            </div>

            {/* 팝업 창 */}
            {popupType && (
                <>
                    <div className={styles.mask}></div>
                    <Popup
                        title={popupType === "image" ? "프로필 사진 변경" :
                            popupType === "name" ? "이름 수정" :
                                popupType === "msg" ? "소개 수정" :
                                    popupType === "birth" ? "생년월일 수정" :
                                        popupType === "password" ? "비밀번호 수정" :
                                            popupType === "gender" ? "성별 변경" :
                                                popupType === "logout" ? "로그아웃 하시겠습니까?" :
                                                    popupType === "delete" ? "탈퇴 하시겠습니까?" : ""}
                        onClose={closePopup}
                        visible={popupType === "name" ? true :
                            popupType === "msg" ? true :
                                false}
                        type={popupType === "image" ? "file" :
                            popupType === "birth" ? "birth" :
                                popupType === "password" ? "password" :
                                    popupType === "gender" ? "radio" : ""}
                        rightBtn={popupType === "logout" ? "로그아웃" :
                            popupType === "delete" ? "탈퇴" : "저장"}
                    />
                </>
            )}
            <div className={styles.heightPadding}></div>
            <Footer />
        </body>
    );
}
