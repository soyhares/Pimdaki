var order = JSON.parse(localStorage.getItem("order"));
var billing = {};

function getDataOfBilling(){
	//Get
	var name = $('#name').val();
	var lastName = $('#lastName').val();
	var email = $('#email').val();
	var phone = $('#phone').val();

	billing = { 
		name: name,
		lastName: lastName,
		email: email,
		phone: phone
	}

	$.extend(billing, order);
	localStorage.setItem("order", JSON.stringify(billing));

	window.location.href = 'checkout-step-2.html';
}


jQuery(document).ready(function(){
	//Function Listener
    console.log(order);
});