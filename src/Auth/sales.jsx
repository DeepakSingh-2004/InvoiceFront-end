import  { useEffect, useState } from "react";
import axios from "../Apis/axiosConfig";
import { useNavigate } from "react-router-dom";


const Sales = () => {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
  try {
    const res = await axios.get("/sale/all");
    console.log("SALES API RESPONSE 👉", res.data); // 🔥 ADD THIS
    setSales(res.data || []);
  } catch (error) {
    console.error("Error loading sales", error);
  }
};


  return (
    
    <div className="dashboard-main">
      {/* 🔙 SAME BACK BUTTON AS PRODUCTS */}
      <button
        onClick={() => navigate("/dashboard")}
        style={{ marginBottom: "15px" }}
      >
        ← Back to Dashboard
      </button>

      <h1>Sales</h1>
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Sales List</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>SalesID</th>
            <th>Date</th>
            <th>Quantity</th>
            <th>Selling Price</th>
            <th>Product ID</th>
          </tr>
        </thead>

        <tbody>
          {sales.length === 0 ? (
            <tr>
              <td colSpan="5">No Sales Found</td>
            </tr>
          ) : (
            sales.map((s) => (
              <tr key={s.salesId}>
        <td>{s.salesId}</td>
        <td>{s.date}</td>
        <td>{s.quantity}</td>
        <td>{s.sellingPrice}</td>
        <td>{s.product.productId}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Sales;
