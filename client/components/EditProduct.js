const EditProduct = () => {
  return (
    <div class="edit-form">
      <h3>Edit Product</h3>
      <form>
        <div class="input-group">
          <label for="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value="Apple 10.5-Inch iPad Pro"
            aria-label="Product Name"
          />
        </div>

        <div class="input-group">
          <label for="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value="649.99"
            aria-label="Product Price"
          />
        </div>

        <div class="input-group">
          <label for="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value="2"
            aria-label="Product Quantity"
          />
        </div>

        <div class="actions form-actions">
          <button type="submit">Update</button>
          <button type="button">Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct;