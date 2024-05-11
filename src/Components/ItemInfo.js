import styles from '../css/ItemInfo.module.css'
export default function HomeInfo(){
    // 수정 요망..
    const handleClick = () => {
        alert('하트 눌렀다!');
    };
    return(
        <div className={styles.infoBox}>
            <img id={styles.item} src="http://via.placeholder.com/120X120"></img>
                <div className={styles.infoText}>
                    <p id={styles.itemName}><b>Gentle Monster</b></p>
                    <p id={styles.itemDetail}>Vonzo01 - Black</p>
                    <br></br>
                    <br></br>
                    <p id={styles.itemPrice}>320,000원</p>
                </div>
            {/* 하트 버튼 누르기 */}
            <div onClick={handleClick}>
                <img id={styles.itemHeart} src={process.env.PUBLIC_URL + 'img/heart.png'}></img>
            </div>
        </div>
    )

}