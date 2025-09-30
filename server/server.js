require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Init Middleware
// Explicit CORS allowlist for both projects and local dev
const allowedOrigins = [
  'https://monerispaacadmey.in',
  'https://www.monerispaacadmey.in',
  'https://getinteviewconfidence.com',
  'https://www.getinteviewconfidence.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser or same-origin
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define API Routes (These must come BEFORE the React catch-all)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));

// Serve static assets (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// --- Production Build Configuration (Correct Placement) ---
if (process.env.NODE_ENV === 'production') {
  // Serve the static files from the React app's build folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  // For any route that is not an API route, send the React app's index.html file
  // This must be the LAST route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}
// --- End of Production block ---


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));