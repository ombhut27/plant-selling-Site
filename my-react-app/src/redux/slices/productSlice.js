import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ListProductAPI, FilterAPI } from "../../services/apiService";


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1, limit = 8 }) => {
    const response = await ListProductAPI(page, limit);
    return {
      products: response.data.products,
      pagination: response.data.pagination,
    };
  }
);


export const fetchFilteredProducts = createAsyncThunk(
  "products/fetchFilteredProducts",
  async ({
    category,
    hotsales,
    bestseller,
    newarrival,
    minPrice,
    maxPrice,
    page = 1,
    limit = 8,
    sort = "relevant",
  }) => {
    const response = await FilterAPI({
      category,
      hotsales,
      bestseller,
      newarrival,
      minPrice,
      maxPrice,
      page,
      limit,
      sort,
    });
    return {
      products: response.data.products,
      pagination: response.data.pagination,
    };
  }
);


const initialState = {
  products: [],
  status: "idle",
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  },
  sort: "relevant",
};


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.pagination.currentPage = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // All products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Filtered & Sorted products
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setSort } = productsSlice.actions;
export default productsSlice.reducer;

