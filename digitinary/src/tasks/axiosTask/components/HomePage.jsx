import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectAuth } from "../features/auth/authSlice";
import {
  fetchProducts,
  selectAllProducts,
  selectProductsStatus,
  selectProductsError,
  selectCurrentPage,
  selectItemsPerPage,
  setCurrentPage,
} from "../features/products/productSlice";
import { selectCartTotalQuantity } from "../features/products/cartSlice";
import {
  Typography,
  Container,
  Paper,
  Button,
  Grid,
  CircularProgress,
  Pagination,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import Product from "../components/Product";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectAuth);
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const currentPage = useSelector(selectCurrentPage);
  const itemsPerPage = useSelector(selectItemsPerPage);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handlePageChange = (event, value) => {
    dispatch(setCurrentPage(value));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: "12px",
          background: "linear-gradient(145deg, #f6f8fc 0%, #ffffff 100%)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "#1a237e",
            }}
          >
            Welcome, {user?.name || "Guest"}!
          </Typography>
          <IconButton
            color="primary"
            onClick={() => navigate("/cart")}
            sx={{
              bgcolor: "rgba(26, 35, 126, 0.1)",
              "&:hover": { bgcolor: "rgba(26, 35, 126, 0.2)" },
            }}
          >
            <Badge badgeContent={cartTotalQuantity} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
        {user ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1" color="text.secondary">
              {user.email}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/add-product")}
              sx={{
                bgcolor: "#1a237e",
                "&:hover": {
                  bgcolor: "#0d1b60",
                },
                mr: 2,
              }}
            >
              Add Product
            </Button>
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                bgcolor: "#1a237e",
                "&:hover": {
                  bgcolor: "#0d1b60",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary">
            You are not logged in.
          </Typography>
        )}
      </Paper>

      {status === "loading" && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {status === "failed" && (
        <Typography color="error" sx={{ textAlign: "center", my: 4 }}>
          Error: {error}
        </Typography>
      )}

      {status === "succeeded" && (
        <>
          <Grid container spacing={3}>
            {currentItems.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Product product={product} />
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              "& .MuiPagination-ul": {
                gap: 1,
              },
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default HomePage;
