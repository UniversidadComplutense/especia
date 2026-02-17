# ESPECIA
**Extensión de Soporte y Personalización para Entornos de Campus Inclusivos y Accesibles**.

Herramienta de accesibilidad web pensada para integrarse en **Moodle** (p. ej., en la Universidad Complutense de Madrid) mediante un bloque HTML. Su objetivo es ofrecer una interfaz de asistencia que permite **modificar dinámicamente la apariencia** del campus virtual actuando sobre el DOM, inyectando estilos y filtros SVG en tiempo real, sin alterar la estructura del curso ni afectar a otros estudiantes. 

## Versión

- Versión: **1.0.8** 
- Licencia: **GNU General Public License v3.0** 

## Objetivo

Garantizar el cumplimiento de normativas de accesibilidad y principios de diseño universal, reduciendo barreras digitales para alumnado con diversidad funcional, dificultades de aprendizaje o necesidades específicas de apoyo educativo.

## Funcionalidades

### Ajuste de tipografía
Permite cambiar la fuente de lectura por familias tipográficas orientadas a accesibilidad y legibilidad:

- Atkinson Hyperlegible
- OpenDyslexic
- Lexend
- Inter
- Source Sans 3
- Nunito
- Readex Pro
- Noto Sans
- Verdana
- Arial
- Georgia (serif)
- Original (sin cambios)

### Escalado de texto
Ajuste granular del tamaño del texto mediante:

- Un control deslizante (rango **0.7** a **2.5**, paso **0.05**, valor por defecto **1**).
- Botones de incremento, decremento y restauración a “Normal”.

El ajuste se aplica sobre el tamaño base del documento (modificando el `font-size` del elemento `html`).

### Temas de contraste y color
Selector de temas para adaptar la visualización a distintas necesidades:

- Original
- Oscuro (Dark Reader)
- Pizarra (Slate)
- Negro y Amarillo
- Sepia (Lectura)
- Alto Contraste (Claro)
- Escala de Grises
- Grises Invertido
- Daltonismo (Deuteranopía)
- Daltonismo (Tritanopía)

Incluye filtros SVG para corrección de color (deuteranopía y tritanopía).

### Modo enfoque
Activa un diseño de **ancho completo** ocultando regiones laterales (bloques/sidebars) para reducir distractores visuales y carga cognitiva. 

### Tamaño del botón de acceso
Permite ajustar el tamaño del botón/“banner” en tres opciones:

- Pequeño (sm)
- Mediano (md)
- Grande (lg)

Se realiza mediante variables CSS (tamaño de fuente, padding, radio, ancho máximo, etc.). 

### Persistencia de configuración
Las preferencias se guardan en el navegador del usuario mediante `localStorage`, manteniéndose entre páginas y sesiones.

## Comportamiento de la interfaz

- Inserta un botón fijo en la esquina inferior izquierda.
- Abre un panel lateral tipo diálogo con overlay.
- El panel se puede cerrar con el botón de cerrar, clic en el overlay o con la tecla Escape.
- Incluye atributos ARIA para control de diálogo y estados.

## Requisitos técnicos

- Moodle compatible con bloques HTML estándar.
- jQuery disponible:
  - El script incluye carga de jQuery desde CDN (Google AJAX) y comprueba `window.jQuery` antes de inicializar.
- Conexión a internet para:
  - jQuery (si se usa CDN)
  - Tipografías externas (Google Fonts y CDN de OpenDyslexic)

## Consideraciones de despliegue

- Si tu instancia de Moodle ya proporciona jQuery y tienes restricciones de seguridad (CSP), puedes necesitar:
  - Permitir los dominios externos usados por las fuentes y/o jQuery, o
  - Servir los recursos de forma interna (autoalojado) y ajustar las importaciones.
- El sistema opera por inyección de estilos y clases en `html`/`body`. Revisa compatibilidad con temas personalizados de Moodle.

## Licencia

Este proyecto se distribuye bajo **GNU General Public License v3.0 (GPL-3.0)**. Puedes usarlo, modificarlo y redistribuirlo manteniendo la licencia y reconociendo la autoría.

## Créditos

Desarrollado para su integración en Moodle en el contexto de la Universidad Complutense de Madrid (UCM), orientado a accesibilidad y diseño universal por la Oficina de Software Libre y Tecnologías Abiertas del Vicerrectorado de Tecnologías y Sostenibilidad de la Universidad Complutense de Madrid.
