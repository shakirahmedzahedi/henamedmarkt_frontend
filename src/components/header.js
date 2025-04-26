import React, { useState, useEffect, useRef } from 'react';
import logo from './../assets/logo1.png';
import {
    AppBar, Tabs, Tab, Button, Grid, Toolbar, useTheme, useMediaQuery, Typography, Box, IconButton,
    Badge, TextField, InputAdornment, Avatar, Menu, MenuItem, List, Paper, ListItem, ListItemButton, ListItemText
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import MiddleDrawer from './MiddleDrawer';
import NavBar from "./navBar";
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../reducer/services/AuthService';
import { clearError } from '../reducer/slices/AuthSlice';
import NewNavBar from './NewNavBar';
import { setSearchQuery } from '../reducer/slices/ProductSlice';
import { feachActiveCartsByUser } from '../reducer/services/CartService';
import { clearCart } from '../reducer/slices/CartSlice';
import { Send, Chat, Close, Minimize, OpenInFull } from '@mui/icons-material';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function Header({ onSignOut, onLiveChat }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isScreenSmall = useMediaQuery('(max-width:1050px)');

    const [value, setValue] = React.useState('/');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleSignInClick = () => {
        console.log('Sign in clicked');
    };

    const [anchorEl, setAnchorEl] = useState(null); // Menu anchor for user avatar
    const [newOrderCount, setNewOrderCount] = useState(0);
    const [unreadCount, setUnreadCount] = useState(0);

    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [guestCart, setGuestCart] = useState(() => {
        const saved = localStorage.getItem('guest_cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [guestFavorite, setGuestFavorite] = useState(() => {
        const saved = localStorage.getItem('guest_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    const activeCart = useSelector((state) => state.cart.cart);
    const articleItems = activeCart?.articles !== undefined
        ? activeCart.articles.length
        : (guestCart?.length || 0);
    const favoriteItems = user?.favorites?.length || guestFavorite?.length || 0;
    const searchRef = useRef(null);


    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMyPageClick = () => {
        navigate('/myPage', { state: { user } });
        handleMenuClose();
    };
    const handleAdminClick = () => {
        navigate('/adminPortal', { state: { user, newOrder: newOrderCount } });
        handleMenuClose();
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const products = useSelector((state) => state.product.products);

    // Local state
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Handle input change
    const handleInputChange = (e) => {
        const input = e.target.value;
        setSearchInput(input);

        // Filter products to generate suggestions
        if (input) {
            const filtered = products
                .filter((product) =>
                    product.title.toLowerCase().includes(input.toLowerCase())
                )
                .map((product) => product.title); // Extract titles
            setSuggestions(filtered);
            dispatch(setSearchQuery(input)); // Keep global state updated
            navigate(`/searchProduct`);
        } else {
            setSuggestions([]); // Clear suggestions if input is empty
            dispatch(setSearchQuery(''));
            navigate('/searchProduct');
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = async (suggestion) => {
        setSearchInput(suggestion); // Update input with suggestion
        setSuggestions([]); // Clear suggestions
        await dispatch(setSearchQuery(suggestion)); // Dispatch search query with the selected suggestion
        setSearchInput('');
        navigate('/searchProduct');
    };

    // Handle search button click
    const handleSearchClick = async () => {
        await dispatch(setSearchQuery(searchInput));
        setSearchInput('');
        setSuggestions([]);
        navigate('/searchProduct'); // Navigate to search results
    };



    const handleSignOut = () => {
        console.log("Sign Out clicked.....");
        dispatch(logOut());
        onSignOut();
        handleMenuClose();
        navigate('/signIn');
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
            //setGuestCart([]);
        }
        if (!isAuthenticated) {
            dispatch(clearCart()); // Action to reset active cart in Redux
            const saved = localStorage.getItem('guest_cart');
            const parsed = saved ? JSON.parse(saved) : [];
            const saved1 = localStorage.getItem('guest_favorites');
            const parsed1 = saved1 ? JSON.parse(saved1) : [];
            setGuestCart(parsed);
            setGuestFavorite(parsed1);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        dispatch(clearError());
        if (user?.id) {
            
            dispatch(feachActiveCartsByUser(user.id));
        }

    }, [user, articleItems, dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSuggestions([]); // Close dropdown
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    const bigContent = (
        <>
            <Grid container  >

                <Grid item xs={2} pt={1.5} pb={1}
                    alignItems="center" style={{ textAlign: 'left' }}>
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img
                            src={logo}
                            alt={logo}
                            style={{ width: '190px', height: '45px' }}

                        />
                    </Link>

                </Grid>
                <Grid item alignItems="center" xs={8} mt={1} style={{ textAlign: 'center' }}>
                    <NewNavBar />

                </Grid>
                <Grid
                    item
                    xs={2}
                    /*  container*/
                    display={'flex'}
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ mt: 0 }}
                >

                    <Link to={'/favorite'} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
                            <Badge badgeContent={favoriteItems} color="primary">
                                <FavoriteBorderIcon color="primary" sx={{ fontSize: 25 }} />
                            </Badge>
                            <Typography
                                variant="subtitle2"
                                sx={{ ml: 1, display: { xs: 'none', lg: 'block' } }}
                            >
                                Favorite
                            </Typography>
                        </Box>
                    </Link>

                    <Link to={'/cart'} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
                            <Badge badgeContent={articleItems} color="primary">
                                <ShoppingBagOutlinedIcon color="primary" sx={{ fontSize: 25 }} />
                            </Badge>
                            <Typography
                                variant="subtitle2"
                                sx={{ ml: 1, display: { xs: 'none', lg: 'block' } }}
                            >
                                Cart
                            </Typography>
                        </Box>
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <IconButton onClick={handleMenuOpen}>
                                <Avatar
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        bgcolor: 'primary.main',
                                    }}
                                >
                                    {user?.email.charAt(0).toUpperCase()}
                                </Avatar>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    },
                                }}
                                transformOrigin={{
                                    horizontal: 'right',
                                    vertical: 'top',
                                }}
                                anchorOrigin={{
                                    horizontal: 'right',
                                    vertical: 'bottom',
                                }}
                            >
                                <MenuItem onClick={handleMyPageClick}>My Page</MenuItem>
                                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                                {user?.roles.includes('ADMIN') && (
                                    <><MenuItem onClick={handleAdminClick}>
                                        Admin Portal
                                    </MenuItem><MenuItem onClick={() => {
                                        //navigate('/adminPortal/chat'); // navigate to chat page
                                        setUnreadCount(0); // reset unread messages
                                        handleMenuClose();
                                    }}>
                                            <Badge badgeContent={unreadCount} color="error">
                                                <Typography onClick={onLiveChat}>liveChat</Typography>
                                            </Badge>
                                        </MenuItem></>
                                )}
                            </Menu>
                        </>
                    ) : (
                        <Link
                            to={'/signIn'}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <AssignmentIndOutlinedIcon
                                    color="primary"
                                    sx={{ fontSize: 25 }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    sx={{ ml: 1, display: { xs: 'none', lg: 'block' } }}
                                >
                                    SignIn
                                </Typography>
                            </Box>
                        </Link>
                    )}
                </Grid>
            </Grid>


        </>




    );

    const smallContent = (
        <>
            <Grid container sx={{ margin: 0, padding: 0 }}>
                {/* Logo Section */}
                <Grid item mt={1} xs={8} sx={{ textAlign: 'left', paddingLeft: 3 }}>
                    <Link to="/">
                        <img
                            src={logo}
                            alt="logo"
                            style={{ width: '170px', height: '30px' }}
                        />
                    </Link>
                </Grid>

                {/* Icons Section */}
                <Grid item mt={1.5} xs={4} sx={{ textAlign: 'right', padding: 0 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            margin: 0,
                        }}
                    >
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Badge badgeContent={favoriteItems} color="primary">
                                <FavoriteBorderIcon color="primary" sx={{ fontSize: 25 }} />
                            </Badge>
                        </Link>
                        <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box ml={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Badge badgeContent={articleItems} color="primary">
                                    <ShoppingBagOutlinedIcon color="primary" sx={{ fontSize: 25 }} />
                                </Badge>
                            </Box>
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <IconButton onClick={handleMenuOpen}>
                                    <Avatar
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            bgcolor: 'primary.main',
                                        }}
                                    >
                                        {user?.email.charAt(0).toUpperCase()}
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    slotProps={{
                                        paper: {
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        },
                                    }}
                                    transformOrigin={{
                                        horizontal: 'right',
                                        vertical: 'top',
                                    }}
                                    anchorOrigin={{
                                        horizontal: 'right',
                                        vertical: 'bottom',
                                    }}
                                >
                                    <MenuItem onClick={handleMyPageClick}>My Page</MenuItem>
                                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                                    {user?.roles.includes('ADMIN') && (
                                        <MenuItem onClick={handleAdminClick}>
                                            Admin Portal
                                        </MenuItem>

                                    )}
                                </Menu>
                            </>
                        ) : (
                            <Link
                                to="/signIn"
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <Box
                                    ml={2}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mr: 1,
                                        cursor: 'pointer',
                                    }}
                                >
                                    <AssignmentIndOutlinedIcon
                                        color="primary"
                                        sx={{ fontSize: 25 }}
                                    />
                                </Box>
                            </Link>
                        )}
                    </Box>
                </Grid>
            </Grid>

            {/* Search Bar Section */}
            <Box sx={{ width: '100%', margin: 0, padding: 0 }}>
                <TextField
                    placeholder="Search..."
                    fullWidth
                    value={searchInput}
                    onChange={handleInputChange}
                    size="small"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleSearchClick} // Trigger search
                                    color="primary"
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        height: '30px', // Set the height of the search bar
                        margin: .25,
                        padding: 0, // Remove extra margins
                        '& .MuiOutlinedInput-root': {
                            height: '30px',
                            fontSize: '.7rem', // Adjust font size
                            padding: '0 0px',
                            borderRadius: '16px',
                            backgroundColor: 'lightgray',
                            '& .MuiInputAdornment-root svg': {
                                fontSize: '16px', // Smaller icon
                            },
                        },
                    }}
                />
            </Box>
            {suggestions.length > 0 && (
                <Paper
                    sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: '100%',
                        maxWidth: '600px',
                        zIndex: 10,
                        maxHeight: '600px',
                        overflowY: 'auto',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                    ref={searchRef}
                >
                    <List>
                        {suggestions.map((suggestion, index) => (
                            <ListItem
                                key={index}
                                disablePadding
                                sx={{
                                    padding: '0px 8px', // Reduce padding inside ListItem to reduce space between items
                                }}
                                onClick={() => handleSuggestionClick(suggestion)} // Select suggestion
                            >
                                <ListItemButton
                                    sx={{
                                        padding: '0px', // Reduce padding inside ListItemButton to further reduce space
                                    }}
                                >
                                    <ListItemText
                                        primary={suggestion}
                                        sx={{
                                            fontSize: '0.25rem', // Set the font size smaller (you can adjust this value)
                                            color: 'primary', // Optional: Ensure the text color is correct
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </>
    );


    //smallScreen ? smallContent :
    return (
        <AppBar position="fixed" color="inherit" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
            <Toolbar sx={{ flexDirection: 'column', width: '100%' }}>
                {smallScreen ? smallContent : bigContent}
            </Toolbar>
        </AppBar>
    );
}


