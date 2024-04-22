/*InputValidator y InputGroupValidator forman parte del patron de composition aplicado para 
darle una estructura lógica al uso de las validaciones en los formularios*/
class InputValidator{
    constructor(input,validationRules,cssErrorClass){
        this.input=input
        this.validationRules=validationRules
        this.passValidation=false
        this.cssErrorClass=cssErrorClass
    }

    validateInput(){
        if(this.validationRules()){
            this.input.classList.remove(this.cssErrorClass)
            this.passValidation=true;
        }else{
            this.input.classList.add(this.cssErrorClass)
            this.passValidation=false;

        }
    }
}

class InputGroupValidator{
     //singleton
     
    static notValidCount=0
    static isAllValid(inputsValidators){
        InputGroupValidator.notValidCount=0
        this.inputsValidators=inputsValidators
        this.inputsValidators.forEach(inputValidator => {
            if(inputValidator.passValidation==false){
                InputGroupValidator.notValidCount+=1
            }
        });
        
    if(InputGroupValidator.notValidCount>0 ){ return false} else {return true}

        
       
    }

}
const telInput=document.querySelector('input[name="phone"]')
const rutInput=document.querySelector('input[name="rut"]')
const formButton=document.querySelector('button')
const rutFormatValidation= new InputValidator(rutInput,rutFormatRule,'warnings')
const rutLogicValidation= new InputValidator(rutInput,rutVerificationRule,'warnings')
const phoneFormatValidation= new InputValidator(telInput,phoneValidationRule,'warnings')


const validationArray=[rutFormatValidation,rutLogicValidation,phoneFormatValidation]

setInterval(function() {
    // code to be executed repeatedly
    validaForm()
  }, 100);

function validateRutField(){
    rutFormatValidation.validateInput()
    rutLogicValidation.validateInput()
    
}
function validatePhoneField(){
    phoneFormatValidation.validateInput()
}
function validaForm(){
    
    if (InputGroupValidator.isAllValid(validationArray)){
        console.log("esta todo validado")
        if(formButton.disabled){
            formButton.classList.remove('buttonDisabled')
            formButton.disabled = false
        }
            
    
    }else{
        console.log("no esta todo validado")
        if(!formButton.disabled){
            console.log("Entro una vez")
            
            formButton.classList.add('buttonDisabled')
            formButton.disabled = true
        }
      
    }
    

}


function phoneValidationRule(){
    //validamos que los valores que se puedan ingresar sean números y el signo más
    
    if(!telInput.value.match(/^\+[0-9]+$/)){
        telInput.value=""
        return false
    }else{
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

    if(rutDigito!=digito ){
        // La función 'classList.toggle' añade la clase si no está, o la quita si ya está
      
        return false;
    }else{
        
        return true;
    }



   
}

function rutFormatRule(){
   
    if(rutInput.value.match(/[0-9kK-]/))return true;
    else{

        rutInput.value="";
        return false;
    }
   

}

