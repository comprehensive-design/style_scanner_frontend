import styles from './Search.css';
import HorizonLine  from '../utils/HorizontalLine';
import Box from '@material-ui/core/Box';
import './Search.css';

function Search(){
    return(
        <div style={{display:'flex'}}>
            
            <div style={{margin: 'auto auto'}} id="profileBox">
                <p>전체</p>
                <Box class = "box1">

                    <div style ={{display:'flex'}}>
                        <Box style={{width:50}}></Box>

                        <img
                            className = "profileImg"
                            src = "https://via.placeholder.com/150x150/808080/FFFFFF/?text=Grey+Image"
                        />

                        <div className = "profileId">
                            <p id="userid">hi_sseulgi</p>
                            <p>팔로워 465</p>
                        </div>

                        {/* <Box style={{width:500}}/> */}
                        <button class="button"></button>

                        
                    </div>

                    


                    
                </Box>


            </div>
        </div>
    )
}


export default Search;