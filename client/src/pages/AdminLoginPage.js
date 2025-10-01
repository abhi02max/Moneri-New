// Paste the code for AdminLoginPage.js that I provided in the previous "Quiet Luxury" design response.
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);
    try {
      const { data } = await axios.post('/api/auth/login', { username, password }, {
        headers: { 'Content-Type': 'application/json' }
      });
      localStorage.setItem('adminInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid username or password');
      } else {
        setErrorMessage('Unable to sign in. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="login-panel">
        <h1 className="brand-heading">Moneri</h1>
        <p className="subtitle">Administrator Sign In</p>
        <form onSubmit={handleSubmit}>
          {errorMessage && <p className="error-message" style={{textAlign: 'center'}}>{errorMessage}</p>}
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }} disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;