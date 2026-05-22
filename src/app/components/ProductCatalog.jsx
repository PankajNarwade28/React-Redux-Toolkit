import React from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../features/cartSlice';
import './ProductCatalog.css';

const ProductCatalog = () => {
  const dispatch = useDispatch();

  const products = [
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Wireless Mouse', price: 29.99 },
    { id: 3, name: 'USB-C Cable', price: 12.99 },
    { id: 4, name: 'Mechanical Keyboard', price: 89.99 },
    { id: 5, name: '4K Monitor', price: 349.99 },
    { id: 6, name: 'Webcam HD', price: 79.99 },
  ];

  const handleAddToCart = (product) => {
    dispatch(cartActions.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
    }));
  };

  return (
    <div className="catalog-container">
      <h2>Product Catalog</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image"></div>
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
