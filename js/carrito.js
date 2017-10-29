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
	console.log(storedIDS)
	for (i in storedIDS) {
		console.log(storedIDS[i].lot)
		drawingCar(storedIDS[i].route,storedIDS[i].id, storedIDS[i].lot)
	}	
}

function drawingCar(category,id, quantity){
	//Creamos la consulta

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
		    console.log(storedPRICE)
		    console.log(storedTOTALPRICE)
		    console.log(storedDISCOUNT)
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
	     	var $input0 = $("<input>", {id:"lot", class:"", "type":"text", "placeholder": quantity});
	     	var $td4 = $("<td>", {id:"", class:"col-xs-2", text: "₡ " + snap.price});

	        $("#tbody_cart").append($tr);
	        $($tr).append($td0);
	        $($td0).append($btn0);
	        $($btn0).append($span0);
	        $($td0).append($span1);
	        $($span1).append($img0);
	        $($tr).append($td1);
	        $($tr).append($td2);
	        $($tr).append($td3);
	        $($td3).append($input0);
	        $($tr).append($td4);

	        var $span2 = $("<span>", {id:"subTotal", class:"txtCartSize", text: "Subtotal:  " + " ₡ " + storedPRICE});
	        var $span3 = $("<span>", {id:"discount", class:"txtCartSize", text: "Descuento:  " + storedDISCOUNT + "%" });
	        var $span4 = $("<span>", {id:"total", class:"grandTotal txtCartSize", text: "Total:  " + " ₡ " + storedTOTALPRICE});

	        $("#Subtotal").html($span2);
	        $("#Descuento").html($span3);
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


$(document).ready(function() {
	//Function Listener
	loadDataInCartShop();
	console.log(storedIDS);
	//localStorage.removeItem('cartIDS');
	//localStorage.removeItem('cartCTS');
	// console.log(category);
});