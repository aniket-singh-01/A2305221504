import React from 'react';
import ProductCard from './ProductCard';
import Grid from '@mui/material/Grid';

const ProductList = ({ products }) => {
  return (
    <Grid container spacing={2}>
      {products.map(product => (
        <Grid item xs={12} sm={6} md={4} key={product.productId}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
