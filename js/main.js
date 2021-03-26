'use strict'
$(function(){

    const calculator = {

        init : function(){
            this.bindEvents();
        },

        bindEvents : function(){
            $("#frm-calculate").on("submit", function(event){
                event.preventDefault();
                calculator.validateInput($('#txt-amount').val())
            })
        }, 
        
        //FIND INVALID CHARS AND INPUT FORMAT
        validateInput : function(input){ 

            let firstChar = input.charAt(0); 
            let middleChars = input.substring(1, input.length -1);
            let lastChar = input.charAt(input.length - 1);

            if (
                input == '' ||
                firstChar.match(/[^£0-9]/) || 
                lastChar.match(/[^0-9p]/) ||
                middleChars.match(/[a-zA-Z]/)
            ){                        
                alert('Your input is empty or contains invalid character(s)')   
            } else {    
                calculator.convertToPennies(input);  
            }
        },

        convertToPennies : function(input){

            let totalInPennies;

            function removeNonNumChars(input){
                return input.replace(/[^0-9$.,]/g, '');
            }

            //1.CHECK FOR '£' OR '.' IN INPUT.     
            if(input.indexOf('£') >= 0 && input.indexOf('.') == -1) { //POUNDS ONLY
            
                let pounds = removeNonNumChars(input);
                totalInPennies = (parseInt(pounds) * 100)

            } else if(input.indexOf('.') >= 0){ //POUNDS AND PENNIES

                input = removeNonNumChars(input);
                
                let arrValue = input.split(".");
                let pounds = parseInt(arrValue[0]);
                let pennies = parseInt(arrValue[1]) || 0;
                
                if(pennies > 99){
                    pennies = parseFloat('0.'+pennies).toFixed(2)
                    let arrPennies = pennies.split('.');
                    pennies = Math.ceil(arrPennies[1]);
                }
            
                totalInPennies = (100 * pounds) + pennies;
                
            } else { //PENNIES ONLY
                input = removeNonNumChars(input);
                totalInPennies = parseInt(input);
            }

            alert('Proceed to convert to coins')

        },

       
    }

    calculator.init()

}) 