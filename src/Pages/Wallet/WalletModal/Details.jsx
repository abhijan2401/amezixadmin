import React, { useEffect, useState } from "react";
import "./Details.css";
import CustomReason from "./CustomReason";
import CloseIcon from "@mui/icons-material/Close";
import CachedIcon from "@mui/icons-material/Cached";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import { colors } from "@mui/material";
const BannerModal = ({ closeModal, setData, walletData }) => {
  console.log(walletData);
  const [modal, setModal] = useState(false);
  const closeCustomModal = () => setModal(false);

  const [fetchData, setfetchData] = useState({ ...setData });
  console.log(walletData);
  const [walletBalance, setWalletBalance] = useState(fetchData.totalamount);
  const [amountToAdd, setAmountToAdd] = useState("");
  const [amountToDeduct, setAmountToDeduct] = useState("");
  const [selectedReason, setSelectedReason] = useState("Select Reason");

  // const [amount, setAmount] = useState(false);

  const handleupdate = async () => {
    try {
      const response = await fetch(
        "http://ec2-3-108-56-128.ap-south-1.compute.amazonaws.com:8001/wallet",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            walletid: setData.walletid,
            totalamount: walletBalance,
          }),
        }
      );
    } catch (error) {
      console.log("Error", error);
    }
  };

  // const handleAddAmount = async () => {
  //   if (amountToAdd) {
  //     const newBalance = parseFloat(walletBalance) + parseFloat(amountToAdd);
  //     setWalletBalance(newBalance);
  //     setAmountToAdd("");
  //   }
  //   handleupdate();
  // };

  const handleAddAmount = async () => {
    if (amountToAdd) {
      const newBalance = parseFloat(walletBalance) + parseFloat(amountToAdd);
      setWalletBalance(newBalance);
      setAmountToAdd("");

      // Send data to the API
      try {
        const response = await fetch(
          "http://ec2-3-108-56-128.ap-south-1.compute.amazonaws.com:8001/walletdata",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: Math.floor(Math.random() * 100),
              walletid: setData.walletid,
              TransactionType: "credit",
              Amount: parseFloat(amountToAdd),
              SenderName: "xyz",
              SenderId: "123",
              ReceiverId: "458",
              ReceiverName: "abc",
            }),
          }
        );
        console.log("resp data:  ", response);
        if (!response.ok) {
          throw new Error("Failed to add amount to wallet.");
        }
      } catch (error) {
        console.error("Error adding amount to wallet:", error);
      }
      // handleupdate();
    }
  };

  const handleDeductAmount = async () => {
    if (amountToDeduct) {
      const newBalance = walletBalance - parseFloat(amountToDeduct);
      setWalletBalance(newBalance);
      setAmountToDeduct("");
      // Send data to the API
      try {
        const response = await fetch(
          "http://ec2-3-108-56-128.ap-south-1.compute.amazonaws.com:8001/walletdata",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: Math.floor(Math.random() * 100),
              walletid: setData.walletid,
              TransactionType: "debit",
              Amount: parseFloat(amountToAdd),
              SenderName: "pqrks",
              SenderId: "123485",
              ReceiverId: "71486",
              ReceiverName: "abchde",
            }),
          }
        );
        console.log("resp data:  ", response);
        if (!response.ok) {
          throw new Error("Failed to add amount to wallet.");
        }
      } catch (error) {
        console.error("Error adding amount to wallet:", error);
      }
    }
    // handleupdate();
  };

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
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
              <h4>{fetchData.walletid}</h4>
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
                  style={{ margin: "8px 0px 0px 30px", cursor: "pointer" }}
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
                  style={{ margin: "8px 0px 0px 30px", cursor: "pointer" }}
                  onClick={handleAddAmount}
                />
              </div>
            </div>
            <div className="deduction_rsn">
              <select
                name="Select Reason"
                id=""
                value={selectedReason}
                onChange={handleReasonChange}
              >
                <option value="Select Reason">Select Reason</option>
                <option value="Deducted delivery Cancelled">
                  Deducted delivery Cancelled
                </option>
                <option value=" Deducted late delivery Charge">
                  Deducted Late delivery Cancelled
                </option>
              </select>
            </div>
            <div className="rsn_btn">
              <button>Submit</button>
            </div>
          </div>
          {/* <div className="custom_rsn">
            <div>
              <button onClick={() => setModal(true)}>Custom Reason</button>
            </div>
          </div> */}
          <div className="enrty">
            {walletData.map((item, index) => {
              return (
                <>
                  <div className="display_wallet_transaction" key={index}>
                    {item.walletid === fetchData.walletid ? (
                      <>
                        {item.transactiontype === "credit" ? (
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
                              <ArrowOutwardIcon />
                            </div>
                          </>
                        )}

                        <div className="rsn_deduction_add_amt">
                          <p>{item.transactiontype}</p>
                        </div>

                        <div className="amount_display">
                          <p>-25 Rs</p>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              );
            })}
          </div>
          {/* <div className="display_wallet_transaction">
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
                  <ArrowOutwardIcon />
                </div>
              </>
            )}
            {walletData.map((item, index) => {
              return (
                <>
                  {item.walletid === fetchData.walletid ? (
                    <div className="rsn_deduction_add_amt">
                      <p>{item.transactiontype}</p>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="amount_display">
                    <p>-25 Rs</p>
                  </div>
                </>
              );
            })}
          </div> */}
        </div>
      </div>
      {modal && <CustomReason closeCustomModal={() => closeCustomModal()} />}
    </>
  );
};

export default BannerModal;
