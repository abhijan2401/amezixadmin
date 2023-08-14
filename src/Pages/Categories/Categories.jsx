import React, { useEffect, useState } from "react";
import "./Categories.css";
import { getNotes } from "../../API";
import Modal from "../Categories/Cat_Modal/AddCat";
import Filter from "../../Components/Filter/Filter";
import Loader from "../../Components/Loader/Loader";
import pr_image from "../../assets/pr.jfif";

const Categories = () => {
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  const [category, setcategory] = useState([]);
  const [loading, setLoading] = useState(true);

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
  fetchData();

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
                </div>
              );
            })}
          </div>
          {modal && <Modal closeModal={closeModal} />}
        </>
      )}
    </div>
  );
};

export default Categories;
