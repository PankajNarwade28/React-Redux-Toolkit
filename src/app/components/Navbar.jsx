import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav className="border-b border-orange-300/70 bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4">
        <h1 className="text-2xl font-black tracking-tight text-orange-700">Shop Hub</h1>
        <div className="relative">
          <span className="text-3xl">🛒</span>
          {totalQuantity > 0 && (
            <span className="absolute -right-3 -top-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-orange-600 px-1 text-xs font-bold text-white shadow-sm">
              {totalQuantity}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
