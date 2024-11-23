import { useState } from "react";
import AdminCtr from "./AdminCtr";
import ALogin from "./ALogin";

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <AdminCtr />
      ) : (
        <ALogin onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default AdminPage;
