import EditProduct from "./EditProduct";
import { useState, useEffect } from "react";

const Product = ({title, quantity, price}) => {
  const [editFormVisible, setEditFormVisible] = useState(false);
  return (
    <li class="product">
      <div class="product-details">
        <h3>{title}</h3>
        <p class="price">{price}</p>
        <p class="quantity">{quantity} left in stock</p>
        <div class="actions product-actions">
          <button class="add-to-cart">Add to Cart</button>
          <button class="edit">Edit</button>
        </div>
        <button class="delete-button"><span>X</span></button>
      </div>
      { editFormVisible ? <EditProduct /> : null}

    </li>
  )
}

export default Product;
