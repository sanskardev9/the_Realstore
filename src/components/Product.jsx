import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = ({items, cart, setCart, cartData, setCartData, user}) => {

    const addToCartInFirebase = async(id, price, title, description, imgSrc) => {
      
      console.log("Adding to cart in Firebase:");
      console.log("ID:", id);
      console.log("Price:", price);
      console.log("Title:", title);
      console.log("Description:", description);
      console.log("Image source:", imgSrc);
        // const uniqueId = cartData.length + 1;
        const obj = {
          // id: uniqueId,
          productId:id,
          price,
          title, 
          description, 
          imgSrc
      }
      await setCartData([...cartData,obj]);
      toast.success('Added to Cart in firebase.', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }   

    const addToCart = (id, price, title, description, imgSrc) => {
      console.log("Added to cart ")
      const uniqueId = cart.length + 1;
      const obj = {
        id: uniqueId,
        productId:id,
        price,
        title, 
        description, 
        imgSrc
    }
    
    setCart([...cart,obj]);
    toast.success('Added to Cart', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
}

console.log(user);
 
  return (
    <>  
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container my-5">
        <div className="row">
          {items.map((product) => {
            return (
              <>
                <div key={product.id} className="col-lg-4 my-3">
                  <div className="card" style={{ width: "18rem" }}>
                    <Link to={`/product/${product.id}`}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      >
                      <img
                        src={product.imgSrc}
                        className="card-img-top"
                        alt="...."
                        />
                    </Link>

                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{product.description}</p>
                      <button className="btn btn-primary mx-3">
                        ₹{product.price}
                      </button>

                      {user?(
                        <button
                        onClick={()=>addToCartInFirebase(product.id, product.price, product.title, product.description, product.imgSrc)}
                        className="btn btn-warning ">Add To Cart</button>
                      ):(
                        <button
                        onClick={()=>addToCart(product.id, product.price, product.title, product.description, product.imgSrc)}
                        className="btn btn-warning ">Add To Cart</button>
                      )
                        
                      }

                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Product;






// TO RESTRICT THE USER FROM ADDING A PRODUCT MORE THAN ONCE.

//     if (isItemInCart) {
//       alert('This item is already in your cart!');
//     } else {
//       const uniqueId = cart.length + 1;
//       const obj = {
//         id: uniqueId,
//         productId: id,
//         price,
//         title,
//         description,
//         imgSrc
//       };

//       setCart([...cart, obj]);

//       toast.success('Added to Cart', {
//         position: "top-right",
//         autoClose: 1500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     }
//   };











