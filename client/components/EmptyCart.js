const EmptyCart = () => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <p>Your cart is empty</p>
      <p>Total: $0</p>
      <button className="checkout" disabled>
        Checkout
      </button>
    </div>
  );
};

export default EmptyCart;
