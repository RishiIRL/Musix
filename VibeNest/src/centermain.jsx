import { useState } from 'react';
import Songs from './SongsPage.jsx';
import Home from './Home.jsx';
import AllAlbums from './AllAlbums.jsx';
import AlbumPage from './AlbumPage.jsx';
import Library from './Library.jsx';

function MainCtr({ activePage }) {
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [refreshLibrary, setRefreshLibrary] = useState(false);

    const handleAlbumClick = (album) => {
        setSelectedAlbum(album);
    };

    const handleBackToAlbums = () => {
        setSelectedAlbum(null);
    };

    const triggerLibraryRefresh = () => {
        setRefreshLibrary((prev) => !prev); 
    };

    return (
        <div className="main">
            {selectedAlbum ? (
                <AlbumPage album={selectedAlbum} onBack={handleBackToAlbums} />
            ) : (
                <>
                    {activePage === "Home" && (
                        <div>
                            <Home onAlbumClick={handleAlbumClick} />
                        </div>
                    )}
                    {activePage === "Songs" && (
                        <div>
                            <Songs />
                        </div>
                    )}
                    {activePage === "Albums" && (
                        <div>
                            <AllAlbums onAlbumClick={handleAlbumClick} />
                        </div>
                    )}
                    {activePage === "Library" && (
                        <div>
                            <Library refresh={refreshLibrary} triggerLibraryRefresh={triggerLibraryRefresh} onAlbumClick={handleAlbumClick} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default MainCtr;
