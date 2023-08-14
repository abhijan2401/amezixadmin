import React, { useEffect, useState } from "react";
import "./AddCat.css";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { NameSeperator } from "../../../Components/fileNameSeparator";
import CloseIcon from "@mui/icons-material/Close";

const AddCat = ({ closeModal }) => {
  const [product, setProduct] = useState();
  const [titleImage, settitleImage] = useState("");

  const handleSubmit = async (e) => {
    const dateVal = new Date();
    const final = await getDownloadUrl(titleImage);
    console.log(final, "i am finasl");
    console.log(product, "product name");
    try {
      const response = await fetch(
        "http://ec2-3-108-56-128.ap-south-1.compute.amazonaws.com:8001/globalCategory/add",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryname: product,
            img: final,
          }),
        }
      );
      const res = await response.json();
      console.log("hello", res);
      if (res.data === undefined) {
        alert("Error occur while uploading");
      } else {
        closeModal();
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getDownloadUrl = async (file) => {
    // console.log(fileName, "i am file")
    const result = Math.random().toString(36).substring(2, 7);
    console.log(result);
    console.log(file.name, "I am djn");
    const storageRef = ref(storage, `/CategoryImage/${result + file.name}`);
    console.log(storageRef, "i am rcbshb");
    const uploadTask = await uploadBytesResumable(storageRef, file).then(
      (res) => {
        console.log(res, "I am response");
      }
    );
    // Get the download URL
    const resp = await getDownloadURL(storageRef)
      .then((url) => {
        // console.log(url, "njzscn");
        return url;
      })
      .catch((e) => {
        console.log(e, "error");
      });
    // console.log(resp, "i am resp");
    return resp;
  };
  const handleImageValue = (e) => {
    const namesArray = NameSeperator(e.target.files[0].type);
    console.log(namesArray);
    if (namesArray[0] === "image") {
      settitleImage(e.target.files[0]);
      // getImage(e.target.files[0].name);
      // setName(e.target.files[0].name)
    } else {
      alert("Please Select Image");
    }
  };
  return (
    <>
      <div className="cat_banner-modal-container">
        <div className="cat_modal-wrapper"></div>
        <div className="cat_modal-container">
          <div className="cat_close-btn">
            <CloseIcon onClick={() => closeModal()} id="cat_closemodal-btn" />
          </div>
          <div className="cat_modal-content">
            <div className="cat_modal-form">
              <div className="title">
                <label htmlFor="product_name">Product Name :</label>
                <input
                  type="text"
                  id="product_name"
                  placeholder="Enter the product name"
                  name="title"
                  onChange={(e) => setProduct(e.target.value)}
                />
              </div>
              <div className="cat_image-section">
                <label htmlFor="">Product Image :</label>
                <div
                  className="cat_image-container"
                  onClick={() => document.querySelector(".input-field").click()}
                >
                  <input
                    hidden
                    className="input-field"
                    type="file"
                    id="file_55"
                    onChange={handleImageValue}
                  />
                  {titleImage ? (
                    <img
                      src={URL.createObjectURL(titleImage)}
                      alt="File_Image"
                    ></img>
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
              <div className="cat_modalsave-btn">
                <button className="cat_save-btn" onClick={handleSubmit}>
                  Save
                </button>
              </div>
              {/* <button onClick={getDownloadUrl}>tbn</button> */}
              {/* <input type="file" id='file_55' onChange={handleImageValue} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCat;
