import { useState, useEffect } from "react";

function Altersongs() {
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [newSong, setNewSong] = useState({
        song_name: "",
        genre: "",
        duration: "",
        song_path: "",
        image_path: "",
        artist_id: "",
        album_id: "",
    });

    const fetchSongs = async () => {
        const response = await fetch("http://localhost:3000/songs");
        const data = await response.json();
        setSongs(data);
    };

    const fetchArtists = async () => {
        const response = await fetch("http://localhost:3000/allartists");
        const data = await response.json();
        setArtists(data);
    };

    const fetchAlbums = async () => {
        const response = await fetch("http://localhost:3000/albums");
        const data = await response.json();
        setAlbums(data);
    };

    const handleAddSong = async () => {
        const response = await fetch("http://localhost:3000/addsong", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSong),
        });
        if (response.ok) {
            fetchSongs();
            setNewSong({
                song_name: "",
                genre: "",
                duration: "",
                song_path: "",
                image_path: "",
                artist_id: "",
                album_id: "",
            });
        } else {
            alert("Error adding song");
        }
    }

    useEffect(() => {
        fetchSongs();
        fetchArtists();
        fetchAlbums();
    }, []);

    return (
        <div className="altersongs-container">
            <h1 className="centertitles">Add Songs</h1>
            <div className="add-song-form">
                <input
                    type="text"
                    placeholder="Song Name"
                    value={newSong.song_name}
                    onChange={(e) => setNewSong({ ...newSong, song_name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={newSong.genre}
                    onChange={(e) => setNewSong({ ...newSong, genre: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Duration (in seconds)"
                    value={newSong.duration}
                    onChange={(e) => setNewSong({ ...newSong, duration: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Song File Path"
                    value={newSong.song_path}
                    onChange={(e) => setNewSong({ ...newSong, song_path: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Image File Path"
                    value={newSong.image_path}
                    onChange={(e) => setNewSong({ ...newSong, image_path: e.target.value })}
                />
                <select
                    value={newSong.artist_id}
                    onChange={(e) => setNewSong({ ...newSong, artist_id: e.target.value })}
                >
                    <option value="">Select Artist</option>
                    {artists.map((artist) => (
                        <option key={artist.artist_id} value={artist.artist_id}>
                            {artist.artist_name}
                        </option>
                    ))}
                </select>
                <select
                    value={newSong.album_id}
                    onChange={(e) => setNewSong({ ...newSong, album_id: e.target.value })}
                >
                    <option value="">Select Album</option>
                    {albums.map((album) => (
                        <option key={album.album_id} value={album.album_id}>
                            {album.album_name}
                        </option>
                    ))}
                </select>
                <button onClick={handleAddSong}>Add Song</button>
            </div>
        </div>
    );
}

export default Altersongs;
