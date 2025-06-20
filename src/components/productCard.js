import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography, Button, CardActionArea, CardActions, Card, Box, Rating, CircularProgress, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../reducer/services/CartService';
import { addToFavorite, removeFromFavorite } from '../reducer/services/AuthService';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [isFavorite, setIsFavorite] = useState(false);
    const userId = user?.id;
    const loading = useSelector((state) => state.cart.loading);
    const error = useSelector((state) => state.cart.error);

    const [showError, setShowError] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        if (user) {
          const favoriteList = user?.favorites || [];
          setIsFavorite(favoriteList.some(p => p.id === product.id));
        } else {
          // For guests, check localStorage
          const guestFavorites = JSON.parse(localStorage.getItem('guest_favorites')) || [];
          setIsFavorite(guestFavorites.some(p => p.id === product.id));
        }
      }, [user, product, isFavorite]);

    useEffect(() => {
        if (error) {
            setShowError(true);

            // Hide the error message after 5 seconds
            const timer = setTimeout(() => {
                setShowError(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        console.log(user?.carts?.[0]?.articles?.length);

    }, [dispatch]);

    const handleAddToCart = async () => {
        setButtonLoading(true);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'add_to_cart', // Custom event name
            ecommerce: {
                content_type: 'product',
                content_ids: [product?.id],
                content_name: product?.title,
                value: Number(calculateDiscountedPrice()),
                currency: 'BDT'
            }
        });

        try {
            if (user) {
                await dispatch(addToCart({ userId, productId: product?.id, unit: 1 }));
            }
            else {
                let cart = JSON.parse(localStorage.getItem('guest_cart')) || [];

                const existingIndex = cart.findIndex(item => item.product.id === product.id);

                if (existingIndex !== -1) {
                    cart[existingIndex].unit += 1;
                } else {
                    const {id}=product;
                    cart.push({ product: { id }, unit: 1 });
                }

                localStorage.setItem('guest_cart', JSON.stringify(cart));

            }

        } catch (error) {
            setShowError(true);
        } finally {
            setButtonLoading(false);
        }
    };

    const handleToggleFavorite = async () => {

        const req = {
            userId,
            productId: product?.id
        }
        setButtonLoading(true);

        if(user){
            if (isFavorite) {
                try {
                    await dispatch(removeFromFavorite(req));
                    
    
                } catch (error) {
                    setShowError(true);
                }
            }
            else {
                try {
                    await dispatch(addToFavorite(req));
                    setButtonLoading(false);
                } catch (error) {
                    setShowError(true);
                }
    
            }

        }
        else{
            try {
                const guestFavorites = JSON.parse(localStorage.getItem('guest_favorites')) || [];
                const alreadyFavorite = guestFavorites.some(p => p.id === product.id);
    
                if (alreadyFavorite) {
                    // Remove from guest favorites
                    const updatedFavorites = guestFavorites.filter(p => p.id !== product.id);
                    localStorage.setItem('guest_favorites', JSON.stringify(updatedFavorites));
                } else {
                    // Add to guest favorites
                    const updatedFavorites = [...guestFavorites, product];
                    localStorage.setItem('guest_favorites', JSON.stringify(updatedFavorites));
                }
                setIsFavorite(!alreadyFavorite);
            } catch (error) {
                console.error("Guest favorite error:", error);
                setShowError(true);
            }
        }
 
        setButtonLoading(false);
        
    };

    const calculateDiscountedPrice = () => {
        if (product?.discountPercentage) {
            return (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);
        }
        return product.price.toFixed(2);
    };

    return (
        <Box sx={{ position: 'relative', /* width: { xs: '100%', sm: '48%', md: '31%', lg: '24%' } */ m: 1 }}>
            {buttonLoading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(.5px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                    }}
                >
                    <CircularProgress size={40} />
                </Box>
            )}

            <Card
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                {/* <CardActionArea sx={{ flexGrow: 1 }}> */}
                    <Link 
                    to={`/productDetails/${product?.id}`} 
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    onClick={() => {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                          event: 'view_content', // custom GTM event
                          ecommerce: {
                            content_type: 'product',
                            content_ids: [product?.id],
                            content_name: product?.title,
                            value: Number(calculateDiscountedPrice()),
                            currency: 'BDT'
                          }
                        });
                    }}
                    >
                        <CardMedia
                            component="img"
                            image={product?.thumbnail}
                            alt={product?.title}
                            loading="lazy"
                            sx={{
                                width: '100%',
                                height: { xs: 220, sm: 220, md: 220, lg: 260 },
                                objectFit: 'cover'
                            }}
                        />
                        <CardContent
                            sx={{
                                bgcolor: 'info.main',
                                p: { xs: 1, sm: 1.5 },
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                minHeight: 100,
                            }}
                        >
                            <Typography
                                gutterBottom
                                variant="body2"
                                sx={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                    overflow: 'hidden',
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                }}
                            >
                                {product?.title}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Rating
                                    name="product-rating"
                                    value={product?.rating || 4.5}
                                    precision={0.5}
                                    readOnly
                                    icon={<StarIcon fontSize="small" color="error" />}
                                    emptyIcon={<StarIcon fontSize="inherit" sx={{ color: 'lightgray' }} />}
                                />
                            </Box>

                            {product?.discountPercentage ? (
                                <Box mt={0.5}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
                                            ৳ {product?.price}
                                        </Typography>
                                        <Typography variant="body2" color="secondary">
                                            -{product?.discountPercentage}%
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" fontWeight="bold" color="primary">
                                        ৳ {calculateDiscountedPrice()}
                                    </Typography>
                                </Box>
                            ) : (
                                <Box mt={0.5}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through' }}>

                                        </Typography>
                                        <Typography variant="body2" color="secondary">

                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" mt={1} fontWeight="bold" color="primary">
                                        ৳ {product?.price.toFixed(2)}
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Link>
                {/* </CardActionArea> */}

                {/* <Box display="flex" gap={1} p={1}>
                    <Button
                        disabled={product?.stock <= 0}
                        variant="contained"
                        onClick={handleAddToCart}
                        fullWidth
                    >
                        <AddShoppingCartOutlinedIcon />
                    </Button>
                    <IconButton onClick={handleToggleFavorite} color="error">
                        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                </Box> */}
                <Box display="flex" gap={.5} p={0.3}>
                    <Button
                        disabled={product?.stock <= 0}
                        variant="contained"
                        onClick={handleAddToCart}
                        fullWidth
                        sx={{
                            minWidth: 0,
                            px: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {/* <AddShoppingCartOutlinedIcon /> */}
                        ADD TO CART
                    </Button>

                    <Button
                        onClick={handleToggleFavorite}
                        variant="contained"
                        color={isFavorite ? 'error' : 'inherit'}
                        sx={{
                            minWidth: 0,
                            px: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default ProductCard;
