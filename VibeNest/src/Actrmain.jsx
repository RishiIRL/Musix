import AddAlb from "./AddAlbum";
import AddArtist from "./AddArtist";
import Altersongs from "./AlterSongs";
import UserDetails from "./UserDetails";

function AMainCtr({ activePage }) {


    return (
        <div className="admin-main">
                    {activePage === "Home" && (
                        <div>
                            <UserDetails/>
                        </div>
                    )}
                    {activePage === "AddSongs" && (
                        <div>
                            <Altersongs/>
                        </div>
                    )}
                    {activePage === "AddAlbums" && (
                        <div>
                            <AddAlb/>
                        </div>
                    )}
                    {activePage === "AddArtist" && (
                        <div>
                           <AddArtist/>
                        </div>
                    )}

        </div>
    );
}

export default AMainCtr;
