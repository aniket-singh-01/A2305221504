const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors'); // Import CORS

const app = express();
const PORT = 3000;

// Access Token
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIyMjUyNTI3LCJpYXQiOjE3MjIyNTIyMjcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImJmODM5NTQ0LWMyMzUtNGY4ZC04NjE3LTUwNjUxNmNhYWY4OCIsInN1YiI6IndvcmsuYW5pa2V0c2luZ2hAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiQW1pdHkgVW5pdmVyc2l0eSIsImNsaWVudElEIjoiYmY4Mzk1NDQtYzIzNS00ZjhkLTg2MTctNTA2NTE2Y2FhZjg4IiwiY2xpZW50U2VjcmV0IjoiUlRnbnNLbllMT29pR3NqayIsIm93bmVyTmFtZSI6IkFuaWtldCBTaW5naCIsIm93bmVyRW1haWwiOiJ3b3JrLmFuaWtldHNpbmdoQGdtYWlsLmNvbSIsInJvbGxObyI6IkEyMzA1MjIxNTA0In0.Wd4T_qUtUb8nTJ3rjQJf0kMGp4AI_TBb__5v2czHBCA';

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Helper function to fetch products from the test server
async function fetchProducts(categoryName, top, minPrice, maxPrice, page = 1, sort = 'price', order = 'asc') {
    const url = `http://20.244.56.144/test/companies/AMZ/categories/${categoryName}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&sort=${sort}&order=${order}`;
    
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch products');
    }
}

// API Endpoint to get products by category
app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { top = 10, minPrice = 1, maxPrice = 1000000, page = 1, sort = 'price', order = 'asc' } = req.query;

    try {
        const products = await fetchProducts(categoryname, top, minPrice, maxPrice, page, sort, order);
        
        // Add a unique identifier to each product
        const productsWithId = products.map(product => ({
            ...product,
            id: uuidv4() // Add a unique identifier
        }));
        
        res.json(productsWithId);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// API Endpoint to get product details by ID
app.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;
    
    try {
        const products = await fetchProducts(categoryname, 10000, 0, 1000000); // Fetch a large number of products to get the specific one
        const product = products.find(p => p.id === productid);
        
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
