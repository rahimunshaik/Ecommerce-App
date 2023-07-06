import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addproducts } from "./actions/index";
import customFetch from "./apiCall";
import Nav from "./Component/Nav";
import ProductDetail from "./Component/ProductDetail";
import AddProduct from "./Component/AddProduct";
import CartItems from "./Component/CartItems";
import ProductItemList from "./Component/ProductItemList";

function App() {
  const productDetailItem = useSelector((state) => state.itemToDisplay);
  const dispatch = useDispatch();
  const url = "https://my-json-server.typicode.com/rahimunshaik/rahimunshaik/db";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch(url, {
          method: "GET",
        });
        const modifiedData = response.products.map((item) => {
          item.edit = true;
          return item;
        });
        window.localStorage.setItem("products", JSON.stringify(modifiedData));
        const products = JSON.parse(window.localStorage.getItem("products"));
        dispatch(addproducts(products));
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, url]);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<ProductItemList />} />
          <Route path="/addproducts" element={<AddProduct />} />
          <Route
            path={`/productdetails/${productDetailItem.id}`}
            element={<ProductDetail item={productDetailItem} />}
          />
          <Route path="/cart" element={<CartItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
