import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/header';
import Home from './pages/homePage';
import SignInPage from "./pages/signInPage";
import SignUpPage from "./pages/signUpPage"
import NavBar from "./components/navBar";
import About from './pages/aboutPage';
import Contact from './pages/contactPage';
import ProductCard from "./components/productCard";
import Footer from './components/footer';
import ProductForm from "./components/product/ProductForm";
import AddProductPage from "./pages/AddProductPage";
import TermsAndConditionPage from "./pages/TermsAndConditionPage";
import Checkout from "./components/Checkout";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import ProductDetails from "./components/ProductDetails";
import ProtectedRoute from "./special/ProtectedRoute ";
import MyPage from "./pages/MyPage";
import { renewToken } from './reducer/services/AuthService';
import AutoSignOut from './components/AutoSingOut';
import ProductPage from './pages/ProductPage';
import AdminHome from './admin/AdminHome';
import Dashboard from './admin/dashboard/Dashboard';
import CouponsSection from './admin/coupons/CouponsSection';
import UsersSection from './admin/users/UsersSection';
import ProductsSection from './admin/products.js/ProductsSection';
import CouponTable from './admin/coupons/CouponTable';
import OrderSuccess from './components/OrderSuccess';
import OrderSection from './admin/order/OrderSection';
import ProductTable from './admin/products.js/ProductTable';
import SendEmailToResetPassword from './components/SendEmailToResetPassword';
import ResetPassword from './components/ResetPassword';
import Favorite from './components/Favorite';
import FavoritePage from './pages/FavoritePage';
import SearchProductPage from './pages/SearchProductPage';
import FloatingWhatsupButton from './components/FloatingWhatsupButton';
import ReturnPolicy from './pages/ReturnPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import OtpVerification from './pages/OtpVerificationPage';
import AgentChatComponent from './liveChat/AgentChatComponent';
import { useState } from 'react';
import FloatingButtons from './components/FloatingButtons';




function App() {

  const dispatch = useDispatch();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00a651'//'#556B2F' //'#006aa9'
      },
      secondary: {
        main: '#ec1c24'//'#556B2F'//'#7cc8f5'
      },
      info: {
        main: '#FFFFFF',
        dark: '#edebeb'
      },
      error: {
        main: '#f00a19'
      }
    },
    typography: {

      fontFamily: "'poppins', sans-serif",
      h3: {

        letterSpacing: "0",
      },
      body1: {
        lineHeight: "1.8rem",
        fontWeight: 400,
      },
      body2: {
        fontWeightLight: 300,
      }
    }

  });
  const [messages, setMessages] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [lastMessageTime, setLastMessageTime] = useState({});
  const [unread, setUnread] = useState({});
  const [openDialogs, setOpenDialogs] = useState({});
  const [stompClient, setStompClient] = useState(null);
  const [showClientList, setShowClientList] = useState(true);

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const userRoles = localStorage.getItem('userRole');
    const isAuthenticate = localStorage.getItem('isAuthenticate');
    console.log("Auth Check - token, email, isAuthenticated:", token, email, isAuthenticate); // Log values
    setRoles(userRoles);

    if (token && email && isAuthenticate) {
      // Update Redux state with token and user data if token exists
      console.log("Renew token...................");
      dispatch(renewToken(email));
    }
   
  }, [dispatch]);

  useEffect(() => {
    
  }, [roles]);

  const handleLiveChat=()=>{
    setRoles(["ADMIN"]);
  }

  const clearChatState = () => {
    setMessages([]);
    setClientList([]);
    setLastMessageTime({});
    setUnread({});
    setOpenDialogs({});
    setShowClientList(false);
    if (stompClient && stompClient.connected) {
      stompClient.disconnect(() => console.log("Disconnected on logout"));
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AutoSignOut />
          <Header onSignOut={clearChatState} onLiveChat={handleLiveChat} />
          <Box sx={{ pt: { xs: '50px', md: '90px' }, pb: { xs: '0px', md: '0px' } }}>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/signIn" element={<SignInPage />} />
              <Route path="/resetPassword" element={<SendEmailToResetPassword />} />
              <Route path="/forgetPassword" element={<ResetPassword />} />
              <Route path="/signUp" element={<SignUpPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/allproduct" element={<ProductPage />} />
              <Route path="/newArrival" element={<ProductPage filter={'NEW_ARRIVAL'} />} />
              <Route path="/babyAndKids" element={<ProductPage filter={'BABY_AND_KIDS'} />} />
              <Route path="/familyAndMom" element={<ProductPage filter={'FAMILY_AND_MOM'} />} />
              <Route path="/newBorn" element={<ProductPage filter={'NEWBORN'} />} />
              <Route path="/toddler" element={<ProductPage filter={'TODDLER'} />} />
              <Route path="/children" element={<ProductPage filter={'CHILDREN'} />} />
              <Route path="/mom" element={<ProductPage filter={'MOM'} />} />
              <Route path="/addProduct" element={<ProtectedRoute><AddProductPage /></ProtectedRoute>} />
              <Route path="/legal" element={<TermsAndConditionPage />} />
              <Route path="/return" element={<ReturnPolicy />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/favorite" element={<FavoritePage />} />
              <Route path="/cart" element={<CartPage />}/>
              <Route path="/myPage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
              <Route path="/orderSuccess" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
              <Route path="/otp-verification" element={<OtpVerification />} />

              <Route path="/adminPortal/*" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} >
                <Route path="" element={<Dashboard />} />
                <Route path="orders" element={<OrderSection />} />
                <Route path="users" element={<UsersSection />} />
                <Route path="coupons" element={<CouponsSection />} />
                <Route path="products" element={<ProductsSection />} />
                <Route path="chat" element={<AgentChatComponent />} />
                <Route path="products/addNew" element={<AddProductPage />} />
                <Route path="products/showAll" element={<ProductTable />} />
                <Route path="coupons/allCoupons" element={<CouponTable />} />
              </Route>

              <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
              <Route path="/productDetails/:productId" element={<ProductDetails />} />
              <Route path="/searchProduct" element={<SearchProductPage />} />
            </Routes>

          </Box>

          
          <FloatingButtons/>
          {roles && roles.includes('ADMIN') && (
            <AgentChatComponent
              messages={messages}
              setMessages={setMessages}
              clientList={clientList}
              setClientList={setClientList}
              lastMessageTime={lastMessageTime}
              setLastMessageTime={setLastMessageTime}
              unread={unread}
              setUnread={setUnread}
              openDialogs={openDialogs}
              setOpenDialogs={setOpenDialogs}
              stompClient={stompClient}
              setStompClient={setStompClient}
              clearChatState={clearChatState}
              showClientList={showClientList}
              setShowClientList={setShowClientList}
            />
          )}
          <Footer />
        </Router>

      </ThemeProvider>
    </>
  );
}

export default App;