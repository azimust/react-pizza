import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import './scss/app.scss';
import Home from './components/Pages/Home';
import NotFound from './components/Pages/NotFound';
import Cart from './components/Pages/Cart';
import { createContext, useState } from 'react';
import FullPizza from './components/FullPizza';

export const SearchContext = createContext()

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pizza/:id' element={<FullPizza />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
