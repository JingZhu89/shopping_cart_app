/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EmptyCart from "./EmptyCart";

test("Cart is displayed as empty", () => {
  render(<EmptyCart />);
  const text = screen.getByText("Your cart is empty");
  expect(text).toBeDefined();
});
