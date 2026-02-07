import { useEffect, useState } from "react";
import axios from "../Apis/axiosConfig";
import { useNavigate } from "react-router-dom";

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = async () => {
    try {
      const res = await axios.get("/purchase/all");
      setPurchases(res.data || []);
    } catch (error) {
      console.error("Error loading purchases", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ color: "white" }}>Loading purchases...</p>;
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

      <h1>Purchases</h1>

      <div className="card glass">
        <table>
          <thead>
            <tr>
              <th>Purchase ID</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Vendor</th>
              <th>Product ID</th>
            </tr>
          </thead>

          <tbody>
            {purchases.length === 0 ? (
              <tr>
                <td colSpan="5">No Purchases Found</td>
              </tr>
            ) : (
              purchases.map((p) => (
                <tr key={p.purchaseId}>
                  <td>{p.purchaseId}</td>
                  <td>{p.date}</td>
                  <td>{p.quantity}</td>
                  <td>{p.vendor?.vendorName || "-"}</td>
                  <td>{p.product?.productId || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Purchase;
