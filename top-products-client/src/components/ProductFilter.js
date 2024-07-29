import React from 'react';
import { TextField, MenuItem, Button, Grid } from '@mui/material';

const ProductFilter = ({ onFilterChange }) => {
  const [category, setCategory] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [rating, setRating] = React.useState('');
  const [minPrice, setMinPrice] = React.useState(1);
  const [maxPrice, setMaxPrice] = React.useState(1000000);

  const handleFilter = () => {
    onFilterChange({
      category,
      company,
      rating,
      minPrice,
      maxPrice
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          label="Category"
          select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="Laptop">Laptop</MenuItem>
          <MenuItem value="Phone">Phone</MenuItem>
          {/* Add other categories */}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          label="Company"
          select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        >
          <MenuItem value="">All Companies</MenuItem>
          <MenuItem value="AMZ">AMZ</MenuItem>
          <MenuItem value="FLP">FLP</MenuItem>
          {/* Add other companies */}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          label="Rating"
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          label="Min Price"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <TextField
          fullWidth
          label="Max Price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleFilter}>
          Apply Filters
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductFilter;
