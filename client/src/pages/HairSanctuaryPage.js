import React from 'react';

const HairSanctuaryPage = () => {
  return (
    <>
      <div className="page-header">
        <h1>The Hair Sanctuary</h1>
        <p>Where artistry and hair wellness unite to reveal your most radiant self.</p>
      </div>

      <div className="container content-section">
        <h2 style={{textAlign: 'center', marginBottom: '3rem'}}>Signature Hair Spa Rituals</h2>
        
        <div className="treatment-card">
          <h3>Liquid Gold Keratin Therapy</h3>
          <p>Transform frizzy, unmanageable hair into a smooth, silky masterpiece. Our formaldehyde-free Keratin treatment infuses each strand with powerful proteins, eliminating frizz for months while adding incredible shine and strength. It's not just a treatment; it's a hair rebirth.</p>
        </div>
        
        <div className="treatment-card">
          <h3>Himalayan Scalp Detox</h3>
          <p>True hair health begins at the root. This purifying ritual uses a blend of Himalayan pink salt and nourishing oils to exfoliate the scalp, removing product buildup and stimulating circulation. The result is a healthy, balanced scalp and hair that feels lighter, cleaner, and more vibrant.</p>
        </div>

        <div style={{textAlign: 'center', marginTop: '4rem'}}>
          <h3>Have a Specific Concern?</h3>
          <p>Let our experts guide you to the perfect solution.</p>
          <a href="YOUR_HAIR_TREATMENT_GOOGLE_FORM_LINK" target="_blank" rel="noopener noreferrer" className="btn">Book a Hair Consultation</a>
        </div>
      </div>
    </>
  );
};

export default HairSanctuaryPage;