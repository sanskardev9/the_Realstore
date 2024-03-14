import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { items } from './Data';
import Product from './Product';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductDetails = ({cart, setCart}) => {
  const{id} = useParams();
  const [product, setproduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const filterProduct = items.filter((product) => product.id == id) 
    setproduct(filterProduct[0])
    
    const relatedProducts = items.filter((relProduct) => relProduct.category === product.category)
    
    setRelatedProducts(relatedProducts)
  }, [id,product.category]);
  
  const addToCart = (id, price, title, description, imgSrc) => {
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
//   console.log("Your Cart: ",cart)
//   toast.success('Added to Cart', {
//     position: "top-right",
//     autoClose: 1500,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//     });
}
  


  return (
    <>
        {/* <ToastContainer
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
        /> */}

        <div className="container con">
          <div className="img">
            <img src={product.imgSrc} alt="Product_image" />
          </div>  
          <div className='text-center'>
          <h1 className="card-title">{product.title}</h1>
                    <p className="card-text">{product.description}</p>
                    <button className="btn btn-primary mx-3">
                      ₹{product.price}
                    </button>
                    {/* <button 
                      onClick={()=>addToCart(product.id, product.price, product.title, product.description, product.imgSrc)}
                      className="btn btn-warning ">Add To Cart</button> */}
          </div>
        </div>
        <h1></h1>
        <h1 className='text-center'>Products related to this item </h1>
        <Product cart={cart} setCart={setCart} items={relatedProducts} />
    </>
  );
};

export default ProductDetails