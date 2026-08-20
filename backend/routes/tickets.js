const router = require('express').Router();

let tickets = [
  {
    id: 1, name: 'Demo User', email: 'demo@example.com',
    subject: 'Cannot access email',
    description: 'Email login is not working.',
    priority: 'Medium', status: 'Open'
  },
  {
    id: 2, name: 'Admin User', email: 'admin@example.com',
    subject: 'Laptop will not boot',
    description: 'Laptop shows a blank screen.',
    priority: 'High', status: 'In Progress'
  }
];

router.get('/', (req, res) => res.json(tickets));

router.get('/:id', (req, res) => {
  const ticket = tickets.find(t => t.id === Number(req.params.id));
  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
  res.json(ticket);
});

router.post('/', (req, res) => {
  const { name, email, subject, description, priority } = req.body;
  if (!name || !email || !subject || !description || !priority) {
    return res.status(400).json({
      error: 'name, email, subject, description and priority are required'
    });
  }
  const ticket = {
    id: tickets.length + 1, name, email, subject, description,
    priority, status: 'Open'
  };
  tickets.push(ticket);
  res.status(201).json(ticket);
});

router.put('/:id', (req, res) => {
  const ticket = tickets.find(t => t.id === Number(req.params.id));
  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
  if (req.body.status) ticket.status = req.body.status;
  if (req.body.priority) ticket.priority = req.body.priority;
  res.json(ticket);
});

module.exports = router;