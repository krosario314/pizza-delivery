import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_CUSTOMER } from '../utils/mutations';
import "./Signup.css"

export const Signup = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addCustomer] = useMutation(ADD_CUSTOMER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const mutationResponse = await addCustomer({
      variables: {
        address: formState.address,
        email: formState.email,
        password: formState.password,
        username: formState.username,
        
      },
    });
    const token = mutationResponse.data.addCustomer.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (

    <div id="pizza-div-order">
    <div id="order-form-login">
    <div className="container my-1"id="login-form">
      <Link to="/login">Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit} >
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">Username:</label>
          <input
            placeholder="User"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div><br />
     
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div><br />
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
          />
        </div><br />

        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Address:</label>
          <input
            placeholder="enter a valid address"
            name="address"
            type="address"
            id="address"
            onChange={handleChange}
          />
        </div><br />



        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}


