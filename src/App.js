import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import axios from "axios";
import CoinPage from "./pages/CoinPage";
import Footer from './components/Footer'
import { AuthContextProvider } from "./context/AuthContext";


function App() {
  const [coins, setCoins] = useState([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true";

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data)
      console.log(response.data)
    });
  }, [url])

  return (
    <ThemeProvider>
      <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home coins = {coins}/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<Account />} />
        <Route path = '/coin/:coinId' element = {<CoinPage/>}>
          <Route path = ':coinId'/>
        </Route>
      </Routes>
      <Footer/>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
