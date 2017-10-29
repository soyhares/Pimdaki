var order = JSON.parse(localStorage.getItem("order"));
var billing = {};

function validateData(){
	var nameReg = /^[A-Za-z]+$/;
   var numberReg =  /^[0-9]+$/;
   var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   
  	name = $("#name").val();
	lastName = $("#lastName").val();
	totalName = name + " " + lastName;
	email = $("#email").val();
	password = $("#password").val();
	repassword = $("#repassword").val();
	phone = $("#phone").val();

   var inputVal = new Array(name, lastName, email, password, repassword,phone);
   var inputMessage = new Array("Nombre", "Apellidos", "Correo", "Contraseña", "Contraseña","teléfono");

   $('.error').hide();
   if(inputVal[0] == ""){
       $('#name').after('<span class="error" style="color:red;position:absolute">Por favor ingresa tu ' + inputMessage[0] + '</span>');
       return false;
   }else if(inputVal[0].length < 2){
       $('#name').after('<span class="error" style="color:red">Debe contener almenos 2 letras</span>');
       return false;
   }else if(numberReg.test(name)){
       $('#name').after('<span class="error" style="color:red;position:absolute">Únicamente letras</span>');
       return false;
   }

   if(inputVal[1] == ""){
       $('#lastName').after('<span class="error" style="color:red;position:absolute">Por favor ingresa tu ' + inputMessage[1] + '</span>');
       return false;
   }else if(inputVal[1].length < 2){
       $('#lastName').after('<span class="error" style="color:red;position:absolute">Debe contener almenos 2 letras</span>');
       return false;
   }else if(numberReg.test(lastName)){
       $('#lastName').after('<span class="error" style="color:red;position:absolute">Únicamente letras</span>');
       return false;
   }

   if(inputVal[2] == ""){
       $('#email').after('<span class="error" style="color:red">Por favor ingresa tu ' + inputMessage[2] + '</span>');
       return;
   }else if(!emailReg.test(email)){
       $('#email').after('<span class="error" style="color:red">Ingresa un email válido</span>');
       return false;
   }

   if(inputVal[5] == ""){
       $('#phone').after('<span class="error" style="color:red">Por favor ingresa tu ' + inputMessage[5] + '</span>');
       return false;
   }else if(!numberReg.test(phone)){
       $('#phone').after('<span class="error" style="color:red">Ingresa un número telefonico válido</span>');
       return false;
   }else if(inputVal[5].length != 8){
       $('#phone').after('<span class="error" style="color:red">Ingresa un número con 8 digitos</span>');
       return false;
   }

   return true
}

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


function loadForm(){
	
	//window.history.back();
	if(order!=null){
		
		$('#name').val(order.name);
		$('#lastName').val(order.lastName);
		$('#email').val(order.email);
		$('#phone').val(order.phone);
	}
	
}


jQuery(document).ready(function(){
	//Function Listener
    console.log(order);   
	//validateForm("pindaki_form");
	$("#btn_next").click(()=>validateData()?getDataOfBilling():console.log("input invalid"))
	loadForm();
    
});


function validateForm(form, navigate){
	 jQuery.validator.addMethod("phone", function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 7 && phone_number.match("[0-9]+");
    }, "Please specify a valid phone number");
	//mensajes de error
	jQuery.extend(jQuery.validator.messages, {
	  required: "Este campo es obligatorio.",
	  remote: "Por favor, rellena este campo.",
	  email: "Por favor, escribe una dirección de correo válida",
	  url: "Por favor, escribe una URL válida.",
	  date: "Por favor, escribe una fecha válida.",
	  dateISO: "Por favor, escribe una fecha (ISO) válida.",
	  number: "Por favor, escribe un número entero válido.",
	  digits: "Por favor, escribe sólo dígitos.",
	  creditcard: "Por favor, escribe un número de tarjeta válido.",
	  equalTo: "Por favor, escribe el mismo valor de nuevo.",
	  accept: "Por favor, escribe un valor con una extensión aceptada.",
	  maxlength: jQuery.validator.format("Por favor, no escribas más de {0} caracteres."),
	  minlength: jQuery.validator.format("Por favor, no escribas menos de {0} caracteres."),
	  rangelength: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
	  range: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1}."),
	  max: jQuery.validator.format("Por favor, escribe un valor menor o igual a {0}."),
	  min: jQuery.validator.format("Por favor, escribe un valor mayor o igual a {0}."),
	  phone:jQuery.validator.format("Por favor, escribe un numero telefonico valido."),
	});

	/* $('#'+form+ ' input[type="text"]').tooltipster({ //find more options on the tooltipster page
        trigger: 'custom', // default is 'hover' which is no good here
        onlyOne: false,    // allow multiple tips to be open at a time
        position: 'top',
        animation: 'grow', 
        theme: ['tooltipster-light'] //put your themes here
    });*/

	//reglas del form
	$('#'+form).validate({ // initialize the plugin
       /* errorPlacement: function (error, element) {
            if (error[0].innerHTML != null && error[0].innerHTML !== "") {
                $(element).tooltipster('content', $(error).text());
                $(element).tooltipster('open'); //open only if the error message is not blank. By default jquery-validate will return a label with no actual text in it so we have to check the innerHTML.
            }
        },
        success: function (label, element) {
            var obj = $(element);
            if (obj.hasClass('tooltipstered') && obj.hasClass('error')) {
                $(element).tooltipster('close'); //hide no longer works in v4, must use close
            }   
        },*/
        rules: {
            email: {
                required: true,
                email: true
            },
            name: {
                required: true,
	            minlength: 5,
	            maxlength: 15
            },
            lastName:{
            	required: true,
	            minlength: 5,
	            maxlength: 15
            },
            phone: {
            	required: true,
            	phone: true,
            	minlength:8,
            	maxlength:8
            	}

        },
       errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function(error, element) {
            offset = element.offset();
            error.insertBefore(element)
            error.addClass('message');  // add a class to the wrapper
            error.css('color', 'red');
            error.css('left', offset.left + element.outerWidth());
            error.css('top', offset.top);
        },
       
    });



}
/*



         errorPlacement: function(error, element) {
				errors += error.toString()+"\n";
			},
			showErrors: function(errorMap, errorList){
				this.defaultShowErrors();
				alert(errors);
			}
 */

/*
$('#pindaki_form').validate({
          rules: {
            email: {
              minlength: 3,
              required: true
            },
            name:{
              minlength: 3,
              required: true
            }
          },
          showErrors: function(errorMap, errorList) {
            $.each(this.successList, function(index, value) {
              return $(value).popover("hide");
            });
            return $.each(errorList, function(index, value) {
              var _popover;
              console.log(value.message);
              _popover = $(value.element).popover({
                trigger: "manual",
                placement: "top",
                content: value.message,
                template: "<div class=\"popover\"><div class=\"arrow\"></div><div class=\"popover-inner\"><div class=\"popover-content\"><p></p></div></div></div>"
              });
              _popover.data("popover").options.content = value.message;
              return $(value.element).popover("show");
            });
          }});
 */