import React, {Component} from 'react';
import './SearchBar.css';



function SearchBar({onChange}){
    const search = {
        width : 600
    };

          return(
            <form className="search">
                <input
                type = "search"
                placeholder='  @ 셀럽을 검색해보세요'
                className = "search_bar"
                name = "searchText"
                onChange={onChange}
            />
            </form>
        )
    
}


export default SearchBar;