// Import necessary dependencies and modules
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import customFetch from "../apiCall";
import { addproducts } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastMessage } from "../Notification/notify";

// Styled component for the container
const Container = styled.div`
  width: 50%;
  margin: auto;
  @media only screen and (max-width: 976px) {
    width: 90%;
  }
  @media only screen and (max-width: 576px) {
    width: 100%;
    margin: 0;
  }
`;

// Functional component for adding a product
export default function AddProduct() {
  // Retrieve products from the Redux store using the useSelector hook
  const products = useSelector((state) => state.products);
  // Access the dispatch function using the useDispatch hook
  const dispatch = useDispatch();
  // Access the navigate function from react-router-dom using the useNavigate hook
  const navigate = useNavigate();

  // Define state variables and their corresponding setters using the useState hook
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [thumbnail, setthumbmail] = useState("");
  const [rating, setrating] = useState("");

  // URL for the API endpoint to add a product
  let url = "https://my-json-server.typicode.com/rahimunshaik/rahimunshaik/products";

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Make a custom fetch request to add a product
    let result = customFetch(url, {
      body: {
        id: Date.now(),
        title: name,
        price,
        category,
        thumbnail,
        rating,
        description,
        edit: true,
      },
      method: "POST",
    });

    // Handle the response from the fetch request
    result.then((data) => {
      // Dispatch the addproducts action to add the new product to the Redux store
      dispatch(addproducts([data, ...products]));
      // Navigate to the home page
      navigate("/");
    });

    // Show a toast message to indicate that the product was added successfully
    showToastMessage("Product Added Successful", "success");

    // Reset the state variables to empty strings
    setname("");
    setcategory("");
    setdescription("");
    setrating("");
    setthumbmail("");
    setprice("");
  }

  // Render the form for adding a product
  return (
    <Container className="bg-light border border-1 border-dark mt-4 p-3 ">
      <ToastContainer />
      <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="p-2"
          placeholder="Name"
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="text"
          className="p-2"
          placeholder="Descriptions"
          onChange={(e) => setdescription(e.target.value)}
        />
        <input
          type="text"
          className="p-2"
          placeholder="Price"
          onChange={(e) => setprice(e.target.value)}
        />
        <input
          type="text"
          className="p-2"
          placeholder="category"
          onChange={(e) => setcategory(e.target.value)}
        />
        <input
          type="text"
          className="p-2"
          placeholder="Thumbnail image Url"
          onChange={(e) => setthumbmail(e.target.value)}
        />
        <input
          type="text"
          className="p-2"
          placeholder="ratings"
          onChange={(e) => setrating(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary align-self-end mt-4"
          style={{
            width: "9rem",
            backgroundColor: "var(--nav)",
          }}
        >
          Add to Cart
        </button>
      </form>
    </Container>
  );
}
