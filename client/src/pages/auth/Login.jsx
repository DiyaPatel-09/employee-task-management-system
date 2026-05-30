import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import axios from 'axios';

function Login() {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        'http://localhost:5000/api/users/login',
        {
          email,
          password,
        }

      );

      console.log(response.data);

      localStorage.setItem(
        'token',
        response.data.token
      );

      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user)
      );

      if (

        response.data.user.role === 'admin'

      ) {

        localStorage.setItem("section","dashboard");

        navigate('/admin');

      } else {

        navigate('/my-tasks');

      }

    } catch (error) {

      console.log(error.response.data);

    }

  };

  return (

    <div className="login-page">

      <div className="login-box">

        <h1 className="login-title">
          Welcome Back
        </h1>

        <p className="login-subtitle">
          Login to continue
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;