import React, { useEffect, useState } from "react";
import "./bannerModal.css";
import Switch from "@mui/material/Switch";
import CloseIcon from "@mui/icons-material/Close";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from '../../../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { NameSeperator } from "../../../../Components/fileNameSeparator";
const BannerModal = ({ closeModal, role }) => {
  const [image, setIMage] = useState(null);
  const [fileName, setFileName] = useState("No selected File");
  // const [learnMore, setLearnMore] = useState();
  const [title, setTitle] = useState();
  const [link, setLink] = useState();
  const [titleImage, settitleImage] = useState("")
  const [checked, setChecked] = React.useState(false);
  const [ImageUrl, setImageUrl] = useState("")
  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(event.target.checked);
  };
  useEffect(() => {
    console.log("role--", role);
  });

  const handleSubmit = async (e) => {
    const dateVal = new Date()
    const final = await getDownloadUrl(titleImage)
    console.log(final, "i am finasl");
    try {
      console.log("btn checked", checked);
      const response = await fetch(
        "http://ec2-3-108-56-128.ap-south-1.compute.amazonaws.com:8001/Banner",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Title: title,
            LearnMore: link,
            LearnMoreActive: checked,
            LastUpdate: dateVal,
            Status: "active",
            Role: role,
            Image: final,
          }),
        }
      );
      const res = await response.json();
      console.log("hello", res);
      if (res.message === "You data is inserted") {
        console.log("hey!");
        closeModal();
      } else {
        console.log("hello!");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  const getDownloadUrl = async (file) => {
    // console.log(fileName, "i am file")

    const result = Math.random().toString(36).substring(2, 7);
    console.log(result);;
    console.log(file.name, "I am djn");
    const storageRef = ref(storage, `/Ads/${result + file.name}`);
    console.log(storageRef, "i am rcbshb");
    const uploadTask = await uploadBytesResumable(storageRef, file).then((res) => {
      console.log(res, "I am response");
    })
    // Get the download URL
    const resp = await getDownloadURL(storageRef)
      .then((url) => {
        // console.log(url, "njzscn");
        return url

      }).catch((e) => {
        console.log(e, "error");
      })
    // console.log(resp, "i am resp");
    return resp
  }
  const handleImageValue = (e) => {
    const namesArray = NameSeperator(e.target.files[0].type);
    console.log(namesArray);
    if (namesArray[0] === "image") {
      settitleImage(e.target.files[0])
      // getImage(e.target.files[0]);
      // setName(e.target.files[0].name)
    }
    else {
      alert("Please Select Image");
    }
  }
  return (
    <>
      <div className="banner-modal-container">
        <div className="modal-wrapper"></div>
        <div className="modal-container">
          <div className="close-btn">
            <CloseIcon onClick={() => closeModal()} id="closemodal-btn" />
          </div>
          <div className="modal-content">
            <div className="modal-form">
              <div className="title">
                <label htmlFor="title-text">Title :</label>
                <input
                  type="text"
                  id="title-text"
                  placeholder="Enter the title"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
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
                        setIMage(URL.createObjectURL(files[0]));
                      }
                    }}
                  />
                  {image ? (
                    <img src={image} alt="File_Image"></img>
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
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </p>
              </div>
              <div className="youtubelink">
                <label htmlFor="">Youtube Link :</label>
                <input
                  type="text"
                  placeholder="paste link here"
                  id="paste-link"
                  name="youtubeLink"
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              <div className="modalsave-btn">
                <button className="save-btn" onClick={handleSubmit}>
                  Save
                </button>

              </div>
              <button onClick={getDownloadUrl}>tbn</button>
              <input type="file" id='file_55' onChange={handleImageValue} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerModal;
