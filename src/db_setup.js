const mysql = require('mysql2');
const dotenv = require('dotenv');
const db = require('./config/db');
const fs = require('fs');

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    multipleStatements: true,
    ssl:{ca:fs.readFileSync("src/config/DigiCertGlobalRootG2.crt (1).pem")}
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
    const dbName = process.env.DB_NAME;
    connection.query('CREATE DATABASE IF NOT EXISTS ' + dbName, (err, result) => {
        if (err) throw err;
        console.log('Database ' + dbName + ' created or already exists.');

        connection.changeUser({ database: dbName }, (err) => {
            if (err) throw err;
            console.log('Using database ' + dbName);

            const createTables = `
            CREATE TABLE staff (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                position VARCHAR(255),
                description TEXT,
                education VARCHAR(255),
                publication TEXT,
                email VARCHAR(255),
                linkedin VARCHAR(255),
                social_media VARCHAR(255),
                image_path VARCHAR(255),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
            CREATE TABLE partnership (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                link VARCHAR(255),
                logo VARCHAR(255),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
            CREATE TABLE news (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) NOT NULL,
                content TEXT,
                author VARCHAR(255),
                date DATETIME,
                image_path VARCHAR(255),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
            CREATE TABLE announcement (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) NOT NULL,
                content TEXT,
                date DATE,
                image_path VARCHAR(255),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
            CREATE TABLE agenda (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) NOT NULL,
                content TEXT,
                date DATETIME,
                image_path VARCHAR(255),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
            CREATE TABLE intern (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                role ENUM('Back-End', 'Front-End', 'UI/UX', 'AI Developer', 'Data Science', 'Network Engineer', 'Cybersecurity', 'Devops', 'Multimedia Designer', 'Mobile Developer') NOT NULL,
                university VARCHAR(255),
                major VARCHAR(255),
                email VARCHAR(255),
                contact VARCHAR(50),
                linkedin VARCHAR(255),
                social_media VARCHAR(255),
                image_path VARCHAR(255),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
            CREATE TABLE project (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) NOT NULL,
                description TEXT,
                publication TEXT,
                link VARCHAR(255),
                image_path VARCHAR(255),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
            CREATE TABLE category (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
            CREATE TABLE project_category (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                id_project BIGINT NOT NULL,
                id_category BIGINT NOT NULL,
                INDEX idx_project_category_project (id_project),
                INDEX idx_project_category_category (id_category),
                CONSTRAINT fk_project_category_project
                    FOREIGN KEY (id_project) REFERENCES project(id) ON DELETE CASCADE,
                CONSTRAINT fk_project_category_category
                    FOREIGN KEY (id_category) REFERENCES category(id) ON DELETE CASCADE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
            CREATE TABLE testimony (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                id_intern BIGINT NOT NULL,
                content TEXT,
                rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
                INDEX idx_testimony_intern (id_intern),
                CONSTRAINT fk_testimony_intern
                    FOREIGN KEY (id_intern) REFERENCES intern(id) ON DELETE CASCADE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
            CREATE TABLE project_member (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                id_project BIGINT NOT NULL,
                id_intern BIGINT NOT NULL,
                INDEX idx_project_member_project (id_project),
                INDEX idx_project_member_intern (id_intern),
                CONSTRAINT fk_project_member_project
                    FOREIGN KEY (id_project) REFERENCES project(id) ON DELETE CASCADE,
                CONSTRAINT fk_project_member_intern
                    FOREIGN KEY (id_intern) REFERENCES intern(id) ON DELETE CASCADE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
            CREATE TABLE admin (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                role ENUM('Master Admin', 'Admin') NOT NULL DEFAULT 'Admin',
                last_login DATETIME,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
            CREATE TABLE logs (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                id_admin BIGINT,
                action VARCHAR(255) NOT NULL,
                target_table VARCHAR(255),
                target_id BIGINT,
                description TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (id_admin) REFERENCES admin(id) ON DELETE SET NULL
            );

            CREATE TABLE banner (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                image_path VARCHAR(255),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );

            CREATE TABLE statistic_data (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                value VARCHAR(255) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );

            INSERT INTO admin (username, password_hash, role)
                VALUES ('master admin', '$2b$10$weSjUS67T/jO0sGVQenAjuTOFLgqRS4FGf/CcJvIZM.wbSBBNznra', 'Master Admin');
            INSERT INTO category (name)
                VALUES 
                ('Internship'),
                ('Researchship')
                ON DUPLICATE KEY UPDATE name = VALUES(name);
            `; 

            connection.query(createTables, (err, result) => {
                if (err) throw err;
                console.log('Tables created or already exist.');
                connection.end();
            });
        });
    });
});
