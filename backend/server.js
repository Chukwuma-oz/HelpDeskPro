const express = require('express');
const cors = require('cors');
const path = require('path');
const ticketsRouter = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Serve the frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'HelpDeskPro API'
  });
});

// API routes
app.use('/api/tickets', ticketsRouter);

// Frontend fallback
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`HelpDeskPro API running on port ${PORT}`);
});