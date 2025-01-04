import React, { useState, useEffect }  from "react";
import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import ProductService from '../../Services/ProductService';

const ProductCard = ({ product }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const firstInventory = product.inventories.find(
    (inventory) => inventory.available
  );
  useEffect(() => {
    const storedCartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    setCartProducts(storedCartProducts);
  }, []);
  const handleCartAction = (action,quantity = 1) => {
    let updatedCartProducts;

    switch (action) {
      case 'add':
        ProductService.handleAddToCart(product, firstInventory);
        updatedCartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
        break;
      case 'change':
        updatedCartProducts = ProductService.handleChangeQuantity(firstInventory.SKU, quantity);
        break;
      default:
        return;
    }

    setCartProducts(updatedCartProducts);
  };

  const existingProduct = cartProducts.find(cartProduct => cartProduct.SKU === firstInventory?.SKU);
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <img src={product.img} alt={product.name} className="product-image" />
      {firstInventory ? (
        <>
          <p>Price: ${firstInventory.price}</p>
          <p>Size: {firstInventory.size}</p>
          <div className="product-actions">
          {existingProduct ? (
              <div className="quantity-controls">
                <button className="quantity-button" onClick={() => handleCartAction('change', existingProduct.quantity - 1)}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="quantity">{existingProduct.quantity}</span>
                <button className="quantity-button" onClick={() => handleCartAction('change', existingProduct.quantity + 1)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            ) : (
              <button className="action-button" onClick={() => handleCartAction('add')}>
                <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
              </button>
            )}
            <button className="action-button">
              <FontAwesomeIcon icon={faHeart} /> Add to Wishlist
            </button>
          </div>
        </>
      ) : (
        <p>Out of stock</p>
      )}
    </div>
  );
};

export default ProductCard;
