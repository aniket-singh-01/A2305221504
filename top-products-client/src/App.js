import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProductsPage from './pages/AllProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { Container, CssBaseline } from '@mui/material';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container>
        <Routes>
          <Route path="/" element={<AllProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
