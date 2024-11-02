import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainBarDefault from './mainHeader/mainBarDefault';
import MainBarLogin from './mainHeader/mainBarLogin';
import SearchBar from './SearchBar';


function MainBar() {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const navigate = useNavigate();

    const fetchSearchResults = useCallback(async (keyword) => {
        try {
            const response = await axios.get(`/api/follow/search?keyword=${keyword}`);
            if (response.data) {
                setSearchResults(response.data);
                setSearchText("");
            } else {
                setSearchResults(null);
            }
        } catch (error) {
            console.error('Error fetching search results: ', error);
            setSearchResults(null);
        }
    }, []);

    useEffect(() => {
        if (searchResults !== null) {
            navigate(`/Search`, { state: { results: searchResults } });
            setSearchResults(null);
        }
    }, [searchResults, navigate]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchSearchResults(searchText);
        }
    };

    const handleLogoClick = () => {
        setSearchText("");
    };

    const isLoggedIn = localStorage.getItem('accessToken') !== null;

    return (
        <header className='header'>
                <div>
                    <Link to={isLoggedIn ? "/HomeFeed" : ""} onClick={handleLogoClick}>
                        <img src={`img/logo.png`} width='130' height='48.75' alt="Logo" />
                    </Link>
                </div>
                <nav className='body flex' style={{ width: '100%' }}>
                    {isLoggedIn ? (
                        <MainBarLogin 
                            searchText={searchText} 
                            handleSearchChange={handleSearchChange} 
                            handleKeyPress={handleKeyPress} 
                        />
                    ) : (
                        <MainBarDefault 
                            searchText={searchText} 
                            handleSearchChange={handleSearchChange} 
                            handleKeyPress={handleKeyPress} 
                        />
                    )}
                </nav>
        </header>
    );
}

export default MainBar;
