import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  selectSelectedProduct,
  selectProductsStatus,
  selectProductsError,
  clearSelectedProduct,
  updateProduct,
  deleteProduct,
} from "../features/products/productSlice";
import { addToCart } from "../features/products/cartSlice";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Button,
  ImageList,
  ImageListItem,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  ArrowBack,
  Category,
  AttachMoney,
  ShoppingCart,
  Edit,
  Delete,
} from "@mui/icons-material";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(selectSelectedProduct);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setEditedProduct({
        title: product.title,
        price: product.price,
        description: product.description,
      });
    }
  }, [product]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setSnackbarMessage("Product added to cart");
    setOpenSnackbar(true);
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditSave = async () => {
    try {
      await dispatch(
        updateProduct({ id: product.id, updatedData: editedProduct })
      ).unwrap();
      setSnackbarMessage("Product updated successfully");
      setOpenSnackbar(true);
      setEditDialogOpen(false);
    } catch (error) {
      setSnackbarMessage("Failed to update product");
      setOpenSnackbar(true);
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteProduct(product.id)).unwrap();
      setSnackbarMessage("Product deleted successfully");
      setOpenSnackbar(true);
      navigate(-1);
    } catch (error) {
      setSnackbarMessage("Failed to delete product");
      setOpenSnackbar(true);
    }
    setDeleteDialogOpen(false);
  };

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Container>
        <Typography color="error" align="center">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Paper elevation={3} sx={{ borderRadius: "16px", overflow: "hidden" }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3 }}>
              <Box
                component="img"
                src={product.images[0]}
                alt={product.title}
                sx={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  mb: 2,
                }}
              />
              <ImageList cols={3} gap={8}>
                {product.images.slice(1).map((image, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={image}
                      alt={`${product.title} - ${index + 2}`}
                      style={{
                        width: "100%",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ p: 4 }}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 600, color: "#1a237e" }}
              >
                {product.title}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Category sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="subtitle1" color="text.secondary">
                  {product.category?.name}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <AttachMoney sx={{ color: "success.main" }} />
                <Typography
                  variant="h5"
                  component="span"
                  sx={{ color: "success.main", fontWeight: 600 }}
                >
                  {product.price}
                </Typography>
              </Box>

              <Typography
                variant="body1"
                sx={{ mb: 3, color: "text.secondary", lineHeight: 1.8 }}
              >
                {product.description}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  sx={{ bgcolor: "#1a237e", "&:hover": { bgcolor: "#0d1b60" } }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Edit />}
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Delete />}
                  onClick={handleDeleteClick}
                  color="error"
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleEditClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={editedProduct.title || ""}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, title: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={editedProduct.price || ""}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                price: Number(e.target.value),
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={editedProduct.description || ""}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                description: e.target.value,
              })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirm}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default ProductDetails;
