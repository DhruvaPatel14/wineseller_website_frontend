import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const [products, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cartProduct = localStorage.getItem('cartProducts');
    if (cartProduct) {
      setProduct(JSON.parse(cartProduct));
    }
  }, []);
  const handleHomeClick = () => {
    navigate('/Home');
  };
  const handleQuantityChange = (index, quantity) => {
    const updatedProducts = [...products];
    if (quantity > 0) {
      updatedProducts[index].quantity = quantity;
    } else {
      updatedProducts.splice(index, 1);
    }
    setProduct(updatedProducts);
    localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
  };
  return (
    <div>
      <header className="cart-header">
        <button className="home-button" onClick={handleHomeClick}>Home</button>
      </header>
      <h1>Cart</h1>
      {products && products.length > 0 ? (
          <div className="cart-container">
        {products.map((product, index) => (
            <div key={index} className="cart-item">
              <h2>{product.name}</h2>
              <img src={product.img} alt={product.name} />
              <p>{product.description}</p>
                <p>Price: ${product.price * product.quantity}</p>
                <div className="quantity-controls">
                <button className="quantity-button" onClick={() => handleQuantityChange(index, product.quantity - 1)}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <input
                  type="number"
                  className="quantity-input"
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                />
                <button className="quantity-button" onClick={() => handleQuantityChange(index, product.quantity + 1)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )  : (
        <p>No product in the cart.</p>
      )}
    </div>
  );
};

export default Cart;