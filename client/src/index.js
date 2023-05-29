import React from "react";
import ReactDOM from "react-dom/client";

const e = React.createElement;

const ProductActions = () => {
  return e('div', { className: "actions product-actions", children: [
    e('button', { className: 'add-to-cart' }, 'Add to cart'),
    e('button', { className: 'edit' }, 'Edit')
  ]})
};

const ProductDetails = ({ productName, price, quantity }) => {
  return e("div", { className: "product-details", children: [
    e("h3", null, productName),
    e('p', { className: "price" }, price),
    e('p', { className: "quantity" }, `${quantity} left in stock`),
    e(ProductActions, null),
    e('button', { className: 'delete-button' },
      e('span', null, 'X'))
  ]});
};

const Product = ({ productName, price, quantity }) => {
  return e("li", { className: "product" }, e(ProductDetails, { productName, price, quantity }));
};

const ProductListing = () => {
  return e("div", {className: "product-listing", children: [
    e("h2", null, "Products"),
    e("ul", { className: "product-list", children: [
      e(Product, {
        productName: "Amazon Kindle E-reader",
        price: "$79.99",
        quantity: "5",
      }),
      e(Product, {
        productName: "Apple 10.5-Inch iPad Pro",
        price: "$649.99",
        quantity: "2",
      }),
      e(Product, {
        productName: "Yamaha Portable Keyboard",
        price: "$155.99",
        quantity: "0",
      }),
    ]})
  ]});
};

const Cart = () => {
  return e('div', { className: 'cart', children: [
    e('h2', null, 'Your Cart'),
    e('p', null, 'Your cart is empty'),
    e('p', null, 'Total: $0'),
    e('button', { className: 'checkout', disabled: 'true' }, 'Checkout')
  ]})
};

const App = () => {
  return e('div', { id: 'app', children: [
    e('header', { children: [
      e('h1', null, 'The Shop!'),
      e(Cart, null)
    ]}),
    e('main', null, e(ProductListing, null))
  ]});
    
};

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(App());
