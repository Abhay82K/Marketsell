# Krishi Market

Krishi Market is a full-stack web app where farmers can submit produce directly for government procurement and monitor live commodity prices.

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- File uploads: Multer
- Live prices: simulated fluctuating feed every 5 seconds

## Project Structure
```
.
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── uploads
│   └── server.js
├── frontend
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── .env.example
└── package.json
```

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env`:
   ```bash
   cp .env.example .env
   ```
3. Make sure MongoDB is running and `MONGO_URI` is correct.
4. Start application:
   ```bash
   npm start
   ```

Open http://localhost:5000

## API Endpoints
- `POST /api/products` - submit farmer product (multipart form with `productImage`)
- `GET /api/products` - list all farmer product submissions
- `PATCH /api/products/:id` - update status (`Approved`, `Rejected`, `Pending`)
- `GET /api/prices` - get live/simulated commodity prices
