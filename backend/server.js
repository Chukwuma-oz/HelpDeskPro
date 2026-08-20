const express = require('express');
const cors = require('cors');
const ticketsRouter = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'HelpDeskPro API' });
});

app.use('/api/tickets', ticketsRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`HelpDeskPro API running on port ${PORT}`);
});