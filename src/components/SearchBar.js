import React, {Component} from 'react';
import styles from'../css/SearchBar.module.css';

function SearchBar({onChange}){
    const search = {
        width : 400
    };

          return(
            <form className="search">
                <input
                type = "search"
                placeholder='  @ 셀럽을 검색해보세요'
                className = {styles.search_bar}
                name = "searchText"
                id = "input"
                onChange={onChange}
            />
            </form>
        )
    
}


export default SearchBar;