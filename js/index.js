// Variables
//...
var storedIDS = JSON.parse(localStorage.getItem("cartIDS"));
var cartIDS = [];
var oldID;

var bag = [];

var providerId;
var uid;
var displayName;
var profileEmail;
var photoURL;
 
//===============================Init Firebase======================
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


function getDataOfProduct(){
    var ref = firebase.database().ref('storage/products/categories/Hogar y Cocina/Accesorios Cocina').limitToLast(3);
	//Creamos la consulta 
	ref.on('child_added', function(data) {
        //Cargamos el objeto y sus atributos 
        var snap = data.val();
        id = data.key;
        console.log(snap);

        
	}); 
}

// Custom Code
$("#home_category li a").click(function(e) {
	e.preventDefault();
	if (this.id != ""){
	    localStorage.setItem('category', this.id);
	    //Nos redireccionamos a la pagina Details
	    window.location.href = 'product-grid-left-sidebar.html';
	}
});

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

jQuery(document).ready(function(){
	//Function Listener
	console.log(storedIDS);
	getDataOfProduct();

	//Function Listener
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

	    console.log(displayName);
	    console.log(photoURL);
  
		$($span0).detach();
	    $($a0).detach();
	    $($small).detach();
	    $($a1).detach();

		var $a = $("<a>", {id:"displayName", class:"logText", "data-toggle":"modal", href:"#logout", text: " " + user.displayName});
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
});