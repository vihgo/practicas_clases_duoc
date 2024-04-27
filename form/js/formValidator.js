/*InputValidator y InputGroupValidator forman parte del patron de composition aplicado para 
darle una estructura lógica al uso de las validaciones en los formularios*/
export class InputValidator{
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

export class InputGroupValidator{
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

