import { useEffect } from "react";
import { IoSearch } from "react-icons/io5";


function SearchBar({ value, onChange, onKeyPress }) {
    const handleSubmit = (e) => {
        e.preventDefault();
    };


    return (
        <form className="search" onSubmit={handleSubmit}>
            <input
                type="text"
                className="search_bar"
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
            <button type="submit" className="search_button">
                <IoSearch size={24} />
            </button>
        </form>

    );
}

export default SearchBar;