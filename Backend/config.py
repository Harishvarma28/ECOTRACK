import os

class Config:
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'admin'
    MYSQL_PASSWORD = 'Shaik@1245'
    MYSQL_DB = 'user_auth'
    SECRET_KEY = os.urandom(24)



# CREATE DATABASE user_auth;
# CREATE USER 'your_mysql_user'@'localhost' IDENTIFIED BY 'your_mysql_password';
# GRANT ALL PRIVILEGES ON user_auth.* TO 'your_mysql_user'@'localhost';
# FLUSH PRIVILEGES;

# mysql> CREATE DATABASE IF NOT EXISTS user_auth;
# Query OK, 1 row affected

# mysql> USE user_auth;
# Database changed

# mysql> CREATE TABLE IF NOT EXISTS users (
#     -> id INT AUTO_INCREMENT PRIMARY KEY,
#     -> username VARCHAR(50) NOT NULL UNIQUE,
#     -> email VARCHAR(100) NOT NULL UNIQUE,
#     -> password_hash VARCHAR(255) NOT NULL
# );
# Query OK, 0 rows affected

# mysql> INSERT INTO users (username, email, password_hash) 
#     -> VALUES ('testuser', 'test@example.com', 'your_hashed_password_here');
# Query OK, 1 row affected

# mysql> SELECT * FROM users;
# +----+----------+---------------------+------------------------+
# | id | username | email               | password_hash          |
# +----+----------+---------------------+------------------------+
# |  1 | testuser | test@example.com    | your_hashed_password_here |
# +----+----------+---------------------+------------------------+

