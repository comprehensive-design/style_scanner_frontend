import styles from '../css/CommunityNoti.module.css';
import Sidebar from './Sidebar';
import NotiBox from './NotiBox';

export default function CommunityNoti() {
    return (
        <body>

            <Sidebar></Sidebar>

            <div className={styles.content}>
                <div className={styles.title}>
                    <h2>알림</h2>
                    <hr></hr>
                </div>
                <div className={styles.wrap}>
                    <NotiBox></NotiBox>
                    <NotiBox></NotiBox>
                    <NotiBox></NotiBox>
                    <NotiBox></NotiBox>
                    <NotiBox></NotiBox>
                    <NotiBox></NotiBox>
                    <NotiBox></NotiBox>
                </div>
            </div>
        </body>
    );
}