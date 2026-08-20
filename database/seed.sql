USE helpdesk;
INSERT INTO tickets
(name,email,subject,description,priority,status)
VALUES
('Demo User','demo@example.com','Cannot access email','Email login is not working.','Medium','Open'),
('Admin User','admin@example.com','Laptop will not boot','Laptop shows a blank screen.','High','In Progress');