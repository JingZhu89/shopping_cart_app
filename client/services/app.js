import axios from "axios";

export const getProducts = async () => {
  const response = await axios.get("/api/products");
  return response.data;
};

export const getCart = async () => {
  const response = await axios.get("/api/cart");
  return response.data;
};

export const addProduct = async (addedProduct) => {
  const response = await axios.post("/api/products", addedProduct);
  return response.data;
};

export const editProduct = async (editedProduct) => {
  const response = await axios.put(`/api/products/${editedProduct._id}`, {
    title: editedProduct.productTitle,
    price: editedProduct.productPrice,
    quantity: editedProduct.productQuantity,
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`/api/products/${id}`);
};
