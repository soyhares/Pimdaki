// Variables
var category = "";
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

var priceInt = 0;
var storedPRICE = 0;
var storedDISCOUNT = 0;
var storedTOTALPRICE = 0;
var quantity = "";
var itemsInCart = 0;
 
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
    var ref = firebase.database()
    .ref('storage/products/categories/Hogar y Cocina/Electrodomésticos')
    .limitToLast(3);
	//Creamos la consulta 
	ref.on('child_added', function(data) {
        //Cargamos el objeto y sus atributos 
        var snap = data.val();
        id = data.key;
    
        var $div0 = $("<div>", {id: "", class:"imageBox"});
        var $div1 = $("<div>", {id:"", class:"productImage clearfix"});
        var $a0 = $("<a>", {id:"", href:""});
        var $img0 = $("<img>", {id:"", class:"fullImage2",src:snap.catalog[0], alt:"Producto"});

        var $span0 = $("<span>", {id:"", class:"sticker", text:"10% Descuento"});
        var $div2 = $("<div>", {id:"", class:"productMasking"});
        var $ul0 = $("<ul>", {id:"", class:"list-inline btn-group", role:"group"});
        var $li0 = $("<li>", {id:"", class:""});
        var $a1 = $("<a>", {id:"", "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar a Favoritos","data-toggle":"modal", "href":".login-modal", class:"btn btn-default"});
        var $i0 = $("<i>", {id:"", class:"fa fa-heart"});
        var $li1 = $("<li>", {id:"", class:""});
        var $a2 = $("<a>", {id: id, "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar al Carrito", onclick:'addToShoppingCart(this.id)', class:"btn btn-default"});
        var $i1 = $("<i>", {id:"", class:"fa fa-shopping-cart"});
        var $li2 = $("<li>", {id:"", class:""});
        var $a3 = $("<a>", {id:id, "data-toggle":"tooltip", "data-placement":"top", "title":"Vista Previa", "class":"btn btn-default", onclick:'quickViewModal(this.id)'});
        var $i2 = $("<i>", {id:"", class:"fa fa-eye"});

        var $div3 = $("<div>", {id:"", class:"productCaption clearfix"});
        var $h0 = $("<h5>", {id:"", class:""});
        var $a4 = $("<a>", {id: id, onclick:'singleProduct(this.id)', "href":"#", text: snap.name});
        var $h1 = $("<h3>", {id:"", class:"", text: snap.price});
        //Los cargamos en pantalla 
        $($div0).append($div1);
        $($div1).append($a0);
        $($a0).append($img0);
        $($div1).append($span0);
        $($div1).append($div2);
        $($div2).append($ul0);
        $($ul0).append($li0);
        $($li0).append($a1);
        $($a1).append($i0);
        $($ul0).append($li1);
        $($li1).append($a2);
        $($a2).append($i1);
        $($ul0).append($li2);
        $($li2).append($a3);
        $($a3).append($i2);
        $($div1).append($div3);
        $($div3).append($h0);
        $($h0).append($a4);
        $($div3).append($h1);

        $("#dinamic1").append($div0);

        
	}); 
}

