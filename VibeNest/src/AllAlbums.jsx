import { useState, useEffect } from "react";
function AllAlbums({onAlbumClick}){
    const [albums, setAlbums] = useState([]);
    useEffect(() => {
        const fetchAlbums = async () => {
            const response = await fetch('http://localhost:3000/albums');
            const data = await response.json();
            setAlbums(shuffleArray(data));
        
        };
        
        fetchAlbums();
    }, []);
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    return(
        <div className="Albums">
            <h3 className="centertitles">All Albums</h3>
            <div className="drawer drawerall">
              {albums.map((album) => (
                <div className="cover coverall" key={album.album_id} onClick={() => onAlbumClick(album)}>
                <img src={album.album_img} alt=""
                    className="coverimg" />
                <p>{album.album_name}</p>
                </div>
              ))}
                
            </div>
        </div>
    )
}
export default AllAlbums;