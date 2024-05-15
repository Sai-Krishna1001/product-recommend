import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails"; // Import ProductDetails component

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
