import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import SearchResultItem from './SearchresultItem'; 

function SearchBar({ value, onChange, onKeyPress }) {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/searchUsers");
                const data = await response.json();
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (value) {
            const results = users.filter(user =>
                user.profileName.toLowerCase().includes(value.toLowerCase())
            );
            console.log("Filtered Users: ", results);
            setFilteredUsers(results);
        } else {
            setFilteredUsers([]);
        }
    }, [value, users]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleItemClick = (user) => {
        // 아이템 선택 시 필터된 사용자 목록 초기화
        setFilteredUsers([]);
        onChange({ target: { value: '' } }); 
        console.log('Selected user:', user); // 추가로 선택된 사용자 처리 가능
    };

    return (
        <div className="search">
            <button type="submit" className="search_button">
                <IoSearch size={24} />
            </button>
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="search_bar"
                    name="searchText"
                    id="input"
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    value={value}
                />
            </form>
            {filteredUsers.length > 0 && (
                <ul className="search-results">
                    {filteredUsers.map(user => (
                        <SearchResultItem
                            key={user.id}
                            user={user}
                            onClick={() => handleItemClick(user)}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
