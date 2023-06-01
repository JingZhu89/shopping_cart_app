import { useState, useEffect } from "react";
import Product from "./Product";
import AddProductWrapper from "./AddProductWrapper";
import FullCart from "./FullCart";
import EmptyCart from "./EmptyCart";
import axios from "axios";

const App = () => {
  const [productsData, setProductsData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getProductData = async () => {
      const response = await axios.get("/api/products");
      setProductsData(response.data);
    };

    const getCartData = async () => {
      const response = await axios.get("/api/cart");
      setCart(response.data);
    };

    getProductData();
    getCartData();
  }, []);

  const handleAddProductSubmit = async (title, price, quantity, reset) => {
    try {
      const response = await axios.post("/api/products", {
        title,
        price,
        quantity,
      });
      setProductsData((previous) => previous.concat(response.data));
      reset();
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
    }
  };

  const handleEditProductSubmit = async (submittedProduct, onClick) => {
    try {
      const response = await axios.put(
        `/api/products/${submittedProduct._id}`,
        {
          title: submittedProduct.productTitle,
          price: submittedProduct.productPrice,
          quantity: submittedProduct.productQuantity,
        }
      );

      setProductsData((previous) =>
        previous.map((product) => {
          if (product._id === submittedProduct._id) {
            return response.data;
          } else {
            return product;
          }
        })
      );
      onClick();
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`/api/products/${id}`);
      setProductsData((previous) =>
        previous.filter((product) => {
          return product._id !== id;
        })
      );
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
    }
  };

  const handleAddProductToCart = async (id) => {
    try {
      console.log(id);
      const response = await axios.post("/api/add-to-cart", { productId: id });
      console.log(response.data);
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
    }
  };

  return (
    <body>
      <div id="app">
        <header>
          <h1>The Shop!</h1>
          {cart.length === 0 ? <EmptyCart /> : <FullCart cart={cart} />}
        </header>
        <main>
          <div class="product-listing">
            <h2>Products</h2>
            <ul class="product-list">
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
    </body>
  );
};

export default App;
