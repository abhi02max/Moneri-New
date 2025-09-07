import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.current.observe(el));

    return () => observer.current.disconnect();
  }, []);
};


const HomePage = () => {
  // Activate the scroll animations
  useScrollAnimation();

  return (
    <>
      {/* --- Hero Section with Video --- */}
      <section className="hero">
        <video className="hero-video" autoPlay loop muted playsInline poster="fallback-image.jpg">
          {/* Find beautiful, free videos at sites like Pexels.com or Coverr.co */}
          <source src={require('../assets/videos/spavideo.mp4')} type="video/mp4" />
        </video>
        <div className="hero-content reveal">
          <h1>Elegance in Experience</h1>
          <p>
            An exclusive sanctuary for women, dedicated to holistic beauty, wellness, and empowerment.
          </p>
        </div>
      </section>

      {/* --- Main Services Highlight --- */}
      <section className="home-section bg-alabaster">
        <div className="container">
          <h2 className="reveal">Begin Your Transformation</h2>
          <p className="section-subtitle reveal">
            Your journey to revitalization starts with a single step. Let our experts curate a personalized treatment plan for your most pressing hair and skin concerns.
          </p>
          <div className="reveal" style={{display: 'flex', gap: '2rem', justifyContent: 'center'}}>
            <a href="YOUR_HAIR_TREATMENT_GOOGLE_FORM_LINK" target="_blank" rel="noopener noreferrer" className="btn">Book Hair Consultation</a>
            <a href="YOUR_SKIN_TREATMENT_GOOGLE_FORM_LINK" target="_blank" rel="noopener noreferrer" className="btn">Book Skin Consultation</a>
          </div>
        </div>
      </section>

      {/* --- Discover Our Sanctuaries --- */}
      <section className="home-section bg-dusty-rose">
        <div className="container">
            <h2 className="reveal">Discover Our Sanctuaries</h2>
            <p className="section-subtitle reveal">
              Explore our curated experiences, each designed to nurture, restore, and beautify from head to toe.
            </p>
            <div className="home-services-grid">
                {/* Add the "reveal" class to each card for staggered animation */}
                <div className="service-card reveal" style={{transitionDelay: '0s'}}>
                    <img src={require('../assets/images/first.jpg')} alt="Hair Treatment"/>
                    <div className="service-card-content">
                        <h3>The Hair Sanctuary</h3>
                        <p>From revitalizing spas that breathe life into your locks to artistic styling that expresses your personality.</p>
                        <Link to="/hair-sanctuary">Explore Hair &rarr;</Link>
                    </div>
                </div>
                <div className="service-card reveal" style={{transitionDelay: '0.2s'}}>
                    <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2940&auto=format&fit=crop" alt="Skin Treatment"/>
                    <div className="service-card-content">
                        <h3>The Skin & Soul Studio</h3>
                        <p>Unveil a luminous complexion with our advanced facials, designed to purify, rejuvenate, and restore your natural glow.</p>
                        <Link to="/skin-and-soul">Explore Skin &rarr;</Link>
                    </div>
                </div>
                <div className="service-card reveal" style={{transitionDelay: '0.4s'}}>
                    <img src={require('../assets/images/third.jpg')} alt="Massage Therapy"/>
                    <div className="service-card-content">
                        <h3>The Relaxation Retreat</h3>
                        <p>Melt away the stress of the world with our therapeutic massages, expertly delivered to release tension and soothe the mind.</p>
                        <Link to="/#contact">Discover Massages &rarr;</Link>
                    </div>
                </div>
            </div>
        </div>
      </section>
      
      {/* --- The NEW Overlapping Philosophy Section --- */}
      <div className="philosophy-section-wrapper bg-alabaster">
        <div className="container">
          <div className="philosophy-content">
            <div className="philosophy-text reveal">
              <h2>The Moneri Philosophy</h2>
              <p>We believe that true beauty is a reflection of inner wellness. It's not just about the services we provide; it's about the space we create—a space where you can disconnect from the world, reconnect with yourself, and emerge feeling confident, refreshed, and empowered.</p>
              <Link to="/our-story" className="btn">Read Our Story</Link>
            </div>
            <div className="philosophy-image reveal">
              <img src={require('../assets/images/salon.jpg')} alt="Calm spa interior" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Testimonials Section --- */}
      <section className="home-section bg-alabaster">
        <div className="container">
            <h2 className="reveal">Words From Our Guests</h2>
            <p className="section-subtitle reveal">
                Your trust is our greatest compliment. Here’s what our cherished clients have to say.
            </p>
            <div className="testimonial-grid">
                <div className="testimonial-card reveal" style={{transitionDelay: '0s'}}>
                    <p>"The spa experience was rejuvenating, and the academy offered valuable insights. Highly recommend both services. The attention to detail is just incredible!"</p>
                    <div className="author">★★★★★ - Apluta Chatterjee</div>
                </div>
                <div className="testimonial-card reveal" style={{transitionDelay: '0.2s'}}>
                    <p>"I learned so much at the academy and felt completely pampered at the spa. An amazing experience from start to finish. I've never felt more confident!"</p>
                    <div className="author">★★★★★ - Diya Banerjee</div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;