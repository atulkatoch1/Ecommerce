import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { register } from '../feature/userRegisterSlice';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state=>state.userRegister);
  const {loading, userInfo, error} = userRegister;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : '/';

  useEffect(() => {
    if (userInfo && userInfo.msg === undefined) {
      navigate(redirect);
    }
    return () => {
      //
    }
  }, [userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    let user = {
      name, email, password
    }
    dispatch(register(user))
  }

  return <div className='form'>
    <form onSubmit={submitHandler}>
        <ul className='form-container'>
            <li>
                <h2>Create Account</h2>
            </li>
            <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
            </li>
            <li>
                <label htmlFor="name">
                    Name
                </label>
                <input type="name" name="name" id='name' onChange={(e) => setName(e.target.value)}>
                    </input>
            </li>
            <li>
                <label htmlFor="email">
                    Email
                </label>
                <input type="email" name="email" id='email' onChange={(e) => setEmail(e.target.value)}>
                    </input>
            </li>
            <li>
                <label htmlFor="password">
                    Password
                </label>
                <input type="password" name="password" id='password' onChange={(e) => {setPassword(e.target.value)}}>
                    </input>
            </li>
            <li>
                <label htmlFor="rePassword">
                    Re-Enter Password
                </label>
                <input type="rePassword" name="rePassword" id='rePassword' onChange={(e) => {setRePassword(e.target.value)}}>
                    </input>
            </li>
            <li>
                <button type="submit" className='button primary'>
                    Register
                    </button>
            </li>
            <li>
                Already have an account?
                <Link to={redirect === "/" ? "/signin" : "/signin?redirect=" + redirect} className="button secondary text-center" >Create your amazona account</Link>
            </li>
        </ul>
    </form>
  </div>
}

export default RegisterScreen