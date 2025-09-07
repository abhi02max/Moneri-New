import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get('/api/gallery');
        setImages(data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch images.');
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <div className="page-header">
        <h1>Our Gallery</h1>
        <p>A glimpse into the serenity and beauty we offer.</p>
      </div>
      <div className="container" style={{padding: '4rem 1rem'}}>
        {loading ? (
          <p style={{textAlign: 'center'}}>Loading...</p>
        ) : error ? (
          <p className="error-message" style={{textAlign: 'center'}}>{error}</p>
        ) : (
          <div className="gallery-page-grid">
            {images.map((image) => (
              <div key={image._id} className="gallery-card">
                <img src={image.imageUrl} alt={image.tagline || 'Moneri Spa Gallery Image'} />
                <div className={image.tagline ? 'tagline' : 'no-tagline'}>
                  <p>"{image.tagline}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default GalleryPage;