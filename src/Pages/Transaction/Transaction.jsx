import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Transaction.css";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import PaidIcon from "@mui/icons-material/Paid";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

import UserTransaction from "./UserTrasaction/UserTransaction";
import TransactionContent from "./Transaction1/TransactionContent";
import StoreTransaction from "./StoreTransation/StoreTransaction";
import DriverTransaction from "./DriverTransaction/DriverTransaction";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Transaction = () => {
  // const table = document.getElementsByClassName("list")
  const [page, setPage] = useState("transactions");
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="transactionheader">
        <div className="appname">
          <h3>Amezix</h3>
          <h4>Admin Panel</h4>
        </div>
        <div className="avatar">
        {/* <button className="logout-btn">Logout</button> */}
          <AccountCircleIcon
            style={{ fontSize: "60px", marginRight: "20px", cursor: "pointer" }}
          />
        </div>
      </div>
      <div className="transaction-container">
        <div className="transaction-side-panel">
          
            <p className="Users">
              <ArrowBackIcon
              
                // style={{ fontSize: "25px" }}
                onClick={() => navigate("/amezixadmin")}
                id="backToPanel"
              />
              <span onClick={() => setPage("transactions")}>Transation</span>
            </p>
            <hr />
            <div className="transaction-navigation">
              <p className="Drivers">
                <AccountCircleIcon style={{ fontSize: "25px" }} />
                <span onClick={() => setPage("usertransactions")}>
                  User Transaction
                </span>
              </p>
              <p className="Transation">
                <PaidIcon style={{ fontSize: "25px" }} />
                <span onClick={() => setPage("storetransactions")}>
                  Store Transation
                </span>
              </p>
              <p className="Sub_Admin">
                <SupervisorAccountIcon style={{ fontSize: "25px" }} />
                <span onClick={() => setPage("drivertransactions")}>
                  Driver Transaction
                </span>
              </p>
            
            </div>
        </div>
        <div className="transaction-maincontent">
          {page === "transactions" && <TransactionContent />}
          {page === "usertransactions" && <UserTransaction />}
          {page === "storetransactions" && <StoreTransaction />}
          {page === "drivertransactions" && <DriverTransaction />}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
