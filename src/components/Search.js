import styles from './Search.css';
import HorizonLine  from '../utils/HorizontalLine';
import Box from '@material-ui/core/Box';



function Search(){
    return(
        <div className={styles.parent}>
            
            <div className={styles.child}>
                <p>전체</p>
                <Box class = "box1">

                    <img
                        class = "profile"
                        src = "https://via.placeholder.com/200x200/808080/FFFFFF/?text=Grey+Image"
                    />
                </Box>


            </div>
        </div>
    )
}


export default Search;