var order = JSON.parse(localStorage.getItem("order"));
var billing = {};
var config = {
  apiKey: "AIzaSyDzrlNuSRMeGYAqWvFS_3h53WeFsmMNxNg",
  authDomain: "pimdaki-e16a0.firebaseapp.com",
  databaseURL: "https://pimdaki-e16a0.firebaseio.com",
  projectId: "pimdaki-e16a0",
  storageBucket: "",
  messagingSenderId: "172646261705"
};
firebase.initializeApp(config);


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
  var uid = $('#uid').val();
	billing = { 
    userId:uid,
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

function loginWithFacebook(){
  var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('public_profile');
    provider.addScope('user_friends');
    firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorMessage)
  });
}

function loginWithGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
      
  }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorMessage)
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


function getCurrentUser(){
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

      var user = firebase.auth().currentUser;
      let fullName = user.displayName.split(" ");
      $('#uid').val(user.uid);
      $('#name').val(fullName[0]);
      $('#lastName').val(fullName[1]);
      $('#email').val(user.email);
      //$('#phone').val(user.phoneNumber);
     
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
}

jQuery(document).ready(function(){
  //Function Listener
     
  //validateForm("pindaki_form");
  $("#btn_next").click(()=>validateData()?getDataOfBilling():console.log("input invalid"))
  
  getCurrentUser();
  loadForm();
  console.log(order);  
});

