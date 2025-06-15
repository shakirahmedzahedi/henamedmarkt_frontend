import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, CardMedia, IconButton, Divider, CircularProgress, Dialog } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../reducer/services/ProductService';
import { addToCart } from '../reducer/services/CartService';
import ReactMarkdown from "react-markdown";

const ProductDetails = () => {
  const { productId } = useParams(); // Get productId from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.product.loading);
  const isAuthenticate = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false); // For blurring effect and loader
  const [openImageDialog, setOpenImageDialog] = useState(false); // State for image modal

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const handleQuantityChange = (type) => {
    if (type === 'increment') setQuantity(quantity + 1);
    else if (type === 'decrement' && quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = async () => {

    setIsProcessing(true); // Start processing (blur and loader)
    window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'add_to_cart', // Custom event name
            ecommerce: {
                content_type: 'product',
                content_ids: [product?.id],
                content_name: product?.title,
                value: Number(0),
                currency: 'BDT'
            }
        });
    try {
      //await dispatch(addToCart({ userId, productId: product?.id, unit: quantity }));
      if (user) {
        await dispatch(addToCart({ userId, productId: product?.id, unit: quantity }));
      }
      else {
        let cart = JSON.parse(localStorage.getItem('guest_cart')) || [];

        const existingIndex = cart.findIndex(item => item.product.id === product.id);

        if (existingIndex !== -1) {
          cart[existingIndex].unit += quantity;
        } else {
          cart.push({ product: { ...product }, unit: quantity });
        }

        localStorage.setItem('guest_cart', JSON.stringify(cart));

      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false); // End processing
    }
  };

  const oldPrice = product?.price || 0;
  const newPrice = oldPrice - (oldPrice * (product?.discountPercentage || 0) / 100);

  return (
    <Box sx={{ pb: 9 }}>
      {isProcessing && (
        // Fullscreen Loader
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <CircularProgress size={96} />
        </Box>
      )}
      <Box sx={{ filter: isProcessing ? 'blur(5px)' : 'none', pointerEvents: isProcessing ? 'none' : 'auto' }}>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <CircularProgress size={96} />
          </Box>
        ) : (
          <Box sx={{ maxWidth: 1000, mx: 'auto', p: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h1"
                align="left"
                color="primary"
                sx={{ fontFamily: 'Poppins', fontSize: { xs: '12px', md: '24px', lg: '24px' } }}
              >
                {product?.title}
              </Typography>
            </Box>
            <Box>
              <Divider sx={{ bgcolor: 'info.dark', minHeight: '.1vh' }} />
            </Box>
            <Grid container mt={0.5} spacing={4} sx={{ fontFamily: 'Poppins' }}>
              {/* Product Image with Click-to-Zoom */}
              <Grid item xs={12} md={6} textAlign={'right'}>
                <Box
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 2,
                    width: '80%',
                    margin: '0 auto',
                    cursor: 'pointer', // Cursor change to indicate clickability
                  }}
                  onClick={() => setOpenImageDialog(true)} // Open modal on click
                >
                  <CardMedia
                    component="img"
                    image={product?.thumbnail}
                    alt="Product Thumbnail"
                    sx={{
                      transition: 'transform 0.3s ease-in-out', // Smooth zoom effect
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                    }}
                  />
                </Box>

                {/* Image Dialog */}
                <Dialog
                  open={openImageDialog}
                  onClose={() => setOpenImageDialog(false)}
                  maxWidth="lg"
                  sx={{
                    '& .MuiDialog-paper': {
                      backgroundColor: 'transparent', // Remove dialog background
                      boxShadow: 'none',
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '70vw',
                      height: '70vh',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={product?.thumbnail}
                      alt="Full Size Product"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                </Dialog>
              </Grid>

              {/* Product Information */}
              <Grid item xs={12} md={6} textAlign={'right'}>
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  {product?.title}
                </Typography>

                {/* Price Section */}
                {product?.discountPercentage ? (
                  <Typography variant="h5" color="primary" sx={{ mb: 1 }}>
                    ৳ {newPrice.toFixed(2)}{' '}
                    <Box
                      component="span"
                      sx={{ textDecoration: 'line-through', ml: 1, fontSize: '0.875rem', color: 'text.secondary' }}
                    >
                      ৳ {oldPrice.toFixed(2)}
                    </Box>
                  </Typography>
                ) : (
                  <Typography variant="h5" color="primary" sx={{ mb: 1 }}>
                    ৳ {newPrice.toFixed(2)}
                  </Typography>
                )}

                {product?.discountPercentage ? (
                  <Typography variant="h6" color="secondary" sx={{ mb: 1 }}>
                    {product?.discountPercentage}%
                  </Typography>
                ) : null}
                <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                  ProductId: {product?.id}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                  Brand: {product?.brand}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                  {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                  Size: {product?.size}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Quantity Control */}
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Quantity
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mb: 1 }}>
                  <IconButton onClick={() => handleQuantityChange('decrement')}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                  <IconButton onClick={() => handleQuantityChange('increment')}>
                    <AddIcon />
                  </IconButton>
                </Box>

                <Divider sx={{ my: 1 }} />

                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCart}
                  size="large"
                  sx={{ mt: 3 }}
                  disabled={product?.stock < 1}
                >
                  ADD TO CART
                </Button>
              </Grid>
            </Grid>

            {/* Additional Information */}
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <p><ReactMarkdown>{product?.description}</ReactMarkdown></p>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Additional Info</Typography>
              <p>{product?.additionalInfo}</p>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Extras</Typography>
              {
                product?.extraInfo && (
                  <iframe
                    width="100%"
                    height="315"
                    src={product.extraInfo}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>


                )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetails;
