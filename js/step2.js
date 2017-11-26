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
    

   var inputVal = new Array(country, city, zip, address);
   var inputMessage = new Array("País", "Ciudad", "Cantón", "Dirección");

   $('.error').hide();

   if(inputVal[2] == ""){
       $('#zip').after('<span class="error" style="color:red;position:absolute">Por favor ingresa tu ' + inputMessage[2] + '</span>');
       return false;
   }else if(inputVal[2].length < 2){
       $('#zip').after('<span class="error" style="color:red">Debe contener almenos 2 letras</span>');
       return false;
   }

    if(inputVal[3] == ""){
       $('#address').after('<span class="error" style="color:red">Por favor ingresa tu ' + inputMessage[3] + '</span>');
       return false;
   }else if(inputVal[3].length < 3){
       $('#address').after('<span class="error" style="color:red">Debe contener almenos 3 letras</span>');
       return false;
   }
  getDataOfShipping();
   return true
}

function getDataOfShipping(){
	//Get
  country = $('#country').val();
  city = $('#city').val();
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
	
}

$('#RetiroEnTienda').on('change', function() {
    $('#CorreosCR').not(this).prop('checked', false);
    $('#TodoExpress').not(this).prop('checked', false);
    $('#TodoExpressPremiun').not(this).prop('checked', false);
    company = $('#RetiroEnTienda').val();
    console.log(company);
    value = "0";
    console.log(value);
    if(!$('#RetiroEnTienda').prop('checked') && !$('#CorreosCR').prop('checked') && !$('#TodoExpress').prop('checked') && !$('#TodoExpressPremiun').prop('checked')){
    	$( "#continue" ).addClass( "btn-is-disabled" );
    }else{
    	$( "#continue" ).removeClass( "btn-is-disabled" );
    }  
});

$('#CorreosCR').on('change', function() {
    $('#RetiroEnTienda').not(this).prop('checked', false);
    $('#TodoExpress').not(this).prop('checked', false);
    $('#TodoExpressPremiun').not(this).prop('checked', false);
   	company = $('#CorreosCR').val();
    console.log(company);
   	value = 2500;
    console.log(value);
   	if(!$('#RetiroEnTienda').prop('checked') && !$('#CorreosCR').prop('checked') && !$('#TodoExpress').prop('checked') && !$('#TodoExpressPremiun').prop('checked')){
    	$( "#continue" ).addClass( "btn-is-disabled" );
    }else{
    	$( "#continue" ).removeClass( "btn-is-disabled" );
    }    
});

$('#TodoExpress').on('change', function() {
    $('#RetiroEnTienda').not(this).prop('checked', false);
    $('#CorreosCR').not(this).prop('checked', false);
    $('#TodoExpressPremiun').not(this).prop('checked', false);
    company = $('#TodoExpress').val();
    console.log(company);
    value = 2500;
    console.log(value);
    if(!$('#RetiroEnTienda').prop('checked') && !$('#CorreosCR').prop('checked') && !$('#TodoExpress').prop('checked') && !$('#TodoExpressPremiun').prop('checked')){
      $( "#continue" ).addClass( "btn-is-disabled" );
    }else{
      $( "#continue" ).removeClass( "btn-is-disabled" );
    }    
});

$('#TodoExpressPremiun').on('change', function() {
    $('#RetiroEnTienda').not(this).prop('checked', false);
    $('#CorreosCR').not(this).prop('checked', false);
    $('#TodoExpress').not(this).prop('checked', false);
    company = $('#TodoExpressPremiun').val();
    console.log(company);
    value = 4000;
    console.log(value);
    if(!$('#RetiroEnTienda').prop('checked') && !$('#CorreosCR').prop('checked') && !$('#TodoExpress').prop('checked') && !$('#TodoExpressPremiun').prop('checked')){
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
        // order.company=="RetiroEnTienda"?$('#RetiroEnTienda').prop('checked'):"CorreosCR"?$('#CorreosCR').prop('checked'):"TodoExpress"?$('#TodoExpress').prop('checked');
    }
    
}

jQuery(document).ready(function(){
	 //Function Listener
    console.log(order);
    order.city = $('#city').val();
    order.country = $('#country').val();
    // company = $('#CorreosCR').children('option:selected').val();

    if ($('#RetiroEnTienda').prop('checked') && !$('#CorreosCR').prop('checked') && !$('#TodoExpress').prop('checked') && !$('#TodoExpressPremiun').prop('checked')){
    	company = $('#RetiroEnTienda').val();
    	value = "0";
      console.log(company); 
      console.log(value);
    	$('#CorreosCR').not(this).prop('checked', false);
      $('#TodoExpress').not(this).prop('checked', false);
      $('#TodoExpressPremiun').not(this).prop('checked', false);
    	$( "#continue" ).removeClass( "btn-is-disabled" );
    }else if($('#CorreosCR').prop('checked') && !$('#RetiroEnTienda').prop('checked') && !$('#TodoExpress').prop('checked') && !$('#TodoExpressPremiun').prop('checked')){
    	company = $('#CorreosCR').val();
    	value = 2500;
      console.log(company);
      console.log(value); 
    	$('#RetiroEnTienda').not(this).prop('checked', false);
      $('#TodoExpress').not(this).prop('checked', false);
      $('#TodoExpressPremiun').not(this).prop('checked', false);
    	$( "#continue" ).removeClass( "btn-is-disabled" );
    }else if($('#TodoExpress').prop('checked') && !$('#CorreosCR').prop('checked') && !$('#RetiroEnTienda').prop('checked') && !$('#TodoExpressPremiun').prop('checked')){
      company = $('#TodoExpress').val();
      value = 2500;
      console.log(company);
      console.log(value); 
      $('#CorreosCR').not(this).prop('checked', false);
      $('#RetiroEnTienda').not(this).prop('checked', false);
      $('#TodoExpressPremiun').not(this).prop('checked', false);
      $( "#continue" ).removeClass( "btn-is-disabled" );
    }else if($('#TodoExpressPremiun').prop('checked') && !$('#CorreosCR').prop('checked') && !$('#RetiroEnTienda').prop('checked') && !$('#TodoExpress').prop('checked')){
      company = $('#TodoExpressPremiun').val();
      value = 4000;
      console.log(company);
      console.log(value); 
      $('#CorreosCR').not(this).prop('checked', false);
      $('#RetiroEnTienda').not(this).prop('checked', false);
      $('#TodoExpress').not(this).prop('checked', false);
      $( "#continue" ).removeClass( "btn-is-disabled" );
    }else {
    	$( "#continue" ).addClass( "btn-is-disabled" );
    }

    $("#continue").click(()=>validateData()?window.location.href = 'checkout-step-3.php':console.log("input invalid"))
    loadForm();

    $('#city').change(()=>{
      order.city = $('#city').val();
    });

    $('#country').change(()=>{
      order.country = $('#country').val();
    });                              
});