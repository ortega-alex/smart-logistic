INSERT INTO menu (name, icon, path, is_main_menu, is_maintenance, is_maintenance) VALUES
('Cotizador', 'calculate', 'quoter', 1, 0, 0),
('Vehiculos', 'car', 'vehicles', 1, 0, 0),
('Clientes', 'users', 'customers', 1, 0, 1),
('Usuario', 'user', 'users', 1, 0, 1),
('Tipos de vehiculos', 'car2', 'vehicle-type', 1, 0, 1),
('Perfiles', 'profile', 'profiles', 1, 0, 1),
('Reportes', 'report', 'reports', 1, 0, 0),
('Subasta', 'store', 'aution', 1, 0, 1),
('Tipos de clientes', 'users', 'customer-type', 1, 0, 1);

INSERT INTO customer_type (name) VALUES
('Particular'),
('Inportador');

INSERT INTO profile (name) VALUES 
('Administrador');

INSERT INTO permission (name) VALUES 
('Agregar'),
('Editar'),
('Ver'); 

INSERT INTO menu_permission_profile (id, profile_id, menu_id, permission_id) VALUES
(uuid(), 1,	8,	1),
(uuid(), 1,	2,	3),
(uuid(), 1,	9,	1),
(uuid(), 1,	1,	2),
(uuid(), 1,	2,	2),
(uuid(), 1,	3,	2),
(uuid(), 1,	7,	2),
(uuid(), 1,	6,	3),
(uuid(), 1,	8,	3),
(uuid(), 1,	4,	2),
(uuid(), 1,	7,	3),
(uuid(), 1,	9,	3),
(uuid(), 1,	3,	1),
(uuid(), 1,	1,	3),
(uuid(), 1,	5,	1),
(uuid(), 1,	5,	2),
(uuid(), 1,	6,	2),
(uuid(), 1,	8,	2),
(uuid(), 1,	1,	1),
(uuid(), 1,	4,	1),
(uuid(), 1,	5,	3),
(uuid(), 1,	3,	3),
(uuid(), 1,	7,	1),
(uuid(), 1,	4,	3),
(uuid(), 1,	2,	1),
(uuid(), 1,	9,	2),
(uuid(), 1,	6,	1);

INSERT INTO user (name, username, password, phone_number, email, profile_id) VALUES
('Admin', 'admin', '$2a$08$pfPpnWYXvYzuXBDkqgzmMev13jo7QDnKNzuJzUwzV06.7VzDZwHJS', '--sin telefono--',	'--sin correo--', 1);

INSERT INTO vehicle_type (name) VALUES
('sedan'),
('suv'),
('grande');

INSERT INTO transport_type (name) VALUES
('terrestre'),
('maritimo');

INSERT INTO state (name) VALUES
('Alabama'),
('Alaska'),
('Arizona'),
('Arkansas'),
('California'),
('Colorado,'),
('Connecticut'),
('Delaware'),
('Florida'),
('Georgia'),
('Hawaii'),
('Idaho'),
('Illinois'),
('Indiana'),
('Iowa'),
('Kansas'),
('Kentucky'),
('Louisiana'),
('Maine'),
('Maryland'),
('Massachusetts'),
('Michigan'),
('Minnesota'),
('Mississippi'),
('Missouri'),
('Montana'),
('Nebraska'),
('Nevada'),
('New Hampshire'),
('New Jersey'),
('New Mexico'),
('New York'),
('North Carolina'),
('North Dakota'),
('Ohio'),
('Oklahoma'),
('Oregon'),
('Pennsylvania'),
('Rhode Island'),
('South Carolina'),
('South Dakota'),
('Tennessee'),
('Texas'),
('Utah'),
('Vermont'),
('Virginia'),
('Washington'),
('West Virginia'),
('Wisconsin'),
('Wyoming');

INSERT INTO department (name) VALUES
('Guatemala'),
('Quetzaltenango'),
('Sacatepéquez'),
('Escuintla'),
('Huehuetenango');

INSERT INTO municipality (name, department_id) VALUES
-- 📌 Guatemala (ID = 1)
('Guatemala', 1),
('Mixco', 1),
('Villa Nueva', 1),
('San Miguel Petapa', 1),
('Santa Catarina Pinula', 1),
-- 📌 Quetzaltenango (ID = 2)
('Quetzaltenango', 2),
('Coatepeque', 2),
('San Juan Ostuncalco', 2),
('La Esperanza', 2),
('Olintepeque', 2),
-- 📌 Sacatepéquez (ID = 3)
('Antigua Guatemala', 3),
('Ciudad Vieja', 3),
('Jocotenango', 3),
('Sumpango', 3),
('San Lucas Sacatepéquez', 3),
-- 📌 Escuintla (ID = 4)
('Escuintla', 4),
('Puerto San José', 4),
('Santa Lucía Cotzumalguapa', 4),
('Palín', 4),
('Masagua', 4),
-- 📌 Huehuetenango (ID = 5)
('Huehuetenango', 5),
('Malacatancito', 5),
('Chiantla', 5),
('Todos Santos Cuchumatán', 5),
('San Pedro Soloma', 5);

INSERT INTO headquarter (name, municipality_id, state_id) VALUES
-- 📌 Estado unidos (ID = 1)
('Delawer', null, 8),
-- 📌 Guatemala (ID = 1)
('Guatemala Zona 15', 1, null);

INSERT INTO auction (name, crane_rate, state_id, headquarter_id) VALUES
('BRIDGEPORT', 210, 38, 1),
('PHILLY AA', 215, 31, 1);

INSERT INTO `smart_logistic`.`import_state` (`name`, `index`, `color`) VALUES
('Cotizacion Aprobada',0,'#ffbb96'),
('Factura Cargada',1,'#ffc069'),
('Recolectado',2,'#fffb8f'),
('En llarda',3,'#d3f261'),
('Embarcado',4,'#36cfc9'),
('En puerto',5,'#69b1ff');
