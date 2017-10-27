var email;
var password;  
var name;
var lastName;
var totalName;
var lastName;

var providerId;
var uid;
var displayName;
var profileEmail;
var photoURL;

var userFirebase;
var userFacebook;
var userGoogle;

//===============================Init Firebase======================//
//Initialize Firebase
var config = {
	apiKey: "AIzaSyDzrlNuSRMeGYAqWvFS_3h53WeFsmMNxNg",
	authDomain: "pimdaki-e16a0.firebaseapp.com",
	databaseURL: "https://pimdaki-e16a0.firebaseio.com",
	projectId: "pimdaki-e16a0",
	storageBucket: "pimdaki-e16a0.appspot.com",
	messagingSenderId: "172646261705"
};
firebase.initializeApp(config);

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
	    window.location.href = "account-dashboard.html";
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
		window.location.href = "account-dashboard.html";
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  alert(errorCode);
	});
}

function logOutUser(){
	firebase.auth().signOut().then(function() {
		window.location.href = "account-dashboard.html";
	  	console.log('Signed Out');
	}, function(error) {
	  	console.error('Sign Out Error', error);
	});
}

function uploadImageProfile(){
	var storage = firebase.storage();
	var storageRef = storage.ref();

	var user = firebase.auth().currentUser;
	var metadata = {
	  contentType: 'image/jpeg'
	};
	var uploadTask = storageRef.child(uid + file.name).put(file, metadata);
	uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
	  function(snapshot){
	    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	    console.log('Upload is ' + progress + '% done');
	    switch (snapshot.state) {
	      case firebase.storage.TaskState.PAUSED: 
	        console.log('Upload is paused');
	        break;
	      case firebase.storage.TaskState.RUNNING:
	        console.log('Upload is running');
	        break;
	    }
	  }, function(error){
	  switch (error.code) {
	    case 'storage/unauthorized':
	      break;
	    case 'storage/canceled':
	      break;
	    case 'storage/unknown':
	      break;
	  }
	}, function() {
	  	var downloadURL = uploadTask.snapshot.downloadURL;
	  	console.log(downloadURL);
	  	user.updateProfile({
		  photoURL: downloadURL
		})

		setTimeout(function(){
  			window.location.href = "account-dashboard.html";	
  		}, 1000);
	});
}

document.getElementById("file").onchange = function () {
    var reader = new FileReader();
    reader.onload = function (e) {
        // get loaded data and render thumbnail.
        document.getElementById("imgProfile").src = e.target.result;
        $( "#uploadbtn" ).removeClass( "btnUploadimg" );
    };
    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
    file = this.files[0];
};

function loginWithFacebook(){
	var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('public_profile');
    provider.addScope('user_friends');
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  var token = result.credential.accessToken;
	  var user = result.user;
	  console.log(user);
	  window.location.href = "account-dashboard.html";
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
	  	window.location.href = "account-dashboard.html";
	}).catch(function(error) {
	  	var errorCode = error.code;
	  	var errorMessage = error.message;
	  	var email = error.email;
	  	var credential = error.credential;
	});
}

$(document).ready(function() {
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
        // if (user != null) {
            
        // }
        console.log(displayName);
		if(photoURL == undefined){
			document.getElementById("imgProfile").src = "";
			console.log("undefined " + photoURL);
		}else{
			document.getElementById("imgProfile").src = photoURL;
			console.log("Con URL " + photoURL);
		}

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

	  }else {
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