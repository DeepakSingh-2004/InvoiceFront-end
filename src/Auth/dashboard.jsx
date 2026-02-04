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

//   const loadDashboard = async () => {
//     try {
//       const [p, s, v, u] = await Promise.all([
//         axios.get("/products"),
//         axios.get("/sales"),
//         axios.get("/vendors"),
//         axios.get("/users"),
//       ]);

//       setProducts(p.data || []);
//       setSales(s.data || []);
//       setVendors(v.data || []);
//       setUsers(u.data || []);
//     } catch (err) {
//       console.error("Dashboard error", err);
//     }
//   };

//   const totalSales = sales.reduce(
//     (sum, s) => sum + Number(s.amount || 0),
//     0
//   );

//   const totalStock = products.reduce(
//     (sum, p) => sum + Number(p.stock || 0),
//     0
//   );

//   return (
//     <div className="dashboard-layout">
//       {/* SIDEBAR */}
//       <aside className="sidebar">
//         <h2>Invoice</h2>

//         <ul>
//           <li className="active">Dashboard</li>
//           <li>Invoices</li>
//           <li>Clients</li>
//           <li>Settings</li>
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
//           {/* PRODUCTS TABLE */}
//           <div className="card glass wide">
//             <div className="card-header">
//               <h3>Product Data</h3>
//             </div>

//             <table>
//               <thead>
//                 <tr>
//                   <th>Product</th>
//                   <th>Vendor</th>
//                   <th>Stock</th>
//                   <th>Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((p) => (
//                   <tr key={p.id}>
//                     <td>{p.name}</td>
//                     <td>{p.vendorName}</td>
//                     <td>{p.stock}</td>
//                     <td>₹{p.price}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* SALES */}
//           <div className="card glass">
//             <h3>Recent Sales</h3>

//             <ul className="sales-list">
//               {sales.slice(0, 5).map((s) => (
//                 <li key={s.id}>
//                   <span>{s.productName}</span>
//                   <span>${s.amount}</span>
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
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, salesRes, vendorsRes, usersRes] =
        await Promise.all([
          axios.get("/inventory/products"),
          axios.get("/sales"),
          axios.get("/vendors"),
          axios.get("/users"),
        ]);

      setProducts(productsRes.data || []);
      setSales(salesRes.data || []);
      setVendors(vendorsRes.data || []);
      setUsers(usersRes.data || []);
    } catch (error) {
      console.error("Dashboard API error:", error);
    }
  };

  // ====================loadDashboard====================
console.log("AXIOS BASE URL:", axios.defaults.baseURL);


  const loadDashboard = async () => {
  try {
    const res = await axios.get("/inventory/products");
    console.log("PRODUCTS FROM API:", res.data); // 🔥 DEBUG

    setProducts(res.data); // ✅ ONLY THIS
  } catch (err) {
    console.error("Dashboard error", err);
  }
};






  // Calculations
  // const totalSales = sales.reduce(
  //   (sum, s) => sum + Number(s.amount || 0),
  //   0
  // );

  const totalSales = sales.reduce(
  (sum, s) => sum + Number(s.totalPrice || 0),
  0
);


  // const totalStock = products.reduce(
  //   (sum, p) => sum + Number(p.stock || 0),
  //   0
  // );

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
          <li>Invoices</li>
          <li>Clients</li>
          <li>Settings</li>
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
        <h1>Invoice Dashboard</h1>



        <pre style={{ color: "white", fontSize: "12px" }}>
  {JSON.stringify(products, null, 2)}
</pre>



        {/* STATS */}
        <div className="stats-grid">
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
        </div>

        {/* CONTENT */}
        <div className="content-grid">
          {/* PRODUCT TABLE */}
          <div className="glass">
            <h3>Product Data</h3>

            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Vendor</th>
                  <th>Stock</th>
                  <th>Price</th>
                </tr>
              </thead>
              {/* <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.vendorName}</td>
                    <td>{p.stock}</td>
                    <td>₹{p.price}</td>
                  </tr>
                ))}
              </tbody> */}

              <tbody>
  {products.map((p) => (
    <tr key={p.productId}>
      <td>{p.productName}</td>
      <td>{p.unit}</td>
      <td>{p.productStock}</td>
      <td>₹{p.productPrice}</td>
    </tr>
  ))}
</tbody>


            </table>
          </div>

          {/* RECENT SALES */}
          <div className="glass">
            <h3>Recent Sales</h3>

            {/* <ul className="sales-list">
              {sales.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <span>{s.productName}</span>
                  <span>₹{s.amount}</span>
                </li>
              ))}
            </ul> */}

              <ul className="sales-list">
  {sales.slice(0, 5).map((s) => (
    <li key={s.saleId}>
      <span>{s.productName}</span>
      <span>₹{s.totalPrice}</span>
    </li>
  ))}
</ul>


          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
