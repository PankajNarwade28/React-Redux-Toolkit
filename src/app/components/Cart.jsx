import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../features/cartSlice';

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
      <section className="rounded-2xl border border-orange-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
        <h2 className="mb-3 text-2xl font-bold text-orange-900">Shopping Cart</h2>
        <div className="rounded-xl border border-dashed border-orange-200 bg-orange-50 p-6 text-center text-slate-600">
          <p>Your cart is empty 🛒</p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-orange-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
      <h2 className="mb-4 text-2xl font-bold text-orange-900">Shopping Cart</h2>
      <div className="space-y-3">
        {cartItems.map((item) => (
          <article key={item.id} className="grid grid-cols-[64px_1fr_auto] gap-3 rounded-xl border border-orange-100 bg-white p-3">
            <img
              src={item.image}
              alt={item.name}
              className="h-16 w-16 rounded-md object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <h4 className="truncate font-semibold text-slate-800">{item.name}</h4>
              <p className="text-sm text-slate-500">${item.price.toFixed(2)} each</p>
              <p className="mt-1 text-sm font-medium text-orange-700">Qty: {item.quantity}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="text-sm font-bold text-slate-800">${item.totalPrice.toFixed(2)}</p>
              <div className="flex gap-2">
              <button
                className="rounded-md bg-slate-200 px-2 py-1 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
                onClick={() => handleDecreaseQuantity(item.id)}
              >
                -
              </button>
              <button
                className="rounded-md bg-red-500 px-2 py-1 text-sm font-semibold text-white transition hover:bg-red-600"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-orange-100 bg-orange-50 p-4">
        <div className="flex items-center justify-between py-1 text-slate-700">
          <span>Total Items:</span>
          <strong>{totalQuantity}</strong>
        </div>
        <div className="mt-1 flex items-center justify-between border-t border-orange-200 pt-3 text-lg font-bold text-orange-700">
          <span>Total Amount:</span>
          <strong>${totalAmount.toFixed(2)}</strong>
        </div>
        <button className="mt-4 w-full rounded-lg bg-slate-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700" onClick={handleClearCart}>
          Clear Cart
        </button>
        <button className="mt-2 w-full rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-700">Checkout</button>
      </div>
    </section>
  );
};

export default Cart;
