// import { useEffect, useState } from "react";
// import axios from "../Apis/axiosConfig";
// import { useNavigate } from "react-router-dom";

// function stock() {
//    const navigate = useNavigate();  
//   const [stock, setstock] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadstock();
//   }, []);

//   const loadstock = async () => {
//     try {
//       const res = await axios.get("/stock/all");

//       // VERY IMPORTANT (because backend returns ResponseEntity inside ResponseEntity)
//       const data = res.data?.body || [];

//       setstock(data);
//     } catch (error) {
//       console.error("Error loading stock", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <p style={{ color: "white" }}>Loading stock...</p>;
//   }

//   return (
//     <div className="dashboard-main">
//       <h1>Stock</h1>

//       <div className="card glass">
//         <table>
//           <thead>
//             <tr>
//               <th>id</th>
//               <th>opening_stock</th>
//               <th>purchase_quantity</th>
//               <th>sold_quantity</th>
//               <th>closing_quantity</th>
//             </tr>
//           </thead>

//           <tbody>
//             {stock.length === 0 ? (
//               <tr>
//                 <td colSpan="5">No stock found</td>
//               </tr>
//             ) : (
//               stock.map((stock) => (
//                 <tr key={stock.id}>
//                   <td>{stock.opening_stock}</td>
//                   <td>{stock.purchase_quantity}</td>
//                   <td>{stock.sold_quantity}</td>
//                   <td>₹{stock.closing_quantity}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//   <h1></h1>

//   <button
//     onClick={() => navigate("/dashboard")}
//     style={{
//       padding: "8px 14px",
//       backgroundColor: "#ff4d4f",
//       color: "white",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer"
//     }}
//   >
//     ← Back
//   </button>
// </div>

//       </div>
//     </div>
//   );
// }

// export default stock;

import { useEffect, useState } from "react";
import axios from "../Apis/axiosConfig";
import { useNavigate } from "react-router-dom";

function Stock() {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    try {
      const res = await axios.get("/stock/all");
      setStocks(res.data); // ✅ no .body
    } catch (error) {
      console.error("Error loading stock", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ color: "white" }}>Loading stock...</p>;
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

      <h1>Stock</h1>

    <div className="dashboard-main">
      <h1>Stock</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Opening Stock</th>
            <th>Purchase Qty</th>
            <th>Sold Qty</th>
            <th>Closing Stock</th>
          </tr>
        </thead>

        <tbody>
          {stocks.length === 0 ? (
            <tr>
              <td colSpan="5">No stock found</td>
            </tr>
          ) : (
            stocks.map((s) => (
              <tr key={s.id}>
               <td>{s.id}</td>
               <td>{s.openingStock}</td>
               <td>{s.purchaseQuantity}</td>
               <td>{s.soldQuantity}</td>
               <td>{s.closingStock}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      </div>
    </div>
  );
}

export default Stock;
