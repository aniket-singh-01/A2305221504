import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="https://via.placeholder.com/150"
        alt={product.productName}
      />
      <CardContent>
        <Typography variant="h6">
          {product.productName}
        </Typography>
        <Typography color="textSecondary">
          ${product.price}
        </Typography>
        <Link to={`/product/${product.productId}`}>View Details</Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
