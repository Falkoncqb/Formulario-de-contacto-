-- Script SQL para crear la base de datos y tabla de contactos
-- Ejecuta este script en phpMyAdmin o en el MySQL de cPanel

-- Crear la base de datos (opcional, puedes usar una existente)
-- CREATE DATABASE IF NOT EXISTS funnelatf_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
-- USE funnelatf_db;

-- Crear tabla de contactos
CREATE TABLE IF NOT EXISTS contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    fecha_registro DATETIME NOT NULL,
    INDEX idx_email (email),
    INDEX idx_fecha (fecha_registro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Verificar que la tabla se creó correctamente
DESCRIBE contactos;
