require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Init Middleware
app.use(cors());
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