
import styles from '../css/AccountManage.module.css';


export default function MypageDefault() {
    return (
        <body>
            <header>
                <div className={styles.menuBar}>메뉴바입니다</div>
            </header>

            <div className={styles.wrap}>

                <div className={styles.sideBar}>사이드바입니다</div>

                <div className={styles.title}>
                    <h3>계정 관리</h3>
                    <hr></hr>
                </div>

                <div className={styles.content}>
                    <div className={styles.profileBox}>
                        <div className={styles.profileBox1}>
                            <img id={styles.profileImg} src="http://via.placeholder.com/100X100" ></img>
                            <input type="image" id={styles.changeImg} src="/img/fix.png" ></input>
                        </div>
                        <div className={styles.profileBox2}>
                            <div>
                                <p>userName</p>
                                <input type="image" id={styles.changeName} src="/img/fix.png"></input></div>
                            <div>
                                <p >어쩌고저쩌고요를레히호어쩌고저쩌고</p>
                                <input type="image" id={styles.changeMsg} src="/img/fix.png"></input>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className={styles.managingBox}>
                        <div className={styles.emailBox}>
                            <p>이메일 주소</p>
                            <div className={styles.changeBox}>
                                <p id={styles.email}>user@gmail.com</p></div>
                            <hr></hr>
                        </div>
                        <div className={styles.birthBox}>
                            <p>생년월일</p>
                            <div className={styles.changeBox}>
                                <p id={styles.birth}>2000/01/01</p>
                                <input type="image" id={styles.changeBirth} src="/img/fix.png"></input></div>
                            <hr></hr>
                        </div>
                        <div className={styles.pwdBox}>
                            <p>비밀번호</p>
                            <div className={styles.changeBox}>
                                <p id={styles.password}>*****</p>
                                <input type="image" id={styles.changePassword} src="/img/fix.png"></input></div>
                            <hr></hr>
                        </div>
                        <div className={styles.genderBox}>
                            <p>성별</p>
                            <div className={styles.changeBox}>
                                <p id={styles.gender}>여성</p>
                                <input type="image" id={styles.changeGender} src="/img/fix.png"></input>
                            </div>
                            <hr></hr>
                        </div>
                    </div>


                    <div className={styles.buttonBox}>
                        <button id={styles.logoutBtn}>로그아웃</button>
                        <button id={styles.leaveBtn}>회원탈퇴</button>
                    </div>
                </div>

            </div>
        </body>
    );
}