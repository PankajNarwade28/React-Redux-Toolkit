import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../features/cartSlice';
import './Cart.css';

const Cart = () => {
  const { cartItems, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(cartActions.decreaseQuantity(id));
  };

  const handleClearCart = () => {
    dispatch(cartActions.clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty 🛒</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-details">
              <h4>{item.name}</h4>
              <p className="price">${item.price}</p>
            </div>
            <div className="item-quantity">
              <span>Qty: {item.quantity}</span>
            </div>
            <div className="item-total">
              <p>${item.totalPrice.toFixed(2)}</p>
            </div>
            <div className="item-actions">
              <button
                className="btn-decrease"
                onClick={() => handleDecreaseQuantity(item.id)}
              >
                -
              </button>
              <button
                className="btn-remove"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="summary-row">
          <span>Total Items:</span>
          <strong>{totalQuantity}</strong>
        </div>
        <div className="summary-row total">
          <span>Total Amount:</span>
          <strong>${totalAmount.toFixed(2)}</strong>
        </div>
        <button className="btn-clear" onClick={handleClearCart}>
          Clear Cart
        </button>
        <button className="btn-checkout">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
