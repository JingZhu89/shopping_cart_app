/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FullCart from "./FullCart";

const cart = [
  {
    id: 1,
    title: "Amazon Kindle E-reader",
    quantity: 2,
    price: 79.99,
  },
];
const total = 159.98;

test("Is correct total", () => {
  const mockFunction = jest.fn();
  render(<FullCart cart={cart} total={total} onCheckout={mockFunction} />);
  const displayed_total = screen.getByText(/Total: \$159.98/);
  expect(displayed_total).toBeDefined();
});

test("Checkout button works", async () => {
  const mockFunction = jest.fn();
  render(<FullCart cart={cart} total={total} onCheckout={mockFunction} />);
  const user = userEvent.setup();
  const button = screen.getByRole("button");
  await user.click(button);

  expect(mockFunction.mock.calls.length).toBe(1);
});
