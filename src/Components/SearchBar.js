import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

function SearchBar({ value, onChange, onKeyPress }) {
    const [users, setUsers] = useState([]); // 초기 상태를 배열로 설정
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:3000/searchUsers");
                const data = await response.json();
                
                // 데이터가 배열인지 확인
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
        const results = users.filter(user =>
            user.profileName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredUsers(results);
    }, [value, users]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <form className="search" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="search_bar"
                    name="searchText"
                    id="input"
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    value={value}
                />
                <button type="submit" className="search_button">
                    <IoSearch size={24} />
                </button>
            </form>
            {filteredUsers.length > 0 && (
                <ul className="search-results">
                    {filteredUsers.map(user => (
                        <li key={user.id}>
                            <img src={user.profilePictureUrl} alt={user.profileName} />
                            <span>{user.profileName}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
