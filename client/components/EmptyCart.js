const EmptyCart = () => {
  return (
    <div class="cart">
      <h2>Your Cart</h2>
      <p>Your cart is empty</p>
      <p>Total: $0</p>
      <button class="checkout" disabled>Checkout</button>
    </div>
  )
}

export default EmptyCart;