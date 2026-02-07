// import { useEffect, useState } from "react";
// import axios from "../Apis/axiosConfig";
// import { useNavigate } from "react-router-dom";

// function vendor() {
//    const navigate = useNavigate();  
//   const [vendor, setvendor] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadvendor();
//   }, []);

//   const loadvendor = async () => {
//     try {
//       const res = await axios.get("/vendor/all");

//       // VERY IMPORTANT (because backend returns ResponseEntity inside ResponseEntity)
//       const data = res.data?.body || [];

//       setvendor(data);
//     } catch (error) {
//       console.error("Error loading vendor", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <p style={{ color: "white" }}>Loading stock...</p>;
//   }

//   return (
//     <div className="dashboard-main">
//       <h1>Vendor</h1>

//       <div className="card glass">
//         <table>
//           <thead>
//             <tr>
//               <th>id</th>
//               <th>address</th>
//               <th>bank_details</th>
//               <th>contact_number/email</th>
//               <th>default_payment_terms</th>
//               <th>gstin_pin</th>
//               <th>vendor_name</th>
              
//             </tr>
//           </thead>

//           <tbody>
//             {vendor.length === 0 ? (
//               <tr>
//                 <td colSpan="7">No vendor found</td>
//               </tr>
//             ) : (
//               vendor.map((p) => (
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

// export default vendor;


import { useEffect, useState } from "react";
import axios from "../Apis/axiosConfig";
import { useNavigate } from "react-router-dom";

function Vendor() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      const res = await axios.get("/vendor/all");
      console.log("VENDOR API DATA:", res.data); // 🔥 DEBUG
      setVendors(res.data); // ✅ DIRECT ARRAY
    } catch (error) {
      console.error("Error loading vendor", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ color: "white" }}>Loading vendor...</p>;
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

      <h1>Vendor</h1>


    <div className="dashboard-main">
      <h1>Vendor</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vendor Name</th>
            <th>Address</th>
            <th>Bank</th>
            <th>Contact</th>
            <th>GSTIN</th>
            <th>Payment Terms</th>
          </tr>
        </thead>

        <tbody>
          {vendors.length === 0 ? (
            <tr>
              <td colSpan="7">No vendor found</td>
            </tr>
          ) : (
            vendors.map(v => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.vendorName}</td>
                <td>{v.address}</td>
                <td>{v.bankDetails}</td>
                <td>{v.contactNumber_email}</td>
                <td>{v.gstin_pan}</td>
                <td>{v.defaultPaymentTerms}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      
    </div>
     </div>
  );
}

export default Vendor;
