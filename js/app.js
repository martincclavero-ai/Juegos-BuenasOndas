const btn = document.getElementById("btnComenzar");
const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");

const tablero = document.getElementById("tablero");

const btnReiniciar = document.getElementById("btnReiniciar");

const cartas = [];

// Variables del juego
let primeraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let parejasEncontradas = 0;

// Variables del cronómetro
let segundos = 0;
let intervalo = null;
let juegoIniciado = false;

sponsors.forEach(sponsor => {
    cartas.push(sponsor);
    cartas.push(sponsor);
});

cartas.sort(() => Math.random() - 0.5);

function iniciarCronometro() {

    intervalo = setInterval(() => {

        segundos++;

        const min = String(Math.floor(segundos / 60)).padStart(2, "0");
        const seg = String(segundos % 60).padStart(2, "0");

        document.getElementById("tiempo").textContent = `${min}:${seg}`;

    }, 1000);

}

btn.addEventListener("click", () => {

    inicio.style.display = "none";
    juego.style.display = "flex";

    crearTablero();

});

function crearTablero(){

    tablero.innerHTML = "";

    cartas.forEach((valor, indice)=>{

        const carta = document.createElement("div");

        carta.className = "carta";

        carta.innerHTML = `
            <div class="cara frente">
                <img src="${valor.imagen}" class="logoSponsor">
                <div class="chapita">${indice+1}</div>
            </div>

            <div class="cara dorso">
                <img src="assets/images/logo.png" class="logoCarta">
                <div class="chapita">${indice+1}</div>
            </div>
        `;

        tablero.appendChild(carta);

        carta.addEventListener("click", () => {

    if (bloqueado) return;

    if (carta === primeraCarta) return;

    if (!juegoIniciado) {

    juegoIniciado = true;
    iniciarCronometro();

}

    carta.classList.add("girada");

    if (!primeraCarta) {

        primeraCarta = carta;
        return;

    }

    segundaCarta = carta;

    bloqueado = true;
    if (
    primeraCarta.querySelector(".logoSponsor").src ===
    segundaCarta.querySelector(".logoSponsor").src
) {

    parejasEncontradas++;

    document.getElementById("parejas").textContent = parejasEncontradas;

    if (parejasEncontradas === 13) {

    clearInterval(intervalo);

    setTimeout(() => {

        finalizarJuego();

    }, 600);

}

    primeraCarta = null;
    segundaCarta = null;
    bloqueado = false;


} else {

    setTimeout(() => {

        primeraCarta.classList.remove("girada");
        segundaCarta.classList.remove("girada");

        primeraCarta = null;
        segundaCarta = null;
        bloqueado = false;

    }, 1000);

}

        });

    });

}
function finalizarJuego() {

    juego.style.display = "none";

    document.getElementById("pantallaFinal").style.display = "flex";

    document.getElementById("parejasFinal").textContent = parejasEncontradas;

    document.getElementById("tiempoFinal").textContent =
        document.getElementById("tiempo").textContent;

}

btnReiniciar.addEventListener("click", reiniciarJuego);

function reiniciarJuego() {

    // Reiniciar variables
    primeraCarta = null;
    segundaCarta = null;
    bloqueado = false;
    parejasEncontradas = 0;

    segundos = 0;
    juegoIniciado = false;

    clearInterval(intervalo);
    intervalo = null;

    // Reiniciar textos
    document.getElementById("parejas").textContent = "0";
    document.getElementById("tiempo").textContent = "00:00";

    // Mezclar cartas nuevamente
    cartas.sort(() => Math.random() - 0.5);

    // Ocultar pantalla final
    document.getElementById("pantallaFinal").style.display = "none";

    // Mostrar juego
    juego.style.display = "flex";

    // Crear un tablero nuevo
    crearTablero();

}
