import React, { useEffect, useState, useMemo } from "react";
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
  ImageList,
  ImageListItem,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Icon from "../../../reusableComponent/lucideReact";
import Button from "../../../reusableComponent/button";

const parseImageUrls = (images) => {
  if (!images) return [];
  return images.map((img) => {
    try {
      const parsed = JSON.parse(img);
      return Array.isArray(parsed) ? parsed[0] : img;
    } catch {
      return img;
    }
  });
};

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

  const imageUrls = useMemo(() => {
    return product ? parseImageUrls(product.images) : [];
  }, [product]);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => dispatch(clearSelectedProduct());
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setEditedProduct({
        title: product.title,
        price: product.price,
        description: product.description,
        images: parseImageUrls(product.images),
      });
    }
  }, [product]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, images: imageUrls }));
    setSnackbarMessage("Product added to cart");
    setOpenSnackbar(true);
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
      <Box className="flex justify-center items-center min-h-screen">
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

  if (!product) return null;

  return (
    <Container maxWidth="lg" className="py-4">
      <Button
        onClick={() => navigate(-1)}
        className="mb-3 inline-flex items-center gap-2 bg-transparent text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-md"
      >
        <Icon name="ArrowLeft" size={20} />
        Back to Products
      </Button>

      <Paper elevation={3} className="rounded-2xl overflow-hidden">
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box className="p-3">
              <Box
                component="img"
                src={imageUrls[0] || ""}
                alt={product.title}
                className="w-full h-[400px] object-cover rounded-xl mb-2"
              />
              <ImageList cols={3} gap={8}>
                {imageUrls.slice(1).map((image, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={image}
                      alt={`${product.title} - ${index + 2}`}
                      className="w-full h-[100px] object-cover rounded-lg"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box className="p-4">
              <Typography
                variant="h4"
                component="h1"
                className="font-semibold text-blue-900 mb-4"
              >
                {product.title}
              </Typography>

              <Box className="flex items-center mb-2">
                <Icon name="Tags" size={20} className="text-gray-600" />
                <Typography variant="subtitle1" className="text-gray-600 ml-1">
                  {product.category?.name}
                </Typography>
              </Box>

              <Box className="flex items-center mb-3">
                <Icon name="DollarSign" size={20} className="text-green-600" />
                <Typography
                  variant="h5"
                  component="span"
                  className="text-green-600 font-semibold"
                >
                  {product.price}
                </Typography>
              </Box>

              <Typography
                variant="body1"
                className="text-gray-600 leading-relaxed mb-6"
              >
                {product.description}
              </Typography>

              <Box className="flex gap-2 mt-4">
                <Button
                  onClick={handleAddToCart}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
                >
                  <Icon name="ShoppingCart" size={20} />
                  Add to Cart
                </Button>
                <Button
                  onClick={() => setEditDialogOpen(true)}
                  className="inline-flex items-center gap-2 border-2 border-gray-900 bg-transparent text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-md"
                >
                  <Icon name="Edit2" size={20} />
                  Edit
                </Button>
                <Button
                  onClick={() => setDeleteDialogOpen(true)}
                  className="inline-flex items-center gap-2 bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md"
                >
                  <Icon name="Trash2" size={20} />
                  Delete
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
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
          <Button
            onClick={() => setEditDialogOpen(false)}
            className="bg-gray-100 text-gray-900 hover:bg-gray-200 px-4 py-2 rounded-md"
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditSave}
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            className="bg-gray-100 text-gray-900 hover:bg-gray-200 px-4 py-2 rounded-md"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md"
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
