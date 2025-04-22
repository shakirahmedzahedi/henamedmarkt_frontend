/* import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticate"));
    console.log(isAuthenticated);

    if (!isAuthenticated) {
        
        return <Navigate to="/signIn" />;
    }

   
    return children;
};

export default ProtectedRoute; */

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Use state to manage authenticated status
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    // Check localStorage on component mount and whenever the component renders
    useEffect(() => {
        const isAuth = JSON.parse(localStorage.getItem("isAuthenticate"));
        setIsAuthenticated(isAuth);
    }, []); // Empty dependency array ensures this runs only once on mount

    // If authentication status is not yet determined (initial render), show nothing or a loading state
    if (isAuthenticated === null) {
        return <div>Loading...</div>;  // or a spinner, or null if preferred
    }

    // If not authenticated, redirect to the sign-in page
    if (!isAuthenticated) {
        return <Navigate to="/signIn" />;
    }

    // If authenticated, render the children (the protected content)
    return children;
};

export default ProtectedRoute;
