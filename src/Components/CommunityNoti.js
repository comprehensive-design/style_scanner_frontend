import styles from '../css/CommunityNoti.module.css';
import Sidebar from './Sidebar';
import NotiBox from './NotiBox';

export default function CommunityNoti() {
    return (
        <body>

            <Sidebar></Sidebar>

            <div className={styles.content}>
                <div className={styles.title}>
                    <h3>알림</h3>
                    <hr></hr>
                </div>
                <NotiBox></NotiBox>
                <hr></hr>
                <NotiBox></NotiBox>
                <hr></hr>
                <NotiBox></NotiBox>
                <hr></hr>
                <NotiBox></NotiBox>
                <hr></hr>
            </div>
        </body>
    );
}