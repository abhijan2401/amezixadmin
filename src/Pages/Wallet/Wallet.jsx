import React, { useState } from "react";
import "./Wallet.css";
import WalletModal from "./WalletModal/Details";
import Loader from "../../Components/Loader/Loader";
const Wallet = () => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  return (
    <div className="wallet-container">
      <div className="User-content">
        <div className="User">
          <h4>User Wallet</h4>
          <p>15</p>
        </div>
        <div className="User">
          <h4>Store Wallet</h4>
          <p>58</p>
        </div>
        <div className="User">
          <h4>Driver Wallet</h4>
          <p>21</p>
        </div>
      </div>
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
                <th>Role</th>
                <th>Wallet Balance</th>
                <th>Details</th>
              </tr>
              <tr>
                <td>15+6+864</td>
                <td>Rohan</td>
                <td>User</td>
                <td>51266</td>
                <td>
                  <button className="wallet_btn" onClick={() => setModal(true)}>
                    See Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {modal && <WalletModal  closeModal={() => closeModal()} />}
      </>
      {/* )} */}
    </div>
  );
};

export default Wallet;
