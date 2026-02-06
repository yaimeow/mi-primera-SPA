
export interface Article {
    id: string;
    title: string;
    category: string;
    description: string;
    urgency: 'Crítico' | 'Alto' | 'Medio' | 'Bajo';
    solutionSteps: string[];
    timeEstimated: string;
    prerequisites: string[];
    troubleshooting: string[];
    contactEscalation: string;
}

export const CATEGORIES = [
    'Hardware',
    'Software',
    'Conectividad',
    'Cuentas y Accesos',
    'Aplicaciones Web'
];

export const ARTICLES: Article[] = [
    {
        id: '1',
        title: 'Actualización de Equipos de Oficina',
        category: 'Software',
        description: 'Guía para la actualización regular de software y hardware en equipos de trabajo para optimizar el rendimiento y seguridad.',
        urgency: 'Medio',
        solutionSteps: [
            'Realizar respaldo de información crítica en la nube o disco externo.',
            'Verificar compatibilidad del hardware con la nueva versión del SO.',
            'Cerrar todas las aplicaciones abiertas.',
            'Ejecutar el instalador de actualizaciones corporativo.',
            'Reiniciar el equipo y verificar el funcionamiento de las apps principales.'
        ],
        timeEstimated: '45 - 60 minutos',
        prerequisites: ['Permisos de administrador', 'Cargador conectado (si es laptop)', 'Internet estable'],
        troubleshooting: [
            'Si recibes error "Espacio insuficiente", libera al menos 20GB.',
            'Si el equipo se congela, forzar reinicio y reintentar.'
        ],
        contactEscalation: 'Soporte Técnico Nivel 1 - Ext. 4500'
    },
    {
        id: '2',
        title: 'Recuperación del Centro de Noticias Web',
        category: 'Aplicaciones Web',
        description: 'Procedimiento de emergencia para restaurar el acceso al portal de noticias corporativo ante caídas del servicio.',
        urgency: 'Alto',
        solutionSteps: [
            'Verificar conectividad mediante comando ping al servidor.',
            'Limpiar caché del navegador (Ctrl+F5).',
            'Si persiste, verificar estado del servicio Nginx en el servidor.',
            'Restaurar la base de datos desde el último backup incremental.',
            'Notificar a comunicación interna sobre el restablecimiento.'
        ],
        timeEstimated: '1 - 2 horas',
        prerequisites: ['Acceso SSH al servidor', 'Credenciales de Admin del Portal'],
        troubleshooting: [
            'Error 502 Bad Gateway: Reiniciar el servicio PHP-FPM.',
            'Error 404: Verificar rutas de archivos estáticos.'
        ],
        contactEscalation: 'Administrador de Infraestructura - ext 8800'
    },
    {
        id: '3',
        title: 'Configuración de VPN para Teletrabajo',
        category: 'Conectividad',
        description: 'Pasos para configurar el acceso remoto seguro a la red corporativa mediante el cliente VPN oficial.',
        urgency: 'Medio',
        solutionSteps: [
            'Descargar el cliente VPN desde el portal de autogestión.',
            'Instalar con parámetros por defecto.',
            'Ingresar la dirección del servidor: vpn.empresa.com',
            'Autenticarse con credenciales de red y Token MFA.',
            'Verificar acceso a carpetas compartidas.'
        ],
        timeEstimated: '15 minutos',
        prerequisites: ['Token de seguridad activo', 'Usuario habilitado para VPN'],
        troubleshooting: [
            'Si el token es rechazado, sincronizar hora del dispositivo.',
            'Si conecta pero no navega, verificar DNS.'
        ],
        contactEscalation: 'Mesa de Ayuda - helpdesk@empresa.com'
    },
    {
        id: '4',
        title: 'Falla en Impresora de Red',
        category: 'Hardware',
        description: 'Solución a problemas comunes de impresión, colas de trabajo bloqueadas y falta de conexión.',
        urgency: 'Bajo',
        solutionSteps: [
            'Verificar que la impresora esté encendida y tenga papel.',
            'Reiniciar el servicio de cola de impresión (Spooler) en Windows.',
            'Eliminar documentos pendientes en la cola.',
            'Verificar dirección IP en el panel de la impresora.',
            'Reinstalar el driver desde el servidor de impresión si es necesario.'
        ],
        timeEstimated: '10 - 20 minutos',
        prerequisites: ['Conexión a red LAN', 'Nombre de la impresora'],
        troubleshooting: [
            'Si imprime caracteres extraños, el driver es incorrecto.',
            'Si pide código, contactar a Administrador de Sede.'
        ],
        contactEscalation: 'Soporte Local - Piso 2'
    },
    {
        id: '5',
        title: 'Restablecimiento de Contraseña de Dominio',
        category: 'Cuentas y Accesos',
        description: 'Autogestión para el cambio de contraseña de red y desbloqueo de cuenta de usuario.',
        urgency: 'Crítico',
        solutionSteps: [
            'Ingresar al portal password.empresa.com',
            'Responder las preguntas de seguridad pre-configuradas.',
            'Ingresar nueva contraseña cumpliendo requisitos de complejidad.',
            'Esperar 5 minutos para la replicación en todos los sistemas.',
            'Actualizar la contraseña en el dispositivo móvil corporativo.'
        ],
        timeEstimated: '5 - 10 minutos',
        prerequisites: ['Preguntas de seguridad configuradas previamente'],
        troubleshooting: [
            'Si la cuenta está bloqueada por intentos, esperar 30 mins o llamar a soporte.',
            'Si no recuerda las preguntas, requiere validación presencial.'
        ],
        contactEscalation: 'Seguridad Informática - ext 911'
    }
];
