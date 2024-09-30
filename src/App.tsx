import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/products";
import ProductDetailsPage from "./pages/products/product_details";
import { PRODUCT_DETAILS_ROUTE, PRODUCTS_ROUTE } from "./constants/routes";

function App() {
  return (
    <div className="w-full h-screen">
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route index element={<Navigate to={PRODUCTS_ROUTE} />} />
          <Route path={PRODUCTS_ROUTE} element={<ProductsPage />} />
          <Route
            path={`${PRODUCT_DETAILS_ROUTE}/:product_id`}
            element={<ProductDetailsPage />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
