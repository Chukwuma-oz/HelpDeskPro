const API = window.HELPDESKPRO_CONFIG.API_BASE;
const $ = id => document.getElementById(id);

async function loadTickets() {
  const box = $('tickets');
  box.innerHTML = '<p>Loading tickets...</p>';
  try {
    const r = await fetch(`${API}/api/tickets`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const tickets = await r.json();
    box.innerHTML = tickets.map(t => `
      <article class="ticket">
        <div><strong>#${t.id} — ${escapeHtml(t.subject)}</strong>
        <p>${escapeHtml(t.description)}</p></div>
        <div class="meta"><span>${escapeHtml(t.priority)}</span>
        <span>${escapeHtml(t.status)}</span></div>
      </article>`).join('');
  } catch (e) {
    box.innerHTML = `<p class="error">Could not reach API: ${escapeHtml(e.message)}</p>`;
  }
}

$('ticket-form').addEventListener('submit', async e => {
  e.preventDefault();
  const payload = {
    name: $('name').value.trim(),
    email: $('email').value.trim(),
    subject: $('subject').value.trim(),
    priority: $('priority').value,
    description: $('description').value.trim()
  };
  $('message').textContent = 'Submitting...';
  try {
    const r = await fetch(`${API}/api/tickets`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Request failed');
    $('message').textContent = `Ticket #${data.id} submitted successfully.`;
    e.target.reset();
    loadTickets();
  } catch (err) { $('message').textContent = err.message; }
});

$('refresh').addEventListener('click', loadTickets);

function escapeHtml(v) {
  return String(v).replaceAll('&','&amp;').replaceAll('<','&lt;')
    .replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
}
loadTickets();