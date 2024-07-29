import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/categories/Laptop/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

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
        <Typography variant="body2" color="text.secondary">Company: {product.company}</Typography>
        <Typography variant="body2" color="text.secondary">Category: {product.category}</Typography>
        <Typography variant="body2" color="text.secondary">Price: ${product.price}</Typography>
        <Typography variant="body2" color="text.secondary">Rating: {product.rating}</Typography>
        <Typography variant="body2" color="text.secondary">Discount: {product.discount}%</Typography>
        <Typography variant="body2" color="text.secondary">Availability: {product.availability}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductPage;
