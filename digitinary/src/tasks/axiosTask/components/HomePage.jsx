import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFormValidation from "../../../reusableComponent/formValidationHook";
import FormInput from "../../../reusableComponent/formInput";
import Button from "../../../reusableComponent/button";
import Product from "./Product";
import Icon from "../../../reusableComponent/lucideReact";
import { Card, CardContent } from "@mui/material";

// Import all Redux selectors and actions
import {
  fetchProducts,
  selectFilteredProducts,
  selectProductsStatus,
  selectProductsError,
  selectCurrentPage,
  selectItemsPerPage,
  setCurrentPage,
  setSearchTerm,
  setPriceRange,
  clearFilters,
} from "../features/products/productSlice";

import { selectCartTotalQuantity } from "../features/products/cartSlice";

import { selectAuth } from "../features/auth/authSlice";

const filterValidationRules = {
  searchTerm: [
    (value) =>
      value.length > 50 ? "Search term cannot exceed 50 characters." : "",
  ],
  minPrice: [
    (value) => (value < 0 ? "Minimum price cannot be negative." : ""),
    (value, formData) =>
      Number(value) > Number(formData.maxPrice)
        ? "Minimum price cannot be greater than maximum price."
        : "",
  ],
  maxPrice: [
    (value) => (value < 0 ? "Maximum price cannot be negative." : ""),
    (value, formData) =>
      Number(value) < Number(formData.minPrice)
        ? "Maximum price cannot be less than minimum price."
        : "",
  ],
};

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(selectAuth);
  const products = useSelector(selectFilteredProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const currentPage = useSelector(selectCurrentPage);
  const itemsPerPage = useSelector(selectItemsPerPage);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const initialFilterState = {
    searchTerm: "",
    minPrice: 0,
    maxPrice: 1000,
  };

  const { formData, formErrors, handleChange, setFormData, hasErrors } =
    useFormValidation(initialFilterState, filterValidationRules);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleSearchChange = (e) => {
    handleChange(e);
    dispatch(setSearchTerm(e.target.value));
  };

  const handlePriceChange = (event, [min, max]) => {
    setFormData((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
    }));
    dispatch(setPriceRange({ min, max }));
  };

  const handleClearFilters = () => {
    setFormData(initialFilterState);
    dispatch(clearFilters());
  };

  const handlePageChange = (event, value) => {
    dispatch(setCurrentPage(value));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent>
          {/* Header Section with Actions */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-indigo-900">
                Welcome, {user?.email?.split("@")[0] || "Guest"}!
              </h1>
              {user && (
                <p className="text-sm text-gray-600 mt-1">{user.email}</p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <Button
                  onClick={() => navigate("/add-product")}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center gap-2"
                >
                  <Icon name="Plus" size={20} color="white" />
                  Add Product
                </Button>
              )}
              <Button
                onClick={() => navigate("/cart")}
                className="p-2 bg-indigo-100 hover:bg-indigo-200 rounded-full relative"
              >
                <Icon name="ShoppingCart" size={24} color="#4F46E5" />
                {cartTotalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartTotalQuantity}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Search and Filter Form */}
          <div className="space-y-4 mt-6">
            <div className="relative">
              <FormInput
                name="searchTerm"
                label="Search Products"
                value={formData.searchTerm}
                onChange={handleSearchChange}
                error={formErrors.searchTerm}
                placeholder="Search by product name or category..."
              />
              <div className="absolute right-3 top-9">
                <Icon name="Search" size={20} color="#6B7280" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <Icon name="DollarSign" size={16} color="#374151" />
                Price Range
              </label>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={formData.minPrice}
                  onChange={(e) =>
                    handlePriceChange(e, [
                      Number(e.target.value),
                      formData.maxPrice,
                    ])
                  }
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={formData.maxPrice}
                  onChange={(e) =>
                    handlePriceChange(e, [
                      formData.minPrice,
                      Number(e.target.value),
                    ])
                  }
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <span>${formData.minPrice}</span>
                  <span>${formData.maxPrice}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleClearFilters}
              className="w-full py-2 px-4 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md flex items-center justify-center gap-2"
              disabled={hasErrors()}
            >
              <Icon name="X" size={16} color="#374151" />
              Clear Filters
            </Button>
          </div>

          {/* Products Grid */}
          {status === "loading" && (
            <div className="flex justify-center py-8">
              <Icon name="Loader" size={32} color="#4F46E5" />
            </div>
          )}

          {status === "failed" && (
            <div className="text-red-500 text-center py-8 flex items-center justify-center gap-2">
              <Icon name="AlertTriangle" size={24} color="#EF4444" />
              Error: {error}
            </div>
          )}

          {status === "succeeded" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {currentItems.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </div>

              {currentItems.length === 0 && (
                <div className="text-center py-8 flex items-center justify-center gap-2">
                  <Icon name="PackageX" size={24} color="#6B7280" />
                  No products found.
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex flex-wrap justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        onClick={(e) => handlePageChange(e, page)}
                        className={`px-4 py-2 rounded-md ${
                          currentPage === page
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {page}
                      </Button>
                    )
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
