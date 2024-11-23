import { useState, useEffect } from "react";
import { usePlayer } from "./PlayerContext.jsx";

function AlbumPage({ album, onBack }) {
  const { playSong } = usePlayer();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch(`http://localhost:3000/songs?album_id=${album.album_id}`);
      const data = await response.json();
      setSongs(data);
    };

    if (album) {
      fetchSongs();
    }
  }, [album]);
    return(
        <div className="alb">
            <div className="albumcover-container">
            <svg className="albumback" onClick={onBack} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#cfcfcf"> <path d="M1 8a6 6 0 018.514-5.45.75.75 0 01-.629 1.363 4.5 4.5 0 100 8.175.75.75 0 11.63 1.361A6 6 0 011 8z"></path> <path d="M11.245 4.695a.75.75 0 00-.05 1.06l1.36 1.495H6.75a.75.75 0 000 1.5h5.805l-1.36 1.495a.75.75 0 001.11 1.01l2.5-2.75a.748.748 0 00-.002-1.012l-2.498-2.748a.75.75 0 00-1.06-.05z"></path> </g> </g></svg>
            <img className="albumcover-big" src={album.album_img} alt="" />
            <h2 className="albumtitle">{album.album_name}</h2>
            <h3 className="albumartist">{album.artist_name}</h3>
            </div>
            <div className="albumsongs-container">
            {songs.map((song) => (
                <div className="albumsongs" key={song.song_id}>
                    <div><img src={song.image_path} alt="songs Image"></img></div>
                    <div>
                        <h4>{song.song_name}</h4>
                    </div>
                    <div className="buts">
                    <svg className="miniplay" onClick={() => playSong(song)} viewBox="-1 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-65.000000, -3803.000000)" fill="#cfcfcf"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M18.074,3650.7335 L12.308,3654.6315 C10.903,3655.5815 9,3654.5835 9,3652.8985 L9,3645.1015 C9,3643.4155 10.903,3642.4185 12.308,3643.3685 L18.074,3647.2665 C19.306,3648.0995 19.306,3649.9005 18.074,3650.7335" id="play-[#cfcfcf]"> </path> </g> </g> </g> </g></svg> 
                    </div>
                </div>
                ))}   
            </div>
        </div>
    )
}
export default AlbumPage;