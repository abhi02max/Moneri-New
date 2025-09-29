const HairSubmission = require('../models/HairSubmission');
const SkinSubmission = require('../models/SkinSubmission');
const nodemailer = require('nodemailer');

const createTransporter = () => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return null;
    }
    return nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: { ciphers: 'SSLv3' }
    });
};

exports.submitHairForm = async (req, res) => {
    try {
        const submission = new HairSubmission(req.body);
        await submission.save();
        const transporter = createTransporter();
        if (transporter && process.env.NOTIFICATION_EMAIL) {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.NOTIFICATION_EMAIL,
                subject: 'New Hair Test Form Submission from Moneri Website',
                html: `<h1>New Hair Consultation Form</h1><p><strong>Name:</strong> ${submission.name}</p><p><strong>Contact:</strong> ${submission.contactNumber}</p><p>A new form has been submitted. Please check the admin dashboard for full details.</p>`,
            });
        }
        res.status(201).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again.' });
    }
};

exports.submitSkinForm = async (req, res) => {
    try {
        const submission = new SkinSubmission(req.body);
        await submission.save();
        const transporter = createTransporter();
        if (transporter && process.env.NOTIFICATION_EMAIL) {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.NOTIFICATION_EMAIL,
                subject: 'New Skin Test Form Submission from Moneri Website',
                html: `<h1>New Skin Consultation Form</h1><p><strong>Name:</strong> ${submission.name}</p><p><strong>Contact:</strong> ${submission.contactNumber}</p><p>A new form has been submitted. Please check the admin dashboard for full details.</p>`,
            });
        }
        res.status(201).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again.' });
    }
};