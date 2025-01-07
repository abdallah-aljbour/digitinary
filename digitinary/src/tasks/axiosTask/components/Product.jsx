import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (product.id) {
      navigate(`/home/product/${product.id}`);
    } else {
      console.error("Product ID is undefined or null");
    }
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        },
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "relative", pt: "56.25%" }}>
        <CardMedia
          component="img"
          image={product.images?.[0] || "/path/to/default-image.jpg"} // Fallback image
          alt={product.title}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontSize: "1.1rem",
            fontWeight: 600,
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.category?.name || "Uncategorized"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
