INSERT INTO department (id, name)
VALUES (1, 'Sales'),
       (2, 'Accounting');

INSERT INTO role (id, name, salary, department_id)
VALUES (1, 'Sales Lead', 65000, 1),
       (2, 'Sales Assosciate', 55000, 1),
       (3, 'Accountant', 65000, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (101, 'Sam', 'Sales', 1, NULL),
       (201, 'Dave', 'Accounting', 3, NULL),
       (202, 'Eric', 'Salesman', 2, 101);


