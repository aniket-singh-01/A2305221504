const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const API_URL = 'http://20.244.56.144/test';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIyMjQ1NTkyLCJpYXQiOjE3MjIyNDUyOTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImJmODM5NTQ0LWMyMzUtNGY4ZC04NjE3LTUwNjUxNmNhYWY4OCIsInN1YiI6IndvcmsuYW5pa2V0c2luZ2hAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiQW1pdHkgVW5pdmVyc2l0eSIsImNsaWVudElEIjoiYmY4Mzk1NDQtYzIzNS00ZjhkLTg2MTctNTA2NTE2Y2FhZjg4IiwiY2xpZW50U2VjcmV0IjoiUlRnbnNLbllMT29pR3NqayIsIm93bmVyTmFtZSI6IkFuaWtldCBTaW5naCIsIm93bmVyRW1haWwiOiJ3b3JrLmFuaWtldHNpbmdoQGdtYWlsLmNvbSIsInJvbGxObyI6IkEyMzA1MjIxNTA0In0.7Rmnfxlg4WrQh3xE37gAreYPEDsiALzsTgkKrHPQPdI';

async function fetchProducts(company, categoryname, top, minPrice, maxPrice) {
    try {
        const response = await axios.get(`${API_URL}/companies/${company}/categories/${categoryname}/products`, {
            headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` },
            params: { top: parseInt(top, 10), minPrice: parseFloat(minPrice), maxPrice: parseFloat(maxPrice) }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching products from ${company}:`, error.response ? error.response.data : error.message);
        throw error;
    }
}

// GET /categories/:categoryname/products
app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { top = 10, minPrice = 0, maxPrice = 1000000, page = 1, sort = 'price', order = 'asc' } = req.query;

    console.log('Request Params:', { categoryname, top, minPrice, maxPrice, page, sort, order });

    try {
        const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
        let products = [];

        for (const company of companies) {
            console.log(`Fetching products from ${company}...`);
            const data = await fetchProducts(company, categoryname, top, minPrice, maxPrice);
            products = products.concat(data);
        }

        products.sort((a, b) => {
            if (order === 'asc') return a[sort] - b[sort];
            return b[sort] - a[sort];
        });

        const startIndex = (page - 1) * top;
        const endIndex = startIndex + top;
        const paginatedProducts = products.slice(startIndex, endIndex);

        res.json(paginatedProducts);
    } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// GET /categories/:categoryname/products/:productid
app.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;

    try {
        const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
        let product = null;

        for (const company of companies) {
            const data = await fetchProducts(company, categoryname, 1000000, 0, 1000000); // Fetch all products
            product = data.find(p => p.productId === productid);
            if (product) break;
        }

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product details:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch product details' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
