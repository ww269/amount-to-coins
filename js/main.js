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

            calculator.convertToCoins(totalInPennies);

        },

        convertToCoins : function (pennies){

            let denoms = [200, 100, 50, 20, 10, 5, 2, 1]; 
            let remaining = pennies;
            
            let coinsNeeded = {
                200 : {
                    'name' : '£2',
                    'qty' : 0
                },
                100 : {
                    'name' : '£1',
                    'qty' : 0
                },
                50 : {
                    'name' : '50p',
                    'qty' : 0
                },
                20 : {
                    'name' : '20p',
                    'qty' : 0
                },
                10 : {
                    'name' : '10p',
                    'qty' : 0
                },
                5 : {
                    'name' : '5p',
                    'qty' : 0
                }, 
                2 : {
                    'name' : '2p',
                    'qty' : 0
                },
                1 : {
                    'name' : '1p',
                    'qty' : 0
                },
            }

            for(var i = 0; i < denoms.length; i++){
                let denom = denoms[i];
                coinsNeeded[denom].qty = Math.floor(remaining / denom);
                remaining = remaining % denom;
            }
        
            calculator.renderResult(coinsNeeded)
        },

        renderResult : function (coinsNeeded){
            
            $("#result-section").removeClass('d-none');
            $("#coins-holder").empty();
            
            $.each(coinsNeeded, function(i, item){
                if(item.qty > 0){
                    $('#coins-holder').append(`
                        <div class="m-2 text-center">
                            <div class="coin shadow bg-white border">${item.name}</div> 
                            <span class="font-weight-bold">x ${item.qty}</span>
                        </div>
                    `)
                }
            })
        
        }
    }

    calculator.init()

}) 