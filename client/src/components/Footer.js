import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear() > 2025 ? new Date().getFullYear() : 2025;

    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-col">
                    <h3 className="footer-brand">Moneri Spa & Academy</h3>
                    <p>A sanctuary where modern wellness meets timeless beauty. Your journey to radiance and tranquility begins here.</p>
                    <div className="social-icons">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/our-story">Our Story</Link></li>
                        <li><Link to="/gallery">Gallery</Link></li>
                        <li><Link to="/beauty-journal">Beauty Journal</Link></li>
                        <li><Link to="/admin">Admin Login</Link></li> {/* <-- THIS IS THE NEW LINK */}
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Our Sanctuaries</h4>
                    <ul>
                        <li><Link to="/hair-sanctuary">The Hair Sanctuary</Link></li>
                        <li><Link to="/skin-and-soul">The Skin & Soul Studio</Link></li>
                        <li><a href="#massages">The Relaxation Retreat</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Contact Us</h4>
                    <p>392, Ramkrishna Nagar Road, Near Hindustan More, Kolkata</p>
                    <p>Email: info@monerispaacademy.com</p>
                    <p>Call: (+91) 967-416-8149</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {currentYear} Moneri Spa & Academy. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;