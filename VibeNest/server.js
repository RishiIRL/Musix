const express = require('express');
const db = require('./db.cjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, pass } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];
    if (user.pass === pass) {
      return res.status(200).json({ message: 'Login successful', user_id: user.user_id });
    } else {
      return res.status(400).json({ message: 'Invalid password' });
    }
  });
});

app.post('/signup', (req, res) => {
  const { username, pass } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    db.query('INSERT INTO users (username, pass) VALUES (?, ?)', [username, pass], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

app.get('/songs', (req, res) => {
  const { genre, keyword, album_id } = req.query;
  let query = `
    SELECT song.song_id, song.song_name, song.song_path, song.image_path, 
           song.duration, song.genre, song.album_id, artist.artist_name 
    FROM song 
    JOIN artist ON song.artist_id = artist.artist_id
  `;

  const queryParams = [];

  if (album_id) {
    query += ` WHERE song.album_id = ?`;
    queryParams.push(album_id);
  }

  if (genre && genre !== 'All' && genre !== 'None') {
    query += `${queryParams.length ? ' AND' : ' WHERE'} song.genre = ?`;
    queryParams.push(genre);
  }

  if (keyword) {
    query += `${queryParams.length ? ' AND' : ' WHERE'} song.song_name LIKE ?`;
    queryParams.push(`%${keyword}%`);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/albums', (req, res) => {
  db.query(`
    SELECT albums.album_id, albums.album_name, albums.album_img, artist.artist_name 
    FROM albums 
    JOIN artist ON albums.artist_id = artist.artist_id;
  `, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/users/:userId', (req, res) => {
  const { userId } = req.params;

  db.query('SELECT username, display_name FROM users WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ username: results[0].username, display_name: results[0].display_name });
  });
});

app.put('/dispname/:userId', (req, res) => {
  const { userId } = req.params;
  const { display_name } = req.body;

  db.query('UPDATE users SET display_name = ? WHERE user_id = ?', [display_name, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating display name" });
    }
    res.status(200).json({ message: "Display name updated successfully" });
  });
});

app.get('/liked_songs/:userId', (req, res) => {
  const { userId } = req.params;

  db.query('SELECT song_id FROM liked_songs WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching liked songs' });
    }
    res.json(results);
  });
});

app.post('/liked_songs/add', (req, res) => {
  const { user_id, song_id } = req.body;
  db.query('INSERT INTO liked_songs (user_id, song_id) VALUES (?, ?)', [user_id, song_id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error adding to liked songs' });
    }
    res.json({ success: true });
  });
});

app.post('/liked_songs/remove', (req, res) => {
  const { user_id, song_id } = req.body;
  db.query('DELETE FROM liked_songs WHERE user_id = ? AND song_id = ?', [user_id, song_id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error removing from liked songs' });
    }
    res.json({ success: true });
  });
});

app.get('/playlists/:userId', (req, res) => {
  const { userId } = req.params;

  db.query('SELECT playlist_id, playlist_name, playlist_cover FROM playlists WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching playlists' });
    }
    res.json(results);
  });
});

app.get('/playlist_songs/:playlist_id', (req, res) => {
  const { playlist_id } = req.params;

  if (!playlist_id) {
    return res.status(400).json({ error: 'Missing playlist_id' });
  }

  const query = `
    SELECT s.song_id, s.song_name
    FROM playlist_songs ps
    JOIN song s ON ps.song_id = s.song_id
    WHERE ps.playlist_id = ?;
  `;

  db.query(query, [playlist_id], (err, songs) => {
    if (err) {
      console.error('Error fetching songs for playlist:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.json(songs);
  });
});


app.post('/playlist_songs/add', (req, res) => {
  const { playlist_id, song_id } = req.body;

  db.query('INSERT INTO playlist_songs (playlist_id, song_id) VALUES (?, ?)', [playlist_id, song_id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error adding song to playlist' });
    }

    updatePlaylistCover(playlist_id, res);
  });
});

app.post('/playlist_songs/remove', (req, res) => {
  const { playlist_id, song_id } = req.body;

  db.query('DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?', [playlist_id, song_id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error removing song from playlist' });
    }

    updatePlaylistCover(playlist_id, res);
  });
});

function updatePlaylistCover(playlist_id, res) {
  db.query('SELECT song_id FROM playlist_songs WHERE playlist_id = ?', [playlist_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching playlist songs' });
    }

    if (results.length > 0) {
      const firstSongId = results[0].song_id;

      db.query('SELECT song_name, image_path FROM song WHERE song_id = ?', [firstSongId], (err, songResults) => {
        if (err) {
          return res.status(500).json({ error: 'Error fetching song details' });
        }

        const newCoverImage = songResults[0].image_path;

        db.query('UPDATE playlists SET playlist_cover = ? WHERE playlist_id = ?', [newCoverImage, playlist_id], (err) => {
          if (err) {
            return res.status(500).json({ error: 'Error updating playlist cover' });
          }
          res.json({ success: true, message: 'Playlist cover updated successfully' });
        });
      });
    }
    else {
      res.status(400).json({ message: 'No songs in playlist' });
    }
  });
}

