INSERT INTO menu (name, icon, path, is_main_menu, is_maintenance) VALUES
('Cotizador', 'calculate', 'quoter', 1, 0),
('Vehiculos', 'car', 'vehicles', 1, 0),
('Clientes', 'users', 'customers', 1, 1),
('Usuario', 'user', 'users', 1, 1),
('Tipos de vehiculos', 'car2', 'vehicle-type', 1, 1),
('Perfiles', 'profile', 'profiles', 1, 1),
('Reportes', 'report', 'reports', 1, 0),
('Subasta', 'auction', 'auction', 1, 1),
('Tipos de clientes', 'usersPlus', 'customer-type', 1, 1),
('Sedes', 'store', 'headquarters', 1, 1),
('Tarifa Transporte', 'sackDollar', 'transport-rate', 0, 1),
('Citas', 'calendar', 'appointments ', 0, 1);


INSERT INTO customer_type (name) VALUES
('Particular'),
('Inportador');

INSERT INTO `smart_logistic`.`role` (`level`, `name`, `description`) VALUES
 ('1', 'Vendedor', 'Acceso Completo'),
 ('2', 'Vendedor', 'Nivel medio/alto'),
 ('3', 'Operador', 'Moderado');

INSERT INTO profile (name, role_id) VALUES 
('Administrador', 1);

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
('Alta Verapaz'),
('Baja Verapaz'),
('Chimaltenango'),
('Chiquimula'),
('El Progreso'),
('Escuintla'),
('Guatemala'),
('Huehuetenango'),
('Izabal'),
('Jalapa'),
('Jutiapa'),
('Petén'),
('Quetzaltenango'),
('Quiché'),
('Retalhuleu'),
('Sacatepéquez'),
('San Marcos'),
('Santa Rosa'),
('Sololá'),
('Suchitepéquez'),
('Totonicapán'),
('Zacapa');

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

INSERT INTO user (name, username, password, phone_number, email, profile_id, headquarter_id) VALUES
('Admin', 'admin', '$2a$08$pfPpnWYXvYzuXBDkqgzmMev13jo7QDnKNzuJzUwzV06.7VzDZwHJS', '--sin telefono--',	'--sin correo--', 1, 2);

INSERT INTO `smart_logistic`.`appointment_status` (`id`, `name`, `color`) VALUES 
(uuid(), 'Programada', '#0d7ec4'),
(uuid(), 'Reprogramada', '#7d17b5'),
(uuid(), 'Pospuesta', '#a8191b'),
(uuid(), 'Realizada', '#0dc47b');
