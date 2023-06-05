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

// test("Submit button works", async () => {
//   const mockFunctionClick = jest.fn();
//   const mockFunctionSubmit = jest.fn();
//   render(
//     <EditProductForm
//       productData={productData}
//       onClick={mockFunctionClick}
//       onSubmitProductEdit={mockFunctionSubmit}
//     />
//   );
//   const user = userEvent.setup();

//   const inputProductName = screen.getByRole("textbox", {
//     name: "Product Name",
//   });
//   await user.type(inputProductName, "Apple");
//   const inputPrice = screen.getByRole("textbox", { name: "Price" });
//   await user.type(inputPrice, "1.95");
//   const inputQuantity = screen.getByRole("textbox", { name: "Quantity" });
//   await user.type(inputQuantity, "5");
//   const newProduct = {
//     title: inputProductName.value,
//     quantity: inputQuantity.value,
//     price: inputPrice.value,
//   };

//   const button = screen.getByText("Update");
//   await user.click(button);

//   expect(mockFunctionSubmit.mock.calls[0][0]).toEqual(newProduct);
// });
