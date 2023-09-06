import React, { useState} from 'react';
import {
  doc,
  setDoc,
  collection,
} from 'firebase/firestore';
import db from './firebase';
import { v4 as uuidv4 } from 'uuid';

import './App.css';

const App = () => {
  const collectionRef = collection(db, 'formdata');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDOB] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !dob || !address) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const newData = {
      name,
      email,
      id: uuidv4(),
      phone,
      dob,
      address,
    };

    try {
      const dataRef = doc(collectionRef, newData.id);
      await setDoc(dataRef, newData);
      setError('');
      // Clear the form
      setName('');
      setEmail('');
      setPhone('');
      setDOB('');
      setAddress('');

      alert("Your information are successfully stored to the firebase")
    } catch (error) {
      console.error(error);
      alert("Something went wrong pls try again later")

    }
  };

  return (
    <div className="App">
      <div className='form_container'>

        <h1>React Form Example</h1>
        <form onSubmit={handleSubmit}>
          <h6>Name</h6>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <h6>Email</h6>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <h6>Phone</h6>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <h6>Date of Birth</h6>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDOB(e.target.value)}
            required
          />

          <h6>Address</h6>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Upload to Firebase</button>
        </form>
      </div>
      
    </div>
  );
};

export default App;
