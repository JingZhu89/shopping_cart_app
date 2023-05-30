const AddProductForm = () => {
  return (
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
  )
}

export default AddProductForm;