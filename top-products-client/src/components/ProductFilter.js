import React from 'react';
import { Box, TextField, MenuItem, Slider, Typography } from '@mui/material';

const ProductFilter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        select
        label="Category"
        name="category"
        value={filters.category}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        {/* Replace these options with actual categories */}
        <MenuItem value="Laptop">Laptop</MenuItem>
        <MenuItem value="Phone">Phone</MenuItem>
      </TextField>

      <TextField
        select
        label="Company"
        name="company"
        value={filters.company}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        {/* Replace these options with actual companies */}
        <MenuItem value="AMZ">AMZ</MenuItem>
        <MenuItem value="FLP">FLP</MenuItem>
      </TextField>

      <Slider
        value={filters.priceRange}
        onChange={(e, newValue) => setFilters({ ...filters, priceRange: newValue })}
        valueLabelDisplay="auto"
        min={0}
        max={1000000}
        sx={{ marginTop: 2 }}
      />
      <Typography gutterBottom>Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}</Typography>

      <TextField
        label="Rating"
        type="number"
        name="rating"
        value={filters.rating}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    </Box>
  );
};

export default ProductFilter;
