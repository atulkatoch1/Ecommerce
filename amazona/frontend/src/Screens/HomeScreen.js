import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts
} from "../feature/productSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {products,loading,error} = productList;

  useEffect(() => {
      dispatch(listProducts());
    return () => {
      //
    }
  }, []);

  return loading ?<div>Loading...</div> :
  error ? <div>{error.message}</div> :(
    <ul className="products">
    {
      products?.map(product => 
        <li key={product._id}>
          <div className="product">
            <Link to={`/product/${product._id}`}>
                <img className="product-image" src={product.image} alt="product" />
            </Link>    
            <div className="product-name">
              <Link to={`/product/${product._id}`}>{product.name}</Link>
            </div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">${product.price}</div>
            <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
          </div>
        </li>)
    }
  </ul>
  )
}

export default HomeScreen
