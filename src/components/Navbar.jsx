import React, { useState,useEffect } from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { items } from './Data'
import { HiShoppingCart } from 'react-icons/hi';
import {signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged} from 'firebase/auth'
import {db} from '../firebase.config'
import {doc, setDoc, getDoc, serverTimestamp} from'firebase/firestore'
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";


const Navbar = ({setData, cartData, cart, setCart}) => {

  const [user, setUser] = useState(null);

    useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const auth = getAuth();
  // const user = auth.currentUser;
  // const userId = user ? user.uid : null;
  const navigate = useNavigate();
  
  const googleClick =async() =>{
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // console.log(result.user);
    const user = result.user;

    // checking for User
    const docRef = doc(db,"users",user.uid)
    const docSnap = await getDoc(docRef)

    if(!docSnap.exists()){
      await setDoc(doc(db,"users",user.uid),{
        name:user.displayName,
        email:user.email,
        photoUrl:user.photoURL,
        timeStamp:serverTimestamp()
      })
    }
    navigate("/");
  } 

  const logOut = async() => {
    await auth.signOut();
    // console.log("logout")
    navigate('/');
  }

  

  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();


  const filterItems = (event) => {
    const selectedFilter = event.target.value;

    switch(selectedFilter){
      case 'All':
        setData(items);
        break;

      case 'mobiles':
      case 'laptops':
      case 'tablets':
        const filterByCategory = items.filter((products)=>products.category === selectedFilter);
        setData(filterByCategory);
        break;

      case '29999':
      case '49999':
      case '69999':
      case '89999':
        const filterByPrice = items.filter((products) => products.price >= parseInt (selectedFilter));
        setData(filterByPrice);
        break;
      
      default:
        break;
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    navigate(`/search/${searchTerm}`)
    setSearchTerm('');

  }
  
  const isHomePage = location.pathname === "/";
 
  return (
    <>
    <header>

        <div className="nav-bar">
          
            <Link to={"/"} className="brand">The Real Store</Link>

            <form 
              onSubmit={handleSubmit}
              className="search-bar">
                <input 
                  value={searchTerm}
                  onChange={(e)=>setSearchTerm(e.target.value)}
                  type="text" 
                  placeholder='Search Products'
                />
            </form>
            
            <Link to={"/cart"} className="cart">
              <button type="button" className="btn btn-warning position-relative" >
              <HiShoppingCart style={{fontSize:'1.5rem'}}/>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {user?(cartData ? cartData.length : 0) : (cart ? cart.length : 0)  } 
                 <span 
                    className="visually-hidden">unread messages
                  </span>
                </span>
              </button>
            </Link>

            {(auth.currentUser)?(

              <>
                <div className='user-data'>
                <img className='user-img' src={auth.currentUser?.photoURL}/>
                <h6>{auth.currentUser?.displayName}</h6>
                </div>
                <button onClick={()=>logOut()} className='logout-btn btn btn-primary' style={{fontSize:'13px'}}>Logout</button>
              </>
            
            ):(

              <>
              <Link to={"/email-login"}> <button className={'btn btn-primary'} style={{width:"180px", padding:"7px", fontWeight:"bold", fontSize:"12px"}}>
              <MdEmail style={{ height: '24px', width: '24px' }}/> Login with EMAIL
              </button></Link>
              
              <button className='login-btn btn btn-primary'
                onClick={() => googleClick()}>
                <FcGoogle style={{ height: '24px', width: '24px' }} /> Login with Google</button>
              </>
            )}
 

        </div>

        {isHomePage &&(
          <div className='nav-bar-wrapper'>
          <label htmlFor='filterDropdown' className='options' >Filter</label>
          <select onChange={filterItems} className="option">
              <option value="All"className="items">All</option>
              <option value="mobiles" className="items">Mobiles</option>
              <option value="laptops" className="items">Laptops</option>
              <option value="tablets" className="items">Tablets</option>
              <option value="29999" className="items">{">="}29999</option>
              <option value="49999" className="items">{">="}49999</option>
              <option value="69999" className="items">{">="}69999</option>
              <option value="89999" className="items">{">="}89999</option>
          </select>
        </div>
      )}

    </header>
    </>
  )
  
}

export default Navbar;







// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { HiShoppingCart } from 'react-icons/hi';
// import { signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged } from 'firebase/auth';
// import { db } from '../firebase.config';
// import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
// import { FcGoogle } from 'react-icons/fc';
// import { MdEmail } from 'react-icons/md';

// const Navbar = ({ setData, cartData, cart, setCart }) => {
//   const [user, setUser] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const location = useLocation();
//   const navigate = useNavigate();
//   const auth = getAuth();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });
//     return unsubscribe;
//   }, [auth]);

//   const googleClick = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       // Checking for User
//       const docRef = doc(db, 'users', user.uid);
//       const docSnap = await getDoc(docRef);

//       if (!docSnap.exists()) {
//         await setDoc(doc(db, 'users', user.uid), {
//           name: user.displayName,
//           email: user.email,
//           photoUrl: user.photoURL,
//           timeStamp: serverTimestamp(),
//         });
//       }
//       navigate('/');
//     } catch (error) {
//       console.error('Error signing in with Google:', error);
//     }
//   };

//   const logOut = async () => {
//     try {
//       await auth.signOut();
//       navigate('/');
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   const filterItems = (event) => {
//     const selectedFilter = event.target.value;

//     switch (selectedFilter) {
//       case 'All':
//         setData(items);
//         break;

//       case 'mobiles':
//       case 'laptops':
//       case 'tablets':
//         const filterByCategory = items.filter((products) => products.category === selectedFilter);
//         setData(filterByCategory);
//         break;

//       case '29999':
//       case '49999':
//       case '69999':
//       case '89999':
//         const filterByPrice = items.filter((products) => products.price >= parseInt(selectedFilter));
//         setData(filterByPrice);
//         break;

//       default:
//         break;
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate(`/search/${searchTerm}`);
//     setSearchTerm('');
//   };

//   const isHomePage = location.pathname === '/';

//   return (
//     <>
//       <header>
//         <div className="nav-bar">
//           <Link to="/" className="brand">
//             The Real Store
//           </Link>

//           <form onSubmit={handleSubmit} className="search-bar">
//             <input
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               type="text"
//               placeholder="Search Products"
//             />
//           </form>

          // <Link to="/cart" className="cart">
          //   <button type="button" className="btn btn-warning position-relative">
          //     <HiShoppingCart style={{ fontSize: '1.5rem' }} />
          //     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          //       {user ? (cartData ? cartData.length : 0) : (cart ? cart.length : 0)}
          //       <span className="visually-hidden">unread messages</span>
          //     </span>
          //   </button>
          // </Link>

//           {user ? (
//             <>
//               <div className="user-data">
//                 <img className="user-img" src={auth.currentUser?.photoURL} alt="User" />
//                 <h6>{auth.currentUser?.displayName}</h6>
//               </div>
//               <button onClick={logOut} className="logout-btn btn btn-primary" style={{ fontSize: '13px' }}>
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
              
//               <button className="login-btn btn btn-primary" onClick={googleClick}>
//                 <FcGoogle style={{ height: '24px', width: '24px' }} /> Login with Google
//               </button>

//               <Link to="/email-login">
//                 <button className={'btn btn-primary'} style={{ width: '180px', padding: '7px', fontWeight: 'bold', fontSize: '12px',marginLeft:'20px' }}>
//                   <MdEmail style={{ height: '24px', width: '24px' }} /> Login with EMAIL
//                 </button>
//               </Link>
//             </>
//           )}
//         </div>

//         {isHomePage && (
//           <div className="nav-bar-wrapper">
//             <label htmlFor="filterDropdown" className="options">
//               Filter
//             </label>
//             <select onChange={filterItems} className="option">
//               <option value="All" className="items">
//                 All
//               </option>
//               <option value="mobiles" className="items">
//                 Mobiles
//               </option>
//               <option value="laptops" className="items">
//                 Laptops
//               </option>
//               <option value="tablets" className="items">
//                 Tablets
//               </option>
//               <option value="29999" className="items">{">="}29999</option>
//               <option value="49999" className="items">{">="}49999</option>
//               <option value="69999" className="items">{">="}69999</option>
//               <option value="89999" className="items">{">="}89999</option>
//             </select>
//           </div>
//         )}
//       </header>
//     </>
//   );
// };

// export default Navbar;







