import React, { useState } from "react";
import "./VRegister.css";
import supabase from "../../../supabase";

const VRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      firstName: "",
      lastName: "",
      age: "",
      email: "",
      password: "",
      confirmPassword: "",
      contact: "",
    };

    if (formData.firstName.trim() === "") {
      newErrors.firstName = "First Name is required";
    }

    if (formData.lastName.trim() === "") {
      newErrors.lastName = "Last Name is required";
    }

    if (formData.age.trim() === "") {
      newErrors.age = "Age is required";
    } else {
      const ageValue = parseInt(formData.age, 10);
      if (isNaN(ageValue) || ageValue < 18) {
        newErrors.age = "Age must be 18 or above";
      }
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Please re-enter your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.contact.trim() === "") {
      newErrors.contact = "Contact Number is required";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Invalid contact number format";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      try {
        const { data, error } = await supabase
          .from("VOLUNTEER")
          .upsert([
            {
              firstname: formData.firstName,
              lastname: formData.lastName,
              age: formData.age,
              email: formData.email,
              password: formData.password, 
              contact_no: formData.contact,
            },
          ]);

        if (error) {
          console.error("Registration error:", error);
          alert("Registration failed. Please try again.");
        } else {
          alert("Registration successful");
          setFormData({
            firstName: "",
            lastName: "",
            age: "",
            email: "",
            password: "",
            confirmPassword: "",
            contact: "",
            acceptTerms: false,
          });
        }
      } catch (error) {
        console.error("An error occurred during registration:", error);
        alert("An error occurred during registration. Please try again.");
      }
    }
  };

  return (
    <div className="vregister-container">
      <div className="vform-container">
        <div className="vcontent"></div>
        <div className="vregistration">
          <div className="vaccount">
            <h2>Register</h2>
          </div>
          <form onSubmit={handleSubmit}>
           
            <div className="input">
              <input
                type="text"
                name="firstName"
                className={`input-text ${
                  errors.firstName ? "input-error" : ""
                }`}
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="error-message">{errors.firstName}</span>
              )}
            </div>

          
            <div className="input">
              <input
                type="text"
                name="lastName"
                className={`input-text ${errors.lastName ? "input-error" : ""}`}
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className="error-message">{errors.lastName}</span>
              )}
            </div>

            
            <div className="input">
              <input
                type="text"
                name="age"
                className={`input-text ${errors.age ? "input-error" : ""}`}
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && (
                <span className="error-message">{errors.age}</span>
              )}
            </div>

            <div className="input">
              <input
                type="email"
                name="email"
                className={`input-text ${errors.email ? "input-error" : ""}`}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="input">
              <input
                type="password"
                name="password"
                className={`input-text ${errors.password ? "input-error" : ""}`}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="input">
              <input
                type="password"
                name="confirmPassword"
                className={`input-text ${
                  errors.confirmPassword ? "input-error" : ""
                }`}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="input">
              <input
                type="text"
                name="contact"
                className={`input-text ${errors.contact ? "input-error" : ""}`}
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
              />
              {errors.contact && (
                <span className="error-message">{errors.contact}</span>
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
              <input type="submit" className="vrbutton" value="Register " />
            </div>
          </form>
          <div className="log">
            <p>Already Registered?</p>
            <a href="/vlogin">Login Here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VRegister;
