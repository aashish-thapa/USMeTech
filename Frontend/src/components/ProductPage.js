import React from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "./Product_Details/ProductDetails"; // Import the product details component
import Navbar from "./Utility/Navbar";
import Footer from "./Utility/Footer";

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the route parameter
  return (
    <div>
      <Navbar />
      <div className="mx-auto w-full md:w-4/5 p-4 ">
        <h1 className="text-3xl font-semibold text-gray-900">
          Product Details
        </h1>
        {id && <ProductDetails productId={id} />}{" "}
        {/* Render the product details component */}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
