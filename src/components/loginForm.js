import React, { useState } from 'react';
import { db } from './firebase.config.js';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch user data based on username
      const userRef = db.collection('users').doc(username);
      const doc = await userRef.get();
      if (doc.exists) {
        const userData = doc.data();
        if (userData.password === password) { // This comparison should be done with hashed passwords
          console.log('User authenticated!');
          // Proceed with login...
        } else {
          console.error('Invalid password');
        }
      } else {
        console.error('User does not exist');
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
