INSERT INTO department (name)
VALUES
('Sales'),
('Finance'),
('Service'),
('Parts'),
('Administration');

INSERT INTO role (title, salary, department_id)
VALUES 
('General Sales Manager', 200000.00, 1),
('Sales Manager', 100000.00, 1),
('Sales Person', 150000.00, 1),
('Sales Support', 60000.00, 1),
('Finance Director', 250000.00, 2),
('Finance Manager', 200000.00, 2),
('Service Director', 300000.00, 3),
('Service Writer', 80000.00, 3),
('Lot Coordinator', 45000.00, 3),
('Parts Manager', 60000.00, 4),
('Parts Cashier', 30000, 4),
('Controller', 300000.00, 5),
('Administrator', 80000.00, 5),
('General Manager', 400000.00, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Craig', 'Hausteen', 14, null),
('Jim', 'Thomas', 1, 1),
('Richard', 'Yoneji', 2, 2),
('Ebrahim', 'Kourer', 2, 2),
('Prac', 'Kaffli', 3, 2),
('Charles', 'Fred', 3, 2),
('Luan', 'Jenkins', 3, 4),
('Guddi', 'Sandyall', 3, 4),
('Javi', 'Flor', 4, 1),
('Christy', 'Cortz', 5, 1),
('Billy', 'Chan', 6, 10),
('Ben', 'Jamin', 6, 10),
('Bob', 'Urt', 7, 1),
('Dillan', 'Stan', 8, 13),
('Amir', 'Khaleed', 8, 13),
('Katie', 'Pengui', 12, null);