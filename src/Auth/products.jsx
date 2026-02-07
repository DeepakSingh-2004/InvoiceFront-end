// import { useEffect, useState } from "react";
// import axios from "../Apis/axiosConfig";

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadProducts();
//   }, []); 

//   const loadProducts = async () => {
//     try {
//       const res = await axios.get("/inventory/products");

//       // VERY IMPORTANT (because backend returns ResponseEntity inside ResponseEntity)
//       const data = res.data?.body || [];

//       setProducts(data);
//     } catch (error) {
//       console.error("Error loading products", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <p style={{ color: "white" }}>Loading products...</p>;
//   }

//   return (
//     <div className="dashboard-main">
//       <h1>Products</h1>

//       <div className="card glass">
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Code</th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>Total</th>
//               <th>Unit</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.length === 0 ? (
//               <tr>
//                 <td colSpan="7">No products found</td>
//               </tr>
//             ) : (
//               products.map((p) => (
//                 <tr key={p.productId}>
//                   <td>{p.productId}</td>
//                   <td>{p.productCode}</td>
//                   <td>{p.productName}</td>
//                   <td>₹{p.productPrice}</td>
//                   <td>{p.productStock}</td>
//                   <td>₹{p.totalPrice}</td>
//                   <td>{p.unit}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Products;


import { useEffect, useState } from "react";
import axios from "../Apis/axiosConfig";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await axios.get("/inventory/products");

      // ✅ BACKEND RETURNS DIRECT ARRAY
      setProducts(res.data);
    } catch (error) {
      console.error("Error loading products", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ color: "white" }}>Loading products...</p>;
  }

  return (
    <div className="dashboard-main">
      {/* 🔙 Back button */}
      <button
        onClick={() => navigate("/dashboard")}
        style={{ marginBottom: "15px" }}
      >
        ← Back to Dashboard
      </button>

      <h1>Products</h1>

      <div className="card glass">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Total</th>
              <th>Unit</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7">No products found</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.productId}>
                  <td>{p.productId}</td>
                  <td>{p.productCode}</td>
                  <td>{p.productName}</td>
                  <td>₹{p.productPrice}</td>
                  <td>{p.productStock}</td>
                  <td>₹{p.totalPrice}</td>
                  <td>{p.unit}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
