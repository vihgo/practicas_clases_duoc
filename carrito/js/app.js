
import {juegosNintendo}from './juegos.js'

//&#36;



const obtenerUrlIndicador=(indicador)=>`https://mindicador.cl/api/${indicador}`
const contenedor=document.querySelector('#container')



//esta funcion se ejecuta cuando se carga el documento
document.addEventListener('DOMContentLoaded',e=>{
    
    consultarApi('dolar');
    
})

function cargarProductos(valorCambio){


    juegosNintendo.forEach(juego => {

        const cardDiv= document.createElement('div')
        const cardDivImage= document.createElement('div')
        const cardDivContent= document.createElement('div')
        const cardDivInput= document.createElement('div')
        
        cardDiv.classList.add('card')
        cardDivImage.classList.add('card-image')
        cardDivContent.classList.add('card-content')
        cardDivInput.classList.add('input-div')

        cardDivImage.innerHTML=`<img src="${juego.urlImage}" alt="${juego.altImg}" >`
        cardDivContent.innerHTML=`<h3>${juego.nombreJuego}</h3>
        <p>${juego.descripcion}</p>
        <p>&#36;${formatearNumero(parseInt(juego.precioDolar*valorCambio))}</p>`
        cardDivInput.innerHTML=`<input type="button" id="botonAgregar" name="botonAgregar" value="Agregar">`
        
        cardDiv.append(cardDivImage)
        cardDiv.append(cardDivContent)
        cardDiv.append(cardDivInput)
        contenedor.appendChild(cardDiv)


        
        


        
    });

}
function abrirMenuPanelCarrito(){
    console.log("Carrito")
}

function consultarApi(indicador){
    const urlIndicador=obtenerUrlIndicador(indicador)
    toggleSpinner()
    console.log(urlIndicador)
    fetch(urlIndicador).then( resp => resp.json()).then(data=>{
        console.log(data)
        toggleSpinner()
        const valorDolar= data.serie[0].valor
        cargarProductos(valorDolar)
    })


}
function toggleSpinner(){

    const spinner=document.querySelector('.spinner')
    
    if(spinner){
        spinner.remove();
        
        
    }else{
        const spinner= document.createElement('div')
        spinner.classList.add('spinner')
        spinner.innerHTML=`
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>`
        contenedor.appendChild(spinner)
    }

    
}

function limpiarHtml() {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }

}
function formatearNumero(num) {
    // Convertimos el número a una cadena para poder manipularla
    let numStr = num.toString();

    // Invertimos la cadena para facilitar la inserción de puntos cada tres dígitos
    let numStrReversed = numStr.split('').reverse().join('');

    // Insertamos un punto cada tres dígitos
    let numStrWithDots = numStrReversed.replace(/(\d{3})(?=\d)/g, '$1.');

    // Volvemos a invertir la cadena para obtener el formato correcto
    let formattedNumber = numStrWithDots.split('').reverse().join('');

    // Devolvemos el número formateado
    return formattedNumber;
}


