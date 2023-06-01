import EditProductForm from "./EditProductForm";
import { useState } from "react";

const Product = ({ productData, onSubmitProductEdit, onDelete, onAdd }) => {
  const [editFormVisible, setEditFormVisible] = useState(false);
  const handleEditClick = (e) => {
    if (e) {
      e.preventDefault();
    }
    setEditFormVisible((previous) => !previous);
  };

  return (
    <li class="product">
      <div class="product-details">
        <h3>{productData.title}</h3>
        <p class="price">{productData.price}</p>
        <p class="quantity">{productData.quantity} left in stock</p>
        <div class="actions product-actions">
          <button
            class="add-to-cart"
            onClick={(e) => {
              e.preventDefault();
              onAdd(productData._id);
            }}
          >
            Add to Cart
          </button>
          <button class="edit" onClick={handleEditClick}>
            Edit
          </button>
        </div>
        <button
          class="delete-button"
          onClick={(e) => {
            e.preventDefault();
            onDelete(productData._id);
          }}
        >
          <span>X</span>
        </button>
      </div>
      {editFormVisible ? (
        <EditProductForm
          productData={productData}
          onClick={handleEditClick}
          onSubmitProductEdit={onSubmitProductEdit}
        />
      ) : null}
    </li>
  );
};

export default Product;
