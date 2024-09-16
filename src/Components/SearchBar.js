import { useEffect } from "react";
import styles from '../css/SearchBar.module.css';

function SearchBar({ value, onChange, onKeyPress }) {
    const handleSubmit = (e) => {
        e.preventDefault();
    };


    return (
        <form className="search" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder='  @ 셀럽을 검색해보세요'
                className={styles.search_bar}
                name="searchText"
                id="input"
                onChange={(e) => {
                    onChange(e);
                }}
                onKeyPress={(e) => {
                    onKeyPress(e);
                }}
                value={value}
            />
        </form>
    );
}

export default SearchBar;