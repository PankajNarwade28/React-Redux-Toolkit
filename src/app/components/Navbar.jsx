import React from 'react';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>🛍️ Shop Hub</h1>
      </div>
      <div className="navbar-items">
        <div className="cart-badge-container">
          <span className="cart-icon">🛒</span>
          {totalQuantity > 0 && (
            <span className="badge">{totalQuantity}</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
