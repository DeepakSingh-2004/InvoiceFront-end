import { useEffect, useState } from "react";
import axios from "../Apis/axiosConfig";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Load users when page opens
  useEffect(() => {
    loadUsers();
  }, []);

  // 🔹 API call to backend
  const loadUsers = async () => {
    try {
      const res = await axios.get("/user/all");
      setUsers(res.data || []);
    } catch (error) {
      console.error("Error loading users", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ color: "white" }}>Loading users...</p>;
  }

  return (
    <div className="dashboard-main">
      {/* 🔙 SAME BACK BUTTON AS PRODUCTS */}
      <button
        onClick={() => navigate("/dashboard")}
        style={{ marginBottom: "15px" }}
      >
        ← Back to Dashboard
      </button>

      {/* <h1>User</h1> */}

    <div style={{ padding: "20px", color: "white" }}>
      <h2>User List</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="3">No users found</td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <br />

      
    </div>
    </div>
  );
};

export default User;
