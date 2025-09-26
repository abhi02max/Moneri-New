import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Make sure Link is imported

// A simple hook for scroll animations
const useScrollAnimation = () => {
  const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 }); 

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.current.observe(el));

    return () => observer.current.disconnect();
  }, []);
};


const HomePage = () => {
  useScrollAnimation();

  return (
    <>
      {/* --- Hero Section --- */}
      <section className="hero">
        <video className="hero-video" autoPlay loop muted playsInline poster="fallback-image.jpg">
          <source src="https://videos.pexels.com/video-files/4692080/4692080-hd_1920_1080_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content reveal">
          <h1>Elegance in Experience</h1>
          <p>An exclusive sanctuary for women, dedicated to holistic beauty, wellness, and empowerment.</p>
        </div>
      </section>

      {/* --- Main Services Highlight --- */}
      <section className="home-section bg-alabaster">
        <div className="container">
          <h2 className="reveal">Begin Your Transformation</h2>
          <p className="section-subtitle reveal">
            Your journey to revitalization starts with a single step. Let our experts curate a personalized treatment plan for your most pressing hair and skin concerns.
          </p>
          {/* --- UPDATED BUTTONS SECTION --- */}
          <div className="reveal" style={{display: 'flex', gap: '2rem', justifyContent: 'center'}}>
            <Link to="/hair-consultation" className="btn">
                Book Hair Consultation
            </Link>
            <Link to="/skin-consultation" className="btn">
                Book Skin Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* --- The rest of the homepage sections remain the same --- */}
      <section className="home-section bg-dusty-rose">
        {/* ... (Discover Our Sanctuaries section) ... */}
      </section>
      
      <div className="philosophy-section-wrapper bg-alabaster">
        {/* ... (Philosophy section) ... */}
      </div>

      <section className="home-section bg-alabaster">
        {/* ... (Testimonials section) ... */}
      </section>
    </>
  );
};

export default HomePage;