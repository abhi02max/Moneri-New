import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get('/api/gallery');
        setImages(data);
      } catch (err) {
        console.error("Could not fetch images.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <>
      <div className="page-header">
        <h1>Our Gallery</h1>
        <p>A glimpse into the serenity, beauty, and transformations we create.</p>
      </div>
      <div className="content-wrapper bg-alabaster">
        <div className="container">
            {loading ? (
                <p style={{textAlign: 'center'}}>Loading Gallery...</p>
            ) : images.length > 0 ? (
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
            ) : (
                <div style={{textAlign: 'center'}}>
                    <h2>Our Gallery is Waiting for New Additions</h2>
                    <p>The owner will be uploading new images soon. Check back to see our latest work!</p>
                </div>
            )}
        </div>
      </div>
    </>
  );
};

export default GalleryPage;