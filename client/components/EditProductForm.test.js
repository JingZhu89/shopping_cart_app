/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditProductForm from "./EditProductForm";

const productData = {
  _id: 1,
  title: "Amazon Kindle E-reader",
  quantity: 5,
  price: 79.99,
};

test("Form has rendered", () => {
  const mockFunctionClick = jest.fn();
  const mockFunctionSubmit = jest.fn();
  render(
    <EditProductForm
      productData={productData}
      onClick={mockFunctionClick}
      onSubmitProductEdit={mockFunctionSubmit}
    />
  );
  const text = screen.getByText("Edit Product");
  expect(text).toBeDefined();
  const text2 = screen.getByTestId("product-name");
  expect(text2).toHaveValue("Amazon Kindle E-reader");
});

test("Submit button works", async () => {
  const mockFunctionClick = jest.fn();
  const mockFunctionSubmit = jest.fn();
  render(
    <EditProductForm
      productData={productData}
      onClick={mockFunctionClick}
      onSubmitProductEdit={mockFunctionSubmit}
    />
  );
  const user = userEvent.setup();

  const inputProductName = screen.getByTestId("product-name");
  await user.type(inputProductName, "Apple");
  const inputPrice = screen.getByTestId("product-price");
  await user.type(inputPrice, "1.95");
  const inputQuantity = screen.getByTestId("product-quantity");
  await user.type(inputQuantity, "5");
  const newProduct = {
    _id: 1,
    productTitle: inputProductName.value,
    productQuantity: inputQuantity.value,
    productPrice: inputPrice.value,
  };

  const button = screen.getByText("Update");
  await user.click(button);
  expect(mockFunctionSubmit.mock.calls[0][0]).toEqual(newProduct);
});
