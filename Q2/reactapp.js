import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import './styles.css';

const API_BASE_URL = 'http://20.244.56.144/test/';

const getProducts = async (company, category, top, minPrice, maxPrice) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}companies/${company}/categories/${category}/products`, {
                params: { top, minPrice, maxPrice }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

const ProductList = ({ products }) => {
    return (
        <div className="product-list">
            {products.map(product => (
                <Card key={product.id} className="product-card">
                    <CardMedia
                        component="img"
                        alt={product.productName}
                        height="140"
                        image={`https://picsum.photos/200/300?random=${product.id}`}
                    />
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {product.productName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {product.company} - {product.category}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Price: ${product.price}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Rating: {product.rating}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Discount: {product.discount}%
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Availability: {product.availability}
                        </Typography>
                        <Link to={`/product/${product.id}`}>View Details</Link>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

const ProductDetail = ({ product }) => {
    return (
        <Card className="product-detail">
            <CardMedia
                component="img"
                alt={product.productName}
                height="140"
                image={`https://picsum.photos/200/300?random=${product.id}`}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {product.productName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {product.company} - {product.category}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Rating: {product.rating}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Discount: {product.discount}%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Availability: {product.availability}
                </Typography>
            </CardContent>
        </Card>
    );
};

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const products = await getProducts('AMZ', 'Laptop', 10, 1, 10000);
            setProducts(products);
        }
        fetchProducts();
    }, []);

    return (
        <div className="all-products-page">
            <h1>All Products</h1>
            <ProductList products={products} />
        </div>
    );
};

const ProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            const products = await getProducts('AMZ', 'Laptop', 10, 1, 10000);
            const product = products.find(p => p.id === productId);
            setProduct(product);
        }
        fetchProduct();
    }, [productId]);

    return (
        <div className="product-page">
            {product ? <ProductDetail product={product} /> : <p>Loading...</p>}
        </div>
    );
};

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={AllProducts} />
                    <Route path="/product/:productId" component={ProductPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
