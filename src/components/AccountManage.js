import styles from '../css/AccountManage.module.css';
import React, { useState } from "react";
import Popup from './Popup';
import Sidebar from './Sidebar';
import ManageBox from './ManageBox';
import Button from './Button';

export default function AccountManage() {

    const [showImagePopup, setShowImagePopup] = useState(false);
    const [showNamePopup, setShowNamePopup] = useState(false);
    const [showMsgPopup, setShowMsgPopup] = useState(false);
    const [showBirthPopup, setShowBirthPopup] = useState(false);
    const [showPwdPopup, setShowPwdPopup] = useState(false);
    const [showGenderPopup, setShowGenderPopup] = useState(false);
    const [ShowLogoutPopup, setShowLogoutPopup] = useState(false);
    const [ShowDeletePopup, setShowDeletePopup] = useState(false);

    const openImagePopup = () => {
        setShowImagePopup(true);
    };

    const openNamePopup = () => {
        setShowNamePopup(true);
    };

    const openMsgPopup = () => {
        setShowMsgPopup(true);
    };
    const openBirthPopup = () => {
        setShowBirthPopup(true);
    };
    const openPwdPopup = () => {
        setShowPwdPopup(true);
    };
    const openGenderPopup = () => {
        setShowGenderPopup(true);
    };
    const openLogoutPopup = () => {
        setShowLogoutPopup(true);
    };
    const openDeletePopup = () => {
        setShowDeletePopup(true);
    };

    const [userID, setUserID] = useState('userID');

    // 저장 버튼을 눌렀을 때 호출되는 함수
    const handleSave = (newValue) => {
        newValue = newValue;
        setUserID(newValue); // 값을 업데이트
        setShowNamePopup(false); // 팝업 닫기
    };

    return (
        <body>
            <Sidebar></Sidebar>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h2>계정 관리</h2>
                    <div className={styles.horizon}></div>
                </div>

                <div className={styles.profileBox}>
                    <div className={styles.profileBox1}>
                        <img id={styles.profileImg} src="http://via.placeholder.com/100X100" ></img>
                        <input type="image" id={styles.changeImg} onClick={openImagePopup} src="/img/fix.png" ></input>
                    </div>
                    <div className={styles.profileBox2}>
                        <div>
                            <p>@&nbsp;</p>
                            <p id="userID">{userID}</p>
                            <input type="image" id={styles.changeName} onClick={openNamePopup} src="/img/fix.png"></input>
                        </div>
                        <div>
                            <p >어쩌고저쩌고요를레히호어쩌고저쩌고</p>
                            <input type="image" id={styles.changeMsg} onClick={openMsgPopup} src="/img/fix.png"></input>
                        </div>
                    </div>
                </div>
                <div className={styles.horizon}></div>
                <div className={styles.managingBox}>
                    <ManageBox title='이메일' content='email.@email.com' visible={false}></ManageBox>
                    <ManageBox title='생년월일' content='YYYY/MM/DD' left='55%' onClick={openBirthPopup}></ManageBox>
                    <ManageBox title='비밀번호' content='****' top='45%' onClick={openPwdPopup}></ManageBox>
                    <ManageBox title='성별' content='여성' left='55%' top='45%' onClick={openGenderPopup}></ManageBox>
                </div>


                <div className={styles.buttonBox}>
                    <Button onClick={openLogoutPopup}>로그아웃</Button>
                    <Button onClick={openDeletePopup}>탈퇴</Button>
                </div>
            </div>


            {/* 팝업 창들 */}
            {showImagePopup && (
                <>
                    <div className={styles.mask}></div>
                    <Popup title="프로필 사진 변경" onClose={() => setShowImagePopup(false)} visible={false} type="file">
                    </Popup>
                </>
            )}

            {showNamePopup && (
                <>
                    <div className={styles.mask}></div>
                    <Popup
                        title="이름 수정"
                        onClose={() => setShowNamePopup(false)}
                        onSave={handleSave} // 저장 버튼 이벤트 처리 함수 전달
                    />
                </>
            )}

            {showMsgPopup && (
                <>
                    <div className={styles.mask}></div>
                    <Popup title="소개 수정" onClose={() => setShowMsgPopup(false)} />
                </>
            )}
            {showBirthPopup && (
                <>
                    <div className={styles.mask}></div>
                    <Popup title="생년월일 수정" onClose={() => setShowBirthPopup(false)} visible={false} type="birth" />
                </>
            )}
            {showPwdPopup && (
                <>
                    <div className={styles.mask}></div>
                    <Popup title="비밀번호 수정"
                        onClose={() => setShowPwdPopup(false)}
                        visible={false}
                        type="password" />
                </>
            )}
            {showGenderPopup && (
                <>
                    <div className={styles.mask}></div>
                    <Popup title="성별 변경" onClose={() => setShowGenderPopup(false)} visible={false} type="radio" />

                </>
            )}
            {ShowLogoutPopup && (
                <>
                    <div className={styles.mask}></div>
                    <Popup title="로그아웃 하시겠습니까?" onClose={() => setShowLogoutPopup(false)} visible={false}
                        rightBtn="로그아웃">
                    </Popup>
                </>
            )}
            {ShowDeletePopup && (
                <>
                    <div className={styles.mask}></div>
                    <Popup
                        title="탈퇴 하시겠습니까?"
                        onClose={() => setShowDeletePopup(false)}
                        visible={false}
                        rightBtn="탈퇴"
                    >
                    </Popup>
                </>
            )}
        </body>
    );
}