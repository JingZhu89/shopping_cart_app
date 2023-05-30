import { useState, useEffect } from "react";
import Product from "./Product";
import AddProductForm from "./AddProductForm";
import FullCart from "./FullCart";
import EmptyCart from "./EmptyCart";
import EditProduct from "./EditProduct";
import data from "../mockData/data";
const cartData = [
  {
    id: 1,
    title: "Amazon Kindle E-reader",
    quantity: 2,
    price: 79.99
  },
  {
    id: 2,
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 1,
    price: 649.99
  }
];

const App = () => {
  const [productsData, setProductsData] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    setProductsData(data);
    setCart(cartData);
  },[])
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
          <AddProductForm />
        </main>
      </div>
    </body>
}
/* <body>

\

    <main>
      <div class="add-form">
        <p><button class="add-product-button">Add A Product</button></p>
        <h3>Add Product</h3>
        <form>
          <div class="input-group">
            <label for="product-name">Product Name:</label>
            <input
              type="text"
              id="product-name"
              name="product-name"
              required
            />
          </div>
          <div class="input-group">
            <label for="product-price">Price:</label>
            <input
              type="number"
              id="product-price"
              name="product-price"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div class="input-group">
            <label for="product-quantity">Quantity:</label>
            <input
              type="number"
              id="product-quantity"
              name="product-quantity"
              min="0"
              required
            />
          </div>
          <div class="actions form-actions">
            <button type="submit">Add</button>
            <button type="button">Cancel</button>
          </div>
        </form>
      </div>
    </main>
  </div>
</body> */

export default App;