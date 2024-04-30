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
      
     constructor(input,inputValidators,cssErrorClass){
        this.input=input
        this.inputValidators=inputValidators
        this.passValidation=false
        this.cssErrorClass=cssErrorClass
    }
    validateInput()
    {

        this.notValidCount=0
        this.inputValidators.forEach(inputValidator => {
            if(inputValidator.passValidation==false){
                this.notValidCount+=1
            }
        });
        
        if(this.notValidCount>0 ){ 
            this.notValidCount=0 
            this.input.classList.add(this.cssErrorClass)
            this.input.disabled=true
            this.passValidation=false
            
        } else {
            this.input.classList.remove(this.cssErrorClass)
            this.passValidation=true
            this.input.disabled=false
            
         }   
    
    

        
       
    }
        
    

        
       
    

}

