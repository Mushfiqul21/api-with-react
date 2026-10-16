import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "./api/axios";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit, reset, formState: { errors }, } = useForm();
  const fetchUsers = () => {
    api.get("/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load users. Is the server running?");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const onSubmit = (data) => {
    api.post("/store", data)
      .then((response) => {
        console.log(response.data);
        reset();
        fetchUsers();
      })
     .catch((err) => {
      console.log(err.response?.data);
      alert("Failed to add user");
    });
  }

  if (loading) return <p>Loading...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
      
      <h2>Add User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Name"
        {...register("name", { required: "Name is required" })}
      />
      {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

      <input
        placeholder="Phone"
        {...register("phone", { required: "Phone is required" })}
      />
      {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}

      <input
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "At least 6 characters" },
        })}
      />
      {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

      <button type="submit">Add</button>
      </form>
  </div>
  );
}

export default App;