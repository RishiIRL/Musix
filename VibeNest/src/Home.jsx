import { useState, useEffect } from "react";
import AddTo from "./Components/AddToPlaylist.jsx";
import { usePlayer } from './PlayerContext.jsx';
function Home({ onAlbumClick }){
    const { playSong } = usePlayer();
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [randomSongs, setRandomSongs] = useState([]); 
    const [randomAlbums, setRandomAlbums] = useState([]);
    const [showAddTo, setShowAddTo] = useState(false);
    const [selectedSongId, setSelectedSongId] = useState(null);
  
    useEffect(() => {
      const fetchSongs = async () => {
        const response = await fetch('http://localhost:3000/songs');
        const data = await response.json();
        setSongs(data);
  
        const totalSongs = data.length;
        if (totalSongs >= 6) {
          const maxRandomIndex = totalSongs - 6;
          const randomIndex = Math.floor(Math.random() * (maxRandomIndex + 1));
          setRandomSongs(data.slice(randomIndex, randomIndex + 6));
        } else {
          setRandomSongs(data);
        }
      };
      fetchSongs();
    }, []);
  
    useEffect(() => {
      const fetchAlbums = async () => {
        const response = await fetch('http://localhost:3000/albums');
        const data = await response.json();
        setAlbums(data);
  
        const totalAlbums = data.length;
        if (totalAlbums >= 4) {
          const maxRandomIndex = totalAlbums - 4;
          const randomIndex = Math.floor(Math.random() * (maxRandomIndex + 1));
          setRandomAlbums(data.slice(randomIndex, randomIndex + 4));
        } else {
          setRandomAlbums(data);
        }
      };
      fetchAlbums();
    }, []);
  
    const handleAddToClick = (songId) => {
      setSelectedSongId(songId);
      setShowAddTo(true);
    };
  
    const handleCancelAddTo = () => {
      setShowAddTo(false);
      setSelectedSongId(null);
    };
  
    return(
    <div className="home">
        <h3 className="centertitles">Suggested Albums</h3>
            <div className="drawer">
              {randomAlbums.map((album) => (
                <div className="cover" key={album.album_id} onClick={() => onAlbumClick(album)}>
                <img src={album.album_img} alt=""
                    className="coverimg" />
                <p>{album.album_name}</p>
                </div>
              ))}
                
            </div>
            <h3 className="centertitles">Random Songs</h3>
            <div className="recents-container">
            {randomSongs.map((song) => (
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
    </div>
    )
}
export default Home;