import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../types";
import "./ProductDetails.css";
import RecommendedProducts from "../RecommendedProducts/RecommendedProducts";

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string | undefined }>();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (productId) {
        fetchProductDetails(productId);
      }
    }, 500);
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
    return (
      <div className="product-loading-text">
        <img alt="loading..." src="/loading.png" />
      </div>
    );
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
          <h4>About this item:</h4>
          <p>{product.description}</p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <div className="addCart-btn">
            <button>Add to Cart</button>
          </div>
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
