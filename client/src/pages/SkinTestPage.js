// Paste the full code for SkinTestPage.js that I provided in the previous response.
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const SkinTestPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '', age: '', gender: '', contactNumber: '', email: '',
        skinType: '', concerns: {}, otherConcern: '',
        allergies: 'No', allergiesDetails: '', medication: 'No', medicationDetails: '',
        sunExposure: '', usesSunscreen: 'No',
        currentRoutine: { cleanser: '', moisturizer: '', sunscreen: '', treatments: '' },
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e, category) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [category]: { ...prev[category], [name]: checked } }));
    };

    const handleRoutineChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, currentRoutine: { ...prev.currentRoutine, [name]: value } }));
    };
    
    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        try {
            const response = await axios.post('/api/submissions/skin', formData);
            setMessage(response.data.message);
        } catch (error) {
            console.error('Submission error:', error);
            setMessage(error.response?.data?.message || 'Submission failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const steps = ['Info', 'Concerns', 'Lifestyle', 'Routine'];

    if (message === 'Form submitted successfully!') {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
                <h1>🌸 Thank You! 🌸</h1>
                <p>Your skin consultation form has been received. Our specialists will contact you shortly.</p>
                <Link to="/" className="btn" style={{ marginTop: '2rem' }}>Back to Home</Link>
            </div>
        );
    }

    return (
        <>
            <div className="page-header">
                <h1>Skin Consultation Form</h1>
                <p>Your journey to radiant skin begins here. Please provide the following details.</p>
            </div>
            <div className="container" style={{ maxWidth: '900px', margin: '4rem auto' }}>
                 <div className="form-stepper">
                    {steps.map((step, index) => (
                        <div key={index} className={`step ${currentStep === index + 1 ? 'active' : ''} ${currentStep > index + 1 ? 'completed' : ''}`}>
                            <div className="step-number">{currentStep > index + 1 ? '✓' : index + 1}</div>
                            <div className="step-title">{step}</div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="consultation-form">
                    {currentStep === 1 && (
                        <fieldset className="form-fieldset">
                            <legend className="form-legend">Client Information</legend>
                            <div className="form-grid">
                                <div className="form-group"><label>Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required /></div>
                                <div className="form-group"><label>Age</label><input type="number" name="age" value={formData.age} onChange={handleChange} required /></div>
                                <div className="form-group"><label>Gender</label>
                                    <div className="radio-group">
                                        {["Female", "Male", "Other"].map(item => (
                                            <div key={item}><input type="radio" id={`gender-${item}`} name="gender" value={item} checked={formData.gender === item} onChange={handleChange} /><label htmlFor={`gender-${item}`}>{item}</label></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group"><label>Contact Number</label><input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required /></div>
                                <div className="form-group"><label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} required /></div>
                            </div>
                        </fieldset>
                    )}
                    
                    {currentStep === 2 && (
                         <fieldset className="form-fieldset">
                             <legend className="form-legend">Skin Type & Concerns</legend>
                             <div className="form-group"><label>What is your skin type?</label>
                                <div className="radio-group">
                                    {["Normal", "Dry", "Oily", "Combination", "Sensitive"].map(item => (<div key={item}><input type="radio" id={item} name="skinType" value={item} checked={formData.skinType === item} onChange={handleChange} /><label htmlFor={item}>{item}</label></div>))}
                                </div>
                             </div>
                              <div className="form-group"><label>What are your primary concerns?</label>
                                <div className="checkbox-group">
                                    {["Acne / Pimples", "Pigmentation / Dark Spots", "Fine Lines / Wrinkles", "Dullness", "Redness / Irritation", "Large Pores", "Dark Circles"].map(item => (<div key={item}><input type="checkbox" id={item} name={item} checked={!!formData.concerns[item]} onChange={e => handleCheckboxChange(e, 'concerns')} /><label htmlFor={item}>{item}</label></div>))}
                                </div>
                                <div className="form-group" style={{marginTop: '1rem'}}><label>Other</label><input type="text" name="otherConcern" value={formData.otherConcern} onChange={handleChange} /></div>
                            </div>
                         </fieldset>
                    )}

                    {currentStep === 3 && (
                        <fieldset className="form-fieldset">
                            <legend className="form-legend">Medical & Lifestyle</legend>
                             <div className="form-group"><label>Do you have any allergies?</label>
                                <div className="radio-group">
                                    <div key="allergies-yes"><input type="radio" id="allergies-yes" name="allergies" value="Yes" checked={formData.allergies === 'Yes'} onChange={handleChange} /><label htmlFor="allergies-yes">Yes</label></div>
                                    <div key="allergies-no"><input type="radio" id="allergies-no" name="allergies" value="No" checked={formData.allergies === 'No'} onChange={handleChange} /><label htmlFor="allergies-no">No</label></div>
                                </div>
                                {formData.allergies === 'Yes' && <input type="text" name="allergiesDetails" placeholder="Please specify your allergies" value={formData.allergiesDetails} onChange={handleChange} style={{marginTop: '0.5rem'}} />}
                            </div>
                             <div className="form-group"><label>Do you use sunscreen regularly?</label>
                                <div className="radio-group">
                                    <div key="sunscreen-yes"><input type="radio" id="sunscreen-yes" name="usesSunscreen" value="Yes" checked={formData.usesSunscreen === 'Yes'} onChange={handleChange} /><label htmlFor="sunscreen-yes">Yes</label></div>
                                    <div key="sunscreen-no"><input type="radio" id="sunscreen-no" name="usesSunscreen" value="No" checked={formData.usesSunscreen === 'No'} onChange={handleChange} /><label htmlFor="sunscreen-no">No</label></div>
                                </div>
                            </div>
                        </fieldset>
                    )}

                     {currentStep === 4 && (
                        <fieldset className="form-fieldset">
                            <legend className="form-legend">Current Skin Routine</legend>
                            <div className="form-grid">
                                <div className="form-group"><label>Cleanser</label><input type="text" name="cleanser" value={formData.currentRoutine.cleanser} onChange={handleRoutineChange} /></div>
                                <div className="form-group"><label>Moisturizer</label><input type="text" name="moisturizer" value={formData.currentRoutine.moisturizer} onChange={handleRoutineChange} /></div>
                                <div className="form-group"><label>Sunscreen</label><input type="text" name="sunscreen" value={formData.currentRoutine.sunscreen} onChange={handleRoutineChange} /></div>
                                <div className="form-group"><label>Treatments (Serums)</label><input type="text" name="treatments" value={formData.currentRoutine.treatments} onChange={handleRoutineChange} /></div>
                            </div>
                             <p style={{marginTop: '2rem'}}><strong>Declaration:</strong> By submitting this form, I confirm that the above details are true and consent to undergo consultation.</p>
                        </fieldset>
                     )}

                    <div className="form-navigation">
                        {currentStep > 1 && <button type="button" className="btn btn-secondary" onClick={prevStep}>Previous Step</button>}
                        {currentStep < 4 && <button type="button" className="btn" onClick={nextStep} style={{marginLeft: 'auto'}}>Next Step</button>}
                        {currentStep === 4 && <button type="submit" className="btn" style={{marginLeft: 'auto'}} disabled={isLoading}>
                            {isLoading ? <LoadingSpinner size="small" /> : 'Submit My Consultation'}
                        </button>}
                    </div>
                    {message && !message.includes('success') && <p style={{marginTop: '1rem', textAlign: 'center'}}>{message}</p>}
                </form>
            </div>
        </>
    );
};

export default SkinTestPage;