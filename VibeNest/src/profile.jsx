import React, { useState, useEffect } from "react";
import Edit from "./Components/Edit";

function Profile({ onBack,setIsSearchFocused }) {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const user_id = localStorage.getItem('user_id');
  const [playlists, setPlaylists] = useState([]);
  const toggleTrue = () => setIsSearchFocused(true);
  const toggleFalse = () => setIsSearchFocused(false); 

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${user_id}`);
        const data = await response.json();
        setUsername(data.username);
        setDisplayName(data.display_name);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    if (user_id) {
      fetchUsername();
    }
  }, [user_id]);

  useEffect(() => {
  const fetchPlaylists = async () => {
    try {
        const response = await fetch(`http://localhost:3000/playlists/${user_id}`);
        const data = await response.json();
        setPlaylists(data);
    } catch (error) {
        console.error("Error fetching playlists:", error);
    }
};

        fetchPlaylists();
    }, []);


  const handleEditClick = () => {
    toggleTrue();
    setIsEditing(true); 
  };

  const handleSave =async (newDisplayName) => {
    setDisplayName(newDisplayName);
    try {
        const response = await fetch(`http://localhost:3000/dispname/${user_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ display_name: newDisplayName }),
        });
  
        if (response.ok) {
          console.log("Display name updated successfully in the database");
        } else {
          console.error("Error updating display name in the database");
        }
      } catch (error) {
        console.error("Failed to update display name in the database", error);
      }
    toggleFalse();
    setIsEditing(false); 
  };

  const handleCancel = () => {
    toggleFalse();
    setIsEditing(false); 
  };
    return (
        <div className=" main">
            <svg className="profileback" onClick={onBack} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#cfcfcf"> <path d="M1 8a6 6 0 018.514-5.45.75.75 0 01-.629 1.363 4.5 4.5 0 100 8.175.75.75 0 11.63 1.361A6 6 0 011 8z"></path> <path d="M11.245 4.695a.75.75 0 00-.05 1.06l1.36 1.495H6.75a.75.75 0 000 1.5h5.805l-1.36 1.495a.75.75 0 001.11 1.01l2.5-2.75a.748.748 0 00-.002-1.012l-2.498-2.748a.75.75 0 00-1.06-.05z"></path> </g> </g></svg>
            <div className="grading">
                <div className="profile-header">                    
                    <img src="./def_dp.png" alt="Profile Picture" className="profile-pic" height="" />
                    <div className="profile-info">
                    {!isEditing ? (
                        <p className="displayname">{displayName}<svg onClick={handleEditClick} width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="#cfcfcf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M16.04 3.02001L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.08 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96001C22.34 6.60001 22.98 5.02001 20.98 3.02001C18.98 1.02001 17.4 1.66001 16.04 3.02001Z" stroke="#cfcfcf" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14.91 4.1499C15.58 6.5399 17.45 8.4099 19.85 9.0899" stroke="#cfcfcf" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></p>
                    ) : (
                        <Edit displayName={displayName} onSave={handleSave} onCancel={handleCancel} />
                      )}
                        <p className="username">Username: {username}</p>

                    </div>
                </div>
            </div>
            <div className="content-section">
                <h3 className="centertitles">My Playlists</h3>
                <div className="drawer drawerall">
                {playlists.map((playlist) => (
                    <div className="cover coverall" key={playlist.playlist_id} onClick={() => onAlbumClick(playlist)}>
                        <img src={playlist.playlist_cover} alt="" className="coverimg" />
                        <p>{playlist.playlist_name}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}
export default Profile;