
import { createContext, useContext, useState } from "react";

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);

    const playSong = (song) => {
        setCurrentSong(song);
        setIsPlaying(true);
    };

    const togglePlayPause = () => setIsPlaying((prev) => !prev);

    return (
        <PlayerContext.Provider value={{ currentSong, setCurrentSong, isPlaying, playSong, togglePlayPause }}>
            {children}
        </PlayerContext.Provider>
    );
};
