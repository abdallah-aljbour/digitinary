// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import axios from "axios";

// // // Fetch all products
// // export const fetchProducts = createAsyncThunk(
// //   "products/fetchProducts",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.get(
// //         "https://api.escuelajs.co/api/v1/products"
// //       );
// //       return response.data;
// //     } catch (error) {
// //       return rejectWithValue(error.response.data);
// //     }
// //   }
// // );

// // // Fetch single product
// // export const fetchProductById = createAsyncThunk(
// //   "products/fetchProductById",
// //   async (id, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.get(
// //         `https://api.escuelajs.co/api/v1/products/${id}`
// //       );
// //       return response.data;
// //     } catch (error) {
// //       return rejectWithValue(error.response.data);
// //     }
// //   }
// // );

// // // Update product
// // export const updateProduct = createAsyncThunk(
// //   "products/updateProduct",
// //   async ({ id, updatedData }, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.put(
// //         `https://api.escuelajs.co/api/v1/products/${id}`,
// //         updatedData
// //       );
// //       return response.data;
// //     } catch (error) {
// //       return rejectWithValue(error.response.data);
// //     }
// //   }
// // );

// // // Delete product
// // export const deleteProduct = createAsyncThunk(
// //   "products/deleteProduct",
// //   async (id, { rejectWithValue }) => {
// //     try {
// //       await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
// //       return id;
// //     } catch (error) {
// //       return rejectWithValue(error.response.data);
// //     }
// //   }
// // );

// // // Create product
// // export const createProduct = createAsyncThunk(
// //   "products/createProduct",
// //   async (productData, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.post(
// //         "https://api.escuelajs.co/api/v1/products/",
// //         productData
// //       );
// //       return response.data;
// //     } catch (error) {
// //       return rejectWithValue(error.response.data);
// //     }
// //   }
// // );

// // const productSlice = createSlice({
// //   name: "products",
// //   initialState: {
// //     items: [],
// //     selectedProduct: null,
// //     status: "idle",
// //     error: null,
// //     currentPage: 1,
// //     itemsPerPage: 12,
// //   },
// //   reducers: {
// //     setCurrentPage: (state, action) => {
// //       state.currentPage = action.payload;
// //     },
// //     clearSelectedProduct: (state) => {
// //       state.selectedProduct = null;
// //     },
// //     clearError: (state) => {
// //       state.error = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       // Fetch Products cases
// //       .addCase(fetchProducts.pending, (state) => {
// //         state.status = "loading";
// //       })
// //       .addCase(fetchProducts.fulfilled, (state, action) => {
// //         state.status = "succeeded";
// //         state.items = action.payload;
// //       })
// //       .addCase(fetchProducts.rejected, (state, action) => {
// //         state.status = "failed";
// //         state.error = action.payload;
// //       })

// //       // Fetch Single Product cases
// //       .addCase(fetchProductById.pending, (state) => {
// //         state.status = "loading";
// //       })
// //       .addCase(fetchProductById.fulfilled, (state, action) => {
// //         state.status = "succeeded";
// //         state.selectedProduct = action.payload;
// //       })
// //       .addCase(fetchProductById.rejected, (state, action) => {
// //         state.status = "failed";
// //         state.error = action.payload;
// //       })

// //       // Update Product cases
// //       .addCase(updateProduct.pending, (state) => {
// //         state.status = "loading";
// //       })
// //       .addCase(updateProduct.fulfilled, (state, action) => {
// //         state.status = "succeeded";
// //         state.selectedProduct = action.payload;
// //         const index = state.items.findIndex(
// //           (item) => item.id === action.payload.id
// //         );
// //         if (index !== -1) {
// //           state.items[index] = action.payload;
// //         }
// //       })
// //       .addCase(updateProduct.rejected, (state, action) => {
// //         state.status = "failed";
// //         state.error = action.payload;
// //       })

