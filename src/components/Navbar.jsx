import React, { useState } from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { items } from './Data'
import { HiShoppingCart } from 'react-icons/hi';
import {signInWithPopup, GoogleAuthProvider, getAuth} from 'firebase/auth'
import {db} from '../firebase.config'
import {doc, setDoc, getDoc, serverTimestamp} from'firebase/firestore'
import { FcGoogle } from "react-icons/fc";


const Navbar = ({setData, cart}) => {
  const auth = getAuth();
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
                  {cart.length} 
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

              <button className='login-btn btn btn-primary'
                onClick={()=>googleClick()}>
                <FcGoogle style={{height:'24px', width:'24px'}} /> Login with Google</button>
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

