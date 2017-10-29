var order = JSON.parse(localStorage.getItem("order"));

var shipping = {};
var country; 
var city; 
var address; 
var zip;
var company; 
var value; 

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

});