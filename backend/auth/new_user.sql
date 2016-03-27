CREATE USER 'logonManager' @ 'localhost' IDENTIFIED BY 'masterofpass';
GRANT INSERT ON 'mydb'.'Users' TO 'maga' @ 'localhost';
GRANT SELECT ON 'mydb'.'Users' TO 'maga' @ 'localhost';
GRANT UPDATE ON 'mydb'.'Users' TO 'maga' @ 'localhost';
