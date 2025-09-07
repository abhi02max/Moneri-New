# Moneri Spa & Academy

Full-stack app with React (CRA) client and Express/MongoDB server.

## Quick start

1. Server
   - Create `server/.env` with:
     - `MONGO_URI=your_mongodb_uri`
     - `JWT_SECRET=your_secret`
     - `PORT=5000`
   - Install and run:
     - `cd server`
     - `npm ci` (or `npm install`)
     - `npm start`

2. Client
   - `cd client`
   - `npm ci` (or `npm install`) 
   - `npm start`

3. Build client
   - `npm run build`

Uploaded images are served from `server/uploads/` at `/uploads`.
