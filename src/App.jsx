
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Auth/dashboard";
import Signup from "./Auth/signUp";


import Login from "./Auth/login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
