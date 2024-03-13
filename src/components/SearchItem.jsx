import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { items } from './Data';
import Product from './Product';
import { Link } from 'react-router-dom';

const SearchItem = ({cart, setCart}) => {

  const {term} = useParams();
  const [filterData, setFilterData] = useState([]);
  
  useEffect(() => {
    
    const filteredData = () => {
      const data = items.filter((p)=>p.title.toLowerCase().includes(term.toLowerCase()));
      setFilterData(data);
    }
    
    filteredData();

  }, [term])

  return (
    <>
    {filterData.length === 0 ?(
      <div>
        <h1 className={'text-center'}style={{marginTop:'300px'}}>Product not found.</h1>
        <Link to={"/"}><button className='btn btn-warning' style={{marginLeft:'772px'}}>Continue Shopping</button></Link>
      </div>
    ):(
      <Product items={filterData} cart={cart} setCart={setCart}/>
    )}
    
    </>
  )
}

export default SearchItem 