import React from 'react';

const SkinAndSoulPage = () => {
  return (
    <>
      <div className="page-header">
        <h1>The Skin & Soul Studio</h1>
        <p>Advanced skincare journeys designed to illuminate your complexion and spirit.</p>
      </div>

      <div className="container content-section">
        <h2 style={{textAlign: 'center', marginBottom: '3rem'}}>Facial Elixirs & Rituals</h2>
        
        <div className="treatment-card">
          <h3>The Pearl Radiance Facial</h3>
          <p>Unveil your inner glow with this luxurious facial. Using potent Vitamin C and pearl extracts, this treatment targets dullness and pigmentation, brightens the complexion, and infuses the skin with antioxidants. You'll leave with skin that is visibly brighter, smoother, and utterly luminous.</p>
        </div>
        
        <div className="treatment-card">
          <h3>Cellular Renewal Ritual (HydraFacial)</h3>
          <p>Experience the pinnacle of non-invasive skin resurfacing. Our HydraFacial technology cleanses, exfoliates, extracts, and hydrates simultaneously. It addresses fine lines, enlarged pores, and uneven texture, delivering instant results with no downtime. It's the ultimate confidence boost for your skin.</p>
        </div>

        <div style={{textAlign: 'center', marginTop: '4rem'}}>
          <h3>Ready for Your Glow-Up?</h3>
          <p>Your journey to flawless skin starts here.</p>
          <a href="YOUR_SKIN_TREATMENT_GOOGLE_FORM_LINK" target="_blank" rel="noopener noreferrer" className="btn">Book a Skin Consultation</a>
        </div>
      </div>
    </>
  );
};

export default SkinAndSoulPage;