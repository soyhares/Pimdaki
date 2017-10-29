//Variables
var category = localStorage.getItem('category');
//...
var storedIDS = JSON.parse(localStorage.getItem("cartIDS"));
var storedCTS = JSON.parse(localStorage.getItem("cartCTS"));
var cartIDS = [];
var cartCTS = [];
var oldID;

var materials = {}; 
var colors = {}; 
var catalog = {};
var quantity = "1";

var category,subCategory,id,barCode,name,model,lot,price,oldPrice,tradeMark,size,description;

var bag = []; 

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
	console.log(storedIDS);
	//Creamos la consulta 
	firebase.database().ref('storage/products/categories/' + category).on('child_added', function(data) {
	    //Cargamos el objeto y sus atributos 
	    var snap = data.val();
	    id = data.key;
	    // console.log(id);
	    console.log(data.val());

	    //Create ele dinamically
	    var $divParent = $("<div>", {id: "", "class": "col-xs-12"});
        var $div0 = $("<div>", {id: "", "class": "media animated bounceIn"});
        var $div1 = $("<div>", {id: "", "class": "media-left"});
        var $img0 = $("<img>", {id: "img0", "class": "media-object","src": snap.catalog[0]});
        var $span0 = $("<span>", {id: "", "class": "maskingImage"});
        var $a0 = $("<a>", {id: id, class:"btn viewBtn", onclick:'quickViewModal(this.id)', text: "Vista Previa"});
        var $div2 = $("<div>", {id: "", class:"media-body"});
        var $h0 = $("<h4>", {id:"", class: "media-heading"});
        var $a1 = $("<a>", {id: id, onclick:'singleProduct(this.id)', "href":"#", text: snap.name});
        var $p0 = $("<p>", {id:"", text: snap.description});
        var $h1 = $("<h3>", {id:"", text: "₡ " + snap.price});
        var $div3 = $("<div>", {id:"", class:"btn-group", "role":"group"});
        var $btn0 = $("<button>", {id:"", "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar a Favoritos", "type":"button", class:"btn btn-default", "data-toggle":"modal", "data-target":".login-modal"});
        var $i0 = $("<i>", {id:"", class:"fa fa-heart", "aria-hidden":"true"});
        var $btn1 = $("<button>", {id:id, "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar al Carrito", "type":"button", class:"btn btn-default", onclick:'addToShoppingCart(this.id)'});
        var $i1 = $("<i>", {id:"", class:"fa fa-shopping-cart", "aria-hidden":"true"});


        // Los cargamos en pantalla 
        $($divParent).append($div0);
        $($div0).append($div1);
        $($div1).append($img0);
        $($div1).append($span0);
        $($span0).append($a0);
        $($div0).append($div2);
        $($div2).append($h0);
        $($h0).append($a1);
        $($div2).append($p0);
        $($div2).append($h1);
        $($div2).append($div3);
        $($div3).append($btn0);
        $($btn0).append($i0);
        $($div3).append($btn1);
   		$($btn1).append($i1);

        $("#catalog_parend_list").append($divParent); 

	});
	setTimeout(function(){ $('#spinner').hide(); }, 600);
}

