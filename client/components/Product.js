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
    <li className="product">
      <div className="product-details">
        <h3>{productData.title}</h3>
        <p className="price">{productData.price}</p>
        {productData.quantity === 0 ? (
          <p className="quantity" style={{ color: "red" }}>
            0 left in stock
          </p>
        ) : (
          <p className="quantity">{productData.quantity} left in stock</p>
        )}
        <div className="actions product-actions">
          {productData.quantity === 0 ? (
            <button
              className="add-to-cart"
              onClick={(e) => {
                e.preventDefault();
                onAdd(productData._id);
              }}
              disabled
            >
              Add to Cart
            </button>
          ) : (
            <button
              className="add-to-cart"
              onClick={(e) => {
                e.preventDefault();
                onAdd(productData._id);
              }}
            >
              Add to Cart
            </button>
          )}
          <button className="edit" onClick={handleEditClick}>
            Edit
          </button>
        </div>
        <button
          className="delete-button"
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
