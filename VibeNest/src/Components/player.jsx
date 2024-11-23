import { useState, useEffect, useRef } from "react";
import { usePlayer } from '../PlayerContext';
function Player({isSearchFocused}) {
    const { currentSong, togglePlayPause, isPlaying, setCurrentSong } = usePlayer();
    const audioRef = useRef(new Audio(currentSong.song_path));

    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(currentSong.duration);
    const [isLoaded, setIsLoaded] = useState(false);
    const [songList, setSongList] = useState([]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.code === "Space"&& !isSearchFocused)  {
                event.preventDefault();
                togglePlayPause();
            }
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [isSearchFocused,togglePlayPause]);
    useEffect(() => {
        const fetchSongs = async () => {
            const response = await fetch('http://localhost:3000/songs');
            if (!response.ok) {
                throw new Error('Failed to fetch songs');
            }
            const data = await response.json();
            setSongList(data);
            if (data.length > 0) {
                setCurrentSong(data[Math.floor(Math.random() * (data.length)) ]); 
            }
        };

        fetchSongs();
    }, [setCurrentSong]);
    useEffect(() => {
        setCurrentTime(0);
        setIsLoaded(false);
        audioRef.current.src = currentSong.song_path;
        audioRef.current.load();

        audioRef.current.onloadedmetadata = () => {
            setTotalTime(audioRef.current.duration);
            setIsLoaded(true);
        };

        audioRef.current.onended = () => {
            nextSong();
        };

        return () => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        };
    }, [currentSong]);

    useEffect(() => {
        if (isPlaying && isLoaded) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }

        const timeInterval = setInterval(() => {
            if (audioRef.current && isPlaying) {
                setCurrentTime(audioRef.current.currentTime);
            }
        }, 1000);

        return () => clearInterval(timeInterval);
    }, [isPlaying, isLoaded]);

    const progressPercent = (currentTime / totalTime) * 100;

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const nextSong = () => {
        const currentIndex = songList.findIndex(song => song.song_id === currentSong.song_id);
        if (currentIndex !== -1) {
            const nextIndex = (currentIndex + 1) % songList.length;
            setCurrentSong(songList[nextIndex]);
        }
    };
    const prevSong = () => {
        const currentIndex = songList.findIndex(song => song.song_id === currentSong.song_id);
        if (currentIndex !== -1) {
            const prevIndex = (currentIndex - 1 + songList.length) % songList.length;
            setCurrentSong(songList[prevIndex]);
        }
    };

    return (

        <div id="player01" className="player">
            <div className="pwrapper">
                <img src={currentSong.image_path}
                    alt="LogoMusicImage" />
                <div className="info">
                    <h1>{currentSong.song_name}</h1>
                    <p>{currentSong.artist_name}</p>
                </div>

                <div className="controls">
                    <div className="prev" onClick={prevSong}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M8 8C8.55228 8 9 8.44772 9 9V15C9 15.5523 8.55228 16 8 16C7.44771 16 7 15.5523 7 15V9C7 8.44772 7.44771 8 8 8ZM16 15.4641L10 12L16 8.5359V15.4641Z" fill="#d9d9d9"></path> <path fillRule="evenodd" clipRule="evenodd" d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1Z" fill="#d9d9d9"></path> </g></svg>
                    </div>
                    <div className="play" onClick={togglePlayPause}>
                        {isPlaying ? (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Media / Pause_Circle"> <path id="Vector" d="M14 9V15M10 9V15M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="#cfcfcf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>) : (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clipPath="url(#clip0_429_11133)"> <circle cx="12" cy="12" r="9" stroke="#d9d9d9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></circle> <path d="M14 12L11 13.7321L11 10.2679L14 12Z" stroke="#d9d9d9" strokeWidth="2.5" strokeLinejoin="round"></path> </g> <defs> <clipPath id="clip0_429_11133"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>
                        )}

                    </div>
                    <div className="next" onClick={nextSong}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M8 8C8.55228 8 9 8.44772 9 9V15C9 15.5523 8.55228 16 8 16C7.44771 16 7 15.5523 7 15V9C7 8.44772 7.44771 8 8 8ZM16 15.4641L10 12L16 8.5359V15.4641Z" fill="#cfcfcf"></path> <path fillRule="evenodd" clipRule="evenodd" d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1Z" fill="#cfcfcf"></path> </g></svg>
                    </div>
                </div>

                <div className="track-time">
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${progressPercent}%`, backgroundColor: '#8f9090', height: '8px', borderRadius: '5px', marginTop: '10px' }}></div>
                    </div>
                    <div className="time">
                        <div className="last-time">{formatTime(currentTime)}</div> 
                        <div className="total-time">{formatTime(totalTime)}</div> 
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Player;
