import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../feature/cartSlice';
import { detailsProduct } from '../feature/productDetailSlice';
import { removeFromCart } from '../feature/cartSlice';
import Cookie from 'js-cookie'

const CartScreen = () => {
    const dispatch = useDispatch();
    const path = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const productId = path.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const productDetails = useSelector(state => state.productDetails);
    const {product,loading,error} = productDetails;
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const removeFromCartHandler = (productId) => {
      dispatch(removeFromCart(productId));
    }

    useEffect(() => {
      dispatch(detailsProduct(productId));
    }, [])

    useEffect(() => {
      console.log(Cookie.get("cartItems") && JSON.parse(Cookie.get("cartItems")), 'cartItems'); 
            if (productId === product._id) {
                let cartItems = {
                 product: product._id,
                 name: product.name,
                 image: product.image,
                 price: product.price,
                 countInStock: product.countInStock,
                }
                dispatch(addToCart({...cartItems, qty}))                
            }
    }, [product.length !== 0])

    const CheckoutHandler = () => {
      navigate(`/signin?redirect=shipping`)
    }

  return (
    <div className='cart'>
      <div className='cart-list'>
        <ul className='cart-list-container'>
          <li>
            <h3>
              Shopping Cart
            </h3>
            <div>
              Price
            </div>
          </li>
          {
            cartItems.length === 0 ?
            <div>
              Cart is empty
            </div>
            :
            cartItems.map( item => 
              <li>
                  <div className='cart-image'>
                    <img src={item.image} alt="product"/>
                  </div>
                  <div className='cart-name'>
                    <div>
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                    </div>
                    <div>
                      Qty:
                      <select value={item.qty} onChange={(e) => dispatch(addToCart({...item, qty: e.target.value}))}>
                        {[...Array(product.countInStock).keys()].map(x=>
                          <option key={x+1} value={x+1}>{x+1}</option>
                        )}
                      </select>
                      <button type='button' className='button' onClick={() => removeFromCartHandler(item.product)}>
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className='cart-price'>
                    ${item.price}
                  </div>
              </li>
              )
          }
        </ul>
      </div>
      <div className='cart-action'>
        <h3>
        Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
        :
        $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
      <button onClick={CheckoutHandler} className='button primary full-width' disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>
      </div>
    </div>
  )
}

export default CartScreen
