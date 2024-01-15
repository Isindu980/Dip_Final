
import React, { useState } from 'react';
import './Oregister.css';
import supabase from '../../../supabase';

const ORegister = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    role: 'organization', 
  });

  const [errors, setErrors] = useState({
    organizationName: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      organizationName: '',
      email: '',
      contact: '',
      password: '',
      confirmPassword: '',
    };

    if (formData.organizationName.trim() === '') {
      newErrors.organizationName = 'Organization Name is required';
    }

    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    }

    if (formData.contact.trim() === '') {
      newErrors.contact = 'Contact Number is required';
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = 'Invalid contact number format';
    }

    if (formData.password.trim() === '') {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Please re-enter your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === '')) {
      try {
        const { user, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          role: formData.role,
          options: {
            data: {
              orgName: formData.organizationName,
              orgContact: formData.contact,
            },
          },
        });

        if (error) {
          if (error.code === '23505') {
            alert('User with this email already exists. Please use a different email.');
          } else {
            alert('Error during registration. Please try again.');
            console.error('Registration error:', error);
          }
        } else {
          alert('Registration Success:', user);
        }
      } catch (error) {
        alert('Error during registration. Please try again.');
        console.error('Registration error:', error);
      }
    }
  };

  return (
    <div className="oregister-container">
      <div className="oform-container">
        <div className="ocontent"></div>
        <div className="oregistration">
          <div className="oaccount">
            <h2>Register</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input">
              <input
                type="text"
                name="organizationName"
                className={`input-text ${errors.organizationName ? 'input-error' : ''}`}
                placeholder="Organization Name"
                value={formData.organizationName}
                onChange={handleChange}
              />
              {errors.organizationName && (
                <span className="error-message">{errors.organizationName}</span>
              )}
            </div>

            <div className="input">
              <input
                type="email"
                name="email"
                className={`input-text ${errors.email ? 'input-error' : ''}`}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="input">
              <input
                type="text"
                name="contact"
                className={`input-text ${errors.contact ? 'input-error' : ''}`}
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
              />
              {errors.contact && <span className="error-message">{errors.contact}</span>}
            </div>

            <div className="input">
              <input
                type="password"
                name="password"
                className={`input-text ${errors.password ? 'input-error' : ''}`}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="input">
              <input
                type="password"
                name="confirmPassword"
                className={`input-text ${errors.confirmPassword ? 'input-error' : ''}`}
                placeholder="Re-enter Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="input">
              <label>
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                />
                I accept the terms and conditions
              </label>
            </div>

           
            <div className="input">
              <input
                type="text"
                name="role"
                className="input-text"
                placeholder="Role"
                value={formData.role}
                onChange={handleChange}
                readOnly 
              />
            </div>

            <div className="input">
              <input type="submit" className="orbutton" value="Register" />
            </div>
          </form>
          <div className="log">
            <p>Already Registered?</p>
            <a href="/ologin">Login Here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ORegister;
