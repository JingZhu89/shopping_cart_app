/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Product from "./Product";
import {
  getProducts,
  editProduct,
  addProduct,
  deleteProduct,
  getCart,
  addToCart,
} from "../services/app";

const products = [
  {
    _id: 2,
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 4,
    price: 649.99,
  },
];
const cart = [
  {
    _id: 3,
    title: "Yamaha Portable Keyboard",
    quantity: 2,
    price: 155.99,
  },
];

jest.mock("../services/app.js");

afterEach(() => {
  jest.clearAllMocks();
});

test("getproducts and getcart is called when the component renders", async () => {
  getProducts.mockResolvedValueOnce(products);
  getCart.mockResolvedValueOnce(cart);
  render(<App />);
  await waitFor(() => expect(getProducts).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(getCart).toHaveBeenCalledTimes(1));
});

test("it shows data when the data is fetched", async () => {
  getProducts.mockResolvedValueOnce(products);
  getCart.mockResolvedValueOnce(cart);
  render(<App />);
  const titleProduct = await screen.findByText("Apple 10.5-Inch iPad Pro");
  await waitFor(() => expect(getProducts).toHaveBeenCalledTimes(1));
  expect(titleProduct).toBeInTheDocument();
  const titleCart = await screen.findByText("Yamaha Portable Keyboard");
  await waitFor(() => expect(getProducts).toHaveBeenCalledTimes(1));
  expect(titleCart).toBeInTheDocument();
});

test("product is added when form is submitted", async () => {
  const newProduct = {
    title: "test product",
    quantity: 1,
    price: 2,
  };
  getProducts.mockResolvedValueOnce(products);
  getCart.mockResolvedValueOnce(cart);
  render(<App />);
  const button = screen.getByText("Add A Product");
  const user = userEvent.setup();
  await user.click(button);

  //check form is displated
  const text = screen.getByText("Add Product");
  expect(text).toBeDefined();

  //submit form and new product shows
  addProduct.mockResolvedValueOnce(newProduct);
  const form = screen.getByRole("form");
  fireEvent.submit(form);
  await waitFor(() => expect(addProduct).toHaveBeenCalledTimes(1));
  const newTitle = screen.getByText("test product");
  expect(newTitle).toBeDefined();
});

test("product is added to cart when add to cart clicked", async () => {
  getProducts.mockResolvedValueOnce(products);
  getCart.mockResolvedValueOnce(cart);
  const mockEditProduct = jest.fn();
  const mockDeleteProduct = jest.fn();
  const mockAddProductToCart = jest.fn();
  render(
    <Product
      productData={products}
      onSubmitProductEdit={mockEditProduct}
      onDelete={mockDeleteProduct}
      onAdd={mockAddProductToCart}
    />
  );
  const returnDataForCart = {
    product: {
      _id: "2",
      title: "Apple 10.5-Inch iPad Pro",
      price: 649.99,
      quantity: 3,
      createdAt: "2020-10-04T05:57:02.777Z",
      updatedAt: "2020-10-04T05:57:02.777Z",
      _v: 0,
    },
    item: {
      _id: 2,
      title: "Apple 10.5-Inch iPad Pro",
      quantity: 1,
      price: 649.99,
      createdAt: "2020-10-04T05:57:02.777Z",
      updatedAt: "2020-10-04T05:57:02.777Z",
      _v: 0,
    },
  };
  // addToCart.mockResolvedValueOnce();
  const button = screen.getByText("Add to Cart");
  const user = userEvent.setup();
  addToCart.mockResolvedValueOnce(returnDataForCart);
  await user.click(button);

  //click add to cart button and item shows in cart

  //total price increase by the price of the new item

  //quantity of product decrease by one
});