function quickViewModal(id){
	category = "Hogar y Cocina/Electrodomésticos";
        $('#quick-modal').modal('show');
        setTimeout(function(){
            $('#guiest_id4').change(function(){
                quantity = $('#guiest_id4 option:selected').val();
            }); 
        }, 1000);
        //Creamos la consulta
        if (id == "") {
                // console.log(id);
                firebase.database().ref('storage/products/categories/' + category + "/" + id).on('value', function(data) {
                //Cargamos el objeto y sus atributos 
                var snap = data.val();
                // console.log(id);
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
                // console.log(snap);
                //Create ele dinamically
                var $img0 = $("<img>", {id: "img0", "alt":"Image", "class": "media-object","src": snap.catalog[0]});
                var $h0 = $("<h2>", {id: "", class:"text-info", text: snap.tradeMark});
                var $h00 = $("<h3>", {id: "h"+id, text: snap.name});
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

function getDataOfProduct2(){
    var ref = firebase.database()
    .ref('storage/products/categories/Entretenimiento/Juegos de Mesa')
    .limitToLast(3);
	//Creamos la consulta 
	ref.on('child_added', function(data) {
        //Cargamos el objeto y sus atributos 
        var snap = data.val();
        id = data.key;

        var $div0 = $("<div>", {id: "", class:"imageBox"});
        var $div1 = $("<div>", {id:"", class:"productImage clearfix"});
        var $a0 = $("<a>", {id:"", href:""});
        var $img0 = $("<img>", {id:"", class:"fullImage2",src:snap.catalog[0], alt:"Producto"});

        var $span0 = $("<span>", {id:"", class:"sticker", text:"10% Descuento"});
        var $div2 = $("<div>", {id:"", class:"productMasking"});
        var $ul0 = $("<ul>", {id:"", class:"list-inline btn-group", role:"group"});
        var $li0 = $("<li>", {id:"", class:""});
        var $a1 = $("<a>", {id:"", "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar a Favoritos","data-toggle":"modal", "href":".login-modal", class:"btn btn-default"});
        var $i0 = $("<i>", {id:"", class:"fa fa-heart"});
        var $li1 = $("<li>", {id:"", class:""});
        var $a2 = $("<a>", {id: id, "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar al Carrito", onclick:'addToShoppingCart(this.id)', class:"btn btn-default"});
        var $i1 = $("<i>", {id:"", class:"fa fa-shopping-cart"});
        var $li2 = $("<li>", {id:"", class:""});
        var $a3 = $("<a>", {id:id, "data-toggle":"tooltip", "data-placement":"top", "title":"Vista Previa", "class":"btn btn-default", onclick:'quickViewModal2(this.id)'});
        var $i2 = $("<i>", {id:"", class:"fa fa-eye"});

        var $div3 = $("<div>", {id:"", class:"productCaption clearfix"});
        var $h0 = $("<h5>", {id:"", class:""});
        var $a4 = $("<a>", {id: id, onclick:'singleProduct(this.id)', "href":"#", text: snap.name});
        var $h1 = $("<h3>", {id:"", class:"", text: snap.price});
        //Los cargamos en pantalla 
        $($div0).append($div1);
        $($div1).append($a0);
        $($a0).append($img0);
        // $($div1).append($span0);
        $($div1).append($div2);
        $($div2).append($ul0);
        $($ul0).append($li0);
        $($li0).append($a1);
        $($a1).append($i0);
        $($ul0).append($li1);
        $($li1).append($a2);
        $($a2).append($i1);
        $($ul0).append($li2);
        $($li2).append($a3);
        $($a3).append($i2);
        $($div1).append($div3);
        $($div3).append($h0);
        $($h0).append($a4);
        $($div3).append($h1);

        $("#dinamic2").append($div0);

        
	}); 
}

function quickViewModal2(id){
	category = "Entretenimiento/Juegos de Mesa";
        $('#quick-modal').modal('show');
        setTimeout(function(){
            $('#guiest_id4').change(function(){
                quantity = $('#guiest_id4 option:selected').val();
                console.log(quantity);
            }); 
        }, 1000);
        //Creamos la consulta
        if (id == "") {
                // console.log(id);
                firebase.database().ref('storage/products/categories/' + category + "/" + id).on('value', function(data) {
                //Cargamos el objeto y sus atributos 
                var snap = data.val();
                // console.log(id);
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
                // console.log(snap);
                //Create ele dinamically
                var $img0 = $("<img>", {id: "img0", "alt":"Image", "class": "media-object","src": snap.catalog[0]});
                var $h0 = $("<h2>", {id: "", class:"text-info", text: snap.tradeMark});
                var $h00 = $("<h3>", {id: "h"+id, text: snap.name});
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

function getDataOfProduct3(){
    var ref = firebase.database()
    .ref('storage/products/categories/Hogar y Cocina/Electrodomésticos')
    .limitToLast(3);
	//Creamos la consulta 
	ref.on('child_added', function(data) {
        //Cargamos el objeto y sus atributos 
        var snap = data.val();
        id = data.key;

        var $div0 = $("<div>", {id: "", class:"imageBox"});
        var $div1 = $("<div>", {id:"", class:"productImage clearfix"});
        var $a0 = $("<a>", {id:"", href:""});
        var $img0 = $("<img>", {id:"", class:"fullImage2",src:snap.catalog[0], alt:"Producto"});

        var $span0 = $("<span>", {id:"", class:"sticker", text:"10% Descuento"});
        var $div2 = $("<div>", {id:"", class:"productMasking"});
        var $ul0 = $("<ul>", {id:"", class:"list-inline btn-group", role:"group"});
        var $li0 = $("<li>", {id:"", class:""});
        var $a1 = $("<a>", {id:"", "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar a Favoritos","data-toggle":"modal", "href":".login-modal", class:"btn btn-default"});
        var $i0 = $("<i>", {id:"", class:"fa fa-heart"});
        var $li1 = $("<li>", {id:"", class:""});
        var $a2 = $("<a>", {id: id, "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar al Carrito", onclick:'addToShoppingCart(this.id)', class:"btn btn-default"});
        var $i1 = $("<i>", {id:"", class:"fa fa-shopping-cart"});
        var $li2 = $("<li>", {id:"", class:""});
        var $a3 = $("<a>", {id:id, "data-toggle":"tooltip", "data-placement":"top", "title":"Vista Previa", "class":"btn btn-default", onclick:'quickViewModal3(this.id)'});
        var $i2 = $("<i>", {id:"", class:"fa fa-eye"});

        var $div3 = $("<div>", {id:"", class:"productCaption clearfix"});
        var $h0 = $("<h5>", {id:"", class:""});
        var $a4 = $("<a>", {id: id, onclick:'singleProduct(this.id)', "href":"#", text: snap.name});
        var $h1 = $("<h3>", {id:"", class:"", text: snap.price});
        //Los cargamos en pantalla 
        $($div0).append($div1);
        $($div1).append($a0);
        $($a0).append($img0);
        // $($div1).append($span0);
        $($div1).append($div2);
        $($div2).append($ul0);
        $($ul0).append($li0);
        $($li0).append($a1);
        $($a1).append($i0);
        $($ul0).append($li1);
        $($li1).append($a2);
        $($a2).append($i1);
        $($ul0).append($li2);
        $($li2).append($a3);
        $($a3).append($i2);
        $($div1).append($div3);
        $($div3).append($h0);
        $($h0).append($a4);
        $($div3).append($h1);

        $("#dinamic3").append($div0);

        
	}); 
}

function quickViewModal3(id){
	category = "Hogar y Cocina/Electrodomésticos";
        $('#quick-modal').modal('show');
        setTimeout(function(){
            $('#guiest_id4').change(function(){
                quantity = $('#guiest_id4 option:selected').val();
                console.log(quantity);
            }); 
        }, 1000);
        //Creamos la consulta
        if (id == "") {
                // console.log(id);
                firebase.database().ref('storage/products/categories/' + category + "/" + id).on('value', function(data) {
                //Cargamos el objeto y sus atributos 
                var snap = data.val();
                // console.log(id);
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
                // console.log(snap);
                //Create ele dinamically
                var $img0 = $("<img>", {id: "img0", "alt":"Image", "class": "media-object","src": snap.catalog[0]});
                var $h0 = $("<h2>", {id: "", class:"text-info", text: snap.tradeMark});
                var $h00 = $("<h3>", {id: "h"+id, text: snap.name});
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

function getDataOfProduct4(){
    var ref = firebase.database()
    .ref('storage/products/categories/Entretenimiento/Juegos de Mesa')
    .limitToLast(3);
	//Creamos la consulta 
	ref.on('child_added', function(data) {
        //Cargamos el objeto y sus atributos 
        var snap = data.val();
        id = data.key;
        
        var $div0 = $("<div>", {id: "", class:"imageBox"});
        var $div1 = $("<div>", {id:"", class:"productImage clearfix"});
        var $a0 = $("<a>", {id:"", href:""});
        var $img0 = $("<img>", {id:"", class:"fullImage2",src:snap.catalog[0], alt:"Producto"});

        var $span0 = $("<span>", {id:"", class:"sticker", text:"10% Descuento"});
        var $div2 = $("<div>", {id:"", class:"productMasking"});
        var $ul0 = $("<ul>", {id:"", class:"list-inline btn-group", role:"group"});
        var $li0 = $("<li>", {id:"", class:""});
        var $a1 = $("<a>", {id:"", "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar a Favoritos","data-toggle":"modal", "href":".login-modal", class:"btn btn-default"});
        var $i0 = $("<i>", {id:"", class:"fa fa-heart"});
        var $li1 = $("<li>", {id:"", class:""});
        var $a2 = $("<a>", {id: id, "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar al Carrito", onclick:'addToShoppingCart(this.id)', class:"btn btn-default"});
        var $i1 = $("<i>", {id:"", class:"fa fa-shopping-cart"});
        var $li2 = $("<li>", {id:"", class:""});
        var $a3 = $("<a>", {id:id, "data-toggle":"tooltip", "data-placement":"top", "title":"Vista Previa", "class":"btn btn-default", onclick:'quickViewModal4(this.id)'});
        var $i2 = $("<i>", {id:"", class:"fa fa-eye"});

        var $div3 = $("<div>", {id:"", class:"productCaption clearfix"});
        var $h0 = $("<h5>", {id:"", class:""});
        var $a4 = $("<a>", {id: id, onclick:'singleProduct(this.id)', "href":"#", text: snap.name});
        var $h1 = $("<h3>", {id:"", class:"", text: snap.price});
        //Los cargamos en pantalla 
        $($div0).append($div1);
        $($div1).append($a0);
        $($a0).append($img0);
        // $($div1).append($span0);
        $($div1).append($div2);
        $($div2).append($ul0);
        $($ul0).append($li0);
        $($li0).append($a1);
        $($a1).append($i0);
        $($ul0).append($li1);
        $($li1).append($a2);
        $($a2).append($i1);
        $($ul0).append($li2);
        $($li2).append($a3);
        $($a3).append($i2);
        $($div1).append($div3);
        $($div3).append($h0);
        $($h0).append($a4);
        $($div3).append($h1);

        $("#dinamic4").append($div0);

        
	}); 
}

function quickViewModal4(id){
	category = "Entretenimiento/Juegos de Mesa";
        $('#quick-modal').modal('show');
        setTimeout(function(){
            $('#guiest_id4').change(function(){
                quantity = $('#guiest_id4 option:selected').val();
                console.log(quantity);
            }); 
        }, 1000);
        //Creamos la consulta
        if (id == "") {
                // console.log(id);
                firebase.database().ref('storage/products/categories/' + category + "/" + id).on('value', function(data) {
                //Cargamos el objeto y sus atributos 
                var snap = data.val();
                // console.log(id);
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
                // console.log(snap);
                //Create ele dinamically
                var $img0 = $("<img>", {id: "img0", "alt":"Image", "class": "media-object","src": snap.catalog[0]});
                var $h0 = $("<h2>", {id: "", class:"text-info", text: snap.tradeMark});
                var $h00 = $("<h3>", {id: "h"+id, text: snap.name});
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

// Custom Code
$("#home_category li a").click(function(e) {
	e.preventDefault();
	if (this.id != ""){
	    localStorage.setItem('category', this.id);
	    //Nos redireccionamos a la pagina Details
	    window.location.href = 'product-grid-left-sidebar.html';
	}
});

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
                // $('#success').modal('show');

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
                        // $('#success').modal('show');
                }else{
                        console.log("existe")
                        var lot = storedIDS[index].lot;
                        storedIDS[index].lot = parseInt(lot) + parseInt($('#guiest_id4 option:selected').val()); 
                        localStorage.setItem("cartIDS", JSON.stringify(storedIDS));
                        window.location.href = 'cart-page.html';
                }
        }
}

function singleProduct(id){
    if (id != ""){
        localStorage.setItem('productId', id);
        //Nos redireccionamos a la pagina Details
        //alert(id);
        window.location.href = 'single-product.html';
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

function loadDataOfCartItems(){
	console.log(storedIDS)
	for (i in storedIDS) {
		drawingCar(storedIDS[i].route,storedIDS[i].id, storedIDS[i].lot, storedIDS.length)
	}	
}

function drawingCar(category,id, quantity, itemsIn){
	//Creamos la consulta
    firebase.database()
    .ref('storage/products/categories/' + category + "/" + id)
    .on('value', function(data) {
	    //Cargamos el objeto y sus atributos 
	    var snap = data.val();
	    id = data.key;
	  
	  	console.log(itemsIn)
	    priceInt = parseInt(snap.price) * parseInt(quantity);
	    storedPRICE += priceInt;
	    storedTOTALPRICE = storedPRICE + storedDISCOUNT;
	    
	    // Create Cart Elemets
	    if(id != ""){
	    	$("#cartOne").empty();

	    	var $span0 = $("<span>", {id:"", class:"cart-total", text: "Carrito " + "("+itemsIn+")"});
		    var $br0 = $("<br>", {id:""});
		    var $span1 = $("<span>", {id:"cart_price", class:"cart-price", text:"₡ " + storedTOTALPRICE});

		    $("#cartOne").append($span0);
		    $($span0).append($br0);
		    $("#cartOne").append($span1);

		    var $li0 = $("<li>", {id:"", class:""});
		  	var $a0 = $("<a>", {id:"", class:"", href:"cart-page.html"});
		  	var $div0 = $("<div>", {id:"", class:"media"});
		  	var $img0 = $("<img>", {id:"", class:"media-left media-object", src: snap.catalog[0]});
		  	var $div1 = $("<div>", {id:"", class:"media-body"});
		  	var $h0 = $("<h5>", {id:"", class:"media-heading", text: snap.name});
		  	var $br1 = $("<br>", {id:""});
		  	var $span2 = $("<span>", {id:"", class:"", text: quantity + " x " + snap.price});

		  	$("#ul_shoppingList").append($li0);
		  	$($li0).append($a0);
		  	$($a0).append($div0);
		  	$($div0).append($img0);
		  	$($div0).append($div1);
		  	$($div1).append($h0);
		  	$($h0).append($br1);
		  	$($h0).append($span2);

		  	// var $li1 = $("<li>", {id:"", class:""});
		  	// var $div2 = $("<div>", {id:"", class:"btn-group", role:"group", "aria-label": "..."});
		  	// var $btn0 = $("<button>", {id:"", type:"button", class:"btn btn-default", href:"cart-page.html", text:"Mi Carrito"});
		  	// var $btn1 = $("<button>", {id:"", type:"button", class:"btn btn-default", href:"checkout-step-1.html", text:"Revisión"});


		  	// $("#ul_shoppingList").append($li1);
		  	// $($li1).append($div2);
		  	// $($div2).append($btn0);
		  	// $($div2).append($btn1);
	    }
	   	
	});
		
}

jQuery(document).ready(function(){
	//Function Listener
	getDataOfProduct();
	getDataOfProduct2();
	getDataOfProduct3();
	getDataOfProduct4();

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

	loadDataOfCartItems();

	//localStorage.removeItem('cartIDS');
});