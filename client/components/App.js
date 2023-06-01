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
      const response = await axios.get('/api/products');
      setProductsData(response.data);
    };

    const getCartData = async () => {
      const response = await axios.get('/api/cart');
      setCart(response.data);
    };

    getProductData();
    getCartData();
  }, [])

  const handleAddProductSubmit = async (title, price, quantity, reset) => {
    try {
      const response = await axios.post('/api/products', {
        title,
        price,
        quantity
      });

      setProductsData((previous) => previous.concat(response.data));

      reset();
    } catch (e) {
      console.log(`ERROR: ${e.message}`)
    }
  };

  return <body>
      <div id="app">
        <header>
          <h1>The Shop!</h1>
          {cart.length === 0 ? <EmptyCart /> : <FullCart cart = {cart} />}
        </header>
        <main>
          <div class="product-listing">
            <h2>Products</h2>
            <ul class="product-list">
              {productsData.map((productData) => {
                return <Product key={productData.id} {...productData}/>
              })}
            </ul>
          </div>
          <AddProductWrapper onSubmit={handleAddProductSubmit} />
        </main>
      </div>
    </body>
}

export default App;
