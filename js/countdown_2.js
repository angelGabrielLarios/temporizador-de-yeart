const input_fechaCumple = document.getElementById('fechaCumple');
const relojTitle1 = document.getElementById('relojTitle1');
const relojTitle2 = document.getElementById('relojTitle1');
const btns = document.getElementById("btns");
let tempo;

const mostrarMensaje = (texto, tipoMensaje, elementoReferencia, event) => {
    event.target.classList.add("btn--disabled");
    event.target.setAttribute("disabled", true);
    const mensaje = document.createElement("div");
    mensaje.classList.add("mensaje", "error");
    mensaje.textContent = texto;
    elementoReferencia.before(mensaje);
    if (tipoMensaje === "error") {
        setTimeout(() => {
            mensaje.remove();
            event.target.removeAttribute("disabled");
            event.target.classList.remove("btn--disabled");
        }, 4000);
    }
};
const countdown = (selector_dias, selector_horas, selector_minutos, selector_segundos, fecha, mensajeFinal) => {
    const reloj__dias = document.getElementById(selector_dias);
    const reloj__horas = document.getElementById(selector_horas);
    const reloj__minutos = document.getElementById(selector_minutos);
    const reloj__segundos = document.getElementById(selector_segundos);
    const miliADias = 1000 * 60 * 60 * 24;
    const miliAHoras = 1000 * 60 * 60;
    const miliAMinutos = 1000 * 60;
    const miliASegundos = 1000;
    tempo = setInterval(() => {
        const fechaActual = new Date();
        const fechaLimite = new Date(fecha);
        const diffMili = fechaLimite.getTime() - fechaActual.getTime();
        const dias = Math.floor(diffMili / miliADias);
        const horas = ('0' + Math.floor((diffMili % miliADias) / miliAHoras)).slice(-2);
        const minutos = ('0' + Math.floor((diffMili % miliAHoras) / miliAMinutos)).slice(-2);
        const segundos = ('0' + Math.floor((diffMili % miliAMinutos) / miliASegundos)).slice(-2);
        reloj__dias.textContent = dias;
        reloj__horas.textContent = horas;
        reloj__minutos.textContent = minutos;
        reloj__segundos.textContent = segundos;
        if (diffMili < 0) {
            clearInterval(tempo);
            document.getElementById("felicitacion").textContent = mensajeFinal;
            reloj__dias.textContent = '0';
            reloj__horas.textContent = '00';
            reloj__minutos.textContent = '00';
            reloj__segundos.textContent = '00';
            document.getElementById("btnIniciar").removeAttribute("disabled");
            document.getElementById("btnIniciar").classList.remove("btn--disabled");
        }
    }, 1000);
}
btns.addEventListener("click", event => {
    const element = event.target;
    if (element.id === 'btnIniciar') {
        
        const fechaActual = new Date();
        const fechaCumple = new Date(input_fechaCumple.value);
        if (!input_fechaCumple.value) {
            mostrarMensaje('Debe contestar la fecha', 'error', relojTitle1, event);
            return;

        }
        if (fechaActual.getTime() > fechaCumple.getTime()) {
            mostrarMensaje('La fecha de cumpleaños NO puede ser menor que la fecha actual', 'error', relojTitle1, event);
            return;
        }
        element.classList.add("btn--disabled");
        element.setAttribute("disabled", true);
        document.getElementById("btnParar").removeAttribute('disabled');
        document.getElementById("btnParar").classList.remove("btn--disabled");

        countdown('dias', 'horas', 'minutos', 'segundos', input_fechaCumple.value, 'Happy Birthday');
    }
    else if (element.classList.contains('btn--parar')) {
        /* console.log(1); */

        clearInterval(tempo);
        element.classList.add("btn--disabled");
        element.setAttribute("disabled", true);
        document.getElementById("btnIniciar").removeAttribute('disabled');
        document.getElementById("btnIniciar").classList.remove("btn--disabled");
    }
});




