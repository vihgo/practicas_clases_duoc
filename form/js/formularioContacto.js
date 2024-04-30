import {InputValidator,InputGroupValidator} from './formValidator.js'

const telInput=document.querySelector('input[name="phone"]')
const rutInput=document.querySelector('input[name="rut"]')
const formButton=document.querySelector('button')
const rutFormatValidation= new InputValidator(rutInput,rutFormatRule,'warnings')
const rutLogicValidation= new InputValidator(rutInput,rutVerificationRule,'warnings')
const phoneFormatValidation= new InputValidator(telInput,phoneValidationRule,'warnings')

telInput.addEventListener('change',validatePhoneField)
rutInput.addEventListener('change',validateRutField)

const inputGroupValidator= new InputGroupValidator(formButton,[rutFormatValidation,rutLogicValidation,phoneFormatValidation],'buttonDisabled')
inputGroupValidator.validateInput()

function validateRutField(){
    rutFormatValidation.validateInput()
    rutLogicValidation.validateInput()
    inputGroupValidator.validateInput()
}
function validatePhoneField(){
    console.log("Debug de teléfono")
    phoneFormatValidation.validateInput()
    inputGroupValidator.validateInput()
}


function phoneValidationRule(){
    //validamos que los valores que se puedan ingresar sean números y el signo más
    
    if(!telInput.value.match(/^\+[0-9]+$/)){
        telInput.value=""
        telInput.nextElementSibling.style.visibility="visible";
        telInput.nextElementSibling.textContent="Debe agregar el telefono en formato +56"
        return false
    }else{
        telInput.nextElementSibling.style.visibility="hidden";
        return true

    }
}

function rutVerificationRule(){

    
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
    console.log(digito)
    if(rutDigito==digito || digito==10 &&  rutDigito.toLowerCase()=="k"){
        // La función 'classList.toggle' añade la clase si no está, o la quita si ya está
        return true
        
    }else return false




   
}

function rutFormatRule(){
   
    if(rutInput.value.match(/[0-9kK-]/))return true;
    else{

        rutInput.value="";
        return false;
    }
   

}

