import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  selectProductsStatus,
} from "../features/products/productSlice";
import useFormValidation from "../../../reusableComponent/formValidationHook";
import FormInput from "../../../reusableComponent/formInput";
import Button from "../../../reusableComponent/button";
import Icon from "../../../reusableComponent/lucideReact";
import { validationRules } from "../../../reusableComponent/validationRules";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectProductsStatus);

  const initialState = {
    title: "",
    price: "",
    description: "",
    imageUrl: "https://placeimg.com/640/480/any",
  };

  // Using the imported validation rules
  const productValidationRules = {
    title: validationRules.title,
    price: validationRules.price,
    description: validationRules.description,
    imageUrl: validationRules.imageUrl,
  };

  const { formData, formErrors, handleChange, hasErrors } = useFormValidation(
    initialState,
    productValidationRules
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasErrors()) return;

    try {
      const submitData = {
        ...formData,
        categoryId: 1,
        images: [formData.imageUrl],
        price: Number(formData.price),
      };

      await dispatch(createProduct(submitData)).unwrap();
      navigate("/storeHome");
    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Button
          onClick={() => navigate("/storeHome")}
          className="mb-6 flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-300"
        >
          <Icon name="ArrowLeft" size={20} color="#4F46E5" />
          Back to Products
        </Button>

        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
            Add New Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
              error={formErrors.title}
              required
            />

            <FormInput
              name="price"
              label="Price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              error={formErrors.price}
              required
            />

            <FormInput
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              error={formErrors.description}
              required
              textarea
              rows={4}
            />

            <FormInput
              name="imageUrl"
              label="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              error={formErrors.imageUrl}
              required
            />

            {formData.imageUrl && (
              <div className="mt-4">
                <img
                  src={formData.imageUrl}
                  alt="Product preview"
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={status === "loading" || hasErrors()}
              className="w-full bg-white text-indigo-600 font-bold px-6 py-4 rounded-xl border-2 border-indigo-600 shadow-md transition-all duration-300 transform hover:bg-indigo-600 hover:text-white hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Adding Product..." : "Add Product"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
