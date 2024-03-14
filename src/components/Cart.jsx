import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from "../firebase.config";
import { collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Cart = ({ cart, setCart }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCartData = async () => {
      try {
        if (!userId) return;

        const cartCollectionRef = collection(db, 'users', userId, 'cart');
        const data = await getDocs(cartCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCartData(filteredData);
        
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    getCartData();
  }, [userId]);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    const totalPrice = cartData.reduce((total, product) => total + Number(product.price), 0);
    return totalPrice;
  };

  const checkout = () => {
    const total = calculateTotal();
    alert(`Total Price: ₹${total}`);
  };

  const BuyNow = (product) => {
    alert(`Order Placed for ${product.title}`);
  };

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <>
      {loading ? (
        <h1 className='text-center' style={{marginTop:'300px'}}>Loading Data...</h1>
      ) : (
        <div className="container-cart" style={{ width: "55%" }}>
          {cartData.length === 0 ? (
            <>
              <div className="Empty-msg text-center"><h1 style={{ width: '650px' }}>Your Cart Is Empty.</h1></div>
              <Link to={"/"}><button className='btn btn-warning' style={{ marginLeft: '297px' }}>Continue Shopping</button></Link>
            </>
          ) : (
            <>
              {cartData.map((product) => (
                <div key={product.id} className='Cart-div'>
                  <div className="card mb-3 " style={{ width: '700px', margin: '0 auto', display: 'block' }}>
                    <div className="row g-0">
                      <div className="col-md-4">
                      <Link to={`/product/${product.prod_Id}`}>
                        <img src={product.imgSrc} className="img-fluid rounded-start" alt="..." />
                      </Link>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body text-center">
                          <h5 className="card-title">{product.title}</h5>
                          <p className="card-text">{product.description}</p>
                          <button className="btn btn-primary">₹{product.price}</button>
                          <button onClick={() => BuyNow(product)} className="btn btn-warning mx-3">Buy Now</button>
                          <button className='delete-btn' onClick={() => removeFromCart(product.id)}>⛔</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="container text-center">
                <button className='btn btn-warning my-5' onClick={checkout} style={{ marginLeft: '100px' }}>Checkout</button>
                <button onClick={emptyCart} className='btn btn-danger mx-5'>Clear Cart</button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
