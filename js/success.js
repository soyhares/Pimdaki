var order = JSON.parse(localStorage.getItem("order"));
var storedIDS = JSON.parse(localStorage.getItem("cartIDS"));


var priceInt = 0;
var storedPRICE = 0;
var storedDISCOUNT = 0;
var storedTOTALPRICE = 0;
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

function loadDataInCartShop(){
	console.log(storedIDS);
	for (i in storedIDS){
		//console.log(storedIDS[i].lot)
		drawingCar(storedIDS[i].route,storedIDS[i].id, storedIDS[i].lot);
	}	
}

function drawingCar(category,id, quantity){
	//Creamos la consulta
	firebase.database()
	    .ref('storage/products/categories/' + category + "/" + id)
	    .on('value', function(data){
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
	     	// var $btnMin = $("<button>", {id:id, class: "btn-plus", onclick:"minQuantity(this); return false;"});
	     	// var $spanMin = $("<span>", {id:"min", class: "glyphicon glyphicon-minus"});
	     	var $input0 = $("<input>", {id: id, class: category, "type":"number", "min":"1", "max":"15", "placeholder": quantity, "readonly": ""});
	     	// var $btnPlus = $("<button>", {id:id, class: "btn-min", onclick:"plusQuantity(this); return false;"});
	     	// var $spanPlus = $("<span>", {id:"plus", class: "glyphicon glyphicon-plus"});
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
	        // $($td3).append($btnMin);
	        // $($btnMin).append($spanMin);
	        $($td3).append($input0);
	        // $($td3).append($btnPlus);
	        // $($btnPlus).append($spanPlus);

	        $($tr).append($td4);

	        var $span2 = $("<span>", {id:"subTotal", class:"txtCartSize", text: "Subtotal:  " + " ₡ " + storedPRICE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")});
	        // var $span3 = $("<span>", {id:"discount", class:"txtCartSize", text: "Descuento:  " + storedDISCOUNT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "%" });
	        var $span4 = $("<span>", {id:"total", class:"grandTotal txtCartSize", text: "Total:  " + " ₡ " + storedTOTALPRICE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")});

	        $("#Subtotal").html($span2);
	        // $("#Descuento").html($span3);
	        $("#Total").html($span4);
		});				
}

function printPage(){
	window.print();
}

function cleanOrder(){
	localStorage.removeItem('order');
	localStorage.removeItem('cartIDS');
	setTimeout(function(){
		window.location.href = 'index.html';
	},2000);
}

jQuery(document).ready(function(){
	order = JSON.parse(localStorage.getItem("order"));
    console.log(order);
  
	// Create Cart Elemets
    var $h0 = $("<h5>", {id:"", class:"ordertxt", text: "Nombre: " + order.name});  
    var $h1 = $("<h5>", {id:"", class:"ordertxt", text: "Apellidos: " + order.lastName});
    var $h2 = $("<h5>", {id:"", class:"ordertxt", text: "Correo: " + order.email});
    var $h3 = $("<h5>", {id:"", class:"ordertxt", text: "Teléfono: " + "+506 " +order.phone});
    // var $h4 = $("<h5>", {id:"", class:"ordertxt", text: "Membresía: No Posees."});

    $("#info_compra").append($h0);
    $("#info_compra").append($h1);
    $("#info_compra").append($h2);
    $("#info_compra").append($h3);
    // $("#info_compra").append($h4);

    // Create Cart Elemets
    var $h5 = $("<h5>", {id:"", class:"ordertxt", text: "País: " + order.country});  
    var $h6 = $("<h5>", {id:"", class:"ordertxt", text: "Provincia: " + order.city});
    var $h7 = $("<h5>", {id:"", class:"ordertxt", text: "Dirección Exacta: " + order.address});
    var $h8 = $("<h5>", {id:"", class:"ordertxt", text: "Cantón: " + order.zip});

    $("#info_envío").append($h5);
    $("#info_envío").append($h6);
    $("#info_envío").append($h7);
    $("#info_envío").append($h8);

    // Create Cart Elemets
    var $span0 = $("<span>", {id:"", class:"", text: "Compañía: " + order.company});  
    var $br0 = $("<br>", {id:""});
    var $span1 = $("<span>", {id:"", class:"", text: "Costo: " + "₡ " + order.value});
    var $br1 = $("<br>", {id:""});
    var $span2 = $("<span>", {id:"", class:"", text: "Contacto: +506 2502-4567"});

    $("#compañía_envío").append($span0);
    $($span0).append($br0);
    $("#compañía_envío").append($span1);
    $($span1).append($br1);
    $("#compañía_envío").append($span2);

    // Create Order ID Elemets
    var $hOrder = $("<h2>", {id:"orderID", class:"", text: order.id});  
    var $smallOrder = $("<small>", {id:"", class:"", text: "Número de Orden"});

    $($hOrder).append($smallOrder);
	$("#wellDone").append($hOrder);

	//Function Listener
	loadDataInCartShop();
		
});