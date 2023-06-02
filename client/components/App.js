import { useState, useEffect } from "react";
import Product from "./Product";
import AddProductWrapper from "./AddProductWrapper";
import FullCart from "./FullCart";
import EmptyCart from "./EmptyCart";
import axios from "axios";

const App = () => {
  const [productsData, setProductsData] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getProductData = async () => {
      const response = await axios.get("/api/products");
      setProductsData(response.data);
    };

    const getCartData = async () => {
      const response = await axios.get("/api/cart");
      setCart(response.data);
      setTotal(
        response.data
          .reduce((sum, item) => {
            return sum + item.price * item.quantity;
          }, 0)
          .toFixed(2)
      );
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
      await axios.delete(`/api/products/${id}`);
      setProductsData((previous) =>
        previous.filter((product) => {
          return product._id !== id;
        })
      );
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
    }
  };

  const updateProductData = (previous, newProduct) => {
    return previous.map((product) => {
      if (product._id === newProduct._id) {
        return newProduct;
      } else {
        return product;
      }
    });
  };

  const updateCart = (previous, newCartItem) => {
    return previous
      .filter((item) => {
        return item._id !== newCartItem._id;
      })
      .concat(newCartItem);
  };

  const handleAddProductToCart = async (id) => {
    try {
      if (productsData.find((product) => product._id === id).quantity === 0) {
        return;
      }

      const response = await axios.post("/api/add-to-cart", { productId: id });
      const newProduct = response.data.product;
      const newCartItem = response.data.item;

      setProductsData((previous) => updateProductData(previous, newProduct));

      setCart((previous) => updateCart(previous, newCartItem));

      setTotal((previous) => (Number(previous) + newCartItem.price).toFixed(2));
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
    }
  };

  const handleCheckOut = async (event) => {
    try {
      event.preventDefault();
      await axios.post("/api/checkout");
      setCart([]);
      setTotal(0);
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
            <FullCart cart={cart} total={total} onCheckout={handleCheckOut} />
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
