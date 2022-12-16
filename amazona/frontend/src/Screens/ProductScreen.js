import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
  detailsProduct
} from "../feature/productDetailSlice";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const path = useParams();
  const navigate = useNavigate();
  const productDetails = useSelector(state => state.productDetails);
  const {product,loading,error} = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(path.id));
    return () => {
      //
    }
  }, [])

  const handleAddToCart = () => {
    navigate(`/cart/${path.id}?qty=${qty}`)
  }

  return  loading ?<div>Loading...</div> :
  error ? <div>{error.message}</div> :(
    <div>
      <div className='back-to-result'>
        <Link to="/">Back to result</Link>
      </div>
      <div className='details'>
        <div className='details-image'>
          <img src={product.image} alt="product"/>
        </div>
        <div className='details-info'>
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Stars ({product.numReviews} Reviews)
            </li>
            <li>
              Price: <b>${product.price}</b>
            </li>
            <li>
              Description:
              <div>
                {product.description}
              </div>
            </li>
          </ul>
        </div>
        <div className="details-action">
        <ul>
            <li>
             Price: {product.price}
            </li>
            <li>
             Status: {product.countInStock>0 ? "In Stock" : "Unavailable"}
            </li>
            <li>
             Qty: <select value={qty} onChange={(e) => {setQty(e.target.value)}}>
              {[...Array(product.countInStock).keys()].map(x=>
                <option key={x+1} value={x+1}>{x+1}</option>
                )}
             </select>
            </li>
            <li>
              {product.countInStock>0 &&
              <button onClick={handleAddToCart} className='button primary'>
                Add to cart
              </button>}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductScreen
