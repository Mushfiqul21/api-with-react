import { useEffect, useState } from "react";
import api from "./api/axios";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.get("/users")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
    <h1>Users: {users.length}</h1>
    <div>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} >
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}

export default App;