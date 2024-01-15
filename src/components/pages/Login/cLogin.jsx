import React, { useState } from 'react';
import './Login.css';
import supabase from '../../../supabase';
import { useNavigate } from 'react-router-dom';

const CLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const handleSuccessfulLogin = () => {
    alert('Login successful');
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: '',
      password: '',
    };

    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.password.trim() === '') {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      try {
       
        const { data, error } = await supabase
          .from('CUSTOMER')
          .select()
          .eq('email', formData.email)
          .eq('password', formData.password);

        if (error || !data || data.length === 0) {
          alert('Login failed. Please check your credentials.');
          console.error('Login error:', error);
        } else {
          alert('Login successful');
         
          handleSuccessfulLogin();
          navigate('/cudash');
        }
      } catch (error) {
        alert('An error occurred during login. Please try again.');
        console.error('Login error:', error.message);
      }
    }
  };

  return (
    <div className="logcontainer">
      <div className="form-container">
        <div className="content"></div>
        <div className="home">
          <div className="account">
            <h2>Login</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                name="email"
                className={`input-mail ${errors.email ? 'input-error' : ''}`}
                autoComplete="off"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="input">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                className={`input-mail ${errors.password ? 'input-error' : ''}`}
                autoComplete="off"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            <div className="input">
              <label>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Remember Me
              </label>
            </div>
            <div className="input">
              <input type="submit" className="login-button" value="Login" />
            </div>
          </form>
          <div className="log">
            <p>Not Registered?</p>
            <a href="/cregister">Register Here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CLogin;
