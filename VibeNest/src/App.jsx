import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar.jsx';
import Sidebar from './Components/Sidebar.jsx';
import Player from './Components/player.jsx';
import Search from './Components/Search.jsx';
import MainCtr from './centermain.jsx';
import Profile from './profile.jsx';
import { PlayerProvider } from './PlayerContext.jsx';
import Login from './login.jsx';

function App() {
  const [isSearchActive, setIsSearchActive] = useState(true);
  const [activePage, setActivePage] = useState('Home');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user_id, setUserId] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    }
  }, []);

  const handleSetActivePage = (page) => {
    if (page === 'Profile') {
      setPreviousPage(activePage);
      setShowProfile(true);
    } else {
      setShowProfile(false);
      setActivePage(page);
      setIsSearchActive(true);
    }
  };

  const toggleSearch = () => setIsSearchActive((prev) => !prev);

  const handleLoginSuccess = (id) => {
    setIsLoggedIn(true);
    setUserId(id);
  };

  const handleProfileBack = () => {
    setShowProfile(false);
    setActivePage(previousPage);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    localStorage.removeItem('user_id');
  }

  return (
    <>
      <PlayerProvider>
        {isLoggedIn ? (
          <>
            <Navbar onSearchClick={toggleSearch} onProfileClick={() => handleSetActivePage('Profile')} onLogout={handleLogout}/>
            <Sidebar setActivePage={handleSetActivePage} />
            {showProfile ? (
              <Profile onBack={handleProfileBack} setIsSearchFocused={setIsSearchFocused}/>
            ) : (
              isSearchActive ? (
                <MainCtr activePage={activePage} />
              ) : (
                <Search setIsSearchFocused={setIsSearchFocused} />
              )
            )}
            <Player isSearchFocused={isSearchFocused} />
          </>
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </PlayerProvider>
    </>
  );
}

export default App;
