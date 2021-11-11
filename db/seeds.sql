INSERT INTO department (id, name)
VALUES (1, 'Sales'),
       (2, 'Accounting');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Sales Lead', 65000, 1),
       (2, 'Sales Assosciate', 55000, 1),
       (3, 'Accountant', 65000, 2);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (101, 'Sam', 'Sales', 1),
       (201, 'Dave', 'Accounting', 2);


    --    errors