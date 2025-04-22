import React, { useState } from 'react';
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
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

  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);

    if (input) {
      const filtered = products
        .filter((product) =>
          product.title.toLowerCase().includes(input.toLowerCase())
        )
        .map((product) => product.title);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setSearchInput(suggestion);
    setSuggestions([]);
    await dispatch(setSearchQuery(suggestion));
    setSearchInput('');
    navigate('/searchProduct');
  };

  const handleSearchClick = async () => {
    await dispatch(setSearchQuery(searchInput));
    setSearchInput('');
    setSuggestions([]);
    navigate('/searchProduct');
  };

  const navLinks = [
    { label: 'Products', path: '/allproduct' },
    { label: 'New Arrival', path: '/newArrival' },
    { label: 'Baby & Kids', path: '/babyAndKids' },
    { label: 'Family & Mom', path: '/familyAndMom' },
  ];

  return (
    <div>
      <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ height: '65px' }}>
        {/* Custom Nav Links */}
        <Grid item sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 1 }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '.8rem',
                color: location.pathname === link.path ? '#1976d2' : 'black',
                borderBottom: location.pathname === link.path ? '2px solid #1976d2' : 'none',
                padding: '4px 8px',
              }}
            >
              {link.label}
            </Link>
          ))}
        </Grid>

        {/* Search Bar */}
        <Grid
          item
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            pl: 3,
            position: 'relative',
          }}
        >
          <TextField
            placeholder="Search..."
            size="small"
            variant="outlined"
            value={searchInput}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchClick} color="primary">
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
                  <ListItem key={index} disablePadding onClick={() => handleSuggestionClick(suggestion)}>
                    <ListItemButton>
                      <ListItemText primary={suggestion} />
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
