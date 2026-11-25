// LISTA DE CUMPLEAÑOS
// Agrega aquí los nombres y sus fechas.

const cumpleanos = [
    {
        nombre: "AXEL M.",
        apellido: "DIBUCHO MEJIA",
        dia: 16,
        mes: 8
    },
    {
        nombre: "DAVID O.",
        apellido: "VILLANUEVA CASTRO",
        dia: 19,
        mes: 8
    },
    {
        nombre: "CESAR U.",
        apellido: "BEDON NAVARRO",
        dia: 20,
        mes: 8
    },
    {
        nombre: "ANTHONY L.",
        apellido: "TRILLO CANALES",
        dia: 22,
        mes: 8
    },
    {
        nombre: "ALEXANDRA I.",
        apellido: "MELGAREJO ROMERO",
        dia: 26,
        mes: 8
    },
    {
        nombre: "MARIA P.",
        apellido: "GARCIA LOPEZ",
        dia: 5,
        mes: 9
    }
];

// Los meses comienzan desde 0:
// Enero = 0, Febrero = 1 ... Septiembre = 8.

const nombresMeses = [
    "ENERO", "FEBRERO", "MARZO",
    "ABRIL", "MAYO", "JUNIO",
    "JULIO", "AGOSTO", "SEPTIEMBRE",
    "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
];

const diasSemana = [
    "Domingo", "Lunes", "Martes",
    "Miércoles", "Jueves", "Viernes", "Sábado"
];

const hoy = new Date();

const tituloHoy = document.getElementById("tituloHoy");
const lista = document.getElementById("listaCumpleanos");

// Comprobar si hay cumpleaños hoy

const cumpleanosHoy = cumpleanos.filter(persona =>
    persona.dia === hoy.getDate() &&
    persona.mes === hoy.getMonth()
);

if (cumpleanosHoy.length > 0) {
    tituloHoy.textContent = "¡HOY TENEMOS CUMPLEAÑOS!";
} else {
    tituloHoy.textContent = "SIN CUMPLEAÑOS POR HOY";
}

// Calcular la siguiente fecha de cumpleaños

const proximos = cumpleanos.map(persona => {

    let fecha = new Date(
        hoy.getFullYear(),
        persona.mes,
        persona.dia
    );

    // Si ya pasó este cumpleaños, se muestra el próximo año.

    if (
        fecha.getMonth() !== persona.mes ||
        fecha.getDate() !== persona.dia
    ) {
        fecha = new Date(
            hoy.getFullYear() + 1,
            persona.mes,
            persona.dia
        );
    } else if (fecha < new Date(
        hoy.getFullYear(),
        hoy.getMonth(),
        hoy.getDate()
    )) {
        fecha.setFullYear(fecha.getFullYear() + 1);
    }

    return {
        ...persona,
        fecha: fecha
    };

});

// Ordenar cronológicamente

proximos.sort((a, b) => a.fecha - b.fecha);

// Mostrar los próximos 12 meses

const limite = new Date(
    hoy.getFullYear(),
    hoy.getMonth() + 12,
    hoy.getDate()
);

const siguientes = proximos.filter(persona =>
    persona.fecha <= limite
);

// Agrupar por mes y año

const grupos = {};

siguientes.forEach(persona => {

    const clave =
        persona.fecha.getFullYear() + "-" +
        persona.fecha.getMonth();

    if (!grupos[clave]) {
        grupos[clave] = {
            mes: persona.fecha.getMonth(),
            personas: []
        };
    }

    grupos[clave].personas.push(persona);

});

// Mostrar en pantalla

Object.values(grupos).forEach(grupo => {

    const seccion = document.createElement("section");

    seccion.innerHTML = `
        <div class="mes-titulo">
            ${nombresMeses[grupo.mes]}
        </div>
    `;

    grupo.personas.forEach(persona => {

        const dia = persona.fecha.getDate();

        const nombreDia =
            diasSemana[persona.fecha.getDay()];

        const fila = document.createElement("div");

        fila.className = "persona";

        fila.innerHTML = `
            <div class="icono"></div>

            <div class="nombre">
                ${persona.nombre}<br>
                ${persona.apellido}
            </div>

            <div class="fecha">
                <strong>${dia}</strong>
                <span>${nombreDia}</span>
            </div>
        `;

        seccion.appendChild(fila);

    });

    lista.appendChild(seccion);

});