app.get('/alllikedSongs/:userId', (req, res) => {
  const { userId } = req.params;

  db.query('SELECT * FROM liked_songs ls JOIN song s ON ls.song_id = s.song_id JOIN artist ON s.artist_id = artist.artist_id WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
          res.status(500).json({ error: 'Error fetching liked songs' });
          return;
      }
      res.json(results);
  });
});


app.get('/playlistSongs', (req, res) => {
  const playlistId = req.query.playlist_id; 

  const query = `
      SELECT s.song_id, s.song_name, s.image_path, s.artist, s.album
      FROM playlist_songs ps
      JOIN song s ON ps.song_id = s.song_id
      WHERE ps.playlist_id = ?
  `;

  db.query(query, [playlistId], (err, results) => {
    if (err) {
      console.error('Error retrieving playlist songs:', err);
      res.status(500).send('Server error');
      return;
    }

    res.json(results);  
  });
});
app.post('/addPlaylist', (req, res) => {
  const { playlist_name, user_id,playlist_cover } = req.body;

  if (!playlist_name || !user_id) {
    return res.status(400).json({ message: 'Playlist name and user ID are required' });
  }

  const query = 'INSERT INTO playlists (playlist_name, user_id,playlist_cover) VALUES (?, ?, ?)';

  db.query(query, [playlist_name, user_id, playlist_cover], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(201).json({ message: 'Playlist created successfully', playlist_id: result.insertId });
  });
});

app.get('/allplaylistsongs', (req, res) => {
  const { playlist_id } = req.query;

  if (!playlist_id) {
    return res.status(400).json({ error: 'Playlist ID is required' });
  }

  const songsQuery = `
    SELECT s.song_id, s.song_name, s.image_path, a.artist_name, s.song_path
    FROM playlist_songs ps
    JOIN song s ON ps.song_id = s.song_id
    JOIN artist a ON s.artist_id = a.artist_id
    WHERE ps.playlist_id = ?
  `;

  db.query(songsQuery, [playlist_id], (err, songResults) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching songs for playlist' });
    }

    res.json(songResults);
  });
});

app.delete("/deletesongsfromplaylist", (req, res) => {
  const { playlist_id } = req.query;

  if (!playlist_id) {
    return res.status(400).json({ error: "Playlist ID is required" });
  }

  const query = `DELETE FROM playlist_songs WHERE playlist_id = ?`;
  db.query(query, [playlist_id], (err, result) => {
    if (err) {
      console.error("Error deleting songs from playlist:", err);
      return res.status(500).json({ error: "Error deleting songs from playlist" });
    }

    return res.status(200).json({ message: "Songs deleted successfully" });
  });
});

app.delete("/deleteplaylist", (req, res) => {
  const { playlist_id } = req.query;

  if (!playlist_id) {
    return res.status(400).json({ error: "Playlist ID is required" });
  }

  // Delete the playlist
  const query = `DELETE FROM playlists WHERE playlist_id = ?`;
  db.query(query, [playlist_id], (err, result) => {
    if (err) {
      console.error("Error deleting playlist:", err);
      return res.status(500).json({ error: "Error deleting playlist" });
    }

    return res.status(200).json({ message: "Playlist deleted successfully" });
  });
});

app.get('/allusers', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
      if (err) {
          res.status(500).send('Database error');
      } else {
          res.json(results);
      }
  });
});
app.get('/allartists', (req, res) => {
  const query = 'SELECT * FROM artist';
  db.query(query, (err, result) => {
      if (err) {
          res.status(500).send('Database error');
      } else {
          res.json(result);
      }
  });
});
app.post('/addsong', (req, res) => {
  const { song_name, genre, duration, song_path, image_path, artist_id, album_id } = req.body;
  
  const query = 'INSERT INTO song (song_name, genre, duration, song_path, image_path, artist_id, album_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [song_name, genre, duration, song_path, image_path, artist_id, album_id || null], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error adding song');
    }
    res.status(201).send('Song added successfully');
  });
})

app.post('/addartist', (req, res) => {
  const { artist_name } = req.body;

  if (!artist_name) {
    return res.status(400).send('Artist name is required');
  }
  const query = 'INSERT INTO artist (artist_name) VALUES (?)';
  db.query(query, [artist_name], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.status(201).send('Artist added successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running at port 3000`);
});
