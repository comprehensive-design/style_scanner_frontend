
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
                        <img src="http://via.placeholder.com/100X100" id={styles.profileImg}></img>
                        <div>
                            <div>
                                <p>userName</p>
                                <img src="/img/fix.png"></img></div>
                            <div>
                                <p>어쩌고저쩌고요를레히호어쩌고저쩌고</p>
                                <img src="/img/fix.png"></img>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className={styles.managingBox}>
                        <p>이메일 주소</p>
                        <p>user@gmail.com</p>
                        <hr></hr>
                    </div>
                    <div className={styles.managingBox}>
                        <p>생년월일</p>
                        <p>user@gmail.com</p>
                        <img src="/img/fix.png"></img>
                        <hr></hr>
                    </div>
                    <div className={styles.managingBox}>
                        <p>비밀번호</p>
                        <p>user@gmail.com</p>
                        <img src="/img/fix.png"></img>
                        <hr></hr>
                    </div>
                    <div className={styles.managingBox}>
                        <p>성별</p>
                        <p>user@gmail.com</p>
                        <img src="/img/fix.png"></img>
                        <hr></hr>
                    </div>

                    <button>로그아웃</button>
                    <button>회원탈퇴</button>
                </div>

            </div>
        </body>
    );
}