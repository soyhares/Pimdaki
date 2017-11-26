//Variables
var category = localStorage.getItem('category');
var productId = localStorage.getItem('productId');
//...
var storedIDS = JSON.parse(localStorage.getItem("cartIDS"));
var storedCTS = JSON.parse(localStorage.getItem("cartCTS"));
var order = {};
var cartIDS = [];
var cartCTS = [];
var deleteID; 
var priceInt = 0;
var storedPRICE = 0;
var storedDISCOUNT = 0;
var storedTOTALPRICE = 0;
var quantity = "";

var materials = {};
var colors = {};
var catalog = {};

var url0, url1, url2, url3;
var array = [];
var array2 = [];
var arrayid = [];
var arrayid2 = [];
var validator;
var randomSnap = [];

var category,subCategory,id,barCode,name,model,lot,price,oldPrice,tradeMark,size,description;

var bag = [];


//===============================Init Firebase======================//
// Initialize Firebase
var config = {
	apiKey: "AIzaSyDzrlNuSRMeGYAqWvFS_3h53WeFsmMNxNg",
	authDomain: "pimdaki-e16a0.firebaseapp.com",
	databaseURL: "https://pimdaki-e16a0.firebaseio.com",
	projectId: "pimdaki-e16a0",
	storageBucket: "pimdaki-e16a0.appspot.com",
	messagingSenderId: "172646261705"
};
firebase.initializeApp(config);

function loadDataInCartShop(){
	for (i in storedIDS) {
		console.log(storedIDS[i].lot)
		drawingCar(storedIDS[i].route,storedIDS[i].id, storedIDS[i].lot)
	}	
}

