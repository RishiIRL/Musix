import { useState } from "react";

function AddArtist() {
  const [artistName, setArtistName] = useState("");

  const handleAddArtist = async () => {
    const response = await fetch("http://localhost:3000/addartist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artist_name: artistName }),
    });

    if (response.ok) {
      alert("Artist added successfully");
      setArtistName("");
      fetchArtists();
    } else {
      alert("Error adding artist");
    }
  };

  return (
    <div className="altersongs-container">
      <h1 className="centertitles">Add New Artist</h1>
      <form className="add-song-form">
        <div>
          <input
            type="text"
            placeholder="Artist Name"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleAddArtist}>
          Add Artist
        </button>
      </form>
    </div>
  );
}

export default AddArtist;
