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
export default function UsersList(){
    return(
        <body>
            <div style={{height : '12px'}}></div>

            <div class={styles.userInfo}>
                <img
                    id={styles.profileImage}
                    // src={process.env.PUBLIC_URL + 'img/profile.png'}
                    src=" http://via.placeholder.com/180x180"
                    width={120}
                    height={120}
                >
                </img>

                <div className={styles.userInfoWord}>
                    <h4 className={styles.FollowigId}>hi_sseulgi</h4>
                    <div style={{display:"flex"}} className={styles.userFollowerInfo}>
                        <p id={styles.FollowerWord}>팔로워</p>
                        <p id={styles.FollowerCountWord}>434</p>
                    </div>
                </div>

                <div style={{display:'flex'}}className={styles.FollowingDelete}>
                    <Button id={styles.buttonDelete} BackColor="#d9d9d9" txtColor="black" hovColor="black" hovTxtColor="white">언팔로우</Button>
                </div>
            </div>

            <div style={{height : '12px'}}></div>
            <HorizonLine></HorizonLine>
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