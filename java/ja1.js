const app = document.getElementById("app");
function render(html) {
    app.innerHTML = html;
}
//1
function clasificarMagnitud() {
    render(`
        <h2>Clasificación de Magnitud Estelar</h2>
        <p>Ingrese la magnitud aparente:</p>
        <input id="magnitud" type="number" step="0.1">
        <button onclick="procesarMagnitud()">Clasificar</button>
        <div class="output" id="out"></div>
    `);
}
function procesarMagnitud() {
    const m = parseFloat(document.getElementById("magnitud").value);

    let categoria = "";

    if (m <= 0) categoria = "Extremadamente brillante";
    else if (m <= 2) categoria = "Muy brillante";
    else if (m <= 4) categoria = "Brillante";
    else if (m <= 6) categoria = "Débil";
    else categoria = "No visible";

    const tipo =
        m <= 2 ? "Posible estrella de primera magnitud" :
        m <= 6 ? "Estrella común" :
        "Solo visible con telescopio";
    document.getElementById("out").innerHTML =
        `<b>Categoría:</b> ${categoria}<br>
         <b>Tipo:</b> ${tipo}`;
}
//2
function registrarDistancias() {
    render(`
        <h2>Registrar Distancias de Planetas</h2>
        <p>Ingrese distancias (millones de km) separadas por comas:</p>
        <input id="distancias" placeholder="58, 108, 150">
        <button onclick="procesarDistancias()">Calcular</button>
        <div class="output" id="out"></div>
    `);
}

function procesarDistancias() {
    const valores = document.getElementById("distancias").value
        .split(",")
        .map(x => parseFloat(x.trim()))
        .filter(x => !isNaN(x));

    let suma = 0;
    for (let i = 0; i < valores.length; i++) {
        suma += valores[i];
    }

    const promedio = suma / valores.length;
    const max = Math.max(...valores);
    const min = Math.min(...valores);

    document.getElementById("out").innerHTML =
        `<b>Promedio:</b> ${promedio.toFixed(2)} millones km<br>
         <b>Máxima:</b> ${max} millones km<br>
         <b>Mínima:</b> ${min} millones km`;
}

//3
let crateres = [];

function contarCrateres() {
    crateres = []; // limpia lista
    render(`
        <h2>Contador de Cráteres Lunares</h2>
        <p>Ingrese el diámetro (0 para terminar):</p>
        <input id="diametro" type="number">
        <button onclick="agregarCrater()">Agregar</button>
        <div class="output" id="out"></div>
    `);
}

function agregarCrater() {
    const d = parseFloat(document.getElementById("diametro").value);

    if (d === 0) {
        let i = 0;
        let grandes = 0;

        while (i < crateres.length) {
            if (crateres[i] > 50) grandes++;
            i++;
        }

        const promedio =
            crateres.reduce((a, b) => a + b, 0) / crateres.length;

        document.getElementById("out").innerHTML =
            `<b>Total registrados:</b> ${crateres.length}<br>
             <b>Mayores a 50 km:</b> ${grandes}<br>
             <b>Diámetro promedio:</b> ${promedio.toFixed(2)} km`;
        return;
    }

    if (!isNaN(d)) crateres.push(d);

    document.getElementById("diametro").value = "";
}
//4
function identificarCuerpo() {
    render(`
        <h2>Identificar Cuerpo Celeste</h2>
        <p>Ingrese código (1-5):</p>
        <input id="codigo" type="number">
        <button onclick="procesarCuerpo()">Identificar</button>
        <div class="output" id="out"></div>
    `);
}

function procesarCuerpo() {
    const c = parseInt(document.getElementById("codigo").value);
    let tipo = "";

    switch (c) {
        case 1: tipo = "Estrella"; break;
        case 2: tipo = "Planeta"; break;
        case 3: tipo = "Cometa"; break;
        case 4: tipo = "Asteroide"; break;
        case 5: tipo = "Galaxia"; break;
        default: tipo = "Código inválido";
    }

    const descripcion = {
        "Estrella": "Cuerpo que produce luz propia.",
        "Planeta": "Órbita una estrella.",
        "Cometa": "Cuerpo de hielo y polvo.",
        "Asteroide": "Roca espacial pequeña.",
        "Galaxia": "Conjunto masivo de estrellas."
    };

    document.getElementById("out").innerHTML =
        `<b>Resultado:</b> ${tipo}<br>
         ${descripcion[tipo] || ""}`;
}
//5
let nivelesLux = [];

function registrarLux() {
    nivelesLux = [];
    render(`
        <h2>Registro de Niveles de Luz (lux)</h2>
        <input id="valorLux" type="number" placeholder="valor en lux">
        <button onclick="agregarLux()">Agregar</button>
        <div class="output" id="out"></div>
    `);
}

function agregarLux() {
    let valor = parseFloat(document.getElementById("valorLux").value);

    if (isNaN(valor)) return;

    let continuar = "";

    do {
        nivelesLux.push(valor);
        continuar = prompt("¿Agregar otro valor? (si/no)").toLowerCase();
        if (continuar === "si") {
            valor = parseFloat(prompt("Ingrese lux:"));
        }
    } while (continuar === "si");

    const detalles = nivelesLux.map(v =>
        v < 5 ? `${v} lux → noche profunda` : `${v} lux → luz detectable`
    ).join("<br>");

    const promedio =
        nivelesLux.reduce((a, b) => a + b, 0) / nivelesLux.length;

    document.getElementById("out").innerHTML =
        `<b>Valores registrados:</b><br>${detalles}<br><br>
         <b>Promedio:</b> ${promedio.toFixed(2)} lux`;
}
function cargar(opcion) {
    if (opcion === "magnitud") clasificarMagnitud();
    if (opcion === "distancias") registrarDistancias();
    if (opcion === "crateres") contarCrateres();
    if (opcion === "cuerpo") identificarCuerpo();
    if (opcion === "lux") registrarLux();
}

