import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import "./Categories.css";
import { getNotes, deleteData } from "../../API";
import Modal from "../Categories/Cat_Modal/AddCat";
import Filter from "../../Components/Filter/Filter";
import Loader from "../../Components/Loader/Loader";
import pr_image from "../../assets/pr.jfif";

const Categories = () => {
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  const [category, setcategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const deleteNotify = () => toast("Category is Deleted !!", {
    position:"top-center" ,autoClose:"3000"
  });
  const fetchData = async () => {
    try {
      const response = await getNotes("globalcategory");
      setcategory(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  },[]);
  // Deleting the Table data
  const delete_Data = async (id, table_name) => {
    console.log("id and tablename", id, table_name);
    try {
      await deleteData({ id, table_name });
      const response = await getNotes("globalcategory");
      setcategory(response.data);
      deleteNotify();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="categorie-container">
      <div className="categoriefilter">
        {/* <Filter /> */}
        <div className="cat_add_btn">
          <button className="cat_btn" onClick={() => setModal(true)}>
            Add Category
          </button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="categorie-content">
            {category.map((category, index) => {
              return (
                <div className="cat_Card" key={category.id}>
                  <div className="product_img">
                    <img src={category.img} alt="loading..." />
                  </div>
                  <div className="product_name">
                    <h5>{category.categoryname}</h5>
                  </div>
                  <div className="cat_deletebtn">
                    <button
                      onClick={() => delete_Data(category.id, "globalcategory")}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {modal && <Modal closeModal={closeModal} />}
          <ToastContainer/>
        </>
      )}
    </div>
  );
};

export default Categories;
