import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types";
import "./ProductDetails.css"; // Import CSS file for styling
import RecommendedProducts from "./RecommendedProducts"; // Import RecommendedProducts component

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
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
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
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-image"
          />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Rating: {product.rating}</p>
          <p>Stock: {product.stock}</p>
          <p>Brand: {product.brand}</p>
          <p>Category: {product.category}</p>
          <button id="addCart">Add to Cart</button>
        </div>
        <div className="product-details-right">
          <RecommendedProducts
            categoryId={product.category}
            currentProductId={product.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
