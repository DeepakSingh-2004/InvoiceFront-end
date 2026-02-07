import { useState } from "react";
import axios from "../Apis/axiosConfig";
import { useNavigate } from "react-router-dom";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  //   try {
  //     await axios.post("/auth/login", { username, password });
  //     alert("Login success");
  //   } catch {
  //     alert("Invalid credentials");
  //   }
  // };
  try {
      const res = await axios.post("/auth/login", { username, password });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard"); // ✅ OPEN DASHBOARD
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Invoice Login</h1>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

          <p style={{ marginTop: "15px", color: "#aaa" }}>
            Not a member?{" "}
            <span
              style={{ color: "#4f46e5", cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;