DROP DATABASE IF EXISTS steem;
DROP USER IF EXISTS steem_user@localhost;

CREATE DATABASE steem CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER steem_user@localhost IDENTIFIED BY 'Luoxiang123456?';
GRANT ALL PRIVILEGES ON steem.* TO steem_user@localhost;
