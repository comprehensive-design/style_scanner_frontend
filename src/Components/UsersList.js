import styles from "../css/UsersList.module.css";
import Button from './Button';

// export default function UsersList({list}) {
//     return(
//         <ol>
//         {list.map(({ id, title, body}) => (
//             <li key={id}>
//                 <h2>
//                     {id}. {title}
//                 </h2>
//                 <p>{body}</p>
//             </li>
//         ))}
//     </ol>
//     );
// }
export default function UsersList({ list }) {
    return (
        <body>
            <div style={{ height: '10px' }}></div>
            {list.map((user) => (
                <div key={user.id} class={styles.userInfo}>
                    <img
                        id={styles.profileImage}
                        src={user.profilePictureUrl}
                        width={120}
                        height={120}
                    >
                    </img>

                    <div className={styles.userInfoWord}>
                        <h4 className={styles.FollowigId}>{user.profileName}</h4>
                        <div style={{ display: "flex" }} className={styles.userFollowerInfo}>
                            <p id={styles.FollowerWord}>팔로워</p>
                            <p id={styles.FollowerCountWord}>&nbsp;{user.profileFollowerCount}</p>
                        </div>
                    </div>

                    {/* <div style={{ height: '12px' }}></div> */}


                    <div style={{ display: 'flex' }} className={styles.FollowingDelete}>
                        <Button id={styles.buttonDelete} BackColor="#d9d9d9" txtColor="black" hovColor="black" hovTxtColor="white">언팔로우</Button>
                    </div>

                    <div style={{ height: '100px' }}></div>

                </div>

            ))}


            {/* <div style={{ height: '12px' }}></div>
            <HorizonLine></HorizonLine> */}

        </body>
    )
}

const HorizonLine = () => {
    return (
        <div
            style={{
                width: "100%",
                borderBottom: "2px solid #DEDEDE",
                lineHeight: "0.1em",
                margin: "10px 0 20px",
            }}
        >
        </div>
    );
};