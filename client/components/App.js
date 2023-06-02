import { useState, useEffect } from "react";
import Product from "./Product";
import AddProductWrapper from "./AddProductWrapper";
import FullCart from "./FullCart";
import EmptyCart from "./EmptyCart";
import axios from "axios";
import { updateCart, updateProducts, removeProduct } from "../services/helper";
import {
  getProducts,
  getCart,
  addProduct,
  editProduct,
  deleteProduct,
} from "../services/app";

const App = () => {
  const [productsData, setProductsData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getProductData = async () => {
      const products = await getProducts();
      setProductsData(products);
    };

    const getCartData = async () => {
      const cart = await getCart();
      setCart(cart);
    };
    getProductData();
    getCartData();
  }, []);

  const handleAddProductSubmit = async (addedProduct, reset) => {
    try {
      const newProduct = await addProduct(addedProduct);
      setProductsData((previous) => previous.concat(newProduct));
      reset();
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
    }
  };

  const handleEditProductSubmit = async (editedProduct, onClick) => {
    try {
      const newProduct = await editProduct(editedProduct);
      setProductsData((previous) => updateProducts(previous, newProduct));
      onClick();
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProductsData((previous) => removeProduct(previous, id));
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
    }
  };

  const handleAddProductToCart = async (id) => {
    try {
      if (productsData.find((product) => product._id === id).quantity === 0) {
        return;
      }
      const response = await axios.post("/api/add-to-cart", { productId: id });
      const newProduct = response.data.product;
      const newCartItem = response.data.item;
      setProductsData((previous) => updateProducts(previous, newProduct));
      setCart((previous) => updateCart(previous, newCartItem));
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
    }
  };

  const handleCheckOut = async (event) => {
    try {
      event.preventDefault();
      await axios.post("/api/checkout");
      setCart([]);
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
    }
  };

  return (
    <>
      <div id="app">
        <header>
          <h1>The Shop!</h1>
          {cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <FullCart cart={cart} onCheckout={handleCheckOut} />
          )}
        </header>
        <main>
          <div className="product-listing">
            <h2>Products</h2>
            <ul className="product-list">
              {productsData.map((productData) => {
                return (
                  <Product
                    key={productData._id}
                    productData={productData}
                    onSubmitProductEdit={handleEditProductSubmit}
                    onDelete={handleDeleteProduct}
                    onAdd={handleAddProductToCart}
                  />
                );
              })}
            </ul>
          </div>
          <AddProductWrapper onSubmit={handleAddProductSubmit} />
        </main>
      </div>
    </>
  );
};

export default App;