// //       // Delete Product cases
// //       .addCase(deleteProduct.pending, (state) => {
// //         state.status = "loading";
// //       })
// //       .addCase(deleteProduct.fulfilled, (state, action) => {
// //         state.status = "succeeded";
// //         state.items = state.items.filter((item) => item.id !== action.payload);
// //         state.selectedProduct = null;
// //       })
// //       .addCase(deleteProduct.rejected, (state, action) => {
// //         state.status = "failed";
// //         state.error = action.payload;
// //       })

// //       // Create Product cases
// //       .addCase(createProduct.pending, (state) => {
// //         state.status = "loading";
// //       })
// //       .addCase(createProduct.fulfilled, (state, action) => {
// //         state.status = "succeeded";
// //         state.items.unshift(action.payload);
// //       })
// //       .addCase(createProduct.rejected, (state, action) => {
// //         state.status = "failed";
// //         state.error = action.payload;
// //       });
// //   },
// // });

// // // Actions
// // export const { setCurrentPage, clearSelectedProduct, clearError } =
// //   productSlice.actions;

// // // Selectors
// // export const selectAllProducts = (state) => state.products.items;
// // export const selectProductsStatus = (state) => state.products.status;
// // export const selectProductsError = (state) => state.products.error;
// // export const selectCurrentPage = (state) => state.products.currentPage;
// // export const selectItemsPerPage = (state) => state.products.itemsPerPage;
// // export const selectSelectedProduct = (state) => state.products.selectedProduct;

