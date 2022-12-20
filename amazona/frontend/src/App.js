import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import ProductScreen from './Screens/ProductScreen';
import HomeScreen from './Screens/HomeScreen';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './Screens/RegisterScreen';
import ProductsScreen from './Screens/ProductsScreen';

function App() {
  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }
  return (   
    <BrowserRouter>
  <div className="grid-container">
  <header className="header">
    <div className="brand">
      <button onClick={openMenu}>
        &#9776;
      </button>
      <Link to="/">amazona</Link>
    </div>
    <div className="header-links">
      <a href="cart.html">Cart</a>
      {
        userInfo && !userInfo.msg ? <Link to="/profile">{userInfo.name}</Link> :
        <Link to="/signin">Sign In</Link>
      }
    </div>
  </header>
  <aside className="sidebar">
    <h3>Shopping Categories</h3>
    <button className="sidebar-close-button" onClick={closeMenu}>x</button>
    <ul>
      <li>
        <a href="index.html">Pants</a>
      </li>

      <li>
        <a href="index.html">Shirts</a>
      </li>

    </ul>
  </aside>
  <main className="main">
    <div className="content">
      <Routes>
        <Route path='/signin' element={<SigninScreen />}/>
        <Route path='/register' element={<RegisterScreen />}/>
        <Route path='/products' element={<ProductsScreen />}/>
        <Route path='/product/:id' element={<ProductScreen />}/>
        <Route path='/cart/:id' element={<CartScreen />}/>
        <Route path='/' element={<HomeScreen />}/>
      </Routes>
    </div>

  </main>
  <footer className="footer">
    All right reserved.
  </footer>
</div>
</BrowserRouter>
  );
}

export default App;
