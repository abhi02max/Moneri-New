import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaImages, FaCloudUploadAlt, FaTrash, FaSignOutAlt, FaCheckCircle } from 'react-icons/fa';

const AdminDashboardPage = () => {
  const [adminName, setAdminName] = useState('Admin');
  const [recentImages, setRecentImages] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [message, setMessage] = useState('');
  
  // New state for the uploader
  const [tagline, setTagline] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('adminInfo'));
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data: allImages } = await axios.get('/api/gallery', config);
      const { data: recent } = await axios.get('/api/gallery?limit=5', config);
      setImageCount(allImages.length);
      setRecentImages(recent);
    } catch (error) { console.error("Failed to fetch data", error); }
  }, []);

  useEffect(() => {
    const adminInfo = localStorage.getItem('adminInfo');
    if (!adminInfo) navigate('/admin');
    else {
      setAdminName(JSON.parse(adminInfo).username);
      fetchData();
    }
  }, [navigate, fetchData]);

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin');
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setSelectedFileName(file.name);
    }
  };

  // Drag and drop event handlers
  const handleDragEnter = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) return setMessage('Please select an image to upload.');
    
    const formData = new FormData();
    formData.append('tagline', tagline);
    formData.append('image', imageFile);

    try {
      const { token } = JSON.parse(localStorage.getItem('adminInfo'));
      const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } };
      
      await axios.post('/api/gallery/upload', formData, config);
      setMessage('Upload successful!');
      setTagline('');
      setImageFile(null);
      setSelectedFileName('');
      fetchData();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) { setMessage('Upload failed. Please try again.'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      const { token } = JSON.parse(localStorage.getItem('adminInfo'));
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`/api/gallery/${id}`, config);
      fetchData();
    } catch (error) { console.error("Failed to delete image", error); }
  };

  return (
    <div className="admin-wrapper">
      <header className="admin-header">
        <div>
          <h1 className="brand-heading" style={{fontSize: '2rem'}}>Dashboard</h1>
          <p className="welcome-text" style={{margin: 0}}>
            Welcome back, <span style={{ color: 'var(--gold-leaf)' }}>{adminName}</span>
          </p>
        </div>
        <button onClick={handleLogout} className="btn"><FaSignOutAlt style={{ marginRight: '0.5rem' }} /> Logout</button>
      </header>

      <div className="admin-content-grid">
        <div className="admin-card stat-card">
          <div className="stat-number">{imageCount}</div>
          <div className="stat-label">Images in Gallery</div>
        </div>
        <div className="admin-card stat-card">
          <div className="stat-number">0</div>
          <div className="stat-label">Testimonials</div>
        </div>
        <div className="admin-card stat-card">
          <div className="stat-number">0</div>
          <div className="stat-label">Active Courses</div>
        </div>
        
        <div className="admin-card span-2">
          <h3><FaCloudUploadAlt /> Add New Image to Gallery</h3>
          <form onSubmit={handleUpload}>
            <div className="form-group">
              <label htmlFor="file-upload" 
                className={`file-drop-zone ${isDragging ? 'is-dragging' : ''}`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter} // DragOver is also needed
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="upload-icon"><FaImages /></div>
                <p>Drag & drop your image here</p>
                <span>or click to browse</span>
                <input id="file-upload" type="file" accept="image/*" onChange={(e) => handleFileSelect(e.target.files[0])} />
              </label>
              {selectedFileName && <div className="file-name"><FaCheckCircle style={{color: 'green', marginRight: '0.5rem'}} /> {selectedFileName}</div>}
            </div>
            <div className="form-group">
              <label>Tagline (Optional)</label>
              <input type="text" placeholder="e.g., A moment of pure serenity" value={tagline} onChange={(e) => setTagline(e.target.value)} />
            </div>
            <button type="submit" className="btn">Upload to Gallery</button>
            {message && <span style={{ marginLeft: '1rem' }}>{message}</span>}
          </form>
        </div>

        <div className="admin-card full-width">
          <h3><FaImages /> Recent Uploads</h3>
          {recentImages.length > 0 ? (
            <ul className="uploads-list">
              {recentImages.map(img => (
                <li key={img._id} className="uploads-list-item">
                  <img src={img.imageUrl} alt={img.tagline || ''} />
                  <div className="info">
                    {img.tagline ? <p>{img.tagline}</p> : <p className="no-tagline">No tagline provided</p>}
                  </div>
                  <button onClick={() => handleDelete(img._id)} className="delete-btn" title="Delete Image"><FaTrash /></button>
                </li>
              ))}
            </ul>
          ) : <p>No images have been uploaded yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;