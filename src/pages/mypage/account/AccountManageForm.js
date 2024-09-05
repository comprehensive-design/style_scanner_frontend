import styles from './AccountManage.module.css';
import React, { useState } from "react";
import Popup from '../../../Components/Popup';
import Sidebar from '../../../Components/Sidebar';
import ManageBox from '../../../Components/ManageBox';
import Button from '../../../Components/Button';
import axios from 'axios';
import Footer from '../../../Components/Footer';

export default function AccountManageForm({ profilePictureUrl, displayName, bio, password, email, birthdate, gender }) {
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
                    displayName: data
                };
                break;
            case "msg":
                postData = {
                    bio: data
                };
                break;
            case "birth":
                postData = {
                    birthdate: data
                };
                break;
            case "password":
                postData = {
                    password: data
                };
                break;
            case "gender":
                postData = {
                    gender: data
                };
                break;
            case "logout":
                localStorage.removeItem('accessToken');
                break;

            default:
                break;
        }
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (popupType === "image") {
                const formData = new FormData();
                formData.append("profilePictureUrl", data);
                const response = await axios.post('/api/user/updateProfile', formData, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': "multipart/form-data"
                    }
                });
            } else if (popupType === "logout") {
                setTimeout(() => {
                window.location.href = '/';
                }, 0);
                alert("로그아웃되었습니다.");
            } else if (popupType === "delete") {
                await axios.post('/api/user/withdrawal', postData, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setTimeout(() => {
                window.location.href = '/';
                }, 0);
                alert("탈퇴되었습니다.");
            }
            else {
                await axios.post('/api/user/update', postData, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
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

    if(profilePictureUrl=="")
        profilePictureUrl="/img/whiteBox.png"
        
    return (
        <div>
            <div className={styles.total}>
                <Sidebar />
                <div className={styles.content}>
                    <div className={styles.title}>
                        <h2>계정 관리</h2>
                        <hr className={styles.horizon}></hr>
                    </div>

                    <div className={styles.profileBox}>
                        <div className={styles.profileBox1}>
                            <img id={styles.profileImg} src={profilePictureUrl}></img>
                            <input type="image" id={styles.changeImg} onClick={() => openPopup("image")} src="/img/fix.png" ></input>
                        </div>
                        <div className={styles.profileBox2}>
                            <div>
                                <p>@</p>
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
                        <ManageBox title='생년월일' content={birthdate} $left='55%' onClick={() => openPopup("birth")}></ManageBox>
                        <ManageBox title='비밀번호' content="****" $top='45%' onClick={() => openPopup("password")}></ManageBox>
                        <ManageBox title='성별' content={gender} $left='55%' $top='45%' onClick={() => openPopup("gender")}></ManageBox>
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
            <div className={styles.footer}><Footer /></div>
        </div>
    );
}