function drawingCar(category,id, quantity){
	//Creamos la consulta
		console.log(category + " " + id + " " + quantity)
	    firebase.database()
	    .ref('storage/products/categories/' + category + "/" + id)
	    .on('value', function(data) {
		    //Cargamos el objeto y sus atributos 
		    var snap = data.val();
		    id = data.key;
		  
		    console.log(quantity);
		  
		    priceInt = parseInt(snap.price) * parseInt(quantity);
		    storedPRICE += priceInt;
		    storedTOTALPRICE = storedPRICE + storedDISCOUNT;
		    

		    // Create Cart Elemets
		   	var $tr = $("<tr>", {id:"", class:""});
	     	var $td0 = $("<td>", {id:"", class:"col-xs-2"});
	     	var $btn0 = $("<button>", {id: id, "type":"button", class:"close", onclick:'advisorWarningDelete(this.id)', "aria-label":"Close"});     	
	     	var $span0 = $("<span>", {id:"", "aria-hidden":"true", text: "x"});
	     	var $span1 = $("<span>", {id:"", class:"cartImage"});
	     	var $img0 = $("<img>", {id:"", class:"imWidth", src: snap.catalog[0], alt:"cart image"});

	     	var $td1 = $("<td>", {id:"", class:"col-xs-4", text: snap.name});
	     	var $td2 = $("<td>", {id:"", class:"col-xs-2", text: id});
	     	var $td3 = $("<td>", {id:"", class:"col-xs-2"});
	     	var $btnMin = $("<button>", {id:id, class: "btn-plus", onclick:"minQuantity(this); return false;"});
	     	var $spanMin = $("<span>", {id:"min", class: "glyphicon glyphicon-minus"});
	     	var $input0 = $("<input>", {id: id, class: category, "type":"number", "min":"1", "max":"15", "placeholder": quantity, "readonly": ""});
	     	var $btnPlus = $("<button>", {id:id, class: "btn-min", onclick:"plusQuantity(this); return false;"});
	     	var $spanPlus = $("<span>", {id:"plus", class: "glyphicon glyphicon-plus"});
	     	var $td4 = $("<td>", {id:"", class:"col-xs-2", text: "₡ " + snap.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")});

	        $("#tbody_cart").append($tr);
	        $($tr).append($td0);
	        $($td0).append($btn0);
	        $($btn0).append($span0);
	        $($td0).append($span1);
	        $($span1).append($img0);
	        $($tr).append($td1);
	        $($tr).append($td2);
	        $($tr).append($td3);
	        $($td3).append($btnMin);
	        $($btnMin).append($spanMin);
	        $($td3).append($input0);
	        $($td3).append($btnPlus);
	        $($btnPlus).append($spanPlus);


	        $($tr).append($td4);

	        var $span2 = $("<span>", {id:"subTotal", class:"txtCartSize", text: "Subtotal:  " + " ₡ " + storedPRICE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")});
	        var $span3 = $("<span>", {id:"discount", class:"txtCartSize", text: "Descuento:  " + storedDISCOUNT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "%" });
	        var $span4 = $("<span>", {id:"total", class:"grandTotal txtCartSize", text: "Total:  " + " ₡ " + storedTOTALPRICE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")});

	        $("#Subtotal").html($span2);
	        // $("#Descuento").html($span3);
	        $("#Total").html($span4);
		});		
}

function getPricingData(){
	order = {
		subTotal: storedPRICE,
		discount: storedDISCOUNT,
		total: storedTOTALPRICE
	}
	localStorage.setItem("order", JSON.stringify(order));
	console.log(order);
	window.location.href = 'checkout-step-1.html'; 
}

function advisorWarningDelete(id){
	deleteID = id;
	var index = storedIDS.findIndex(x => x.id == id);
	$('#warning').modal('show');
	if (id != ""){
		$("#delete-img").empty();
		$("#delete-body").empty();

		firebase.database().ref('storage/products/categories/' + storedIDS[index].route + "/" + storedIDS[index].id).on('value', function(data) {
		    //Cargamos el objeto y sus atributos 
		    var snap = data.val();
		    id = data.key;

		    // Create Cart Elemets
		    var $img0 = $("<img>", {id:"", "class":"media-object", "alt":"Sample Image", src:snap.catalog[0]});
		    var $h0 = $("<h2>", {id:"", class:"media-heading text-warning", text: snap.name});
		    var $h1 = $("<h4>", {id:"", class:"deleteText", text: snap.description});

	        $("#delete-img").append($img0);
	        $("#delete-body").append($h0);
	        $("#delete-body").append($h1);
		});
	}else{
		firebase.database().ref('storage/products/categories/' + storedIDS[index].route + "/" + storedIDS[index].id).on('value', function(data) {
		    //Cargamos el objeto y sus atributos 
		    var snap = data.val();
		    id = data.key;

		    // Create Cart Elemets
		    var $img0 = $("<img>", {id:"", "class":"media-object", "alt":"Sample Image", src: snap.catalog[0]});
		    var $h0 = $("<h2>", {id:"", class:"media-heading text-warning", text: snap.name});
		    var $h1 = $("<h4>", {id:"", class:"deleteText", text: snap.description});

	        $("#delete-img").append($img0);
	        $("#delete-body").append($h0);
	        $("#delete-body").append($h1);
		});
	}
}
// storedIDS.splice(index, 1);
// localStorage.setItem("cartIDS", JSON.stringify(storedIDS));
function deleteProductInCart(){
	$('#warning').modal('hide');
	if (deleteID != null ){
		if (storedIDS != null) {
			var index = storedIDS.findIndex(x => x.id == deleteID);
			storedIDS.splice(index, 1);
			localStorage.setItem("cartIDS", JSON.stringify(storedIDS));
			location.reload();
		}
	} 
}


function createUserWithEmailAndPassword(){
	var nameReg = /^[A-Za-z]+$/;
    var numberReg =  /^[0-9]+$/;
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

   	name = $("#name").val();
	lastName = $("#lastName").val();
	totalName = name + " " + lastName;
	email = $("#email").val();
	password = $("#password").val();
	repassword = $("#repassword").val();

    var inputVal = new Array(name, lastName, email, password, repassword);
    var inputMessage = new Array("Nombre", "Apellidos", "Correo", "Contraseña", "Contraseña");

    $('.error').hide();
    if(inputVal[0] == ""){
        $('#name').after('<span class="error">Por favor ingresa tu ' + inputMessage[0] + '</span>');
        return;
    }else if(inputVal[0].length < 2){
        $('#name').after('<span class="error">Debe contener almenos 2 letras</span>');
        return;
    }else if(numberReg.test(name)){
        $('#name').after('<span class="error">Únicamente letras</span>');
        return;
    }

    if(inputVal[1] == ""){
        $('#lastName').after('<span class="error">Por favor ingresa tu ' + inputMessage[1] + '</span>');
        return;
    }else if(inputVal[1].length < 2){
        $('#lastName').after('<span class="error">Debe contener almenos 2 letras</span>');
        return;
    }else if(numberReg.test(lastName)){
        $('#lastName').after('<span class="error">Únicamente letras</span>');
        return;
    }

    if(inputVal[2] == ""){
        $('#email').after('<span class="error">Por favor ingresa tu ' + inputMessage[2] + '</span>');
        return;
    }else if(!emailReg.test(email)){
        $('#email').after('<span class="error">Ingresa un email válido</span>');
        return;
    }

    if(inputVal[3] == ""){
        $('#password').after('<span class="error">Por favor ingresa una ' + inputMessage[3] + '</span>');
        return;
    }else if(inputVal[3].length < 6 ){
        $('#password').after('<span class="error">Debe contener almenos 6 caracteres</span>');
        return;
    } 
   
    if(inputVal[4] == ""){
        $('#repassword').after('<span class="error">Por favor repite la ' + inputMessage[4] + '</span>');
        return;
    }else if(inputVal[4] != inputVal[3]){
        $('#repassword').after('<span class="error">Debe ser la misma contraseña</span>');
        return;
    } 

	console.log(email + ", " + password);
	firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
	    window.location.href = "index.html";
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...
	  alert(errorCode);
	  alert(errorMessage);
	});
}

function loginWithEmailAndPassword(){
	var nameReg = /^[A-Za-z]+$/;
    var numberReg =  /^[0-9]+$/;
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

   	email = $("#logmail").val();
	password = $("#logpass").val();

    var inputVal = new Array(email, password);
    var inputMessage = new Array("Correo", "Contraseña");

    $('.error').hide();
    if(inputVal[0] == ""){
        $('#logmail').after('<span class="error">Por favor ingresa tu ' + inputMessage[0] + '</span>');
        return;
    }else if(!emailReg.test(email)){
        $('#logmail').after('<span class="error">Ingresa un correo válido</span>');
        return;
    }

    if(inputVal[1] == ""){
        $('#logpass').after('<span class="error">Por favor ingresa tu ' + inputMessage[1] + '</span>');
        return;
    }else if(inputVal[1].length < 6){
        $('#logpass').after('<span class="error">Debe contener almenos 6 caracteres</span>');
        return;
    }

	
	firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
		window.location.href = "index.html";
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  alert(errorCode);
	});
}

function logOutUser(){
	firebase.auth().signOut().then(function() {
		window.location.href = "index.html";
	  	console.log('Signed Out');
	}, function(error) {
	  	console.error('Sign Out Error', error);
	});
}

function loginWithFacebook(){
	var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('public_profile');
    provider.addScope('user_friends');
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  var token = result.credential.accessToken;
	  var user = result.user;
	  console.log(user);
	  window.location.href = "index.html";
	  // document.getElementById("imgProfile").src = photoURL;
	}).catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  var email = error.email;
	  var credential = error.credential;
	});
}

