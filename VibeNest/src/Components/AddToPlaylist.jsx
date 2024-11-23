import { useEffect, useState } from 'react';

function AddTo({ songId, onCancel }) {
  const [isLiked, setIsLiked] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [isInPlaylist, setIsInPlaylist] = useState({});
  const [refreshKey, setRefreshKey] = useState(0); 
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchLikedSongs = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:3000/liked_songs/${userId}`);
        const likedSongs = await response.json();
        const liked = likedSongs.some((likedSong) => likedSong.song_id === songId);
        setIsLiked(liked);
      } catch (error) {
        console.error('Error fetching liked songs:', error);
      }
    };

    fetchLikedSongs();
  }, [userId, songId]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:3000/playlists/${userId}`);
        const playlistsData = await response.json();
        setPlaylists(playlistsData);

        const playlistStates = {};
        await Promise.all(
          playlistsData.map(async (playlist) => {
            const songResponse = await fetch(`http://localhost:3000/playlist_songs/${playlist.playlist_id}`);
            const songs = await songResponse.json();
            playlistStates[playlist.playlist_id] = songs.some((song) => song.song_id === songId);
          })
        );

        setIsInPlaylist(playlistStates); 
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, [userId, songId, refreshKey]); 

  const handleLikeToggle = async () => {
    if (!userId) return;

    try {
      const url = isLiked
        ? `http://localhost:3000/liked_songs/remove`
        : `http://localhost:3000/liked_songs/add`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, song_id: songId }),
      });

      const data = await response.json();
      if (data.success) {
        setIsLiked(!isLiked); 
      } else {
        console.error('Failed to update liked status');
      }
    } catch (error) {
      console.error('Error updating liked status:', error);
    }
  };

  const handlePlaylistToggle = async (playlistId) => {
    if (!userId || !playlistId || !songId) return;

    const isCurrentlyInPlaylist = isInPlaylist[playlistId];

    try {
      const url = isCurrentlyInPlaylist
        ? `http://localhost:3000/playlist_songs/remove` 
        : `http://localhost:3000/playlist_songs/add`;  

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playlist_id: playlistId, song_id: songId }),
      });

      const data = await response.json();
      if (data.success) {
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Error updating playlist:', error);
    }
  };

  return (
    <div className="addto-container">
      <div className="addto-Liked" onClick={handleLikeToggle}>
        <h3 className="addtotitles">Liked Songs</h3>
        <svg
          className={`liked ${isLiked ? 'active' : ''}`}
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
            fill="#cfcfcf"
          ></path>
        </svg>
      </div>

      <h3 style={{ fontSize: "larger", paddingTop: "10px", marginLeft: "15px" }}>
        Add to Playlists:
      </h3>
      <div className="addto-list">
        {playlists.map((playlist) => (
          <div className="addto-each" key={playlist.playlist_id} onClick={() => handlePlaylistToggle(playlist.playlist_id)}>
            <img src={playlist.playlist_cover || './def_dp.png'} alt="Cover" className="coverimg" />
            <div className="addtotitle-cont">
              <h3 className="addtotitles">{playlist.playlist_name}</h3>
              <svg
                className={`added ${isInPlaylist[playlist.playlist_id] ? 'active' : ''}`}
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                  fill="#cfcfcf"
                ></path>
              </svg>
            </div>
          </div>
        ))}
      </div>

      <h3 className="stopbut" onClick={onCancel}>Ok</h3>
    </div>
  );
}

export default AddTo;
