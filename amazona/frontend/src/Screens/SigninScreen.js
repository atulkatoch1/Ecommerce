import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signin } from '../feature/userSigninSlice';

const SigninScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state=>state.userSignin);
  const {loading, userInfo, error} = userSignin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.msg === undefined) {
      navigate('/');
    }
    return () => {
      //
    }
  }, [userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    let user = {
      email, password
    }
    dispatch(signin(user))
  }

  return <div className='form'>
    <form onSubmit={submitHandler}>
        <ul className='form-container'>
            <li>
                <h2>Sign-In</h2>
            </li>
            <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
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
                <button type="submit" className='button primary'>
                    Signin
                    </button>
            </li>
            <li>
                New to amazona
            </li>
            <li>
                <Link to="/register" className='button secondary text-center'>Create your amazona account</Link>
            </li>
        </ul>
    </form>
  </div>
}

export default SigninScreen