function loginWithGoogle(){
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
	 	var token = result.credential.accessToken;
	  	var user = result.user;
	  	console.log(user);
	  	window.location.href = "index.html";
	}).catch(function(error) {
	  	var errorCode = error.code;
	  	var errorMessage = error.message;
	  	var email = error.email;
	  	var credential = error.credential;
	});
}

function showProfile(){
    $('#logout').modal('show');

    var $img = $("<img>", {id:"", class:"img-circle", src: photoURL});
    var $text = $("<h3>", {id:"", class:"", text: displayName});

    $("#eleOfBody").append($img);
    $("#eleOfBody").append($text);
}

function minQuantity(arg){
	console.log(arg)
	var idArg = arg.getAttribute('id');
	var categoryArg = $('input[id=' + idArg + ']').attr("class");
	console.log(idArg)
 	var valueArg = $('input[id=' + idArg + ']').attr("placeholder");
 	console.log(valueArg)
 	var argPrice;

 	firebase.database()
    .ref('storage/products/categories/' + categoryArg + "/" + idArg)
    .on('value', function(data) {
	    //Cargamos el objeto y sus atributos 
	    var snap = data.val();
	    id = data.key;
	    argPrice = snap.price;
	});
 
 	if(valueArg > 1 && valueArg < 30){
 		console.log(categoryArg);
 		$('input[id=' + idArg + ']').attr("placeholder", "");
 		valueArg = parseInt(valueArg) - 1;

 		setTimeout(function(){
 			$('input[id=' + idArg + ']').attr("placeholder", valueArg);
 		}, 100);

 		// priceInt = parseInt(argPrice) * parseInt(valueArg);
	    storedPRICE -= parseInt(argPrice);
	    storedTOTALPRICE -= parseInt(argPrice);

	    // console.log(priceInt);
	    console.log(storedPRICE);
	    console.log(storedTOTALPRICE);
	    var $span2 = $("<span>", {id:"subTotal", class:"txtCartSize", text: "Subtotal:  " + " ₡ " + storedPRICE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")});
	    // var $span3 = $("<span>", {id:"discount", class:"txtCartSize", text: "Descuento:  " + storedDISCOUNT + "%" });
	    var $span4 = $("<span>", {id:"total", class:"grandTotal txtCartSize", text: "Total:  " + " ₡ " + storedTOTALPRICE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")});

	    $("#Subtotal").html($span2);
	    // $("#Descuento").html($span3);
	    $("#Total").html($span4);	
 	}else if(valueArg == 30){
 		console.log(categoryArg);
 		$('input[id=' + idArg + ']').attr("placeholder", "");
 		valueArg = parseInt(valueArg) - 1;

 		setTimeout(function(){
 			$('input[id=' + idArg + ']').attr("placeholder", valueArg);
 		}, 100);

 		// priceInt = parseInt(argPrice) * parseInt(valueArg);
	    storedPRICE -= parseInt(argPrice);
	    storedTOTALPRICE -= parseInt(argPrice);

	    // console.log(priceInt);
	    console.log(storedPRICE);
	    console.log(storedTOTALPRICE);
	    var $span2 = $("<span>", {id:"subTotal", class:"txtCartSize", text: "Subtotal:  " + " ₡ " + storedPRICE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")});
	    // var $span3 = $("<span>", {id:"discount", class:"txtCartSize", text: "Descuento:  " + storedDISCOUNT + "%" });
	    var $span4 = $("<span>", {id:"total", class:"grandTotal txtCartSize", text: "Total:  " + " ₡ " + storedTOTALPRICE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")});

	    $("#Subtotal").html($span2);
	    // $("#Descuento").html($span3);
	    $("#Total").html($span4);
 	}
}	

function plusQuantity(arg){
	console.log(arg)
	var idArg = arg.getAttribute('id');
	console.log(idArg)
	var categoryArg = $('input[id=' + idArg + ']').attr("class");
	console.log(categoryArg)
 	var valueArg = $('input[id=' + idArg + ']').attr("placeholder");
 	console.log(valueArg)
 	var argPrice;

 	firebase.database()
    .ref('storage/products/categories/' + categoryArg + "/" + idArg)
    .on('value', function(data) {
	    //Cargamos el objeto y sus atributos 
	    var snap = data.val();
	    id = data.key;
	    argPrice = snap.price;
	});

 	if(valueArg > 1 && valueArg < 30){
 		console.log(categoryArg);
 		$('input[id=' + idArg + ']').attr("placeholder", "");
 		valueArg = parseInt(valueArg) + 1;

 		setTimeout(function(){
 			$('input[id=' + idArg + ']').attr("placeholder", valueArg);
 		}, 100);

 		// priceInt = parseInt(argPrice) * parseInt(valueArg);
	    storedPRICE += parseInt(argPrice);
	    storedTOTALPRICE += parseInt(argPrice);

	    // console.log(priceInt);
	    console.log(storedPRICE);
	    console.log(storedTOTALPRICE);
	    var $span2 = $("<span>", {id:"subTotal", class:"txtCartSize", text: "Subtotal:  " + " ₡ " + storedPRICE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")});
	    // var $span3 = $("<span>", {id:"discount", class:"txtCartSize", text: "Descuento:  " + storedDISCOUNT + "%" });
	    var $span4 = $("<span>", {id:"total", class:"grandTotal txtCartSize", text: "Total:  " + " ₡ " + storedTOTALPRICE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")});

	    $("#Subtotal").html($span2);
	    // $("#Descuento").html($span3);
	    $("#Total").html($span4);	
 	}else if(valueArg == 1){
 		console.log(categoryArg);
 		$('input[id=' + idArg + ']').attr("placeholder", "");
 		valueArg = parseInt(valueArg) + 1;

 		setTimeout(function(){
 			$('input[id=' + idArg + ']').attr("placeholder", valueArg);
 		}, 100);

 		// priceInt = parseInt(argPrice) * parseInt(valueArg);
	    storedPRICE += parseInt(argPrice);
	    storedTOTALPRICE += parseInt(argPrice);

	    // console.log(priceInt);
	    console.log(storedPRICE);
	    console.log(storedTOTALPRICE);
	    var $span2 = $("<span>", {id:"subTotal", class:"txtCartSize", text: "Subtotal:  " + " ₡ " + storedPRICE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")});
	    // var $span3 = $("<span>", {id:"discount", class:"txtCartSize", text: "Descuento:  " + storedDISCOUNT + "%" });
	    var $span4 = $("<span>", {id:"total", class:"grandTotal txtCartSize", text: "Total:  " + " ₡ " + storedTOTALPRICE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")});

	    $("#Subtotal").html($span2);
	    // $("#Descuento").html($span3);
	    $("#Total").html($span4);	
 	}
}


$(document).ready(function() {
	//Function Listener
	loadDataInCartShop();
	console.log(storedIDS);

	if (storedIDS.length < 1){
		$("#checkoutbtn").addClass("btn-is-disabled");
	}
	
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	  	var user = firebase.auth().currentUser; 
	  	user.providerData.forEach(function (profile) {
	        providerId = profile.providerId;
	        uid = profile.uid;
	        displayName = profile.displayName;
	        profileEmail = profile.email;
	        photoURL = profile.photoURL;
	    });
  
		$($span0).detach();
	    $($a0).detach();
	    $($small).detach();
	    $($a1).detach();

		var $a = $("<a>", {id:"displayName", class:"logText", "data-toggle":"modal", href:"#", onclick:"showProfile()", text: " " + user.displayName});
		var $i0 = $("<i>", {id:"userLogo", class:"fa fa-user", "style":"color: white;"});
	    $("#loggedInfo").append($i0);
	    $("#loggedInfo").append($a);

	    var $span = $("<span>", {id:"", class:"", text: user.displayName});
	    $("#userName").append($span);

	    var $li0 = $("<li>", {id:"", class:"dropdown"});
	    var $a2 = $("<a>", {id:"", class:"", href:"account-profile.html", text:"Mi Perfil"});
	    $("#ulIndex").append($li0);
	    $($li0).append($a2);

	  }else {

	  	$($li0).detach();
	  	$($a2).detach();
	  	$($i0).detach();
	  	$($a).detach(); 	

	  	var $span0 = $("<span>", {id:"loginSingUp"});
	  	var $a0 = $("<a>", {id:"", "data-toggle":"modal", href:"#login", text:"Ingresar"});
	  	var $small = $("<small>", {id:"", text:"ó"});
	  	var $a1 = $("<a>", {id:"", "data-toggle":"modal", href:"#signup", text:"Registrarse"});

	  	setTimeout(function(){
	  		$("#loggedInfo").append($span0);
		    $($span0).append($a0);
		    $($span0).append($small);
		    $($span0).append($a1);
	  	}, 500);
	   
	    console.log("Log out");
	  }
	});

	// localStorage.removeItem('cartIDS');
	// localStorage.removeItem('cartCTS');
	// console.log(category);
});