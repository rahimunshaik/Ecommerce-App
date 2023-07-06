

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { showToastMessage } from "../Notification/notify";
import "react-toastify/dist/ReactToastify.css";
import BasicRating from "./BasicRating";
import { ProductToview, addproducts } from "../actions";
import { addCart, CartItems } from "../actions";
import customFetch from "../apiCall";

export default function ProductItem({ item }) {
  const [addedItem, setaddedItem] = useState(true);
  const [title, settitle] = useState(item.title);
  const [price, setprice] = useState(item.price);
  const [rating, setrating] = useState(item.rating);
  const [description, setdescription] = useState(item.description);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchCart = useDispatch();
  const dispatchTotal = useDispatch();
  const dispatchProduct = useDispatch();

  function handleClick(item) {
    dispatch(ProductToview(item));
    navigate(`/productdetails/${item.id}`);
  }

  function handleCart(item) {
    if (addedItem) {
      item.qty = 1;
      dispatchCart(addCart(item));
      dispatchTotal(CartItems());
      setaddedItem(false);
      showToastMessage("item Added to cart", "success");
    } else {
      navigate("/cart");
    }
  }

  function handleEdit(item) {
    item.edit = false;
    dispatchProduct(addproducts([...products]));
  }

  function handleDelelteProduct(item) {
    let url = `https://my-json-server.typicode.com/rahimunshaik/rahimunshaik/products/${item.id}`;
    customFetch(url, { method: "DELETE" });

    let index = products.indexOf(item);
    products.splice(index, 1);
    dispatchProduct(addproducts([...products]));
    showToastMessage("item deleted", "warning");
  }

  function handleCancel(item) {
    item.edit = true;
    dispatchProduct(addproducts([...products]));
  }

  function handleSave(item) {
    let url = `https://my-json-server.typicode.com/rahimunshaik/rahimunshaik/products/${item.id}`;
    customFetch(url, {
      body: {
        ...item,
        title,
        price,
        rating,
        description,
        edit: true,
      },
      method: "PUT",
    }).then((data) => {
      let index = products.indexOf(item);
      products[index] = data;

      dispatchProduct(addproducts([...products]));
      showToastMessage("Edit successful", "success");
    });
  }

  return (
    <div className="d-flex container-sm bg-white px-1 py-5 mt-4 flex-column flex-lg-row gap-3">
      <ToastContainer />
      <div className="d-flex container-sm gap-5">
        <img
          src={item.thumbnail}
          alt=""
          width={"200rem"}
          onClick={() => handleClick(item)}
        />
        <div className="d-flex flex-column gap-2">
          {item.edit ? (
            <span>{item.title}</span>
          ) : (
            <input
              type="text"
              value={title}
              className="w-50"
              onChange={(e) => settitle(e.target.value)}
            ></input>
          )}
          {item.edit ? (
            <span>{item.price}</span>
          ) : (
            <input
              type="text"
              value={price}
              className="w-50"
              onChange={(e) => setprice(e.target.value)}
            ></input>
          )}
          {item.edit ? (
            <BasicRating value={item.rating} />
          ) : (
            <div>
              <h5>Ratings:</h5>
              <input
                type="number"
                max={"5"}
                min={"0"}
                value={rating}
                step={"0.5"}
                onChange={(e) => setrating(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="p-2">
        {item.edit ? (
          <span>{item.description}</span>
        ) : (
          <div className="form-floating">
            <textarea
              className="form-control"
              value={description}
              id="floatingTextarea"
              style={{ width: "20rem", height: "5rem" }}
              onChange={(e) => setdescription(e.target.value)}
            ></textarea>
          </div>
        )}
      </div>
      <div className="align-self-end d-flex align-items-center gap-4 flex-lg-grow-1 p-1">
        {item.edit ? (
          <button
            type="button"
            className="btn btn-primary"
            style={{
              width: "9rem",
              backgroundColor: "var(--nav)",
            }}
            onClick={() => handleCart(item)}
          >
            {addedItem ? "Add to Cart" : "Go to Cart "}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => handleCancel(item)}
          >
            Cancel
          </button>
        )}
        {item.edit ? (
          <>
            <span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3196/3196909.png"
                alt="error"
                width={"30rem"}
                style={{ cursor: "pointer" }}
                onClick={() => handleEdit(item)}
              />
            </span>
            <span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/8556/8556073.png"
                alt="error"
                width={"30rem"}
                style={{ cursor: "pointer" }}
                onClick={() => handleDelelteProduct(item)}
              />
            </span>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => handleSave(item)}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
