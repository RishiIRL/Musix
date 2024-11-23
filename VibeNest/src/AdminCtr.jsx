import AMainCtr from "./Actrmain";
import ANavbar from "./ANavbar";
import ASidebar from "./ASidebar";
import {useState} from 'react';


function AdminCtr(){
    const [activePage, setActivePage] = useState('Home');
    const handleSetActivePage = (page) => {
          setActivePage(page);
      };

    return (
        <>
        <ANavbar />
        <ASidebar setActivePage={handleSetActivePage}/>
        <AMainCtr activePage={activePage} />
        </>
    )
}
export default AdminCtr;