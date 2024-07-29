import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
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

  if (!product) return <p>Loading...</p>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {product.productName}
      </Typography>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image="https://via.placeholder.com/500"
          alt={product.productName}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {product.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Company: {product.companyName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {product.categoryName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {product.rating}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Discount: {product.discount}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Availability: {product.availability ? 'In Stock' : 'Out of Stock'}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetailPage;
