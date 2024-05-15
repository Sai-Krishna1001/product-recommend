# product-recommend

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import './ProductList.css'; // Import CSS file for styling

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="product-list">
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card" onClick={() => handleProductClick(product.id)}>
            <img src={product.thumbnail} alt={product.title} />
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
              <div className="button-container">
                <button onClick={() => handleProductClick(product.id)}>View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;






-------------------------------------
.product-list {
    padding: 20px;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
  }
  
  .product-card img {
    width: 100%;
    height: 200px; /* Adjust height as needed */
    object-fit: cover; /* Ensure images fill the container */
    border-bottom: 1px solid #ddd; /* Add a border at the bottom of the image */
  }
  
  .product-details {
    padding: 15px;
  }
  
  .product-details h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .product-details p {
    font-size: 16px;
    margin-bottom: 8px;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  
  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }









  ------------------------------


  import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import './ProductDetails.css'; // Import CSS file for styling
import RecommendedProducts from './RecommendedProducts'; // Import RecommendedProducts component

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string | undefined }>();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const fetchProductDetails = async (productId: string) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-content">
        <div className="product-details-left">
          <h2>{product.title}</h2>
          <img src={product.thumbnail} alt={product.title} className="product-image" />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Rating: {product.rating}</p>
          <p>Stock: {product.stock}</p>
          <p>Brand: {product.brand}</p>
          <p>Category: {product.category}</p>
          <button id="addCart">Add to Cart</button>
        </div>
        <div className="product-details-right">
          <RecommendedProducts categoryId={product.category} currentProductId={product.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;



------------------------------------------
.product-details-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .product-details-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
  }
  
  .product-details-left {
    width: 60%;
    padding-right: 20px;
  }
  
  .product-details-right {
    width: 40%;
  }
  
  .product-image {
    width: 100%;
    max-height: 300px; /* Adjust the max-height as needed */
    object-fit: contain;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 20px; /* Add margin below the image */
  }
  
  .product-details {
    margin-top: 20px;
  }
  
  .product-details h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .product-details p {
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 8px;
  }
  
  .recommended-products-container {
    margin-top: 40px;
  }
  
  .recommended-products-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .recommended-product-card {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .recommended-product-thumbnail {
    width: 80px; /* Adjust thumbnail size */
    height: 80px; /* Adjust thumbnail size */
    object-fit: cover;
    border-radius: 4px;
    margin-right: 10px;
  }

  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }


  -------------------------------------------
  import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import './RecommendedProducts.css';

type RecommendedProductsProps = {
  categoryId: string;
  currentProductId: number;
};

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ categoryId, currentProductId }) => {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        // Filter products by category and exclude the current product
        const filteredProducts = data.products.filter(
          (product: Product) => product.category === categoryId && product.id !== currentProductId
        );
        // Select up to three recommended products
        const recommended = filteredProducts.slice(0, 3);
        setRecommendedProducts(recommended);
      } catch (error) {
        console.error('Error fetching recommended products:', error);
      }
    };

    fetchRecommendedProducts();
  }, [categoryId, currentProductId]);

  return (
    <div className="recommended-products-container">
      <h3>Recommended Products</h3>
      <div className="recommended-products-list">
        {recommendedProducts.map((product) => (
          <div key={product.id} className="recommended-product-card">
            <img src={product.thumbnail} alt={product.title} className="recommended-product-thumbnail" />
            <div className="recommended-product-details">
              <h4>{product.title}</h4>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;



--------------------------------------------

.recommended-products-container {
    margin-top: 40px;
  }
  
  .recommended-products-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .recommended-product-card {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .recommended-product-thumbnail {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 10px;
  }
  
  .recommended-product-details {
    flex-grow: 1;
  }
  
  .recommended-product-details h4 {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  .recommended-product-details p {
    font-size: 16px;
    margin-bottom: 5px;
  }



  -------------------------------


  export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails'; // Import ProductDetails component

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>E-commerce Platform</h1>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;






