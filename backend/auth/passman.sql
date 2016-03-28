INSERT INTO mysql.user (user, host, password)
VALUES ('passman', 'localhost', PASSWORD('masterofpass'));
GRANT ALL PRIVILEGES ON alecDB.Users TO passman@localhost;
