import React, { useState } from "react";
import "./Wallet.css";
import Loader from "../../Components/Loader/Loader";
const Wallet = () => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="wallet-container">
      {/* {loading ? (
        <Loader />
      ) : ( */}
        <>
          <div className="wallet-content"></div>
          <div className="wallet-list">
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <th>#Id</th>
                  <th>Name</th>
                  <th>Product Name</th>
                  <th>Status</th>
                  <th>Payment Mode</th>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      {/* )} */}
    </div>
  );
};

export default Wallet;
