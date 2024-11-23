
import './index.css';
import { useState, useEffect } from "react";
import AddTo from './Components/AddToPlaylist.jsx';
import { usePlayer } from './PlayerContext.jsx';
import Playlist from './PlaylistPage.jsx'

function Library({ refresh, triggerLibraryRefresh}) {
    const { playSong } = usePlayer();
    const [showAddTo, setShowAddTo] = useState(false);
    const [selectedSongId, setSelectedSongId] = useState(null);
    const [likedSongs, setLikedSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [showAllLikedSongs, setShowAllLikedSongs] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    const handlePlaylistSelect = (playlist) => {
        setSelectedPlaylist(playlist);
    };

    const handleBackToLibrary = () => {
        setSelectedPlaylist(null);
        triggerLibraryRefresh();  
    };
    const userId = localStorage.getItem('user_id');

    const handleAddToClick = (songId) => {
        setSelectedSongId(songId);
        setShowAddTo(true);
    };

    const handleCancelAddTo = () => {
        setShowAddTo(false);
        triggerLibraryRefresh();
        setSelectedSongId(null);
    };

useEffect(() => {
    const fetchLikedSongs = async () => {
        const response = await fetch(`http://localhost:3000/alllikedSongs/${userId}`);
        const data = await response.json();
        setLikedSongs(data);
    };

    const fetchPlaylists = async () => {
        const response = await fetch(`http://localhost:3000/playlists/${userId}`);
        const data = await response.json();
        setPlaylists(data);
    };

    fetchLikedSongs();
    fetchPlaylists();
}, [refresh]);

    const displayLikedSongs = showAllLikedSongs ? likedSongs : likedSongs.slice(0, 8);
    const createNewPlaylist = async () => {
    const playlistName = prompt("Enter the new playlist name:");
    if (playlistName && userId) {
        try {
            const response = await fetch('http://localhost:3000/addPlaylist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    playlist_name: playlistName,
                    user_id: userId,
                    playlist_cover: "/default_cover.png",
                }),
            });

            const data = await response.json();
            if (response.ok) {
                const updatedCover = `${data.playlist_cover}?timestamp=${new Date().getTime()}`;
                setPlaylists([...playlists, { playlist_id: data.playlist_id, playlist_name: playlistName, playlist_cover: updatedCover }]);
                alert("Playlist created successfully!");
                triggerLibraryRefresh();
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while creating the playlist.");
        }
    } else {
        alert("Please enter a playlist name.");
    }
};


if (selectedPlaylist) {
    return <Playlist playlist={selectedPlaylist} onBack={handleBackToLibrary} />;
}
    return (
        <div className='mainlibrary'>
            <div className='Headingsongs'>
                <div><h3 className="centertitles">Liked Songs</h3></div>
                <div><p id='likedSongs' onClick={() => setShowAllLikedSongs(!showAllLikedSongs)}>
                    {showAllLikedSongs ? "Show Less" : "Show All"}
                </p>
                </div>
            </div>

            <div className="recents-container">
                {displayLikedSongs.map((song) => (
                    <div className="songs" key={song.song_id}>
                        <div><img src={song.image_path} alt="songs Image"></img></div>
                        <div>
                            <h4>{song.song_name}</h4>
                        </div>
                        <div className="buts">
                            <svg className="addtoicon" onClick={() => handleAddToClick(song.song_id)} fill="#cfcfcf" height="64px" width="64px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 611.997 611.997" xmlSpace="preserve" stroke="#cfcfcf"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M549.255,384.017h-50.692v-50.694c0-21.132-17.134-38.264-38.262-38.264c-21.138,0-38.266,17.132-38.266,38.264v50.694 h-50.697c-21.13,0-38.262,17.132-38.262,38.264c0,21.134,17.134,38.264,38.262,38.264h50.697v50.697 c0,21.13,17.13,38.264,38.266,38.264c21.13,0,38.262-17.134,38.262-38.264v-50.697h50.692c21.138,0,38.262-17.13,38.262-38.264 C587.519,401.151,570.394,384.017,549.255,384.017z"></path> <path d="M383.77,498.809h-12.432c-42.198,0-76.526-34.33-76.526-76.528s34.328-76.528,76.526-76.528h12.432v-12.43 c0-42.198,34.33-76.528,76.53-76.528c42.198,0,76.526,34.33,76.526,76.528v12.43h12.428c5.073,0,10.028,0.508,14.827,1.454 c66.899-77.109,63.762-194.319-9.515-267.606c-37.102-37.1-86.429-57.533-138.896-57.533c-39.544,0-77.476,11.685-109.659,33.39 c-32.185-21.705-70.117-33.39-109.659-33.39c-52.464,0-101.791,20.433-138.896,57.535 c-76.609,76.617-76.609,201.284,0.002,277.904l215.831,215.829c2.226,2.222,4.583,4.463,7.009,6.664 c7.293,6.619,16.501,9.93,25.716,9.93c9.198,0,18.396-3.301,25.684-9.903c2.448-2.216,4.826-4.477,7.069-6.72l46.584-46.582 c-1.033-5.002-1.577-10.181-1.577-15.482v-12.432H383.77z"></path> </g> </g> </g></svg>
                            <svg className="miniplay" onClick={() => playSong(song)} viewBox="-1 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-65.000000, -3803.000000)" fill="#cfcfcf"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M18.074,3650.7335 L12.308,3654.6315 C10.903,3655.5815 9,3654.5835 9,3652.8985 L9,3645.1015 C9,3643.4155 10.903,3642.4185 12.308,3643.3685 L18.074,3647.2665 C19.306,3648.0995 19.306,3649.9005 18.074,3650.7335" id="play-[#cfcfcf]"> </path> </g> </g> </g> </g></svg>
                        </div>
                    </div>
                ))}
            </div>
            {showAddTo && <AddTo
                songId={selectedSongId}
                onCancel={handleCancelAddTo}
            />}

            <h3 className="centertitles" style={{ marginBottom: "5px" }}>Your Playlists</h3>
            <div className="drawer drawerall">
                {playlists.map((playlist) => (
                    <div className="cover coverall" key={playlist.playlist_id} onClick={() => handlePlaylistSelect(playlist)}>
                        <img src={playlist.playlist_cover} alt="" className="coverimg" />
                        <p>{playlist.playlist_name}</p>
                    </div>
                ))}

                <div className="cover coverall" onClick={createNewPlaylist}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z" fill="#cfcfcf"></path>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Library;
