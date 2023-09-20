import React, { useState, useEffect } from "react";
import "./Wallet.css";
import WalletModal from "./WalletModal/Details";
import Loader from "../../Components/Loader/Loader";
import { getNotes } from "../../API";

const Wallet = () => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(false);

  const [walletData, setWalletData] = useState([]);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getNotes("walletdata");
      console.log(response);
      // setStoreOrder(response.data);
      setWalletData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // SeeDetails
  const SeeDetails = async (id) => {
    let newdata = walletData.find((element) => {
      return element.id === id;
    });
    setData(newdata);
    console.log(newdata);
    setModal(true);
    await fetchData();
    console.log("i am called2");
  };

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
              {walletData.map((item, index) => {
                return (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.receivername}</td>
                    <td>User</td>
                    <td>{item.amount}</td>
                    <td>
                      <button
                        className="wallet_btn"
                        onClick={() => SeeDetails(item.id)}
                      >
                        See Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {modal && <WalletModal closeModal={() => closeModal()} setData={data}/>}
      </>
      {/* )} */}
    </div>
  );
};

export default Wallet;
