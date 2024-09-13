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
('Subasta', 'store', 'ACUTION', 1);

INSERT INTO permiso (permiso) VALUES 
('Agregar'),
('Editar'),
('Ver'); 

INSERT INTO perfil (perfil) VALUES 
('Administrador');

INSERT INTO perfil_memu_permiso (id, id_perfil, id_menu, id_permiso)
('01e446d2-ff65-42e5-8bbf-a53a2e3c8e71',    1, 10,	3),
('08ceb415-4ab4-453c-b06d-35e1417086cd', 1,	8,	1),
('0eb61334-b522-47f2-a72f-bbc0cb3f29aa', 1,	2,	3),
('1693533f-34f9-4b5a-8c57-73f77d9a7ebe', 1,	9,	1),
('18793f55-37f3-4ac7-9b75-8b232055438c', 1,	1,	2),
('190bc34d-5b7a-44bf-a119-69aaf57bb458', 1,	2,	2),
('1e871afd-8286-4535-8082-cc846236bab8', 1,	3,	2),
('21e8fb82-4cf0-457a-8ff5-c0d1a4c9a9a4', 1,	7,	2),
('309bd074-5955-40c2-8e3d-dea1dc1de3df', 1,	6,	3),
('4399f0f5-15e3-495b-b8a6-dc1942da0a47', 1,	8,	3),
('44ab3baf-5564-4646-b3c3-fac24b39a7ea', 1,	4,	2),
('5c9d77eb-c8ce-4b08-85ab-a26e8b516f62', 1,	7,	3),
('67b58568-584a-463d-9419-9886dc22c531', 1,	9,	3),
('6f91f3c2-6e7d-4f84-936b-923972ec34f7', 1,	3,	1),
('742c57f5-f0dd-47ed-ad6d-407c43c57279', 1, 10,	1),
('7d3e7068-22f1-402d-a6df-6694ab0e37a6', 1,	1,	3),
('8aa6ea57-8647-42a5-af9d-7ad7f4940cc4', 1,	5,	1),
('8b79fb36-426b-469a-9192-cd47b6a97f19', 1,	5,	2),
('9622c481-1ef9-45f8-9b45-85ae9d09d115', 1,	6,	2),
('97462c8f-dfae-4f7f-96f0-84a3346496ec', 1 ,10,	2),
('a63f82cf-8e3f-4825-9085-cef974d78f14', 1,	8,	2),
('abc1c1a3-eb2a-4f48-a35e-b53b97b524bd', 1,	1,	1),
('c960883e-9377-43cf-85fa-6cf51d05b4f4', 1,	4,	1),
('cc8506d0-0934-4fea-983b-dfc2654119e8', 1,	5,	3),
('d337897d-7571-4748-892a-9652f6b34f7c', 1,	3,	3),
('d34a5c77-1a66-4e76-a6d2-b76fe74f268b', 1,	7,	1),
('db228731-6392-42cf-b5f2-a324cf8ac942', 1,	4,	3),
('e4ce178d-1372-487c-ab8a-143b58efc739', 1,	2,	1),
('e4d42595-da4a-451f-a012-1e2c75c6d988', 1,	9,	2),
('fbee996d-526a-4232-b193-4ac43833a23c', 1,	6,	1);

INSERT INTO usuario (nombre, usuario, contrasenia, telefono, correo, id_perfil) VALUES 
('Admin', 'admin', '$2a$08$pfPpnWYXvYzuXBDkqgzmMev13jo7QDnKNzuJzUwzV06.7VzDZwHJS', '--sin telefono--',	'--sin correo--', 1)
