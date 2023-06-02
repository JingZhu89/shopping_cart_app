export const updateProducts = (previous, newProduct) => {
  return previous.map((product) => {
    if (product._id === newProduct._id) {
      return newProduct;
    } else {
      return product;
    }
  });
};

export const updateCart = (previous, newCartItem) => {
  return previous
    .filter((item) => {
      return item._id !== newCartItem._id;
    })
    .concat(newCartItem);
};

export const removeProduct = (previous, id) => {
  return previous.filter((product) => {
    return product._id !== id;
  });
};
