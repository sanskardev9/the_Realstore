import React from 'react'
import { Link } from 'react-router-dom'

    const Cart = ({ cart, setCart }) => {
      const removeFromCart = (productId) => {
        const updatedCart = cart.filter((product) => product.id !== productId);
        setCart(updatedCart);
      }
      const calculateTotal = () => {
        const totalPrice = cart.reduce((total, product) => total + Number(product.price), 0);
        return totalPrice;
      };
    
      const checkout = () => {
        const total = calculateTotal();
        alert(`Total Price: ₹${total}`);
      };
      
      const BuyNow =() => {
        alert("Order Placed");
      }

      
    return (
    <>
      <div className="container-cart " style={{width:"55%"}}>

        {
          cart.length==0 ?(
            <>
              <div className="Empty-msg text-center"><h1 style={{width:'650px'}}>Your Cart Is Empty.</h1></div>
              <Link to={"/"}><button className='btn btn-warning' style={{marginLeft:'297px'}}>Continue Shopping</button></Link>
            </>
          ):
          cart.map((product)=>{
            return(
                <>
                <div className='Cart-div'>
                    
                  <div className="card mb-3 " style={{width:'700px', margin:'0 auto', display:'block'}}>
                  <div className="row g-0">
                  <div className="col-md-4">
                    <img src={product.imgSrc} className="img-fluid rounded-start" alt="..."/>
                  </div>
                  <div className="col-md-8">
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <button className="btn btn-primary">
                          ₹{product.price}
                    </button>
                    <button 
                      onClick={()=>BuyNow()}
                      className="btn btn-warning mx-3">Buy Now
                    </button>
                    <button 
                      className='delete-btn'
                      onClick={()=>removeFromCart(product.id)}>
                         ⛔ 
                    </button>
                  </div>
                  </div>
                  </div>
                  </div>
                
                </div>
              </>
            )
        })}
        
      </div>
        {
          !cart.length==0 &&(
            <div className="container text-center">
              <button className='btn btn-warning my-5' onClick={()=>checkout()} style={{marginLeft:'100px'}}>Checkout</button>
              <button onClick={()=>setCart([])}className='btn btn-danger mx-5'>Clear Cart</button>
            </div>
          )
        }
        
        

    </>
  )
}

export default Cart