 The filterProducts endpoint (GET /products/filter/:query) has been removed, and its
  filtering/sorting capabilities have been consolidated directly into the main Get Products API
  (GET /products).

  Combining filtering, sorting, searching, category-matching, and pagination into GET /products
  provides a cleaner, RESTful design where all query criteria are passed seamlessly via URL query
  parameters.
  ──────
  ### 🚀 Updated Backend Features for GET /products
  #### Supported Query Parameters:

   Parameter               | Type   | Description                                  | Default
  -------------------------|--------|----------------------------------------------|-------------
   page                    | Number | Target page number                           | 1
   itemsPerPage (or limit) | Number | Number of items per page                     | 10
   filter (or sort)        | String | Filter/sort criteria (price-high2low, price- | date-recent
                           |        | low2high, date-recent, default)              |
   category                | String | Category ObjectId filter (optional)          | -
   search                  | String | Case-insensitive search string for product   | -
                           |        | name (optional)                              |
  #### API Response Payload:

    {
      "products": [
        {
          "_id": "64f1a2b...",
          "name": "Luxury Sofa",
          "price": 500,
          "discount_percent": 10,
          "finalPrice": 450,
          "category": {
            "_id": "64f1a00...",
            "name": "Living Room"
          },
          "images": [...],
          "createdAt": "2026-08-04T00:00:00.000Z"
        }
      ],
      "pagination": {
        "totalItems": 45,
        "totalPages": 5,
        "currentPage": 1,
        "itemsPerPage": 10,
        "hasNextPage": true,
        "hasPrevPage": false
      }
    }
    ──────
  ### 🖥️ What to Change on the Frontend Side

  #### 1. Update API Calls to Remove /products/filter/:query

  Replace calls to /products/filter/... with /products and pass filter, page, and itemsPerPage as
  query parameters.

  Before (Old Filter Request):

    // ❌ Old separate filter route
    axios.get(`/products/filter/${selectedFilter}`);
    
  After (New Consolidated Request):

    // ✅ New unified request with pagination & filter parameters
    const fetchProducts = async ({ page = 1, itemsPerPage = 10, filter = 'date-recent',
  categoryId = '' }) => {
      try {
        const response = await axios.get('/products', {
          params: {
            page,
            itemsPerPage,
            filter,      // 'price-high2low' | 'price-low2high' | 'date-recent' | 'default'
            category: categoryId // Optional category filter
          }
        });
    
        const { products, pagination } = response.data;
        // Set products and pagination state in your UI
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    ──────
  #### 2. React Component Example (Filter + Pagination)

    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    
    const ProductsPage = () => {
      const [products, setProducts] = useState([]);
      const [filter, setFilter] = useState('date-recent'); // Default filter option
      const [page, setPage] = useState(1);
      const [itemsPerPage] = useState(10);
      const [pagination, setPagination] = useState({
        totalItems: 0,
        totalPages: 1,
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false
      });
    
      const loadProducts = async () => {
        try {
          const res = await axios.get('/products', {
            params: {
              page,
              itemsPerPage,
              filter
            }
          });
          setProducts(res.data.products);
          setPagination(res.data.pagination);
        } catch (err) {
          console.error('Failed to load products:', err);
        }
      };
    
      // Re-fetch when page or filter selection changes
      useEffect(() => {
        loadProducts();
      }, [page, filter]);
    
      // Reset to page 1 whenever user changes filter option
      const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setPage(1);
      };
    
      return (
        <div>
          {/* Filter Dropdown */}
          <select value={filter} onChange={handleFilterChange}>
            <option value="date-recent">Newest Arrivals</option>
            <option value="price-low2high">Price: Low to High</option>
            <option value="price-high2low">Price: High to Low</option>
          </select>
    
          {/* Product List */}
          <div className="product-grid">
            {products.map(item => (
              <div key={item._id}>
                <h3>{item.name}</h3>
                <p>${item.finalPrice}</p>
              </div>
            ))}
          </div>
    
          {/* Pagination Controls */}
          <div className="pagination">
            <button 
              disabled={!pagination.hasPrevPage} 
              onClick={() => setPage(prev => prev - 1)}
            >
              Previous
            </button>

            <span>Page {pagination.currentPage} of {pagination.totalPages}</span>

            <button 
              disabled={!pagination.hasNextPage} 
              onClick={() => setPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      );
    };

    export default ProductsPage;
    ──────
  ### 📋 Summary of Frontend Steps:

  1. Delete any helper functions referencing /products/filter/${filter}.
  2. Update product fetching logic to hit GET /products with { page, itemsPerPage, filter }.
  3. When changing filters or search terms, remember to reset page back to 1 so users start
  viewing from the first page of the filtered dataset.

