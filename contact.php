<?php
// Configuración de la base de datos
// IMPORTANTE: Cambia estos valores con los de tu base de datos en cPanel
define('DB_HOST', 'localhost');
define('DB_NAME', 'tu_base_de_datos');
define('DB_USER', 'tu_usuario');
define('DB_PASS', 'tu_contraseña');

define('ADMIN_EMAIL', 'contacto@funnelatf.cl');
define('ADMIN_NAME', 'FunnelATF');

// Configurar respuesta JSON
header('Content-Type: application/json');

// Función para conectar a la base de datos
function getDBConnection() {
    try {
        $conn = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
        return $conn;
    } catch(PDOException $e) {
        error_log("Error de conexión: " . $e->getMessage());
        return null;
    }
}

// Verificar que sea una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido'
    ]);
    exit;
}

// Obtener y validar datos del formulario
$nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
$telefono = isset($_POST['telefono']) ? trim($_POST['telefono']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';

// Validaciones básicas
if (empty($nombre) || empty($telefono) || empty($email)) {
    echo json_encode([
        'success' => false,
        'message' => 'Todos los campos son obligatorios'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'El correo electrónico no es válido'
    ]);
    exit;
}

// Conectar a la base de datos
$conn = getDBConnection();

if (!$conn) {
    echo json_encode([
        'success' => false,
        'message' => 'Error de conexión a la base de datos'
    ]);
    exit;
}

try {
    // Preparar la consulta SQL
    $sql = "INSERT INTO contactos (nombre, telefono, email, fecha_registro) 
            VALUES (:nombre, :telefono, :email, NOW())";
    
    $stmt = $conn->prepare($sql);
    
    // Ejecutar la consulta
    $stmt->execute([
        ':nombre' => $nombre,
        ':telefono' => $telefono,
        ':email' => $email
    ]);
    
    enviarCorreos($nombre, $telefono, $email);
    
    // Respuesta exitosa
    echo json_encode([
        'success' => true,
        'message' => 'Mensaje enviado correctamente'
    ]);
    
    // Opcional: Enviar notificación por correo
    // mail('tu@email.com', 'Nuevo contacto', "Nombre: $nombre\nTeléfono: $telefono\nEmail: $email");
    
} catch(PDOException $e) {
    error_log("Error al guardar contacto: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Error al guardar los datos'
    ]);
}

// Cerrar conexión
$conn = null;

function enviarCorreos($nombre, $telefono, $email) {
    // Correo para el cliente
    enviarCorreoCliente($nombre, $email);
    
    // Correo para el administrador
    enviarCorreoAdmin($nombre, $telefono, $email);
}

function enviarCorreoCliente($nombre, $email) {
    $asunto = "Gracias por contactarnos - FunnelATF";
    
    $mensaje = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .highlight { color: #00d9ff; font-weight: bold; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 12px 30px; background: #00d9ff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>¡Gracias por contactarnos!</h1>
            </div>
            <div class='content'>
                <p>Hola <strong>$nombre</strong>,</p>
                
                <p>Hemos recibido tu solicitud de contacto y queremos agradecerte por tu interés en nuestros servicios.</p>
                
                <p>En <span class='highlight'>FunnelATF</span> nos especializamos en:</p>
                <ul>
                    <li>Diseño de sitios web modernos y profesionales</li>
                    <li>Optimización y mejora de sitios existentes</li>
                    <li>Desarrollo de soluciones web personalizadas</li>
                </ul>
                
                <p>Nuestro equipo revisará tu solicitud y se pondrá en contacto contigo en las próximas <strong>24 horas</strong> para discutir cómo podemos ayudarte a alcanzar tus objetivos digitales.</p>
                
                <p style='text-align: center;'>
                    <a href='https://funnelatf.cl' class='button'>Visita nuestro sitio web</a>
                </p>
                
                <p>Si tienes alguna pregunta urgente, no dudes en responder a este correo.</p>
                
                <p>Saludos cordiales,<br>
                <strong>El equipo de FunnelATF</strong></p>
            </div>
            <div class='footer'>
                <p>2025 FunnelATF. Todos los derechos reservados.</p>
                <p>Este es un correo automático, por favor no respondas a esta dirección.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Cabeceras para correo HTML
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: " . ADMIN_NAME . " <" . ADMIN_EMAIL . ">" . "\r\n";
    $headers .= "Reply-To: " . ADMIN_EMAIL . "\r\n";
    
    mail($email, $asunto, $mensaje, $headers);
}

function enviarCorreoAdmin($nombre, $telefono, $email) {
    $asunto = "Nuevo contacto desde el sitio web - $nombre";
    
    $mensaje = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00d9ff 0%, #a855f7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 10px 10px; }
            .info-box { background: #f0f9ff; border-left: 4px solid #00d9ff; padding: 15px; margin: 20px 0; }
            .info-box strong { color: #0a0a0a; display: inline-block; width: 100px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .alert { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🔔 Nuevo Contacto Recibido</h1>
            </div>
            <div class='content'>
                <div class='alert'>
                    <strong>⚡ Acción requerida:</strong> Un nuevo cliente potencial ha solicitado información.
                </div>
                
                <h2>Información del Cliente:</h2>
                
                <div class='info-box'>
                    <p><strong>Nombre:</strong> $nombre</p>
                    <p><strong>Teléfono:</strong> $telefono</p>
                    <p><strong>Email:</strong> <a href='mailto:$email'>$email</a></p>
                    <p><strong>Fecha:</strong> " . date('d/m/Y H:i:s') . "</p>
                </div>
                
                <h3>Próximos pasos:</h3>
                <ol>
                    <li>Contactar al cliente en las próximas 24 horas</li>
                    <li>Identificar sus necesidades específicas</li>
                    <li>Preparar una propuesta personalizada</li>
                </ol>
                
                <p style='margin-top: 30px;'>
                    <strong>Acciones rápidas:</strong><br>
                    📞 <a href='tel:$telefono'>Llamar ahora</a> | 
                    ✉️ <a href='mailto:$email'>Enviar email</a>
                </p>
            </div>
            <div class='footer'>
                <p>Sistema de notificaciones - FunnelATF</p>
                <p>2025 FunnelATF. Todos los derechos reservados.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Cabeceras para correo HTML
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Sistema FunnelATF <noreply@funnelatf.cl>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    
    mail(ADMIN_EMAIL, $asunto, $mensaje, $headers);
}
?>

