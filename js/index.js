// Variables
//...
var storedIDS = JSON.parse(localStorage.getItem("cartIDS"));
var cartIDS = [];
var oldID;

var bag = [];

//===============================Init Firebase======================
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

// Custom Code
$("#home_category li a").click(function(e) {
	e.preventDefault();
	if (this.id != ""){
	    localStorage.setItem('category', this.id);
	    //Nos redireccionamos a la pagina Details
	    window.location.href = 'product-grid-left-sidebar.html';
	}
});

jQuery(document).ready(function(){
	//Function Listener
	console.log(storedIDS);
});