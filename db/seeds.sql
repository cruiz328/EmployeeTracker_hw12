INSERT INTO department (name)
VALUES
('Managerial Staff'),
('Customer Service'),
('Leads'),
('Administration'),
('Associates');

INSERT INTO role (title, salary, department_id)
VALUES 
('General Store Manager', 800000.00, 1),
('Department Manager', 650000.00, 1);
('Admin', 60000.00, 2),
('Customer Support', 55000.00, 2),
('Shift Lead', 455000.00, 3),
('Team Lead', 450000.00, 3),
('Key Holder', 400000.00, 4),
('Goods Buyer', 40000.00, 4),
('Merchandise Director', 350000.00, 4),
('Retail Associate', 300000.00, 5),
('Custdoial Member', 30000.00, 5),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Laura', 'Gutierrez de Ruiz', 04, 01),
('Sam', 'Goot', 01, null),
('Karla', 'Chacon', 02, 02),
('Luis E.', 'Ruiz', 02, 02),
('Sandra', 'Vasquez', 03, 02),
('Carlos', 'Concuan', 03, 02),
('Bert', 'Kreisher', 03, null),
('Daniel', 'Olivares', 03, 4),
('Jose', 'Gonzalez', 04, 01),
('Esteban', 'Trabajos', 05, 01),
('Uberto', 'Caros', 06, 07),
('Ben', 'Dover', 06, 03),
('Mike', 'Coxlung', 07, 01),
('Barry', 'Alan', 08, 07),
('Bruce', 'Wayne', 08, 09),
('Jesus', 'Christ', 05, 07);