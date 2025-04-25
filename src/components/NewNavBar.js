import React, { useState, useRef, useEffect } from 'react';
import {
    Grid,
    TextField,
    Tabs,
    Tab,
    InputAdornment,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../reducer/slices/ProductSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function NewNavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    // Local state
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const searchRef = useRef(null);

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

    return (
        <div>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                    height: '65px',
                }}
            >

                <Grid
                    item
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Tabs
                        value={location.pathname}
                        textColor="secondary"
                        indicatorColor="none"
                        aria-label="navigation tabs"

                        sx={{
                            height: '30px', // Set height of Tabs
                            minHeight: '30px', // Override default min-height
                            '& .MuiTab-root': {
                                fontWeight: 'bold',
                                fontSize: '.8rem',
                                minHeight: '30px',
                                height: '30px',
                                paddingLeft: 6,
                                margin: 0,
                            },
                            '& .MuiTabs-indicator': {
                                display: 'none', // Remove underline
                            },
                        }}
                    >
                        <Tab
                            value="/allproduct"
                            label="Products"
                            component={Link}
                            to="/allproduct"
                            disableRipple
                        />
                        <Tab
                            value="/newArrival"
                            label="New Arrival"
                            component={Link}
                            to="/newArrival"
                            disableRipple
                        />
                        <Tab
                            value="/babyAndKids"
                            label="Baby & Kids"
                            component={Link}
                            to="/babyAndKids"
                            disableRipple
                        />
                        <Tab
                            value="/familyAndMom"
                            label="Family & Mom"
                            component={Link}
                            to="/familyAndMom"
                            disableRipple
                        />
                    </Tabs>
                </Grid>
                {/* Search Bar Section */}
                <Grid
                    item
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 0.5,
                        pl: 3,
                        position: 'relative', // Required for suggestion dropdown
                    }}
                    ref={searchRef}
                >
                    <TextField
                        placeholder="Search..."
                        size="small"
                        variant="outlined"
                        value={searchInput}
                        onChange={handleInputChange} // Update input and suggestions
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
                            width: '100%',
                            maxWidth: '600px',
                            height: '30px',
                            '& .MuiOutlinedInput-root': {
                                height: '30px',
                                fontSize: '.7rem',
                                padding: '0 8px',
                                borderRadius: '16px',
                                backgroundColor: 'lightgray',
                                '& .MuiInputAdornment-root svg': {
                                    fontSize: '16px',
                                },
                            },
                        }}
                    />

                    {/* Suggestions Dropdown */}
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
                                                    color: 'text.primary', // Optional: Ensure the text color is correct
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}
