var order = JSON.parse(localStorage.getItem("order"));

var shipping = {};
var country; 
var city; 
var address; 
var zip;
var company; 
var value; 


function validateData(){
    var nameReg = /^[A-Za-z]+$/;
   var numberReg =  /^[0-9]+$/;
   var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   
    let country=$('#country').val();
    let city=$('#city').val();
    let address=$('#address').val();
    let zip=$('#zip').val();
    

   var inputVal = new Array(country, city, address, zip);
   var inputMessage = new Array("Pais", "Ciudad", "Direccion", "Código Postal");

   $('.error').hide();
   if(inputVal[0] == ""){
       $('#country').after('<span class="error" style="color:red;position:absolute">Por favor ingresa tu ' + inputMessage[0] + '</span>');
       return false;
   }else if(inputVal[0].length < 2){
       $('#country').after('<span class="error" style="color:red">Debe contener almenos 2 letras</span>');
       return false;
   }

   if(inputVal[1] == ""){
       $('#city').after('<span class="error" style="color:red;position:absolute">Por favor ingresa tu ' + inputMessage[1] + '</span>');
       return false;
   }else if(inputVal[1].length < 2){
       $('#city').after('<span class="error" style="color:red">Debe contener almenos 2 letras</span>');
       return false;
   }

   if(inputVal[2] == ""){
       $('#address').after('<span class="error" style="color:red;position:absolute">Por favor ingresa tu ' + inputMessage[2] + '</span>');
       return false;
   }else if(inputVal[2].length < 2){
       $('#address').after('<span class="error" style="color:red">Debe contener almenos 2 letras</span>');
       return false;
   }

    if(inputVal[3] == ""){
       $('#zip').after('<span class="error" style="color:red">Por favor ingresa tu ' + inputMessage[3] + '</span>');
       return false;
   }else if(!numberReg.test(zip)){
       $('#zip').after('<span class="error" style="color:red">Ingresa un número telefonico válido</span>');
       return false;
   }else if(inputVal[3].length != 5){
       $('#zip').after('<span class="error" style="color:red">Ingresa un código con 5 digitos</span>');
       return false;
   }

   return true
}

function getDataOfShipping(){
	//Get
	country = $('#country').children('option:selected').val();
	city = $('#city').children('option:selected').val();
	address = $('#address').val();
	zip = $('#zip').val(); 

	shipping = {
		country: country,
		city: city,
		address: address,
		zip: zip,
		company: company,
		value: value
	}

	$.extend(shipping, order);
	localStorage.setItem("order", JSON.stringify(shipping));
	console.log(JSON.parse(localStorage.getItem("order")));
    
        window.location.href = 'checkout-step-3.html';
    
	
}



$('#country').change(function(){
	country = $('#country').children('option:selected').val();
});

$('#city').change(function(){
	city = $('#city').children('option:selected').val();
});

$('#CorreosCR').on('change', function() {
    $('#GoPato').not(this).prop('checked', false);
    company = $('#CorreosCR').val();
    value = 1200;
    if(!$('#CorreosCR').prop('checked') && !$('#GoPato').prop('checked')){
    	$( "#continue" ).addClass( "btn-is-disabled" );
    }else{
    	$( "#continue" ).removeClass( "btn-is-disabled" );
    }  
});

$('#GoPato').on('change', function() {
    $('#CorreosCR').not(this).prop('checked', false);
   	company = $('#GoPato').val();
   	value = 2500;
   	if(!$('#CorreosCR').prop('checked') && !$('#GoPato').prop('checked')){
    	$( "#continue" ).addClass( "btn-is-disabled" );
    }else{
    	$( "#continue" ).removeClass( "btn-is-disabled" );
    }    
});


function loadForm(){
    
    //window.history.back();
    if(order!=null){
        $('#country').val(order.country);
        $('#city').val(order.city);
        $('#address').val(order.address);
        $('#zip').val(order.zip);
        order.company=="CorreosCR"?$('#CorreosCR').prop('checked'):$('#GoPato').prop('checked');
    }
    
}
jQuery(document).ready(function(){
	//Function Listener
    console.log(order);
    // country = $('#country').children('option:selected').val();
    // city = $('#city').children('option:selected').val();
    // company = $('#CorreosCR').children('option:selected').val();

    if ($('#CorreosCR').prop('checked') && !$('#GoPato').prop('checked')){
    	company = $('#CorreosCR').val();
    	value = 1200; 
    	$('#GoPato').not(this).prop('checked', false);
    	$( "#continue" ).removeClass( "btn-is-disabled" );
    }else if($('#GoPato').prop('checked') && !$('#CorreosCR').prop('checked')){
    	company = $('#GoPato').val();
    	value = 2500; 
    	$('#CorreosCR').not(this).prop('checked', false);
    	$( "#continue" ).removeClass( "btn-is-disabled" );
    }else if(!$('#CorreosCR').prop('checked') && !$('#GoPato').prop('checked')){
    	$( "#continue" ).addClass( "btn-is-disabled" );
    }

    $("#continue").click(()=>validateData()?getDataOfShipping():console.log("input invalid"))
loadForm();
});