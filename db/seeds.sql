INSERT INTO departments (name)
VALUES ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales"),
        ("Service");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 95000, 4),
        ("Sales Person", 75000, 4),
        ("Customer Service", 70000, 5),
        ("Lead Engineer", 150000, 1),
        ("Software Engineer", 125000, 1),
        ("Account Manager", 110000, 2),
        ("Accountant", 110000, 2),
        ("Legal Team Lead", 130000, 3),
        ("Lawyer", 125000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Isabella", "Stefan", 1, NULL),
        ("Anabel", "Dixon", 2, 1),
        ("Matthias", "Zebedaios", 3, NULL),
        ("Cyrus", "Sigal", 4, NULL),
        ("Noreen", "Jarmila", 5, 4),
        ("Jessica", "Urbonas", 6, NULL),
        ("James", "Smith", 7, 6),
        ("Gary", "Ryan", 8, NULL),
        ("Jane", "Hanshaw", 9, 8);