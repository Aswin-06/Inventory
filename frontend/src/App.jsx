import { useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Seller from './components/seller/Seller'
import AddProduct from './components/seller/AddProduct'
import About from './components/seller/About'
import AlterProduct from './components/seller/AlterProduct'
import Buyer from './components/buyer/Buyer'
import Buy from './components/buyer/Buy'
import Cart from './components/buyer/Cart'
import CartItem from './components/buyer/CartItem'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/seller' element={<Seller/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/seller/:id' element={<About/>}/>
        <Route path='/alter/:id' element={<AlterProduct/>} />
        <Route path='/buyer' element={<Buyer/>} />
        <Route path='/buyer/:id' element={<Buy/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/cart/:id' element={<CartItem/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
