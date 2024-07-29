import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={`https://via.placeholder.com/150?text=${product.name}`}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">Price: ${product.price}</Typography>
        <Typography variant="body2" color="text.secondary">Rating: {product.rating}</Typography>
        <Typography variant="body2" color="text.secondary">Discount: {product.discount}%</Typography>
        <Typography variant="body2" color="text.secondary">Availability: {product.availability}</Typography>
        <Link to={`/product/${product.id}`}>View Details</Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
