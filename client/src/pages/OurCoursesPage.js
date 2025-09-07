import React from 'react';

const OurCoursesPage = () => {
    return (
        <>
            <div className="page-header">
                <h1>The Academy Hub</h1>
                <p>Empowering the next generation of beauty and wellness professionals.</p>
            </div>

            <div className="container content-section">
                <h2 style={{ textAlign: 'center' }}>Our Professional Courses</h2>
                <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
                    At Moneri Academy, we don't just teach techniques; we cultivate artists. Our courses are designed to provide intensive, hands-on training, blending artistic passion with industry-leading standards.
                </p>
                
                <div className="treatment-card">
                    <h3>Advanced Diploma in Cosmetology</h3>
                    <p>A comprehensive journey covering everything from advanced skincare and hair science to salon management. This course is your launchpad to becoming a leader in the beauty industry. (Full details coming soon).</p>
                </div>
                
                <div className="treatment-card">
                    <h3>Certified Professional Makeup Artistry</h3>
                    <p>Master the art of makeup, from bridal and editorial looks to special effects. Our curriculum focuses on creativity, precision, and building a professional portfolio. (Full details coming soon).</p>
                </div>
            </div>
        </>
    );
};

export default OurCoursesPage;