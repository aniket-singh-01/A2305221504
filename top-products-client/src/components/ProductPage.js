// src/pages/AllProductsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import ProductFilter from '../components/ProductFilter';
import { Container, Typography } from '@mui/material';
import API_BASE_URL from '../apiConfig';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    rating: '',
    minPrice: 1,
    maxPrice: 1000000,
    sort: 'price',
    order: 'asc',
    page: 1,
    top: 10
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/categories/Laptop/products`, {
          params: filters
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Products
      </Typography>
      <ProductFilter onFilterChange={handleFilterChange} />
      <ProductList products={products} />
    </Container>
  );
};

export default AllProductsPage;
