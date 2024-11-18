INSERT INTO menu (menu, icon, path, es_mantenimiento) VALUES
('Cotizador', 'calculate', 'QUOTER', 0),
('Vehiculos', 'car', 'VEHICLES', 0),
('Clientes', 'users', 'CUSTOMERS', 1),
('Usuario', 'user', 'USERS', 1),
('Gruas', 'crane', 'CRANES', 1),
('Puertos', 'store', 'PORTS', 1),
('Tipos de vehiculos', 'car2', 'TYPES_OF_VEHICLES', 1),
('Perfiles', 'profile', 'PROFILES', 1),
('Reportes', 'report', 'REPORTS', 0),
('Subasta', 'store', 'ACUTION', 1),
('Tipos de clientes', 'users', 'TYPES_OF_CUSTOMERS', 1),

INSERT INTO permiso (permiso) VALUES 
('Agregar'),
('Editar'),
('Ver'); 

INSERT INTO perfil (perfil) VALUES 
('Administrador');


INSERT INTO perfil_memu_permiso (id, id_perfil, id_menu, id_permiso) VALUES
(uuid(), 1, 10,	3),
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
(uuid(), 1, 10,	1),
(uuid(), 1,	1,	3),
(uuid(), 1,	5,	1),
(uuid(), 1,	5,	2),
(uuid(), 1,	6,	2),
(uuid(), 1 ,10,	2),
(uuid(), 1,	8,	2),
(uuid(), 1,	1,	1),
(uuid(), 1,	4,	1),
(uuid(), 1,	5,	3),
(uuid(), 1,	3,	3),
(uuid(), 1,	7,	1),
(uuid(), 1,	4,	3),
(uuid(), 1,	2,	1),
(uuid(), 1,	9,	2),
(uuid(), 1,	6,	1),
(uuid(), 1,	11,	1),
(uuid(), 1,	11,	2),
(uuid(), 1,	11,	3);

INSERT INTO usuario (nombre, usuario, contrasenia, telefono, correo, id_perfil) VALUES 
('Admin', 'admin', '$2a$08$pfPpnWYXvYzuXBDkqgzmMev13jo7QDnKNzuJzUwzV06.7VzDZwHJS', '--sin telefono--',	'--sin correo--', 1)

INSERT INTO estado_importacion (estado_importacion) VALUES 
('Cotizacion Aprobada'),
('Factura pagada'),
('Recolectado'),
('En llarda'),
('Embarcado'),
('En puerto');
