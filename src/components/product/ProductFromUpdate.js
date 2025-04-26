import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Typography,
    Container,
    Grid,
    CircularProgress,
    Alert,
    FormControlLabel,
    Checkbox,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import { BlobServiceClient } from '@azure/storage-blob';

const ProductFormUpdate = ({ product, onUpdate, onCancel }) => {
    const categories = ['BABY_AND_KIDS', 'FAMILY_AND_MOM', 'NEW_ARRIVAL'];
    const tagsOptions = ['NEWBORN', 'TODDLER', 'CHILDREN', 'MOM'];
    const [formValues, setFormValues] = useState({
        title: product.title || '',
        description: product.description || '',
        category: product.category || '',
        price: product.price || 0,
        discountPercentage: product.discountPercentage || 0,
        rating: product.rating || 0,
        stock: product.stock || 0,
        tags: product.tags || '',
        brand: product.brand || '',
        size: product.size || 0,
        weight: product.weight || 0,
        thumbnail: product.thumbnail || '',
        bestSeller: product.bestSeller || false,
        newArrival: product.newArrival || false,
        extra:product.extraInfo||''
    });

    const [thumbnailPreview, setThumbnailPreview] = useState(product.thumbnail || null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const blobServiceUrl = 'https://henamedmarktstorage.blob.core.windows.net'; // Replace with your Blob service URL
    const sasToken =
        'sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-12-22T23:07:16Z&st=2024-12-22T15:07:16Z&spr=https&sig=KV0mMOUX3njIiG%2FbroXF6tzlsKeQ3AoWSvPzCwc9fxs%3D'; // Replace with your SAS token
    const containerName = 'product-images'; // Your Azure Blob Storage container name

    useEffect(() => {
        // Update form values when product prop changes
        setFormValues({
            title: product.title || '',
            description: product.description || '',
            category: product.category || '',
            price: product.price || 0,
            discountPercentage: product.discountPercentage || 0,
            rating: product.rating || 0,
            stock: product.stock || 0,
            tags: product.tags || '',
            brand: product.brand || '',
            size: product.size || 0,
            weight: product.weight || 0,
            thumbnail: product.thumbnail || '',
            bestSeller: product.bestSeller || false,
            newArrival: product.newArrival || false,
             extra:product.extraInfo||''
        });
        setThumbnailPreview(product.thumbnail || null);
    }, [product]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploading(true);
            try {
                const blobServiceClient = new BlobServiceClient(`${blobServiceUrl}/?${sasToken}`);
                const containerClient = blobServiceClient.getContainerClient(containerName);

                // Generate unique blob name
                const blobName = `${Date.now()}-${file.name}`;
                const blockBlobClient = containerClient.getBlockBlobClient(blobName);

                await blockBlobClient.uploadBrowserData(file, {
                    blobHTTPHeaders: { blobContentType: file.type },
                });

                // Get public URL of the uploaded file
                const imageUrl = `${blobServiceUrl}/${containerName}/${blobName}`;
                setFormValues({ ...formValues, thumbnail: imageUrl });
                setThumbnailPreview(URL.createObjectURL(file));
            } catch (uploadError) {
                setError('Error uploading image to Azure Blob Storage.');
                console.error(uploadError);
            } finally {
                setUploading(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log("Submit first call:, ", formValues);
            await onUpdate(product, formValues);;
            setSuccess('Product updated successfully.');
        } catch (err) {
            setError('Failed to update product.');
        } finally {
            setLoading(false);
        }
    };

    /*  const handleUpdate = () => {
         onUpdate(product, formValues); // Call the parent-provided update function
       }; */

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Update: {product?.title}
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            label="Title"
                            name="title"
                            fullWidth
                            value={formValues.title}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required>
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="category"
                                value={formValues.category}
                                onChange={handleChange}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Price"
                            name="price"
                            type="number"
                            fullWidth
                            value={formValues.price}
                            onChange={handleChange}
                            inputProps={{ min: 0 }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            label="Brand"
                            name="brand"
                            fullWidth
                            value={formValues.brand}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Discount Percentage"
                            name="discountPercentage"
                            type="number"
                            fullWidth
                            value={formValues.discountPercentage}
                            onChange={handleChange}
                            inputProps={{ min: 0, max: 100 }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Rating"
                            name="rating"
                            type="number"
                            fullWidth
                            value={formValues.rating}
                            onChange={handleChange}
                            inputProps={{ min: 0, max: 5, step: 0.1 }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Stock"
                            name="stock"
                            type="number"
                            fullWidth
                            value={formValues.stock}
                            onChange={handleChange}
                            inputProps={{ min: 0 }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required>
                            <InputLabel>Tags</InputLabel>
                            <Select
                                name="tags"
                                value={formValues.tags}
                                onChange={handleChange}
                            >
                                {tagsOptions.map((tag) => (
                                    <MenuItem key={tag} value={tag}>
                                        {tag}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Size"
                            name="size"
                            fullWidth
                            value={formValues.size}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="number"
                            label="Weight"
                            name="weight"
                            fullWidth
                            value={formValues.weight}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formValues.bestSeller}
                                    onChange={handleChange}
                                    name="bestSeller"
                                />
                            }
                            label="Best Seller"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formValues.newArrival}
                                    onChange={handleChange}
                                    name="newArrival"
                                />
                            }
                            label="New Arrival"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="thumbnail"
                        />
                        <label htmlFor="thumbnail">
                            <Button variant="outlined" component="span" fullWidth>
                                {uploading ? <CircularProgress size={24} /> : 'Upload Thumbnail'}
                            </Button>
                        </label>
                        {thumbnailPreview && (
                            <div>
                                <Typography variant="body2" gutterBottom>
                                    Thumbnail Preview:
                                </Typography>
                                <img
                                    src={thumbnailPreview}
                                    alt="Thumbnail Preview"
                                    style={{ width: '100px', height: 'auto' }}
                                />
                            </div>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            name="description"
                            multiline
                            rows={3}
                            fullWidth
                            value={formValues.description}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="extra"
                            name="extra"
                            multiline
                            rows={3}
                            fullWidth
                            value={formValues.extra}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            /* onClick={handleUpdate} */
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Update Product'}
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            fullWidth
                            sx={{mt:1}}
                            onClick={onCancel}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default ProductFormUpdate;
