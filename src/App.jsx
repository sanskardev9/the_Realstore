import React,{useState} from 'react'
import Navbar from './components/Navbar'
import Product from './components/Product'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import { items } from './components/Data'
import SearchItem from './components/SearchItem'
import UserProfile from './components/UserProfile'



const App = () => {

  const [data, setData] = useState([...items]);
  const [cart, setCart] = useState([]);
  const [cartData, setCartData] = useState([]); 

  return (
    <>
    <Router>
    <Navbar cartData ={cartData} cart={cart} setData={setData}/>
      <Routes>

        <Route path='/' element={<Product cart={cart} setCart={setCart} items={data}/>}/>
        <Route path='/product/:id' element={<ProductDetails cart={cart} setCart={setCart}/>}/>
        <Route path='/search/:term' element={<SearchItem cart={cart} setCart={setCart}/>}/>
        <Route path='/cart' element={<Cart cart={cartData} setCart={setCartData}/>}/>
        <Route path='/user-profile' element={<UserProfile />} />
        
      </Routes>
  
    </Router>
    </>
  )
}

export default App




// You can add the addToCart function to app.jsx component because it allows you to share the state and functionality across different components.

// const App = () => {
//   const [data, setData] = useState([...items]);
//   const [cart, setCart] = useState([]);

//   const addToCart = (id, price, title, description, imgSrc) => {
//     const isItemInCart = cart.some((item) => item.id === id);

//     if (isItemInCart) {
//       alert('This item is already in your cart!');
//     } else {
//       const newItem = {
//         id,
//         price,
//         title,
//         description,
//         imgSrc,
//       };

//       setCart([...cart, newItem]);
//     }
//   };
