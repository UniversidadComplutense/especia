<p>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <script type="text/javascript">
    if (window.jQuery) {
      jQuery(function($) {
        const LOCAL_STORAGE_KEY = 'accessibilitySettings_v7';
        const accessibilityFonts = {
          "Original": "",
          "Atkinson Hyperlegible": "'Atkinson Hyperlegible', sans-serif",
          "OpenDyslexic": "'OpenDyslexic', sans-serif",
          "Lexend": "'Lexend', sans-serif",
          "Inter": "'Inter', sans-serif",
          "Source Sans 3": "'Source Sans 3', sans-serif",
          "Nunito": "'Nunito', sans-serif",
          "Readex Pro": "'Readex Pro', sans-serif",
          "Noto Sans": "'Noto Sans', sans-serif",
          "Verdana": "Verdana, sans-serif",
          "Arial": "Arial, Helvetica, sans-serif",
          "Georgia (serif)": "Georgia, 'Times New Roman', serif"
        };
        const colorThemes = {
          "Original": "theme-original",
          "Oscuro (Dark Reader)": "theme-dark",
          "Pizarra (Slate)": "theme-slate",
          "Negro y Amarillo": "theme-yellow-black",
          "Sepia (Lectura)": "theme-sepia",
          "Alto Contraste (Claro)": "theme-light-contrast",
          "Escala de Grises": "theme-grayscale",
          "Grises Invertido": "theme-inverted-grayscale",
          "Daltonismo (Deuteranopía)": "theme-deuteranopia",
          "Daltonismo (Tritanopía)": "theme-tritanopia"
        };
        const bannerSizes = {
          sm: {
            "--ac-banner-font-size": "12px",
            "--ac-banner-padding-y": "7px",
            "--ac-banner-padding-x": "10px",
            "--ac-banner-gap": ".45rem",
            "--ac-banner-radius": "10px",
            "--ac-banner-maxw": "420px",
            "--ac-gear-size": "16px"
          },
          md: {
            "--ac-banner-font-size": "13px",
            "--ac-banner-padding-y": "9px",
            "--ac-banner-padding-x": "12px",
            "--ac-banner-gap": ".55rem",
            "--ac-banner-radius": "11px",
            "--ac-banner-maxw": "460px",
            "--ac-gear-size": "18px"
          },
          lg: {
            "--ac-banner-font-size": "14px",
            "--ac-banner-padding-y": "10px",
            "--ac-banner-padding-x": "12px",
            "--ac-banner-gap": ".6rem",
            "--ac-banner-radius": "12px",
            "--ac-banner-maxw": "520px",
            "--ac-gear-size": "20px"
          }
        };

        function injectWidgetHTML() {
          const fontOptions = Object.keys(accessibilityFonts).map(n => `<option value="${accessibilityFonts[n]}">${n}</option>`).join('');
          const themeOptions = Object.keys(colorThemes).map(n => `<option value="${colorThemes[n]}">${n}</option>`).join('');
          const widgetHTML = `
<div id="ac-widget" aria-live="polite">
  <button id="ac-banner" type="button" title="Configurar Accesibilidad" aria-haspopup="dialog" aria-controls="ac-panel" aria-expanded="false">
    <span class="ac-gear" aria-hidden="true">⚙️</span>
    <span class="ac-banner-block">
      <span class="ac-line1">CV Adaptado,</span>
      <span class="ac-line2">haz click aquí para configurar las funciones</span>
    </span>
  </button>
</div>
<div id="ac-overlay" aria-hidden="true"></div>
<div id="ac-panel" role="dialog" aria-modal="true" aria-labelledby="ac-panel-title" aria-hidden="true">
  <h4 id="ac-panel-title">Accesibilidad</h4>
  <div class="ac-section">
    <h5>Tamaño del Texto</h5>
    <div class="ac-text-slider-container">
      <span>A-</span>
      <input type="range" id="ac-text-slider" min="0.7" max="2.5" step="0.05" value="1" aria-label="Tamaño del texto">
      <span>A+</span>
    </div>
    <div class="ac-controls-group" role="group" aria-label="Controles de tamaño">
      <button id="ac-text-increase" type="button">+</button>
      <button id="ac-text-decrease" type="button">-</button>
      <button id="ac-text-restore" type="button">Normal</button>
    </div>
  </div>
  <hr>
  <div class="ac-section">
    <h5>Tamaño del Botón</h5>
    <select id="ac-banner-size" aria-label="Tamaño del botón">
      <option value="sm">Pequeño</option>
      <option value="md">Mediano</option>
      <option value="lg">Grande</option>
    </select>
  </div>
  <hr>
  <div class="ac-section">
    <h5>Fuente de Lectura</h5>
    <select id="ac-font-select" aria-label="Fuente de lectura">${fontOptions}</select>
  </div>
  <hr>
  <div class="ac-section">
    <h5>Diseño de Página</h5>
    <div class="ac-layout-control">
      <span>Modo Enfoque</span>
      <label class="ac-switch">
        <input type="checkbox" id="ac-layout-toggle" aria-label="Activar modo enfoque">
        <span class="ac-slider"></span>
      </label>
    </div>
  </div>
  <hr>
  <div class="ac-section">
    <h5>Contraste y Color</h5>
    <select id="ac-theme-select" aria-label="Tema de contraste y color">${themeOptions}</select>
  </div>
  <hr>
  <div class="ac-actions">
    <button id="ac-save-settings" class="ac-btn-primary" type="button">💾 Guardar</button>
    <button id="ac-reset-settings" class="ac-btn-danger" type="button">🔄 Restaurar</button>
    <button id="ac-close-panel" class="ac-btn-secondary" type="button">❌ Cerrar</button>
  </div>
</div>
<svg id="ac-cvd-filters" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;visibility:hidden;pointer-events:none">
  <filter id="ac-deuteranopia" color-interpolation-filters="linearRGB">
    <feColorMatrix type="matrix" values="0.367 0.861 -0.228 0 0  0.280 0.673 0.047 0 0  -0.012 0.043 0.969 0 0  0 0 0 1 0"/>
  </filter>
  <filter id="ac-tritanopia" color-interpolation-filters="linearRGB">
    <feColorMatrix type="matrix" in="SourceGraphic" result="P1" values="1.01354 0.14268 -0.15622 0 0  -0.01181 0.87561 0.13619 0 0  0.07707 0.81208 0.11085 0 0  7.92482 -5.66475 -2.26007 1 -0.2"/>
    <feComponentTransfer in="P1" result="P1"><feFuncA type="discrete" tableValues="0 0 0 0 1"/></feComponentTransfer>
    <feColorMatrix type="matrix" in="SourceGraphic" result="P2" values="0.93337 0.19999 -0.13336 0 0  0.05809 0.82565 0.11626 0 0  -0.37923 1.13825 0.24098 0 0  0 0 0 1 0"/>
    <feBlend in="P1" in2="P2" mode="normal"/>
  </filter>
</svg>
`;
          $('body').append(widgetHTML);
        }

        function injectWidgetCSS() {
          const css = `
@import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap');
@import url('https://fonts.cdnfonts.com/css/opendyslexic');
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');

#ac-widget{position:fixed;bottom:12px;left:12px;z-index:10002;font-family:sans-serif}

#ac-banner{
  --ac-banner-font-size:12px;
  --ac-banner-padding-y:7px;
  --ac-banner-padding-x:10px;
  --ac-banner-gap:.45rem;
  --ac-banner-radius:10px;
  --ac-banner-maxw:420px;
  --ac-gear-size:16px;
  display:inline-flex;
  align-items:center;
  gap:var(--ac-banner-gap);
  background-color:#0056b3;
  color:#fff;
  border:none;
  border-radius:var(--ac-banner-radius);
  padding:var(--ac-banner-padding-y) var(--ac-banner-padding-x);
  cursor:pointer;
  font-size:var(--ac-banner-font-size);
  box-shadow:0 6px 16px rgba(0,0,0,.2);
  text-align:left;
  white-space:normal;
  line-height:1.15;
  max-width:min(92vw,var(--ac-banner-maxw));
}
#ac-banner:focus{outline:3px solid #3391ff;outline-offset:2px}
#ac-banner .ac-gear{font-size:var(--ac-gear-size);flex:0 0 auto}
#ac-banner .ac-banner-block{display:flex;flex-direction:column;align-items:flex-start}
#ac-banner .ac-line1{display:block;font-weight:600}
#ac-banner .ac-line2{display:block;font-size:.92em;opacity:.95}
@media (max-width:360px){#ac-banner{max-width:94vw}}

#ac-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:10000}
#ac-overlay.ac-visible{display:block}
body.ac-modal-open{overflow:hidden!important}

#ac-panel{position:fixed;top:0;right:0;height:100vh;width:min(92vw,380px);background:#fff;border-left:1px solid #ccc;box-shadow:-10px 0 25px rgba(0,0,0,.25);padding:15px;overflow-y:auto;z-index:10003;transform:translateX(100%);transition:transform .3s ease;color:#222}
#ac-panel[aria-hidden="false"]{transform:translateX(0)}
#ac-panel{color-scheme:light}
#ac-panel h4{margin:0 0 15px;text-align:center;font-size:18px;color:#222}
#ac-panel h5{margin:10px 0 8px;font-size:14px;color:#0056b3}
#ac-panel hr{border:0;border-top:1px solid #eee;margin:15px 0}
#ac-panel .ac-controls-group{display:flex;justify-content:space-between;gap:5px;margin-top:10px}
#ac-panel .ac-controls-group button{flex-grow:1;padding:8px;font-size:14px;cursor:pointer;border:1px solid #ccc;background:#f9f9f9;border-radius:4px;color:#222}
#ac-panel select{width:100%;padding:8px;border-radius:4px;border:1px solid #ccc;background:#fff;color:#222}
#ac-panel .ac-actions{display:flex;justify-content:space-between;margin-top:15px;gap:5px}
#ac-panel .ac-actions button{flex-grow:1;border:none;padding:10px 5px;border-radius:5px;cursor:pointer;font-size:14px;color:#fff}
#ac-panel .ac-btn-primary{background-color:#28a745}
#ac-panel .ac-btn-danger{background-color:#dc3545}
#ac-panel .ac-btn-secondary{background-color:#6c757d}
#ac-panel .ac-layout-control{display:flex;justify-content:space-between;align-items:center;color:#222}
#ac-panel .ac-switch{position:relative;display:inline-block;width:50px;height:24px}
#ac-panel .ac-switch input{opacity:0;width:0;height:0}
#ac-panel .ac-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;transition:.4s;border-radius:24px}
#ac-panel .ac-slider:before{position:absolute;content:"";height:18px;width:18px;left:3px;bottom:3px;background-color:#fff;transition:.4s;border-radius:50%}
#ac-panel input:checked+.ac-slider{background-color:#2196F3}
#ac-panel input:checked+.ac-slider:before{transform:translateX(26px)}
#ac-panel .ac-text-slider-container{display:flex;align-items:center;gap:10px}
#ac-panel #ac-text-slider{width:100%;-webkit-appearance:none;appearance:none;height:8px;background:#ddd;border-radius:5px;outline:none}
#ac-panel #ac-text-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:18px;height:18px;background:#0056b3;cursor:pointer;border-radius:50%}
#ac-panel #ac-text-slider::-moz-range-thumb{width:18px;height:18px;background:#0056b3;cursor:pointer;border-radius:50%}

body.ac-full-width #page,body.ac-full-width #topofscroll.main-inner{max-width:none!important}
body.ac-full-width #region-main{padding-left:2rem;padding-right:2rem}
body.ac-full-width .block-region-side-pre,body.ac-full-width .block-region-side-post{display:none!important}

:root{--ac-revert:invert(1) hue-rotate(180deg)}
html.theme-dark{filter:invert(0.92) hue-rotate(180deg) contrast(0.92) brightness(0.9);color-scheme:dark}
html.theme-slate{filter:invert(0.92) hue-rotate(170deg) saturate(0.85) contrast(0.9) brightness(0.88);color-scheme:dark}
html.theme-sepia{filter:invert(0.92) hue-rotate(180deg) sepia(0.35) saturate(0.85) brightness(0.92);color-scheme:dark}
html.theme-light-contrast{filter:contrast(1.2) brightness(1.08)}
html.theme-grayscale{filter:grayscale(1)}
html.theme-inverted-grayscale{filter:invert(1) grayscale(1)}
html.theme-deuteranopia{filter:url(#ac-deuteranopia)}
html.theme-tritanopia{filter:url(#ac-tritanopia)}

html[class*="theme-"] #ac-widget,
html[class*="theme-"] #ac-panel,
html[class*="theme-"] #ac-overlay{filter:var(--ac-revert)!important}

html.theme-yellow-black{filter:none!important;background:#000}
html.theme-yellow-black,html.theme-yellow-black body,html.theme-yellow-black #page,html.theme-yellow-black #topofscroll{background:#000!important;color:#ffff00!important}
html.theme-yellow-black :where(h1,h2,h3,h4,h5,h6,p,span,div,li,label,small,strong,em,th,td){color:#ffff00!important}
html.theme-yellow-black a,html.theme-yellow-black a:visited,html.theme-yellow-black a:active{color:#ffff00!important;text-decoration-color:#ffff00!important}
html.theme-yellow-black :where(.card,.block,.navbar,header#page-header,.dropdown-menu,.modal,table,th,td){background:#000!important;border-color:#777!important}
html.theme-yellow-black :where(input,select,textarea){background:#000!important;color:#ffff00!important;border:1px solid #777!important}
html.theme-yellow-black :where(.btn,.btn-secondary){background:#000!important;color:#ffff00!important;border:1px solid #ffff00!important}
html.theme-yellow-black :where(.btn-primary){background:#ffff00!important;color:#000!important;border-color:#ffff00!important}
html.theme-yellow-black :where(body, body *):not(#ac-widget):not(#ac-widget *):not(#ac-panel):not(#ac-panel *):not(#ac-overlay):not(#ac-overlay *){background:#000!important;background-image:none!important}
html.theme-yellow-black :where(#ac-widget,#ac-widget *,#ac-panel,#ac-panel *,#ac-overlay){color:unset!important;background:unset!important;border-color:unset!important}
`;
          $('<style type="text/css"></style>').html(css).appendTo('head');
        }

        function applyTextSize(size) {
          $('html').css('font-size', size + 'rem');
          $('#ac-text-slider').val(size);
        }

        function applyFont(fontFamily) {
          $('body').css('font-family', fontFamily || '');
        }

        function applyLayout(isFullWidth) {
          $('body').toggleClass('ac-full-width', isFullWidth);
        }

        function applyTheme(themeClass) {
          const allThemes = Object.values(colorThemes).join(' ');
          $('html').removeClass(allThemes);
          if (themeClass === 'theme-original') return;
          $('html').addClass(themeClass);
        }

        function applyBannerSize(sizeKey) {
          const s = bannerSizes[sizeKey] || bannerSizes.sm;
          for (const [k, v] of Object.entries(s)) $('#ac-banner').css(k, v);
          $('#ac-banner-size').val(sizeKey in bannerSizes ? sizeKey : 'sm');
        }

        function savePreferences() {
          const settings = {
            fontSize: $('html').css('font-size'),
            fontFamily: $('#ac-font-select').val(),
            theme: $('#ac-theme-select').val(),
            isFullWidth: $('#ac-layout-toggle').is(':checked'),
            bannerSize: $('#ac-banner-size').val()
          };
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
          alert('¡Configuración guardada!');
          closePanel();
        }

        function loadPreferences() {
          const sRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
          let s = null;
          try { s = sRaw ? JSON.parse(sRaw) : null; } catch (e) { s = null; }

          const bannerSize = (s && s.bannerSize) ? s.bannerSize : 'sm';
          applyBannerSize(bannerSize);

          if (s) {
            const base = parseFloat($('body').css('font-size')) || 16;
            const px = parseFloat(s.fontSize);
            if (!isNaN(px) && base > 0) {
              const rem = px / base;
              applyTextSize(rem);
            }
            applyFont(s.fontFamily);
            applyTheme(s.theme);
            applyLayout(!!s.isFullWidth);
            $('#ac-theme-select').val(s.theme || 'theme-original');
            $('#ac-layout-toggle').prop('checked', !!s.isFullWidth);
            if (typeof s.fontFamily !== 'undefined') $('#ac-font-select').val(s.fontFamily);
          }
        }

        function resetPreferences() {
          if (confirm('¿Restablecer configuración de accesibilidad? La página se recargará.')) {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            window.location.reload();
          }
        }

        function openPanel() {
          $('#ac-overlay').addClass('ac-visible').attr('aria-hidden', 'false');
          $('#ac-panel').attr('aria-hidden', 'false');
          $('#ac-banner').attr('aria-expanded', 'true');
          $('body').addClass('ac-modal-open');
          setTimeout(() => { $('#ac-text-slider').trigger('focus'); }, 200);
        }

        function closePanel() {
          $('#ac-overlay').removeClass('ac-visible').attr('aria-hidden', 'true');
          $('#ac-panel').attr('aria-hidden', 'true');
          $('#ac-banner').attr('aria-expanded', 'false');
          $('body').removeClass('ac-modal-open');
        }

        function togglePanel() {
          ($('#ac-panel').attr('aria-hidden') !== 'false') ? openPanel() : closePanel();
        }

        injectWidgetHTML();
        injectWidgetCSS();
        loadPreferences();

        // Improvement the plugin to add drag & drop capability to the panel's button
        // 1. When the HTML is injected at Document Object Model, the element "ac-widget" exists
        // 2. Select that element and adding the drag & drop capability
        const el = document.getElementById("ac-widget");

        if (el) {
          let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
          el.onmousedown = dragMouseDown;

          function dragMouseDown(e) {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            el.style.cursor = "grabbing";
          }

          function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
          }

          function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            el.style.cursor = "grab";
          }
        }

        $('#ac-banner').on('click', togglePanel);
        $('#ac-overlay').on('click', () => closePanel());
        $('#ac-close-panel').on('click', closePanel);
        $('#ac-save-settings').on('click', savePreferences);
        $('#ac-reset-settings').on('click', resetPreferences);

        $('#ac-text-slider').on('input', function() { applyTextSize($(this).val()); });
        $('#ac-text-increase').on('click', () => {
          let v = parseFloat($('#ac-text-slider').val());
          applyTextSize(Math.min(v + 0.1, 2.5));
        });
        $('#ac-text-decrease').on('click', () => {
          let v = parseFloat($('#ac-text-slider').val());
          applyTextSize(Math.max(v - 0.1, 0.7));
        });
        $('#ac-text-restore').on('click', () => applyTextSize(1));
        $('#ac-font-select').on('change', function() { applyFont($(this).val()); });
        $('#ac-theme-select').on('change', function() { applyTheme($(this).val()); });
        $('#ac-layout-toggle').on('change', function() { applyLayout($(this).is(':checked')); });
        $('#ac-banner-size').on('change', function() { applyBannerSize($(this).val()); });

        $(document).on('keydown', function(e) {
          const tag = (e.target.tagName || '').toLowerCase();
          const typing = tag === 'input' || tag === 'textarea' || $(e.target).is('[contenteditable="true"]') || tag === 'select';
          if (typing) return;
          if (e.key === 'Escape') {
            if ($('#ac-panel').attr('aria-hidden') === 'false') {
              e.preventDefault();
              closePanel();
            }
          }
        });
      })
    } else {
      console.error("Widget de Accesibilidad: jQuery no está disponible.")};
  </script>
</p>
