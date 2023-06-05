/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import {
  getProducts,
  editProduct,
  addProduct,
  deleteProduct,
  getCart,
} from "../services/app";

const products = [
  {
    _id: 2,
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 0,
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
