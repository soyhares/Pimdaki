var order = JSON.parse(localStorage.getItem("order"));
var storedIDS = JSON.parse(localStorage.getItem("cartIDS"));
var address;
var city;
var company;
var country;
var discount;
var email;
var lastName;
var name;
var phone;
var subTotal; 
var total;
var zip;
var buyValue;

var priceInt = 0;
var storedPRICE = 0;
var storedDISCOUNT = 0;
var storedTOTALPRICE = 0;

var result;


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

function loadOrderInfo(){
	// Create Cart Elemets
    var $h0 = $("<h5>", {id:"", class:"ordertxt", text: "Nombre: " + order.name});  
    var $h1 = $("<h5>", {id:"", class:"ordertxt", text: "Apellidos: " + order.lastName});
    var $h2 = $("<h5>", {id:"", class:"ordertxt", text: "Correo: " + order.email});
    var $h3 = $("<h5>", {id:"", class:"ordertxt", text: "Teléfono: " + "+506 " +order.phone});
    var $h4 = $("<h5>", {id:"", class:"ordertxt", text: "Membresía: No Posees."});

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
}

function loadDataInCartShop(){
	console.log(storedIDS)
	for (i in storedIDS) {
		//console.log(storedIDS[i].lot)
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
	        // var $span3 = $("<span>", {id:"discount", class:"txtCartSize", text: "Descuento:  " + storedDISCOUNT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "%" });
	        var $span4 = $("<span>", {id:"total", class:"grandTotal txtCartSize", text: "Total:  " + " ₡ " + storedTOTALPRICE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")});

	        $("#Subtotal").html($span2);
	        // $("#Descuento").html($span3);
	        $("#Total").html($span4);
		});		
		
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

jQuery(document).ready(function(){
	//Function Listener
	buyValue = $("#coinChange").val().replace("/", "");
	result = (order.total / parseFloat(buyValue)).toFixed(2);
	console.log("Buy dolar value >>> "+ buyValue);
	console.log("totalOrder >>> "+ result);
	let totalOrder ={totalOrder:result};
	$.extend(totalOrder, order);
 	localStorage.setItem('order', JSON.stringify(totalOrder));
    console.log(JSON.parse(localStorage.getItem("order")));
    loadOrderInfo();
    loadDataInCartShop();
});

