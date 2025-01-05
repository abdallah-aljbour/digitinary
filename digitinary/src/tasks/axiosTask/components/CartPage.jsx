import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import {
  Add,
  Remove,
  Delete,
  ArrowBack,
  ShoppingCart as CartIcon,
} from "@mui/icons-material";
import {
  addToCart,
  removeFromCart,
  clearCart,
  selectCartItems,
  selectCartTotalAmount,
} from "../features/products/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);

  const handleAddItem = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/home")}
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Paper elevation={3} sx={{ p: 3, borderRadius: "12px" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <CartIcon sx={{ mr: 2, color: "#1a237e" }} />
          <Typography variant="h4" sx={{ fontWeight: 600, color: "#1a237e" }}>
            Shopping Cart
          </Typography>
        </Box>

        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your cart is empty
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/home")}
              sx={{
                mt: 2,
                bgcolor: "#1a237e",
                "&:hover": { bgcolor: "#0d1b60" },
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <>
            <List>
              {cartItems.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem
                    sx={{
                      py: 2,
                      "&:hover": { bgcolor: "rgba(0, 0, 0, 0.02)" },
                    }}
                  >
                    <ListItemAvatar sx={{ mr: 2 }}>
                      <Avatar
                        src={item.images[0]}
                        alt={item.title}
                        variant="rounded"
                        sx={{ width: 80, height: 80 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
                          {item.title}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Price: ${item.price}
                          </Typography>
                          <Typography variant="body2" color="primary">
                            Subtotal: ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      }
                    />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Remove />
                      </IconButton>
                      <Typography
                        sx={{ mx: 2, minWidth: "20px", textAlign: "center" }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleAddItem(item)}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>

            <Box sx={{ mt: 4, p: 3, bgcolor: "#f5f5f5", borderRadius: "8px" }}>
              <Typography variant="h5" gutterBottom>
                Order Summary
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6">Total Amount:</Typography>
                <Typography variant="h6" color="primary">
                  ${totalAmount.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "#1a237e",
                    "&:hover": { bgcolor: "#0d1b60" },
                  }}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default CartPage;