// Custom Code
$("#list_left_category li a").click(function(e) {
        e.preventDefault();
        if (this.id != ""){
                $("#catalog_parend_list").empty();
                localStorage.setItem('category', this.id);
                category = localStorage.getItem('category');
                //Creamos la consulta 
                firebase.database().ref('storage/products/categories/' + category).on('child_added', function(data) {
				    //Cargamos el objeto y sus atributos 
				    var snap = data.val();
				    id = data.key;
				    // console.log(id);
				    console.log(snap);
				    console.log(id);
				    //Create ele dinamically
				    var $divParent = $("<div>", {id: "", "class": "col-xs-12"});
			        var $div0 = $("<div>", {id: "", "class": "media animated bounceIn"});
			        var $div1 = $("<div>", {id: "", "class": "media-left"});
			        var $img0 = $("<img>", {id: "img0", "class": "media-object","src": snap.catalog[0]});
			        var $span0 = $("<span>", {id: "", "class": "maskingImage"});
			        var $a0 = $("<a>", {id: id, class:"btn viewBtn", onclick:'quickViewModal(this.id)', text: "Vista Previa"});
			        var $div2 = $("<div>", {id: "", class:"media-body"});
			        var $h0 = $("<h4>", {id:"", class: "media-heading"});
			        var $a1 = $("<a>", {id: id, onclick:'singleProduct(this.id)', "href":"#", text: snap.name});
			        var $p0 = $("<p>", {id:"", text: snap.description});
			        var $h1 = $("<h3>", {id:"", text: "₡ " + snap.price});
			        var $div3 = $("<div>", {id:"", class:"btn-group", "role":"group"});
			        var $btn0 = $("<button>", {id:"", "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar a Favoritos", "type":"button", class:"btn btn-default", "data-toggle":"modal", "data-target":".login-modal"});
			        var $i0 = $("<i>", {id:"", class:"fa fa-heart", "aria-hidden":"true"});
			        var $btn1 = $("<button>", {id: id, "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar al Carrito", "type":"button", class:"btn btn-default", onclick:'addToShoppingCart(this.id)'});
			        var $i1 = $("<i>", {id:"", class:"fa fa-shopping-cart", "aria-hidden":"true"});


			        // Los cargamos en pantalla 
			        $($divParent).append($div0);
			        $($div0).append($div1);
			        $($div1).append($img0);
			        $($div1).append($span0);
			        $($span0).append($a0);
			        $($div0).append($div2);
			        $($div2).append($h0);
			        $($h0).append($a1);
			        $($div2).append($p0);
			        $($div2).append($h1);
			        $($div2).append($div3);
			        $($div3).append($btn0);
			        $($btn0).append($i0);
			        $($div3).append($btn1);
			   		$($btn1).append($i1);

			        $("#catalog_parend_list").append($divParent); 

				});
				setTimeout(function(){ $('#spinner').hide(); }, 600);		 
        }
});

function singleProduct(id){
        if (id != ""){
            localStorage.setItem('productId', id);
            //Nos redireccionamos a la pagina Details
            //alert(id);
            window.location.href = 'single-product.html';
        }
}

