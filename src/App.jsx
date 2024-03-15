import React,{useState} from 'react'
import Navbar from './components/Navbar'
import Product from './components/Product'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import { items } from './components/Data'
import SearchItem from './components/SearchItem'
import UserProfile from './components/UserProfile'
import EmailLogin from './components/EmailLogin'
import { getAuth } from 'firebase/auth';




const App = () => {

  const [data, setData] = useState([...items]);
  const [cart, setCart] = useState([]);
  const [cartData, setCartData] = useState([]); 
  const auth = getAuth();
  const user = auth.currentUser;
  

  return (
    <>
    <Router>
    <Navbar  cart={cart} setCart={setCart} cartdata={cartData} setcartdata={setCartData}/>
      <Routes>

        <Route path='/' element={<Product  user={user} cart={cart} setCart={setCart} cartdata={cartData} setcartdata={setCartData} items={data}/>}/>
        <Route path='/product/:id' element={<ProductDetails  cart={cart} setCart={setCart} cartdata={cartData} setcartdata={setCartData}/>}/>
        <Route path='/search/:term' element={<SearchItem  cart={cart} setCart={setCart} cartdata={cartData} setcartdata={setCartData}/>}/>
        <Route path='/cart' element={<Cart user={user} cart={cart} setCart={setCart} cartdata={cartData} setcartdata={setCartData}/>}/>
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/email-login' element={<EmailLogin />} />
        
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
