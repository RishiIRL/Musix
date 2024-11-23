import { useState, useEffect } from "react";

function AddAlb() {
  const [artists, setArtists] = useState([]);
  const [newAlbum, setNewAlbum] = useState({
    album_name: "",
    artist_id: "",
    album_img: "",
  });

  // Fetch artists for the dropdown
  const fetchArtists = async () => {
    const response = await fetch("http://localhost:3000/allartists");
    const data = await response.json();
    setArtists(data);
  };

  // Handle adding a new album
  const handleAddAlbum = async () => {
    const response = await fetch("http://localhost:3000/addalbum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAlbum),
    });

    if (response.ok) {
      alert("Album added successfully");
      // Reset the form
      setNewAlbum({
        album_name: "",
        artist_id: "",
        album_img: "",
      });
    } else {
      alert("Error adding album");
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <div className="altersong-container">
      <h1 className="centertitles">Add New Album</h1>
      <form className="add-song-form">
        <div>
          <input
            type="text"
            placeholder="Album Name"
            value={newAlbum.album_name}
            onChange={(e) =>
              setNewAlbum({ ...newAlbum, album_name: e.target.value })
            }
          />
        </div>

        <div>
          <select
            value={newAlbum.artist_id}
            onChange={(e) => setNewAlbum({ ...newAlbum, artist_id: e.target.value })}
          >
            <option value="">Select Artist</option>
            {artists.map((artist) => (
              <option key={artist.artist_id} value={artist.artist_id}>
                {artist.artist_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="Album Image Path"
            value={newAlbum.album_img}
            onChange={(e) => setNewAlbum({ ...newAlbum, album_img: e.target.value })}
          />
        </div>

        <button type="button" onClick={handleAddAlbum}>
          Add Album
        </button>
      </form>
    </div>
  );
}

export default AddAlb;