function quickViewModal(id){
	$('#quick-modal').modal('show');
	setTimeout(function(){
        $('#guiest_id4').change(function(){
            quantity = $('#guiest_id4 option:selected').val();
            console.log(quantity);
        }); 
    }, 1000);
	//Creamos la consulta
	if (id == "") {
		console.log(id);
		firebase.database().ref('storage/products/categories/' + category + "/" + id).on('value', function(data) {
		    //Cargamos el objeto y sus atributos 
		    var snap = data.val();

		    //Create ele dinamically
	        var $img0 = $("<img>", {id: "img0", "alt":"Image", "class": "media-object","src": snap.catalog[0]});
	     	var $h0 = $("<h2>", {id: "", class:"text-info", text: snap.tradeMark});
	     	var $h00 = $("<h3>", {id: "", text: snap.name});
	     	var $h1 = $("<h3>", {id: "", text: "₡ " + snap.price});
	     	var $p0 = $("<p>", {id:"", text: snap.description});

	     	var $spanQ = $("<span>", {id:"", class:"quick-drop resizeWidth"});
            var $selectQ = $("<select>", {id:"guiest_id4", name:"guiest_id4", class:"selectOptions"});
            var $optionQ = $("<option>", {value:"1", text:"Cantidad"});
            var $option0 = $("<option>", {value:"1", text:"1"});
            var $option1 = $("<option>", {value:"2", text:"2"});
            var $option2 = $("<option>", {value:"3", text:"3"});
            var $option3 = $("<option>", {value:"4", text:"4"});
            var $option4 = $("<option>", {value:"5", text:"5"});
            var $option5 = $("<option>", {value:"6", text:"6"});
            var $option6 = $("<option>", {value:"7", text:"7"});
            var $option7 = $("<option>", {value:"8", text:"8"});
            var $option8 = $("<option>", {value:"9", text:"9"});
            var $option9 = $("<option>", {value:"10", text:"10"});
            var $option10 = $("<option>", {value:"11", text:"11"});
            var $option11 = $("<option>", {value:"12", text:"12"});
            var $option12 = $("<option>", {value:"13", text:"13"});
            var $option13 = $("<option>", {value:"14", text:"14"});
            var $option14 = $("<option>", {value:"15", text:"15"});

	     	var $div0 = $("<div>", {id:"btn-area", class:"btn-area"});
	     	var $btn0 = $("<button>", {id:"", "type":"button", class:"btn btn-default"});
	     	var $a0 = $("<a>", {id: id, onclick:'addToShoppingCart(this.id)', class:"btn btn-primary btn-block", text: "Agregar al Carrito"});
	     	var $i0 = $("<i>", {id:"", class:"fa fa-angle-right", "aria-hidden":"true"});

	     	var $div1 = $("<div>", {id:"tab-area", class:"tabArea"});
	     	var $ul0 = $("<ul>", {id:"", class:"nav nav-tabs"});
	     	var $li0 = $("<li>", {id:"", class:"active"});
	     	var $a1 = $("<a>", {id:"", "data-toggle":"tab", "href":"#details", text:"Detalles"});
	     	var $li1 = $("<li>", {id:"", class:""});
	     	var $a2 = $("<a>", {id:"", "data-toggle":"tab", "href":"#about-art", text:"Acerca de"});
	     	var $li2 = $("<li>", {id:"", class:""});
	     	var $a3 = $("<a>", {id:"", "data-toggle":"tab", "href":"#sizing", text:"Envío"});

			var $div2 = $("<div>", {id:"tab-container", class:"tab-content"});
	     	var $div3 = $("<div>", {id:"details", class:"tab-pane fade in active"});
	     	var $ul1 = $("<ul>", {id:"", class:"unorder-list lists space-bottom-25"});
	     	var $li3 = $("<li>", {id:"", class:"", text: "Código de Producto: " + id});
	     	var $li4 = $("<li>", {id:"", class:"", text: "GS1: " + snap.barCode});
	     	var $li5 = $("<li>", {id:"", class:"", text: "Marca: " + snap.tradeMark});

			var $div4 = $("<div>", {id:"about-art", class:"tab-pane fade"});
	     	var $ul2 = $("<ul>", {id:"", class:"unorder-list lists space-bottom-25"});
	     	var $li6 = $("<li>", {id:"", class:"", text: "Dimensiones: " + snap.size});
	     	var $li7 = $("<li>", {id:"", class:"", text: "Materiales: " + snap.materials});
	     	var $li8 = $("<li>", {id:"", class:"", text: "Modelo: " + snap.model});

	     	var $div5 = $("<div>", {id:"sizing", class:"tab-pane fade"});
	     	var $ul3 = $("<ul>", {id:"", class:"unorder-list lists space-bottom-25"});
	     	var $li9 = $("<li>", {id:"", class:"", text: "Correos de Costa Rica. " + " Tiempo Estimado: 48 horas."});
	     	var $li10 = $("<li>", {id:"", class:"", text: "GoPato. " + " Tiempo Estimado: 4 horas."});     	

	        $("#img-modal").append($img0);
	        $("#modal-data").append($h0);
	        $("#modal-data").append($h00);
	        $("#modal-data").append($h1);
	        $("#modal-data").append($p0);
	        $("#modal-data").append($spanQ);
            $($spanQ).append($selectQ);
            $($selectQ).append($optionQ);
            $($selectQ).append($option0);
            $($selectQ).append($option1);
            $($selectQ).append($option2);
            $($selectQ).append($option3);
            $($selectQ).append($option4);
            $($selectQ).append($option5);
            $($selectQ).append($option6);
            $($selectQ).append($option7);
            $($selectQ).append($option8);
            $($selectQ).append($option9);
            $($selectQ).append($option10);
            $($selectQ).append($option11);
            $($selectQ).append($option12);
            $($selectQ).append($option13);
            $($selectQ).append($option14);

	        $("#modal-data").append($div0);
	        $($div0).append($a0);
	        $($a0).append($i0);

	        $("#modal-data").append($div1);
	        $($div1).append($ul0);
	        $($ul0).append($li0);
	        $($li0).append($a1);
	        $($ul0).append($li1);
	        $($li1).append($a2);
	        $($ul0).append($li2);
	        $($li2).append($a3);

	        $("#modal-data").append($div2);
	        $($div2).append($div3);
	        $($div3).append($ul1);
	        $($ul1).append($li3);
	        $($ul1).append($li4);
	        $($ul1).append($li5);

	        $($div2).append($div4);
	        $($div4).append($ul2);
	        $($ul2).append($li6);
	        $($ul2).append($li7);
	        $($ul2).append($li8);

	        $($div2).append($div5);
	        $($div5).append($ul3);
	        $($ul3).append($li9);
	        $($ul3).append($li10);
		}); 
	} else{
		//Limpiamos el modal para que no agregue una img sobre otra
		$("#img-modal").empty();
		$("#modal-data").empty();
		
		//Volvemos a realizar la consulta
		firebase.database().ref('storage/products/categories/' + category + "/" + id).on('value', function(data) {
		    //Cargamos el objeto y sus atributos 
		    console.log(category);
            console.log(id);

            var snap = data.val();
          
		    //Create ele dinamically
	        var $img0 = $("<img>", {id: "img0", "alt":"Image", "class": "media-object","src": snap.catalog[0]});
	     	var $h0 = $("<h2>", {id: "", class:"text-info", text: snap.tradeMark});
	     	var $h00 = $("<h3>", {id: "", text: snap.name});
	     	var $h1 = $("<h3>", {id: "", text: "₡ " + snap.price});
	     	var $p0 = $("<p>", {id:"", text: snap.description});


	     	var $spanQ = $("<span>", {id:"", class:"quick-drop resizeWidth"});
            var $selectQ = $("<select>", {id:"guiest_id4", name:"guiest_id4", class:"selectOptions"});
            var $optionQ = $("<option>", {value:"1", text:"Cantidad"});
            var $option0 = $("<option>", {value:"1", text:"1"});
            var $option1 = $("<option>", {value:"2", text:"2"});
            var $option2 = $("<option>", {value:"3", text:"3"});
            var $option3 = $("<option>", {value:"4", text:"4"});
            var $option4 = $("<option>", {value:"5", text:"5"});
            var $option5 = $("<option>", {value:"6", text:"6"});
            var $option6 = $("<option>", {value:"7", text:"7"});
            var $option7 = $("<option>", {value:"8", text:"8"});
            var $option8 = $("<option>", {value:"9", text:"9"});
            var $option9 = $("<option>", {value:"10", text:"10"});
            var $option10 = $("<option>", {value:"11", text:"11"});
            var $option11 = $("<option>", {value:"12", text:"12"});
            var $option12 = $("<option>", {value:"13", text:"13"});
            var $option13 = $("<option>", {value:"14", text:"14"});
            var $option14 = $("<option>", {value:"15", text:"15"});

	     	var $div0 = $("<div>", {id:"btn-area", class:"btn-area"});
	     	var $btn0 = $("<button>", {id:"", "type":"button", class:"btn btn-default"});
	     	var $a0 = $("<a>", {id: id, onclick:'addToShoppingCart(this.id)', class:"btn btn-primary btn-block", text: "Agregar al Carrito"});
	     	var $i0 = $("<i>", {id:"", class:"fa fa-angle-right", "aria-hidden":"true"});

	     	var $div1 = $("<div>", {id:"tab-area", "class":"tabArea"});
	     	var $ul0 = $("<ul>", {id:"", "class":"nav nav-tabs"});
	     	var $li0 = $("<li>", {id:"", "class":"active"});
	     	var $a1 = $("<a>", {id:"", "data-toggle":"tab", "href":"#details", text:"Detalles"});
	     	var $li1 = $("<li>", {id:"", "class":""});
	     	var $a2 = $("<a>", {id:"", "data-toggle":"tab", "href":"#about-art", text:"Acerca de"});
	     	var $li2 = $("<li>", {id:"", "class":""});
	     	var $a3 = $("<a>", {id:"", "data-toggle":"tab", "href":"#sizing", text:"Envío"});

	     	var $div2 = $("<div>", {id:"tab-container", class:"tab-content"});
	     	var $div3 = $("<div>", {id:"details", class:"tab-pane fade in active"});
	     	var $ul1 = $("<ul>", {id:"", class:"unorder-list lists space-bottom-25"});
	     	var $li3 = $("<li>", {id:"", class:"", text: "Código de Producto: " + id});
	     	var $li4 = $("<li>", {id:"", class:"", text: "GS1: " + snap.barCode});
	     	var $li5 = $("<li>", {id:"", class:"", text: "Marca: " + snap.tradeMark});

			var $div4 = $("<div>", {id:"about-art", class:"tab-pane fade"});
	     	var $ul2 = $("<ul>", {id:"", class:"unorder-list lists space-bottom-25"});
	     	var $li6 = $("<li>", {id:"", class:"", text: "Dimensiones: " + snap.size});
	     	var $li7 = $("<li>", {id:"", class:"", text: "Materiales: " + snap.materials});
	     	var $li8 = $("<li>", {id:"", class:"", text: "Modelo: " + snap.model});

	     	var $div5 = $("<div>", {id:"sizing", class:"tab-pane fade"});
	     	var $ul3 = $("<ul>", {id:"", class:"unorder-list lists space-bottom-25"});
	     	var $li9 = $("<li>", {id:"", class:"", text: "Correos de Costa Rica. " + " Tiempo Estimado: 48 horas."});
	     	var $li10 = $("<li>", {id:"", class:"", text: "GoPato. " + " Tiempo Estimado: 4 horas."});     	

	        $("#img-modal").append($img0);
	        $("#modal-data").append($h0);
	        $("#modal-data").append($h00);
	        $("#modal-data").append($h1);
	        $("#modal-data").append($p0);
	        $("#modal-data").append($spanQ);
            $($spanQ).append($selectQ);
            $($selectQ).append($optionQ);
            $($selectQ).append($option0);
            $($selectQ).append($option1);
            $($selectQ).append($option2);
            $($selectQ).append($option3);
            $($selectQ).append($option4);
            $($selectQ).append($option5);
            $($selectQ).append($option6);
            $($selectQ).append($option7);
            $($selectQ).append($option8);
            $($selectQ).append($option9);
            $($selectQ).append($option10);
            $($selectQ).append($option11);
            $($selectQ).append($option12);
            $($selectQ).append($option13);
            $($selectQ).append($option14);

	        $("#modal-data").append($div0);
	        $($div0).append($a0);
	        $($a0).append($i0);

	        $("#modal-data").append($div1);
	        $($div1).append($ul0);
	        $($ul0).append($li0);
	        $($li0).append($a1);
	        $($ul0).append($li1);
	        $($li1).append($a2);
	        $($ul0).append($li2);
	        $($li2).append($a3);

	        $("#modal-data").append($div2);
	        $($div2).append($div3);
	        $($div3).append($ul1);
	        $($ul1).append($li3);
	        $($ul1).append($li4);
	        $($ul1).append($li5);

	        $($div2).append($div4);
	        $($div4).append($ul2);
	        $($ul2).append($li6);
	        $($ul2).append($li7);
	        $($ul2).append($li8);

	        $($div2).append($div5);
	        $($div5).append($ul3);
	        $($ul3).append($li9);
	        $($ul3).append($li10);
	      
		});
	}
	
}

function addToShoppingCart(id){
        if (storedIDS == null){
                storedIDS = [];
                storedIDS.push({
                        id:id,
                        lot:quantity,
                        route:category,
                });
                console.log("nuevo");                                
                localStorage.setItem("cartIDS", JSON.stringify(storedIDS));
                window.location.href = 'cart-page.html';

        }else{
                var index = storedIDS.findIndex(x => x.id == id);
                console.log(index);
                if(index == -1){
                         storedIDS.push({
                                id:id,
                                lot:quantity,
                                route:category,   
                        });
                        console.log("nuevo");                                
                        localStorage.setItem("cartIDS", JSON.stringify(storedIDS));
                        window.location.href = 'cart-page.html';
                }else{
                        console.log("existe");
                        var lot = storedIDS[index].lot;
                        storedIDS[index].lot = parseInt(lot) + parseInt($('#guiest_id4 option:selected').val()); 
                        localStorage.setItem("cartIDS", JSON.stringify(storedIDS));
                        window.location.href = 'cart-page.html';
                }
        }
}

jQuery(document).ready(function(){
	//Function Listener
	getDataOfProduct();
});