// // export default productSlice.reducer;
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Fetch all products
// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         "https://api.escuelajs.co/api/v1/products"
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Fetch single product
// export const fetchProductById = createAsyncThunk(
//   "products/fetchProductById",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `https://api.escuelajs.co/api/v1/products/${id}`
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Update product
// export const updateProduct = createAsyncThunk(
//   "products/updateProduct",
//   async ({ id, updatedData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `https://api.escuelajs.co/api/v1/products/${id}`,
//         updatedData
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Delete product
// export const deleteProduct = createAsyncThunk(
//   "products/deleteProduct",
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Create product
// export const createProduct = createAsyncThunk(
//   "products/createProduct",
//   async (productData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "https://api.escuelajs.co/api/v1/products/",
//         productData
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const productSlice = createSlice({
//   name: "products",
//   initialState: {
//     items: [],
//     selectedProduct: null,
//     status: "idle",
//     error: null,
//     currentPage: 1,
//     itemsPerPage: 12,
//     filters: {
//       category: "all",
//       priceRange: {
//         min: 0,
//         max: Infinity,
//       },
//     },
//   },
//   reducers: {
//     setCurrentPage: (state, action) => {
//       state.currentPage = action.payload;
//     },
//     clearSelectedProduct: (state) => {
//       state.selectedProduct = null;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//     setCategoryFilter: (state, action) => {
//       state.filters.category = action.payload;
//       state.currentPage = 1; // Reset to first page when filter changes
//     },
//     setPriceRange: (state, action) => {
//       state.filters.priceRange = action.payload;
//       state.currentPage = 1; // Reset to first page when filter changes
//     },
//     clearFilters: (state) => {
//       state.filters = {
//         category: "all",
//         priceRange: {
//           min: 0,
//           max: Infinity,
//         },
//       };
//       state.currentPage = 1;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Products cases
//       .addCase(fetchProducts.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Fetch Single Product cases
//       .addCase(fetchProductById.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchProductById.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.selectedProduct = action.payload;
//       })
//       .addCase(fetchProductById.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Update Product cases
//       .addCase(updateProduct.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(updateProduct.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.selectedProduct = action.payload;
//         const index = state.items.findIndex(
//           (item) => item.id === action.payload.id
//         );
//         if (index !== -1) {
//           state.items[index] = action.payload;
//         }
//       })
//       .addCase(updateProduct.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Delete Product cases
//       .addCase(deleteProduct.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = state.items.filter((item) => item.id !== action.payload);
//         state.selectedProduct = null;
//       })
//       .addCase(deleteProduct.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Create Product cases
//       .addCase(createProduct.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(createProduct.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items.unshift(action.payload);
//       })
//       .addCase(createProduct.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// // Actions
// export const {
//   setCurrentPage,
//   clearSelectedProduct,
//   clearError,
//   setCategoryFilter,
//   setPriceRange,
//   clearFilters,
// } = productSlice.actions;

// // Selectors
// export const selectAllProducts = (state) => state.products.items;
// export const selectProductsStatus = (state) => state.products.status;
// export const selectProductsError = (state) => state.products.error;
// export const selectCurrentPage = (state) => state.products.currentPage;
// export const selectItemsPerPage = (state) => state.products.itemsPerPage;
// export const selectSelectedProduct = (state) => state.products.selectedProduct;
// export const selectFilters = (state) => state.products.filters;
// export const selectFilteredProducts = (state) => {
//   const { items } = state.products;
//   const { category, priceRange } = state.products.filters;

//   return items.filter((product) => {
//     const categoryMatch = category === "all" || product.category === category;
//     const priceMatch =
//       product.price >= priceRange.min && product.price <= priceRange.max;
//     return categoryMatch && priceMatch;
//   });
// };

// export default productSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch single product
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/products/",
        productData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedProduct: null,
    status: "idle",
    error: null,
    currentPage: 1,
    itemsPerPage: 12,
    searchTerm: "",
    priceRange: {
      min: 0,
      max: Infinity,
    },
    cart: {
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
    },
  },
  reducers: {
    // Page navigation
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    // Search and filter
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
      state.currentPage = 1;
    },
    clearFilters: (state) => {
      state.searchTerm = "";
      state.priceRange = {
        min: 0,
        max: Infinity,
      };
      state.currentPage = 1;
    },

    // Product selection
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },

    // Error handling
    clearError: (state) => {
      state.error = null;
    },

    // Cart operations
    addToCart: (state, action) => {
      const { id, price, title, images } = action.payload;
      const existingItem = state.cart.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = existingItem.quantity * price;
      } else {
        state.cart.items.push({
          id,
          title,
          price,
          images,
          quantity: 1,
          total: price,
        });
      }

      state.cart.totalQuantity = state.cart.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.cart.totalAmount = state.cart.items.reduce(
        (total, item) => total + item.total,
        0
      );
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cart.items.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cart.items = state.cart.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity -= 1;
          existingItem.total = existingItem.quantity * existingItem.price;
        }

        state.cart.totalQuantity = state.cart.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.cart.totalAmount = state.cart.items.reduce(
          (total, item) => total + item.total,
          0
        );
      }
    },
    clearCart: (state) => {
      state.cart = {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products cases
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch Single Product cases
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Create Product cases
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update Product cases
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete Product cases
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.selectedProduct = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  setCurrentPage,
  setSearchTerm,
  setPriceRange,
  clearFilters,
  clearSelectedProduct,
  clearError,
  addToCart,
  removeFromCart,
  clearCart,
} = productSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectItemsPerPage = (state) => state.products.itemsPerPage;
export const selectSearchTerm = (state) => state.products.searchTerm;
export const selectPriceRange = (state) => state.products.priceRange;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectCart = (state) => state.products.cart;
export const selectCartTotalQuantity = (state) =>
  state.products.cart.totalQuantity;
export const selectCartTotalAmount = (state) => state.products.cart.totalAmount;

// Filtered products selector
export const selectFilteredProducts = (state) => {
  const { items, searchTerm, priceRange } = state.products;

  return items.filter((product) => {
    const searchMatch =
      searchTerm === "" ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const priceMatch =
      product.price >= priceRange.min &&
      product.price <=
        (priceRange.max === Infinity ? product.price : priceRange.max);

    return searchMatch && priceMatch;
  });
};

export default productSlice.reducer;
