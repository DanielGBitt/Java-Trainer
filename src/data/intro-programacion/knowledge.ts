import type { KnowledgeUnit } from "@/types/knowledge";

export const introProgramacionUnits: KnowledgeUnit[] = [
  {
    id: "intro-web-fundamentos",
    title: "Fundamentos Web y HTTP",
    category: "intro-web",
    difficulty: 1,
    tags: ["web", "http", "https", "cliente", "servidor", "navegador"],
    knowledge: [
      { id: "intro-web-fundamentos-def", type: "definition", content: "Web = cliente (navegador) pide vía HTTP/HTTPS y servidor responde HTML/CSS/JS. Como un restaurante: el cliente (navegador) pide platos (páginas) y el cocinero (servidor) los sirve." },
      { id: "intro-web-fundamentos-rule", type: "rule", content: "HTTPS cifra HTTP; sin él datos viajan visibles." },
      { id: "intro-web-fundamentos-ex", type: "example", content: "Navegador → https://tienda.com → servidor → <html>Hola</html>." },
      { id: "intro-web-fundamentos-comp", type: "comparison", content: "Sitio estático archivo fijo vs dinámico respuesta generada por app." },
    ],
  },
  {
    id: "intro-html-esqueleto",
    title: "HTML5: Esqueleto Base",
    category: "intro-web",
    difficulty: 1,
    tags: ["html5", "doctype", "html", "head", "meta", "title", "body"],
    knowledge: [
      { id: "intro-html-esqueleto-def", type: "definition", content: "<!doctype html> declara HTML5; <html> es la raíz como el cover de un libro. <head> son los metadatos (título, fuente, autor) y <body> es el contenido visible." },
      { id: "intro-html-esqueleto-rule", type: "rule", content: "<head> lleva <meta charset=utf-8> y <title>; todo visible va en <body>." },
      { id: "intro-html-esqueleto-ex", type: "example", content: "<!doctype html><html><head><meta charset=utf-8><title>Tienda</title></head><body>Hola</body></html>" },
      { id: "intro-html-esqueleto-mistake", type: "common_mistake", content: "Olvidar doctype activa modo raro; <title> fuera de <head> no valida." },
    ],
  },
  {
    id: "intro-html-semantica",
    title: "HTML5 Semántica",
    category: "intro-html",
    difficulty: 1,
    tags: ["html5", "semantica", "header", "nav", "section", "article", "footer"],
    knowledge: [
      { id: "intro-html-semantica-def", type: "definition", content: "Semántica describe rol: header (cabecera), nav (navegación), section (sección), article (artículo), footer (pie) — como roles en una empresa: director, recepcionista, departamento, proyecto, administración." },
      { id: "intro-html-semantica-rule", type: "rule", content: "Un <h1> por página, <h2-h6> jerárquicos; usa div solo sin semántica." },
      { id: "intro-html-semantica-ex", type: "example", content: "<header><nav><a>Inicio</a></nav></header><section><article><h1>Producto</h1><p>Desc</p></article></section><footer>©</footer>" },
      { id: "intro-html-semantica-mistake", type: "common_mistake", content: "<div> para todo rompe accesibilidad y SEO; <section> sin encabezado no aporta." },
    ],
  },
  {
    id: "intro-enlaces-imagenes",
    title: "Enlaces e Imágenes",
    category: "intro-media",
    difficulty: 1,
    tags: ["html5", "enlaces", "imagenes", "a", "img", "alt", "href"],
    knowledge: [
      { id: "intro-enlaces-imagenes-def", type: "definition", content: "<a href=url>texto</a> es un enlace como un hipervínculo azul clicable; <img src alt> muestra imagen — src es la dirección de la foto y alt es la descripción para ciegos (obligatorio)." },
      { id: "intro-enlaces-imagenes-rule", type: "rule", content: "href relativo /img/foto.jpg vs absoluto https://…; alt obligatorio describe imagen." },
      { id: "intro-enlaces-imagenes-ex", type: "example", content: "<a href=/contacto>Contacto</a> y <img src=foto.webp alt=Zapatilla roja> formatos jpg/png/webp/svg." },
      { id: "intro-enlaces-imagenes-mistake", type: "common_mistake", content: "Imagen sin alt o alt='foto' genérico rompe accesibilidad; describe contenido." },
    ],
  },
  {
    id: "intro-style-tablas-media",
    title: "Style, Tablas y Media",
    category: "intro-tablas",
    difficulty: 1,
    tags: ["html5", "style", "tabla", "video", "iframe", "css"],
    knowledge: [
      { id: "intro-style-tablas-media-def", type: "definition", content: "<style> aplica CSS inline (dentro del HTML); table>tr>th/td estructura datos tabulares como una hoja de Excel — th=encabezado, td=celda de datos." },
      { id: "intro-style-tablas-media-rule", type: "rule", content: "th encabezado, td dato; id único table#precios para estilo específico." },
      { id: "intro-style-tablas-media-ex", type: "example", content: "<style>table{border-collapse:collapse} #precios th{background:#eee}</style><table id=precios><tr><th>Prod</th><th>€</th></tr><tr><td>Pan</td><td>2</td></tr></table>" },
      { id: "intro-style-tablas-media-comp", type: "comparison", content: "Tabla para datos tabulares vs div/flex para layout; no uses table para maquetar." },
    ],
  },
  {
    id: "intro-formularios",
    title: "Formularios",
    category: "intro-tablas",
    difficulty: 1,
    tags: ["html5", "form", "input", "label", "button", "select"],
    knowledge: [
      { id: "intro-formularios-def", type: "definition", content: "form con label+input/button captura datos para enviar — como un formulario en papel: label=instrucción, input=espacio para escribir, button=enviar." },
      { id: "intro-formularios-rule", type: "rule", content: "label for=id vincula; input type text/email/number y required; id único." },
      { id: "intro-formularios-ex", type: "example", content: "<form><label for=email>Email</label><input id=email type=email required><button>Enviar</button></form>" },
      { id: "intro-formularios-comp", type: "comparison", content: "Tabla muestra datos; formulario los captura. No mezclar roles." },
    ],
  },
];
