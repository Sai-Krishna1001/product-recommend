import React, { useState, useEffect } from "react";
import { Product } from "../types";
import "./RecommendedProducts.css";

type RecommendedProductsProps = {
  categoryId: string;
  currentProductId: number;
};

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
  categoryId,
  currentProductId,
}) => {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        // Filter products by category and exclude the current product
        const filteredProducts = data.products.filter(
          (product: Product) =>
            product.category === categoryId && product.id !== currentProductId
        );
        // Select up to three recommended products
        const recommended = filteredProducts.slice(0, 3);
        setRecommendedProducts(recommended);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
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
            <img
              src={product.thumbnail}
              alt={product.title}
              className="recommended-product-thumbnail"
            />
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
