import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./CustomReason.css";
import CloseIcon from "@mui/icons-material/Close";
const BannerModal = ({ closeCustomModal }) => {
  const updateNotify = () => toast("Banner is Added !!");

  return (
    <>
      <div className="custom-modal-container">
        <div className="custom-wrapper"></div>
        <div className="custom_details-container">
          <div className="custom_close-btn">
            <CloseIcon
              onClick={() => closeCustomModal()}
              id="custom_closemodal-btn"
            />
          </div>
          <div className="custom_rsn_modal">
            <h3>Create Reason</h3>
            <textarea
              name=""
              id=""
              cols="20"
              rows="10"
              placeholder="Deducted duty started charge"
            ></textarea>
            <div className="custom_submit_btn">
              <button> Submit </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default BannerModal;
