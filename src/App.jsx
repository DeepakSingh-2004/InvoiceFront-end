import { Routes, Route } from "react-router-dom";
// import Login from "./Auth/Login";
import Login from "./Auth/login"
import Signup from "./Auth/signup"; // uncomment after you create Signup
import Dashboard from "./Auth/dashboard"; 
import Products from "./Auth/products";
import Sales from "./Auth/sales";
import Vendor from "./Auth/vendor";
import Stock from "./Auth/stock";
import Purchase from "./Auth/purchase";
import User from "./Auth/user";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sales" element={<Sales/>} />
        <Route path="/vendor" element={<Vendor/>} />
        <Route path="/stock" element={<Stock/>}/>
        <Route path="/purchase" element={<Purchase/>}/>
        <Route path="/user" element={<User/>}/>
    </Routes>
  );
}

export default App;