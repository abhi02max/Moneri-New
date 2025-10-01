require('dotenv').config(); // This MUST be the very first line
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// --- FIX: Add the diagnostic console.log here, before connecting ---
console.log("Attempting to connect with MONGO_URI:", process.env.MONGO_URI);

// --- FIX: connectDB() should only be called once, here at the top ---
connectDB();

const app = express();

// Init Middleware
// Explicit CORS allowlist for both projects and local dev
const allowedOrigins = [
  'https://monerispaacademy.in', // <-- FIX: Corrected typo in domain name
  'https://www.monerispaacademy.in', // <-- FIX: Added www version
  'https://getinteviewconfidence.com',
  'https://www.getinteviewconfidence.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    }
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));

// Serve static assets (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Production Build Configuration ---
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));

// --- FIX: The console.log and connectDB() calls from the bottom have been removed ---