import styles from '../css/AccountManage.module.css';
import React, { useState } from "react";
import Popup from './Popup';
import Sidebar from './Sidebar';
import ManageBox from './ManageBox';
import Button from './Button';
import axios from 'axios';
import Footer from './Footer';

export default function AccountManage({ profilePictureUrl, displayName, bio, password, email, birthdate, gender }) {
    const [popupType, setPopupType] = useState(null);

    const openPopup = (type) => {
        setPopupType(type);
    };

    const closePopup = () => {
        setPopupType(null);
    };

    const onSave = async (data) => {
        let postData = {};

        // popupType에 따라 다른 데이터를 postData에 추가합니다.
        switch (popupType) {
            case "image":
                // 이미지 변경에 관련된 처리
                postData = {
                    profilePictureUrl: data
                };
                break;
            case "name":
                // 이름 변경에 관련된 처리
                postData = {
                    displayName: data
                };
                break;
            case "msg":
                // 소개 수정에 관련된 처리
                postData = {
                    bio: data
                };
                break;
            case "birth":
                // 생년월일 수정에 관련된 처리
                postData = {
                    birthdate: data
                };
                break;
            case "password":
                // 비밀번호 수정에 관련된 처리
                postData = {
                    password: data
                };
                break;
            case "gender":
                // 성별 변경에 관련된 처리
                postData = {
                    gender: data
                };
                console.log(postData);
                break;
            default:
                // 로그아웃 또는 탈퇴 처리
                // 서버로 직접 요청을 보내거나 로컬 상태를 업데이트할 수 있습니다.
                break;
        }

        // console.log(postData);
        try {
            console.log(data);
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post('/api/user/update', postData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

        } catch (error) {
            alert('서버가 불안정합니다.', error);
        }
    };

    const gen = gender == 0 ? "여성" : "남성";

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
                        <ManageBox title='성별' content={gen} left='55%' top='45%' onClick={() => openPopup("gender")}></ManageBox>
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
                        onSave={onSave}
                    />
                </>
            )}
            <div className={styles.heightPadding}></div>
            <Footer />
        </body>


    );
}
