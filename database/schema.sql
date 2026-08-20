CREATE DATABASE IF NOT EXISTS helpdesk;
USE helpdesk;
CREATE TABLE IF NOT EXISTS tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority ENUM('Low','Medium','High','Critical') NOT NULL DEFAULT 'Medium',
  status ENUM('Open','In Progress','Resolved','Closed') NOT NULL DEFAULT 'Open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);