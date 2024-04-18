
function validarCampoRut(){
    if(validarFormatoRut()){
        validaRut()
    }
}
function validarTelefono(){
    //validamos que los valores que se puedan ingresar sean números y el signo más
    telInput=document.querySelector('input[name="phone"]')
    if(!telInput.value.match(/^\+[0-9]+$/))telInput.value=""
}

function validaRut(){

    rutInput=document.querySelector('input[name="rut"]')
    let valorInput=rutInput.value
    let [rutNumeros,rutDigito]=valorInput.split("-")
    let rutNumerosAlReves= rutNumeros.split('').reverse().join('')
    let multiploSerie=2
    let resultadoSuma=0
    for(var i=0;i<rutNumerosAlReves.length;i++){

        resultadoSuma=resultadoSuma + (multiploSerie*rutNumerosAlReves[i])
        multiploSerie++
        if(multiploSerie==8)multiploSerie=2

    }
    let division= resultadoSuma/11;
    let parteEntera=parseInt(division);
    //6
    let digito= 11-(resultadoSuma-(parteEntera*11))

    if(rutDigito!=digito ){
        // La función 'classList.toggle' añade la clase si no está, o la quita si ya está
        rutInput.classList.add('warnings')
        return false;
    }else{
        rutInput.classList.remove('warnings')
        return true;
    }

    console.log(digito)


   
}

function validarFormatoRut(){
    rutInput=document.querySelector('input[name="rut"]');
   
    if(rutInput.value.match(/[0-9kK-]/))return true;
    else{

        rutInput.value="";
        return false;
    }
   

}

