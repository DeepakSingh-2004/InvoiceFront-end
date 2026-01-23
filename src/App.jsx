
import { Routes, Route } from "react-router-dom";
// import Login from "./Auth/Login";
import Login from "./Auth/login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
