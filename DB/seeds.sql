INSERT INTO department (id, department_name)
VALUES (001, "Accounting"),
       (002, "Marketing"),
       (003, "Legal");

INSERT INTO job_title (id, title, salary, department_id)
VALUES (001, "Accountant", 1000000.00, 001),
       (002, "Salesman", 25.00, 002),
       (003, "Lawyer", 0.00, 003);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Jeff", "Greene", 001, 1),
       (002, "Suzie", "Greene", 002, 2),
       (003, "Larry", "David", 003, 3);
