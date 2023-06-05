import { useState } from "react";
const EditProductForm = ({ productData, onSubmitProductEdit, onClick }) => {
  const [productTitle, setProductTitle] = useState(productData.title);
  const [productQuantity, setProductQuantity] = useState(productData.quantity);
  const [productPrice, setProductPrice] = useState(productData.price);

  const onSubmit = (e) => {
    e.preventDefault();
    const submittedProduct = {
      _id: productData._id,
      productTitle,
      productPrice,
      productQuantity,
    };
    onSubmitProductEdit(submittedProduct, onClick);
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            data-testid="product-name"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            aria-label="Product Name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            aria-label="Product Price"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            aria-label="Product Quantity"
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={onClick}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
