# Formulario-de-contacto-
formulario de contacto en php con base de datos mysql con diseño moderno con correo de respuesta al adminitrador y al cliente 
# 🌐 FunnelATF - Landing Page Profesional

Landing page moderna y profesional para agencia de desarrollo web con formulario de contacto integrado, sistema de notificaciones por correo electrónico y portafolio de proyectos.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PHP](https://img.shields.io/badge/PHP-7.4+-purple.svg)
![MySQL](https://img.shields.io/badge/MySQL-5.7+-orange.svg)

## 📋 Descripción

Sitio web profesional diseñado para captar clientes potenciales en el sector de desarrollo web. Incluye un formulario de contacto dinámico que almacena la información en base de datos MySQL y envía notificaciones automáticas tanto al cliente como al administrador.

### ✨ Características Principales

- **Diseño Moderno y Responsivo**: Interfaz oscura con animaciones de código Python en el fondo
- **Formulario de Contacto Inteligente**: Captura nombre, teléfono y correo electrónico
- **Sistema de Notificaciones Dual**: 
  - Correo de confirmación automático al cliente
  - Notificación al administrador con datos del contacto
- **Integración WhatsApp**: Botón directo para contacto inmediato
- **Portafolio de Proyectos**: Sección para mostrar trabajos realizados
- **Base de Datos MySQL**: Almacenamiento seguro de contactos
- **Optimización SEO**: Configuración .htaccess completa
- **Seguridad Avanzada**: Protección contra inyecciones SQL y XSS

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño moderno con animaciones y efectos visuales
- **JavaScript (Vanilla)**: Interactividad y validación de formularios

### Backend
- **PHP 7.4+**: Procesamiento de formularios y lógica del servidor
- **MySQL 5.7+**: Base de datos relacional para almacenamiento

### Servidor
- **Apache**: Servidor web con mod_rewrite
- **cPanel**: Panel de administración de hosting

## 📁 Estructura del Proyecto

\`\`\`
funnelatf-landing/
│
├── index.html                      # Página principal
├── styles.css                      # Estilos CSS
├── script.js                       # JavaScript del frontend
├── contact.php                     # Procesamiento del formulario
├── database.sql                    # Estructura de la base de datos
├── .htaccess                       # Configuración del servidor Apache
│
├── 404.html                        # Página de error 404
├── 403.html                        # Página de error 403
├── 500.html                        # Página de error 500
│
├── README.md                       # Este archivo
├── INSTRUCCIONES_INSTALACION.md   # Guía de instalación detallada
├── CONFIGURACION_CORREOS.md       # Configuración del sistema de correos
├── CONFIGURACION_HTACCESS.md      # Documentación del .htaccess
└── COMO_CAMBIAR_IMAGENES.md       # Guía para actualizar imágenes
\`\`\`

## 🚀 Instalación

### Requisitos Previos

- Hosting con cPanel
- PHP 7.4 o superior
- MySQL 5.7 o superior
- Acceso FTP o File Manager
- Dominio configurado

### Paso 1: Descargar el Proyecto

\`\`\`bash
git clone https://github.com/tuusuario/funnelatf-landing.git
cd funnelatf-landing
\`\`\`

### Paso 2: Crear la Base de Datos

1. Accede a **cPanel → MySQL Databases**
2. Crea una nueva base de datos: `funnelatf_db`
3. Crea un usuario y asigna todos los privilegios
4. Importa el archivo `database.sql` desde **phpMyAdmin**

### Paso 3: Configurar la Conexión

Edita el archivo `contact.php` y actualiza las credenciales:

\`\`\`php
$host = 'localhost';
$dbname = 'tu_base_de_datos';
$username = 'tu_usuario';
$password = 'tu_contraseña';
$admin_email = 'contacto@funnelatf.cl';
\`\`\`

### Paso 4: Subir Archivos

1. Conecta por FTP o usa **File Manager** en cPanel
2. Sube todos los archivos a la carpeta `public_html`
3. Asegúrate de que `.htaccess` esté en la raíz

### Paso 5: Configurar Permisos

\`\`\`bash
chmod 644 index.html
chmod 644 contact.php
chmod 644 .htaccess
\`\`\`

### Paso 6: Probar el Sitio

Visita tu dominio y verifica:
- ✅ La página carga correctamente
- ✅ El formulario envía datos
- ✅ Los correos se envían correctamente
- ✅ Los datos se guardan en la base de datos

## ⚙️ Configuración

### Configurar Correos Electrónicos

El sistema envía dos tipos de correos:

1. **Correo al Cliente**: Confirmación de recepción
2. **Correo al Administrador**: Notificación con datos del contacto

Para configurar, edita en `contact.php`:

\`\`\`php
$admin_email = 'contacto@funnelatf.cl'; // Tu correo
\`\`\`

**Nota**: Algunos hostings requieren configuración adicional de SMTP. Consulta `CONFIGURACION_CORREOS.md` para más detalles.

### Personalizar WhatsApp

Para cambiar el número de WhatsApp, edita en `script.js`:

\`\`\`javascript
const whatsappNumber = '56966274175'; // Tu número sin +
\`\`\`

### Actualizar Imágenes del Portafolio

1. Crea una carpeta `images/` en la raíz
2. Sube tus imágenes de proyectos
3. Edita `index.html` y actualiza las rutas:

\`\`\`html
<img src="images/proyecto1.jpg" alt="Proyecto 1">
\`\`\`

Consulta `COMO_CAMBIAR_IMAGENES.md` para instrucciones detalladas.

## 📊 Base de Datos

### Tabla: contacts

| Campo      | Tipo         | Descripción                    |
|------------|--------------|--------------------------------|
| id         | INT          | ID único (auto-increment)      |
| nombre     | VARCHAR(100) | Nombre del contacto            |
| telefono   | VARCHAR(20)  | Teléfono del contacto          |
| email      | VARCHAR(100) | Correo electrónico             |
| created_at | TIMESTAMP    | Fecha y hora de registro       |

### Consultas Útiles

\`\`\`sql
-- Ver todos los contactos
SELECT * FROM contacts ORDER BY created_at DESC;

-- Contar contactos del día
SELECT COUNT(*) FROM contacts 
WHERE DATE(created_at) = CURDATE();

-- Buscar por email
SELECT * FROM contacts 
WHERE email LIKE '%ejemplo@email.com%';
\`\`\`

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

\`\`\`css
:root {
    --primary: #00d9ff;      /* Color principal */
    --secondary: #a855f7;    /* Color secundario */
    --background: #0a0a0f;   /* Fondo */
    --text: #ffffff;         /* Texto */
}
\`\`\`

### Modificar Animaciones

Las animaciones del código Python están en `styles.css`:

\`\`\`css
@keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
}
\`\`\`

### Agregar Campos al Formulario

1. Agrega el campo en `index.html`
2. Actualiza la validación en `script.js`
3. Modifica `contact.php` para procesar el nuevo campo
4. Actualiza la tabla en `database.sql`

## 🔒 Seguridad

El proyecto incluye múltiples capas de seguridad:

- ✅ Validación de datos en frontend y backend
- ✅ Protección contra inyección SQL (PDO con prepared statements)
- ✅ Sanitización de entradas con `htmlspecialchars()`
- ✅ Protección XSS en formularios
- ✅ Headers de seguridad en `.htaccess`
- ✅ Bloqueo de acceso a archivos sensibles
- ✅ Redirección forzada a HTTPS

## 📈 Optimización

### Rendimiento

- **Compresión GZIP**: Reduce el tamaño de archivos en ~70%
- **Caché del navegador**: Configurado para 1 año en recursos estáticos
- **Minificación**: CSS y JS optimizados
- **Lazy loading**: Imágenes cargadas bajo demanda

### SEO

- Meta tags optimizados
- URLs amigables
- Sitemap XML (agregar manualmente)
- Robots.txt configurado
- Schema markup (agregar si es necesario)

## 🐛 Solución de Problemas

### El formulario no envía datos

**Solución**: Verifica las credenciales de la base de datos en `contact.php`

### Los correos no llegan

**Solución**: 
1. Verifica que la función `mail()` esté habilitada en tu hosting
2. Configura SPF y DKIM en tu dominio
3. Considera usar SMTP (ver `CONFIGURACION_CORREOS.md`)

### Error 500 después de subir .htaccess

**Solución**: Algunas directivas pueden no ser compatibles. Comenta secciones hasta encontrar la problemática.

### Las imágenes no cargan

**Solución**: Verifica las rutas y permisos de las carpetas (755 para carpetas, 644 para archivos)

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

**FunnelATF**
- Email: contacto@funnelatf.cl
- WhatsApp: +56 9 6627 4175
- Website: [funnelatf.cl](https://funnelatf.cl)

## 🙏 Agradecimientos

- Diseño inspirado en las mejores prácticas de UI/UX modernas
- Iconos y recursos de la comunidad open source
- Comunidad de desarrolladores por el feedback continuo

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub

**Desarrollado con ❤️ por FunnelATF** | © 2025 Todos los derechos reservados
