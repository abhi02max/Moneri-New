// Paste the full code for HairTestPage.js that I provided in the previous response.
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const HairTestPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '', age: '', gender: '', contactNumber: '', email: '',
        concerns: {}, otherConcern: '',
        issueDuration: '', treatments: {}, usesHairOil: '',
        stressLevel: '', sleepPattern: '', dietType: '', waterIntake: '',
        healthConditions: '', medications: '',
        hairGoals: {},
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e, category) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [category]: { ...prev[category], [name]: checked }
        }));
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        try {
            const response = await axios.post('/api/submissions/hair', formData);
            setMessage(response.data.message);
        } catch (error) {
            console.error('Submission error:', error);
            setMessage(error.response?.data?.message || 'Submission failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const steps = ['Info', 'Concerns', 'Lifestyle', 'Goals'];

    if (message === 'Form submitted successfully!') {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
                <h1>Thank You!</h1>
                <p>Your hair consultation form has been submitted. Our experts will get in touch with you shortly.</p>
                <Link to="/" className="btn" style={{ marginTop: '2rem' }}>Back to Home</Link>
            </div>
        );
    }

    return (
        <>
            <div className="page-header">
                <h1>Hair Consultation Form</h1>
                <p>Let's begin your journey to healthy, beautiful hair.</p>
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
                            <legend className="form-legend">Personal Information</legend>
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
                            <legend className="form-legend">Hair & Scalp History</legend>
                            <div className="form-group"><label>What are your primary concerns?</label>
                                <div className="checkbox-group">
                                    {[ "Hair Fall", "Thinning", "Dandruff / Flakes", "Itchy Scalp", "Dry & Frizzy Hair", "Oily / Greasy Scalp", "Split Ends", "Premature Greying", "Bald Patches"].map(item => (<div key={item}><input type="checkbox" id={item} name={item} checked={!!formData.concerns[item]} onChange={e => handleCheckboxChange(e, 'concerns')} /><label htmlFor={item}>{item}</label></div>))}
                                </div>
                                <div className="form-group" style={{marginTop: '1rem'}}><label>Other</label><input type="text" name="otherConcern" value={formData.otherConcern} onChange={handleChange} /></div>
                            </div>
                            <div className="form-group"><label>How long have you been facing this issue?</label>
                                <div className="radio-group">
                                    {["Less than 3 months", "3-6 months", "6-12 months", "More than 1 year"].map(item => (<div key={item}><input type="radio" id={item} name="issueDuration" value={item} checked={formData.issueDuration === item} onChange={handleChange} /><label htmlFor={item}>{item}</label></div>))}
                                </div>
                            </div>
                        </fieldset>
                    )}

                    {currentStep === 3 && (
                         <fieldset className="form-fieldset">
                            <legend className="form-legend">Lifestyle & Health</legend>
                             <div className="form-group"><label>Stress Level</label>
                                <div className="radio-group">
                                    {["Low", "Moderate", "High"].map(item => (<div key={item}><input type="radio" id={`stress-${item}`} name="stressLevel" value={item} checked={formData.stressLevel === item} onChange={handleChange}/><label htmlFor={`stress-${item}`}>{item}</label></div>))}
                                </div>
                            </div>
                            <div className="form-grid">
                                <div className="form-group"><label>Any health conditions? (Thyroid, PCOS, etc.)</label><input type="text" name="healthConditions" value={formData.healthConditions} onChange={handleChange} /></div>
                                <div className="form-group"><label>Are you on any medications?</label><input type="text" name="medications" value={formData.medications} onChange={handleChange} /></div>
                            </div>
                        </fieldset>
                    )}

                    {currentStep === 4 && (
                        <fieldset className="form-fieldset">
                            <legend className="form-legend">Hair Goals</legend>
                            <div className="form-group"><label>What would you like to achieve?</label>
                                <div className="checkbox-group">
                                    {["Reduce Hair Fall", "Regrow Hair / Improve Density", "Control Dandruff", "Smooth & Shiny Hair", "Colour / Style Safely", "Overall Healthy Scalp"].map(item => (
                                        <div key={item}><input type="checkbox" id={`goal-${item}`} name={item} checked={!!formData.hairGoals[item]} onChange={e => handleCheckboxChange(e, 'hairGoals')} /><label htmlFor={`goal-${item}`}>{item}</label></div>
                                    ))}
                                </div>
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
export default HairTestPage;