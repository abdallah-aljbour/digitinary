// components/AddProduct.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  selectProductsStatus,
} from "../features/products/productSlice";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectProductsStatus);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: 1, // Default category ID
    images: ["https://placeimg.com/640/480/any"], // Default image
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await dispatch(createProduct(formData)).unwrap();
      navigate("/home");
    } catch (err) {
      setSubmitError(err.message || "Failed to create product");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/")}
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Paper elevation={3} sx={{ p: 4, borderRadius: "16px" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "#1a237e", fontWeight: 600 }}
        >
          Add New Product
        </Typography>

        {submitError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {submitError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            margin="normal"
          />

          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={status === "loading"}
              sx={{
                bgcolor: "#1a237e",
                "&:hover": { bgcolor: "#0d1b60" },
                minWidth: "150px",
              }}
            >
              {status === "loading" ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Add Product"
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProduct;
