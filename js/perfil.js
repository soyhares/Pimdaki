var email;
var password; 
var name;
var lastName;
var totalName;
var lastName;

//===============================Init Firebase======================//
// Initialize Firebase
var config = {
	apiKey: "AIzaSyDzrlNuSRMeGYAqWvFS_3h53WeFsmMNxNg",
	authDomain: "pimdaki-e16a0.firebaseapp.com",
	databaseURL: "https://pimdaki-e16a0.firebaseio.com",
	projectId: "pimdaki-e16a0",
	storageBucket: "",
	messagingSenderId: "172646261705"
};
firebase.initializeApp(config);

function createUserWithEmailAndPassword(){
	name = $("#name").val();
	lastName = $("#lastName").val();
	totalName = name + " " + lastName;
	email = $("#email").val();
	password = $("#password").val();
	console.log(email + ", " + password);
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...
	  alert(errorCode);
	  alert(errorMessage);
	});
}

$(document).ready(function() {
	//Function Listener
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	  	user.updateProfile({
		  displayName: totalName
		}).then(function() {
		  var displayName = user.displayName;
		  var photoURL = user.photoURL;
		}, function(error) {

		});

		var $span0 = $("<span>", {id:"", class:"logText", text: user.displayName});
	    $("#loggedInfo").append($span0);

	    console.log(user.displayName + " " +"Logged In");
	  } else {
	  	var $span0 = $("<span>", {id:""});
	  	var $a0 = $("<a>", {id:"", "data-toggle":"modal", "href":".login-modal", text:"Ingresar"});
	  	var $small = $("<small>", {id:"", text:"ó"});
	  	var $a1 = $("<a>", {id:"", "data-toggle":"modal", "href":"#signup", text:"Registrarse"});

	    $("#loggedInfo").append($span0);
	    $($span0).append($a0);
	    $($a0).append($small);
	    $($small).append($a1);


	    console.log("Log out");
	  }
	});
});