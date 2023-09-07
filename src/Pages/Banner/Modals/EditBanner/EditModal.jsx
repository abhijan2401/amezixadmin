import React, { useState, useEffect } from "react";
import "./EditModal.css";
import Switch from "@mui/material/Switch";
import CloseIcon from "@mui/icons-material/Close";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const EditModal = ({ closeEditModal, selectedData }) => {
  const [editedData, setEditedData] = useState({ ...selectedData });
  console.log(editedData);
  const [image, setImage] = useState(editedData.image);
  const [checked, setChecked] = React.useState(false);
  const [fileName, setFileName] = useState("No selected File");

  const updateNotify = () => toast("Banner Updated!!");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSwitchChange = (event) => {
    const { name, checked } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: checked.toString(), // Convert boolean to string
    }));
  };
  const handleSubmit = async (e) => {
    const dateVal = new Date();
    // const final = await getDownloadUrl(titleImage);
    // console.log(final, "i am finasl");
    try {
      console.log("btn checked", checked);
      const response = await fetch(
        "http://ec2-3-108-56-128.ap-south-1.compute.amazonaws.com:8001/update",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: editedData.id,
            updateData: {
              Title: editedData.title,
              learnMore: editedData.learnmore,
              LearnMoreActive: editedData.learnmoreactive === "true",
              LastUpdate: dateVal.toISOString(),
              Status: "active",
            },
            tablename: "banner",
          }),
        }
      );
      const res = await response.json();
      console.log("hello", res);
      updateNotify();
      if (res.message === "Your data is updated") {
        console.log("hey!");
        closeEditModal();
      } else {
        console.log("hello!");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <div className="banner-modal-container">
        <div className="EditModal-modal-wrapper"></div>
        <div className="EditModal-modal-container">
          <div className="EditModalclose-btn">
            <CloseIcon onClick={() => closeEditModal()} id="closemodal-btn" />
          </div>
          <div className="EditModal-modal-content">
            <div className="EditModal-modal-form">
              <div className="title">
                <label htmlFor="title-text">Title :</label>
                <input
                  type="text"
                  id="title-text"
                  placeholder="Enter the title"
                  name="title"
                  value={editedData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="image-section">
                <label htmlFor="">Image :</label>
                <div
                  className="image-container"
                  onClick={() => document.querySelector(".input-field").click()}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="input-field"
                    hidden
                    onChange={({ target: { files } }) => {
                      files[0] && setFileName(files[0].name);
                      if (files) {
                        setImage(URL.createObjectURL(files[0]));
                      }
                    }}
                  />
                  {image ? (
                    <img src={image} alt="File Image"></img>
                  ) : (
                    <h3
                      style={{
                        cursor: "pointer",
                        background: "#dfe6e9",
                        padding: "8px",
                      }}
                    >
                      Choose File
                    </h3>
                  )}
                </div>
              </div>
              <div className="learn-more">
                <label htmlFor="">Learn More :</label>
                <p id="modalswitch">
                  <Switch
                    checked={editedData.learnmoreactive === "true"}
                    onChange={handleSwitchChange}
                    name="learnmoreactive"
                  />
                </p>
              </div>
              <div className="youtubelink">
                <label htmlFor="">Youtube Link :</label>
                <input
                  type="text"
                  placeholder="paste link here"
                  id="paste-link"
                  value={editedData.learnmore}
                  onChange={handleInputChange}
                  name="learnmore"
                />
              </div>
              <div className="modalsave-btn">
                <button className="save-btn" onClick={handleSubmit}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default EditModal;
