import  './Home.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import ProductService from '../../Services/ProductService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await ProductService.getProducts();
      setProducts(products);
      if (products.length > 0) {
        setSelectedCategory(products[0].category); 
      }
    };

    fetchProducts();
  }, []);

  const categories = [...new Set(products.map(product => product.category))];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const handleCartIconClick = () => {
    navigate('/Cart'); 
  };
  return (
    <div>
       <header className="header-icons">
        <i className="fas fa-shopping-cart" onClick={handleCartIconClick}></i>
        <i className="fas fa-heart"></i>
      </header>
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="product-list">
        {products
          .filter(product => product.category === selectedCategory)
          .map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Home;