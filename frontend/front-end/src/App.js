import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import Layout from './pages/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Contacts from './pages/Contacts'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='Products' element={<Products />} />
        <Route path='Contacts' element={<Contacts />} />

        </Route>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
