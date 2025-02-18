import React, { useEffect, useMemo, Suspense } from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../reducer/services/ProductService';
import ProductCard from '../components/productCard';

const ProductPage = ({ filter }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const isLoading = useSelector((state) => state.product.isLoading); // Track loading status

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchAllProducts());
        }
    }, [dispatch, products.length]); // Load products only if not already in the store

    const filteredProducts = useMemo(() => {
        if (!filter) return products; // If no filter is provided, return all products

        switch (filter) {
            case "NEW_ARRIVAL":
                return products.filter((product) => product.newArrival === true);
            case "BABY_AND_KIDS":
                return products.filter((product) => product.category === "BABY_AND_KIDS");
            case "FAMILY_AND_MOM":
                return products.filter((product) => product.category === "FAMILY_AND_MOM");
            case "NEWBORN":
                return products.filter((product) => product.tags === "NEWBORN");
            case "CHILDREN":
                return products.filter((product) => product.tags === "CHILDREN");
            case "MOM":
                return products.filter((product) => product.tags === "MOM");
            case "TODDLER":
                return products.filter((product) => product.tags === "TODDLER");
            default:
                return products; // Default to returning all products
        }
    }, [filter, products]);

    const getTitle = (filter) => {
        switch (filter) {
            case "NEW_ARRIVAL":
                return "New Arrival";
            case "BABY_AND_KIDS":
                return "Baby & Kids";
            case "FAMILY_AND_MOM":
                return "Family & Mom";
            case "NEWBORN":
                return "Newborn";
            case "CHILDREN":
                return "Children";
            case "MOM":
                return "Mom";
            case "TODDLER":
                return "Toddler";
            default:
                return "Products";
        }
    };

    return (
        <Box sx={{ padding: .5, minHeight: '78vh', ml: { xs: .5, sm: 3, md: 11, lg: 15, xl: 23 }, mr: { xs: .5, sm: 3, md: 11, lg: 15, xl: 23 }, pb: 9 }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h1" align="left" color="primary" sx={{ fontSize: { xs: '20px', md: '24px', lg: '36px' } }}>
                    {getTitle(filter)}
                </Typography>
            </Box>
            <Divider sx={{ bgcolor: 'info.dark', minHeight: '.2vh' }} />
            <Suspense fallback={<Typography>Loading products...</Typography>}>
                <Grid container alignItems="center" justifyContent="left" spacing={1} mt={2}>
                    {isLoading ? (
                        <Typography variant="h6" color="primary">Loading...</Typography>
                    ) : (
                        filteredProducts.map((product) => (
                            <Grid key={product.id} item xs={6} sm={3} md={3} lg={2.4} xl={2.4} sx={{ mt: 2 }}>
                                <React.memo>
                                    <ProductCard product={product} />
                                </React.memo>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Suspense>
        </Box>
    );
};

export default ProductPage;

