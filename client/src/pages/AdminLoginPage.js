// Paste the code for AdminLoginPage.js that I provided in the previous "Quiet Luxury" design response.
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      // Note: We are using the proxy, so we don't need http://localhost:5001 here
      const { data } = await axios.post('/api/auth/login', { username, password }, config);
      
      localStorage.setItem('adminInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="login-panel">
        <h1 className="brand-heading">Moneri</h1>
        <p className="subtitle">Administrator Sign In</p>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message" style={{textAlign: 'center'}}>{error}</p>}
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;