// import styles from "../css/ItemLists.module.css";
import styles from '../css/ItemsList.module.css';

export default function ItemsList({list}){

    const rows = [];
    for (let i=0; i<list.length; i+=5){
        rows.push(list.slice(i, i+5));
    }

    return(
        <div>
            {rows.map((row, index) => (
                <div key={index} style={{ display: 'flex'}} >
                    {row.map(({ id, title, body }) => (
                        <div key={id} style={{ flex: 1, margin: '5px' }} className={styles.ItemDiv}>
                            <img
                                id={styles.LikeItemImg}
                                src="https://via.placeholder.com/200x200/808080/FFFFFF/?text=Grey+Image"
                                // styles={{marginBottom : "30px"}}
                            >   
                            </img>
                            <p style={{fontWeight:"bold"}}>{title}</p>
                            <p>{body}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}