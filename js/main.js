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
                alert('proceed to process input')
            }
        },

        
    }

    calculator.init()

}) 