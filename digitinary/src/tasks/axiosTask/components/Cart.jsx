import React from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  clearCart,
  selectCartItems,
  selectCartTotalAmount,
} from "../features/products/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
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
    <Paper elevation={3} sx={{ p: 2, borderRadius: "12px" }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 600, color: "#1a237e" }}
      >
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ py: 2 }}>
          Your cart is empty
        </Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <Box
                    component="img"
                    src={item.images[0]}
                    alt={item.title}
                    sx={{ width: 60, height: 60, borderRadius: "8px", mr: 2 }}
                  />
                  <ListItemText
                    primary={item.title}
                    secondary={`$${item.price} × ${item.quantity}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveItem(item.id)}
                      size="small"
                    >
                      <Remove />
                    </IconButton>
                    <Typography component="span" sx={{ mx: 1 }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      edge="end"
                      onClick={() => handleAddItem(item)}
                      size="small"
                    >
                      <Add />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>

          <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: "8px" }}>
            <Typography variant="h6" gutterBottom>
              Total: ${totalAmount.toFixed(2)}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#1a237e",
                  "&:hover": { bgcolor: "#0d1b60" },
                }}
              >
                Checkout
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleClearCart}
                startIcon={<Delete />}
              >
                Clear Cart
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Cart;
