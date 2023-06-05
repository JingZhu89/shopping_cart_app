/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddProductForm from "./AddProductForm";

// const productData = {
//   _id: 1,
//   title: "Amazon Kindle E-reader",
//   quantity: 5,
//   price: 79.99,
// };

test("Form has rendered", () => {
  const mockFunctionCancel = jest.fn();
  const mockFunctionSubmit = jest.fn();
  render(
    <AddProductForm
      onCancel={mockFunctionCancel}
      onSubmit={mockFunctionSubmit}
    />
  );
  const text = screen.getByText("Add Product");
  expect(text).toBeDefined();
  const text2 = screen.getByTestId("product-name");
  expect(text2).toHaveValue("");
});

test("Submit button works", async () => {
  const mockFunctionCancel = jest.fn();
  const mockFunctionSubmit = jest.fn();
  render(
    <AddProductForm
      onCancel={mockFunctionCancel}
      onSubmit={mockFunctionSubmit}
    />
  );
  const form = screen.getByRole("form");
  fireEvent.submit(form);
  expect(mockFunctionSubmit.mock.calls.length).toBe(1);
});
