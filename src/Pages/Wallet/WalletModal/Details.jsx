import React, { useEffect, useState } from "react";
import "./Details.css";
import CustomReason from "./CustomReason";
import CloseIcon from "@mui/icons-material/Close";
import CachedIcon from "@mui/icons-material/Cached";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
const BannerModal = ({ closeModal, setData }) => {
  const [modal, setModal] = useState(false);
  const closeCustomModal = () => setModal(false);

  const [fetchData, setfetchData] = useState({ ...setData });

  const [walletBalance, setWalletBalance] = useState(fetchData.amount);
  const [amountToAdd, setAmountToAdd] = useState("");
  const [amountToDeduct, setAmountToDeduct] = useState("");

  const handleAddAmount = () => {
    if (amountToAdd) {
      const newBalance = parseFloat(walletBalance) + parseFloat(amountToAdd);
      setWalletBalance(newBalance);
      setAmountToAdd("");
    }
  };

  const handleDeductAmount = () => {
    if (amountToDeduct) {
      const newBalance = walletBalance - parseFloat(amountToDeduct);
      setWalletBalance(newBalance);
      setAmountToDeduct("");
    }
  };

  return (
    <>
      <div className="wallet-modal-container">
        <div className="wallet-wrapper"></div>
        <div className="wallet_details-container">
          <div className="wallet_close-btn">
            <CloseIcon
              onClick={() => closeModal()}
              id="wallet_closemodal-btn"
            />
          </div>
          <div className="wallet_user_details">
            <div className="wallet_user">
              <h4>{fetchData.receivername}</h4>
              <p>User</p>
            </div>
            <div className="wallet_balance">
              <h4>Wallet Balance</h4>
              <p>{walletBalance}</p>
            </div>
            <div className="wallet_cnt_number">
              <CachedIcon id="refresh_btn" />
              <h4>{fetchData.id}</h4>
            </div>
          </div>
          <div className="add_wallet_amount">
            <div className="add_deduct_amount">
              <div className="deduct">
                <input
                  type="number"
                  value={amountToDeduct}
                  onChange={(e) => setAmountToDeduct(e.target.value)}
                />
                <RemoveIcon
                  style={{ margin: "8px 0px 0px 30px", cursor:"pointer" }}
                  onClick={handleDeductAmount}
                />
              </div>
              <div className="add">
                <input
                  type="number"
                  value={amountToAdd}
                  onChange={(e) => setAmountToAdd(e.target.value)}
                />
                <AddIcon
                  style={{ margin: "8px 0px 0px 30px" , cursor:"pointer"}}
                  onClick={handleAddAmount}
                />
              </div>
            </div>
            <div className="deduction_rsn">
              <select name="Select Reason" id="">
                <option value="Select Reason">Select Reason</option>
                <option value="Select Reason">
                  Deducted delivery Cancelled
                </option>
                <option value="Select Reason">
                  Deducted delivery Cancelled
                </option>
              </select>
            </div>
            <div className="rsn_btn">
              <button>Submit</button>
            </div>
          </div>
          <div className="custom_rsn">
            <div>
              <button onClick={() => setModal(true)}>Custom Reason</button>
            </div>
          </div>
          <div className="display_wallet_transaction">
            {fetchData.transactiontype === "Credit" ? (
              <>
                <div
                  className="amount_status"
                  style={{ backgroundColor: "green" }}
                >
                  <CallReceivedIcon />
                </div>
              </>
            ) : (
              <>
                <div className="amount_status">
                  <ArrowOutwardIcon/>
                </div>
              </>
            )}

            <div className="rsn_deduction_add_amt">
              <p>{fetchData.transactiontype}</p>
            </div>
            <div className="amount_display">
              <p>-25 Rs</p>
            </div>
          </div>
        </div>
      </div>
      {modal && <CustomReason closeCustomModal={() => closeCustomModal()} />}
    </>
  );
};

export default BannerModal;
