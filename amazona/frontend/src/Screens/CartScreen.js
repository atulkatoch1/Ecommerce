import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { addToCart } from '../feature/cartSlice';
import { detailsProduct } from '../feature/productDetailSlice';

const CartScreen = () => {
    const dispatch = useDispatch();
    const path = useParams();
    const location = useLocation();
    const productId = path.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const productDetails = useSelector(state => state.productDetails);
    const {product,loading,error} = productDetails;

    useEffect(() =>{
        dispatch(detailsProduct(productId));
    }, [])

    useEffect(() => {
            console.log(product,'productproduct');
            if (product._id) {
                let cartItems = {
                 product: product._id,
                 name: product.name,
                 image: product.image,
                 price: product.price,
                 countInStock: product.countInStock,
                 qty
                }
                dispatch(addToCart(cartItems))                  
            }  
    }, [product.length !== 0])

  return (
    <div>
      Cart Screen
    </div>
  )
}

export default CartScreen
