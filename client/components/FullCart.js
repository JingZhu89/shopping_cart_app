const Cart = ({cart}) => {
  return (
    <div class="cart">
      <h2>Your Cart</h2>
      <table class="cart-items">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          { cart.map(item => {
            return (
              <tr>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="total">Total: $729.98</td>
          </tr>
        </tfoot>
      </table>
      <div class="checkout-button">
        <button class="checkout">Checkout</button>
      </div>
    </div>
  )
}

export default Cart;