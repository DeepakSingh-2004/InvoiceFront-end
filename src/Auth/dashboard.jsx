
// import { useEffect, useState } from "react";
// import axios from "../Apis/axiosConfig";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//   const [products, setProducts] = useState([]);
//   const [sales, setSales] = useState([]);
//   const [vendors, setVendors] = useState([]);
//   const [users, setUsers] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   // 🔥 CHANGE 1: FIXED ALL ENDPOINTS (use REAL APIs)
//   const loadDashboard = async () => {
//     try {
//       const [p, s, v, u] = await Promise.all([
//         axios.get("/inventory/products"), // products
//         axios.get("/sale/all"),           // sales
//         axios.get("/vendor/all"),         // vendors
//         axios.get("/user/all"),           // users
//       ]);

//       setProducts(p.data || []);
//       setSales(s.data || []);
//       setVendors(v.data || []);
//       setUsers(u.data || []);
//     } catch (err) {
//       console.error("Dashboard error", err);
//     }
//   };

//   // 🔥 CHANGE 2: CORRECT TOTAL SALES CALCULATION
//   const totalSales = sales.reduce(
//     (sum, s) => sum + Number(s.sellingPrice || 0),
//     0
//   );

//   // 🔥 CHANGE 3: CORRECT STOCK FIELD NAME
//   const totalStock = products.reduce(
//     (sum, p) => sum + Number(p.productStock || 0),
//     0
//   );

//   return (
//     <div className="dashboard-layout">
//       {/* SIDEBAR */}
//       <aside className="sidebar">
//         <h2>Invoice</h2>

//         <ul>
//           <li className="active">Dashboard</li>
//           <li onClick={() => navigate("/products")}>Products</li>
//           <li onClick={() => navigate("/sales")}>Sales</li>
//           <li onClick={() => navigate("/vendor")}>Vendors</li>
//           <li onClick={() => navigate("/stock")}>Stock</li>
//           <li onClick={() => navigate("/user")}>Users</li>
//           <li onClick={() => navigate("/purchase")}>Purchase</li>
//         </ul>

//         <button
//           className="logout-btn"
//           onClick={() => {
//             localStorage.clear();
//             navigate("/");
//           }}
//         >
//           Logout
//         </button>
//       </aside>

//       {/* MAIN */}
//       <main className="dashboard-main">
//         <header className="dashboard-header">
//           <h1>Invoice Dashboard</h1>
//         </header>

//         {/* STATS */}
//         <section className="stats-grid">
//           <div className="stat glass">
//             <p>Products</p>
//             <h2>{products.length}</h2>
//           </div>

//           <div className="stat glass">
//             <p>Sales</p>
//             <h2>₹{totalSales}</h2>
//           </div>

//           <div className="stat glass">
//             <p>Stock</p>
//             <h2>{totalStock}</h2>
//           </div>

//           <div className="stat glass">
//             <p>Vendors</p>
//             <h2>{vendors.length}</h2>
//           </div>

//           <div className="stat glass">
//             <p>Users</p>
//             <h2>{users.length}</h2>
//           </div>
//         </section>

//         {/* CONTENT GRID */}
//         <section className="content-grid">
//           {/* PRODUCT TABLE */}
//           <div className="card glass wide">
//             <div className="card-header">
//               <h3>Product Data</h3>
//             </div>

//             <table>
//               <thead>
//                 <tr>
//                   <th>Product</th>
//                   <th>Stock</th>
//                   <th>Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {/* 🔥 CHANGE 4: SAFE & CORRECT FIELDS */}
//                 {products.slice(0, 5).map((p) => (
//                   <tr key={p.productId}>
//                     <td>{p.productName}</td>
//                     <td>{p.productStock}</td>
//                     <td>₹{p.productPrice}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* RECENT SALES */}
//           <div className="card glass">
//             <h3>Recent Sales</h3>

//             <ul className="sales-list">
//               {/* 🔥 CHANGE 5: MATCH BACKEND SALE STRUCTURE */}
//               {sales.slice(0, 5).map((s) => (
//                 <li key={s.salesId}>
//                   <span>{s.product?.productName || "Product"}</span>
//                   <span>₹{s.sellingPrice}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default Dashboard;




import { useEffect, useState } from "react";
import axios from "../Apis/axiosConfig";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // 🔥 CHANGE A: Reload dashboard every time page opens
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [p, s, v, u] = await Promise.all([
        axios.get("/inventory/products"),
        axios.get("/sale/all"),
        axios.get("/vendor/all"),
        axios.get("/user/all"),
      ]);

      setProducts(p.data || []);

      // 🔥 CHANGE B + C: SORT SALES BY LATEST (VERY IMPORTANT)
      const sortedSales = (s.data || []).sort(
        (a, b) => b.salesId - a.salesId
      );

      setSales(sortedSales);   // ✅ now latest sales come first

      setVendors(v.data || []);
      setUsers(u.data || []);
    } catch (err) {
      console.error("Dashboard error", err);
    }
  };

  const totalSales = sales.reduce(
    (sum, s) => sum + Number(s.sellingPrice || 0),
    0
  );

  const totalStock = products.reduce(
    (sum, p) => sum + Number(p.productStock || 0),
    0
  );

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Invoice</h2>

        <ul>
          <li className="active">Dashboard</li>
          <li onClick={() => navigate("/products")}>Products</li>
          <li onClick={() => navigate("/sales")}>Sales</li>
          <li onClick={() => navigate("/vendor")}>Vendors</li>
          <li onClick={() => navigate("/stock")}>Stock</li>
          <li onClick={() => navigate("/user")}>Users</li>
          <li onClick={() => navigate("/purchase")}>Purchase</li>
        </ul>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Invoice Dashboard</h1>
        </header>

        {/* STATS */}
        <section className="stats-grid">
          <div className="stat glass">
            <p>Products</p>
            <h2>{products.length}</h2>
          </div>

          <div className="stat glass">
            <p>Sales</p>
            <h2>₹{totalSales}</h2>
          </div>

          <div className="stat glass">
            <p>Stock</p>
            <h2>{totalStock}</h2>
          </div>

          <div className="stat glass">
            <p>Vendors</p>
            <h2>{vendors.length}</h2>
          </div>

          <div className="stat glass">
            <p>Users</p>
            <h2>{users.length}</h2>
          </div>
        </section>

        {/* CONTENT GRID */}
        <section className="content-grid">
          {/* PRODUCT TABLE */}
          <div className="card glass wide">
            <div className="card-header">
              <h3>Product Data</h3>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Stock</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((p) => (
                  <tr key={p.productId}>
                    <td>{p.productName}</td>
                    <td>{p.productStock}</td>
                    <td>₹{p.productPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RECENT SALES */}
          <div className="card glass">
            <h3>Recent Sales</h3>

            <ul className="sales-list">
              {/* 🔥 NOW SHOWS LATEST SALES */}
              {sales.slice(0, 5).map((s) => (
                <li key={s.salesId}>
                  <span>{s.product?.productName || "Product"}</span>
                  <span>₹{s.sellingPrice}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
