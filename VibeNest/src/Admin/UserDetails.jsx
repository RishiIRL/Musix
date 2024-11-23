import { useState, useEffect } from "react";

function UserDetails() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await fetch("http://localhost:3000/allusers");
        const data = await response.json();
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="userDetails">
            <h1 className="centertitles">User Details</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td>{user.username}</td>
                            <td>{user.display_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserDetails;
