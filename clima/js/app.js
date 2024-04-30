const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('form')
const main = document.querySelector('main')


window.addEventListener('load', () => {
    console.log('event')
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e) {
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    if (ciudad == '' || pais == '') {
        mostrarError("Debe ingresar el valor de ambos campos")
        return
    }
    consultarAPI(ciudad, pais)


}

function mostrarError(mensaje) {

    const alerta = document.querySelector('.alerta')
    console.log(!alerta)
    if (!alerta) {

        const alerta = document.createElement('div')

        alerta.classList.add('alerta')
        alerta.innerHTML = `<strong class="font-weight: 600">Error!</strong>
        <p>${mensaje}</p>`
        main.appendChild(alerta)

        //eliminar alerta desps de 4 segundos
        setTimeout(() => {
            alerta.remove()
        }, 4000);
    }

}

function consultarAPI(ciudad, pais) {
    const apiKey = '80bcc0e68842b2dac8b23bfd2613fcfb'
    const apiurl = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`
    crearSpinner()
    fetch(apiurl).then(resp => resp.json()).then(datos => {
        limpiarHtml()
        if (datos.cod === "404") {
            mostrarError("Ciudad no encontrada")
            return
        }
        console.log(datos)
        mostrarClima(datos)

    })



}

function mostrarClima(datos) {
    //es necesario usar operaciones para transformar los datos kelvin de la api a centigrados
    const { name, weather: [{ description }], main: { temp, temp_max, temp_min } } = datos
    const tempCentigrados = kelvinCentigrados(temp)
    const tempMaxCentigrados = kelvinCentigrados(temp_max)
    const tempMinCentigrados = kelvinCentigrados(temp_min)


    const nombreCiudad = document.createElement('p')
    nombreCiudad.classList.add('tempGrande')
    nombreCiudad.innerHTML = `El clima en ${name}`

    const descClima = document.createElement('p')
    descClima.classList.add('tempMediana')
    descClima.innerHTML = `${description}`

    const tempActual = document.createElement('p')
    tempActual.classList.add('tempGrande')
    tempActual.innerHTML = `${tempCentigrados} &#8451;`

    const tempMax = document.createElement('p')
    tempMax.classList.add('tempMediana')
    tempMax.innerHTML = `Máxima: ${tempMaxCentigrados} &#8451;`

    const tempMin = document.createElement('p')
    tempMin.classList.add('tempMediana')
    tempMin.innerHTML = `Mínima: ${tempMinCentigrados} &#8451;`


    const resultadoDiv = document.createElement('div')
    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(tempActual)
    resultadoDiv.appendChild(descClima)
    resultadoDiv.appendChild(tempMax)
    resultadoDiv.appendChild(tempMin)
    resultado.appendChild(resultadoDiv)
    console.log(Math.round(temp - 273.15))


}
//const kelvinCentigrados=(kelvin)=>parseInt(kelvin-273.15)
function kelvinCentigrados(kelvin) {
    return parseInt(kelvin - 273.15)
}

function limpiarHtml() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }

}

function crearSpinner() {

    const divSpinner = document.querySelector('.sk-circle')
    if (!divSpinner) {
        const divSpinner = document.createElement('div')
        divSpinner.classList.add('sk-circle')
        divSpinner.innerHTML = `
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>`
        resultado.appendChild(divSpinner)
    }
}