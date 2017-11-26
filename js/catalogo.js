//Variables
var category = localStorage.getItem('category');
//...
var storedIDS = JSON.parse(localStorage.getItem("cartIDS"));
var storedCTS = JSON.parse(localStorage.getItem("cartCTS"));
var cartIDS = [];
var cartCTS = [];
var oldID;
var windowsize; 

var filter = [];
var rangeHigh = 80000;
var rangelow = 2000;

var materials = {};
var colors = {};
var catalog = {}; 
// var quantity = "1";

var subCategory,id,barCode,name,model,lot,price,oldPrice,tradeMark,size,description;

var bag = [];

var priceInt = 0;
var storedPRICE = 0;
var storedDISCOUNT = 0;
var storedTOTALPRICE = 0;
var quantity = "1";
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

function filterByPrice(){
    $("#catalog_parend").empty();
    console.log(rangelow)
    for (i in filter) {
        if (filter[i].price > rangelow && filter[i].price < rangeHigh) {
            // $("#catalog_parend").empty();
            //Create ele dinamically
            var $divParent = $("<div>", {id: "", "class": "col-sm-4 col-xs-12"});
            var $div0 = $("<div>", {id: "", "class": "productBox"});
            var $div1 = $("<div>", {id: "", "class": "productImage clearfix"});
            var $img0 = $("<img>", {id: "img0", class:"", "src": filter[i].catalog[0]});
            var $div2 = $("<div>", {id: "", "class": "productMasking"});
            var $ul = $("<ul>", {id: "", "class": "list-inline btn-group", "role": "group"});
            var $li0 = $("<li>", {id: ""});
            var $a0 = $("<a>", {id: "", "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar a Favoritos","data-toggle":"modal", "href":".login-modal", "class":"btn btn-default"});
            var $i0 = $("<i>", {id: "", class:"fa fa-heart"});
            var $li1 = $("<li>", {id: ""});
            var $a1 = $("<a>", {id: filter[i].id, "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar al Carrito", onclick:'addToShoppingCart(this.id)', "class":"btn btn-default"});
            var $i1 = $("<i>", {id: "", class:"fa fa-shopping-cart"});
            var $li2 = $("<li>", {id: ""});
            var $a2 = $("<a>", {id: filter[i].id, "data-toggle":"tooltip", "data-placement":"top", "title":"Vista Previa", "class":"btn btn-default", onclick:'quickViewModal(this.id)'});
            var $i2 = $("<i>", {id: "", class:"fa fa-eye"});
            var $div3 = $("<div>", {id: "", "class": "productCaption clearfix"});
            var $a3 = $("<a>", {id: id, onclick:'singleProduct(this.id)', "href":"#"});
            var $h0 = $("<h5>", {id: "Product_Name", text: filter[i].name});
            var $h1 = $("<h3>", {id: "Product_Price", text: "₡ " + filter[i].price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")});

            //Los cargamos en pantalla 
            $($divParent).append($div0);
            $($div0).append($div1);
            $($div1).append($img0);
            $($div1).append($div2);
            $($div2).append($ul);
            $($ul).append($li0);
            $($li0).append($a0);
            $($a0).append($i0);
            $($ul).append($li1);
            $($li1).append($a1);
            $($a1).append($i1);
            $($ul).append($li2);
            $($li2).append($a2);
            $($a2).append($i2);
            $($div0).append($div3);
            $($div3).append($a3);
            $($a3).append($h0);
            $($div3).append($h1);
       
            $("#catalog_parend").append($divParent);   
        }
    }
}

function getDataOfProduct(){
	var $imgBlank = $("<img>", {id: "imgBlank", "class": "blankImage","src": "img/home/featured-product/muy-pronto.png"});
    $("#catalog_parend").append($imgBlank);
    filter = [];

	//Creamos la consulta 
	firebase.database().ref('storage/products/categories/' + category).on('child_added', function(data) {
        //Cargamos el objeto y sus atributos 
        var snap = data.val();
        id = data.key;

        // console.log(id);
        $("#imgBlank").addClass("ocultar");
        var object1 = snap;
        var object2 = {
            id: id,
        }
        $.extend(object1, object2);

        filter.push(object1);
        //Create ele dinamically
        console.log(snap)
        var $divParent = $("<div>", {id: "", "class": "col-sm-4 col-xs-12"});
        var $div0 = $("<div>", {id: "", "class": "productBox"});
        var $div1 = $("<div>", {id: "", "class": "productImage clearfix"});
        var $img0 = $("<img>", {id: "img0", class:"", "src": snap.catalog[0]});
        var $div2 = $("<div>", {id: "", "class": "productMasking", "onclick":""});
        var $ul = $("<ul>", {id: "", "class": "list-inline btn-group", "role": "group"});
        var $li0 = $("<li>", {id: ""});
        var $a0 = $("<a>", {id: "", "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar a Favoritos","data-toggle":"modal", "href":".login-modal", "class":"btn btn-default"});
        var $i0 = $("<i>", {id: "", class:"fa fa-heart"});
        var $li1 = $("<li>", {id: ""});
        var $a1 = $("<a>", {id: id, "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar al Carrito", onclick:'addToShoppingCart(this.id)', "class":"btn btn-default"});
        var $i1 = $("<i>", {id: "", class:"fa fa-shopping-cart"});
        var $li2 = $("<li>", {id: ""});
        var $a2 = $("<a>", {id: id, "data-toggle":"tooltip", "data-placement":"top", "title":"Vista Previa", "class":"btn btn-default", onclick:'quickViewModal(this.id)'});
        var $i2 = $("<i>", {id: "", class:"fa fa-eye"});
        var $div3 = $("<div>", {id: "", "class": "productCaption clearfix"});
        var $a3 = $("<a>", {id: id, onclick:'singleProduct(this.id)', "href":"#"});
        var $h0 = $("<h5>", {id: "Product_Name", text: snap.name});
        var $h1 = $("<h3>", {id: "Product_Price", text: "₡ " + snap.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")});

        //Los cargamos en pantalla 
        $($divParent).append($div0);
        $($div0).append($div1);
        $($div1).append($img0);
        $($div1).append($div2);
        $($div2).append($ul);
        $($ul).append($li0);
        $($li0).append($a0);
        $($a0).append($i0);
        $($ul).append($li1);
        $($li1).append($a1);
        $($a1).append($i1);
        $($ul).append($li2);
        $($li2).append($a2);
        $($a2).append($i2);
        $($div0).append($div3);
        $($div3).append($a3);
        $($a3).append($h0);
        $($div3).append($h1);
   
        $("#catalog_parend").append($divParent); 

	}); 
        setTimeout(function(){ $('#spinner').hide(); }, 600);
}

// Custom Code
$("#grid_left_category li a").click(function(e) {
        e.preventDefault();
        if (this.id != ""){
                $("#catalog_parend").empty();
                filter = [];
                var $imgBlank = $("<img>", {id: "imgBlank", "class": "blankImage","src": "img/home/featured-product/muy-pronto.png"});
                $("#catalog_parend").append($imgBlank);
                localStorage.setItem('category', this.id);
                category = localStorage.getItem('category');
                console.log(category)
                //Creamos la consulta 
                firebase.database().ref('storage/products/categories/' + category).on('child_added', function(data) {
                        //Cargamos el objeto y sus atributos 
                        var snap = data.val();
                        id = data.key;

                        $("#imgBlank").addClass("ocultar");
                        var object1 = snap;
                        var object2 = {
                            id: id,
                        }
                        $.extend(object1, object2);

                        filter.push(object1);
                        //Create ele dinamically
                        var $divParent = $("<div>", {id: "", "class": "col-sm-4 col-xs-12"});
                        var $div0 = $("<div>", {id: "", "class": "productBox"});
                        var $div1 = $("<div>", {id: "", "class": "productImage clearfix"});
                        var $img0 = $("<img>", {id: "img0", class:"", "src": snap.catalog[0]});
                        var $div2 = $("<div>", {id: "", "class": "productMasking"});
                        var $ul = $("<ul>", {id: "", "class": "list-inline btn-group", "role": "group"});
                        var $li0 = $("<li>", {id: ""});
                        var $a0 = $("<a>", {id: "", "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar a Favoritos", "data-toggle":"modal", "href":".login-modal", "class":"btn btn-default"});
                        var $i0 = $("<i>", {id: "", class:"fa fa-heart"});
                        var $li1 = $("<li>", {id: ""});
                        var $a1 = $("<a>", {id: id, "data-toggle":"tooltip", "data-placement":"top", "title":"Agregar al Carrito", onclick:'addToShoppingCart(this.id)', "class":"btn btn-default"});
                        var $i1 = $("<i>", {id: "", class:"fa fa-shopping-cart"});
                        var $li2 = $("<li>", {id: ""});
                        var $a2 = $("<a>", {id: id, "data-toggle":"tooltip", "data-placement":"top", "title":"Vista Previa", "class":"btn btn-default", onclick:'quickViewModal(this.id)'});
                        var $i2 = $("<i>", {id: "", class:"fa fa-eye"});
                        var $div3 = $("<div>", {id: "", "class": "productCaption clearfix"});
                        var $a3 = $("<a>", {id: id, onclick:'singleProduct(this.id)', "href":"#"});
                        var $h0 = $("<h5>", {id: "Product_Name", text: snap.name});
                        var $h1 = $("<h3>", {id: "Product_Price", text: "₡ " + snap.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")});

                        //Los cargamos en pantalla 
                        $($divParent).append($div0);
                        $($div0).append($div1);
                        $($div1).append($img0);
                        $($div1).append($div2);
                        $($div2).append($ul);
                        $($ul).append($li0);
                        $($li0).append($a0);
                        $($a0).append($i0);
                        $($ul).append($li1);
                        $($li1).append($a1);
                        $($a1).append($i1);
                        $($ul).append($li2);
                        $($li2).append($a2);
                        $($a2).append($i2);
                        $($div0).append($div3);
                        $($div3).append($a3);
                        $($a3).append($h0);
                        $($div3).append($h1);

                        $("#catalog_parend").append($divParent); 

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
                // console.log(id);
                firebase.database().ref('storage/products/categories/' + category + "/" + id).on('value', function(data) {
                //Cargamos el objeto y sus atributos 
                var snap = data.val();
                // console.log(id);
                //Create ele dinamically
                var $img0 = $("<img>", {id: "img0", "alt":"Image", "class": "media-object","src": snap.catalog[0]});
                var $h0 = $("<h2>", {id: "", class:"text-info", text: snap.tradeMark});
                var $h00 = $("<h3>", {id: "", text: snap.name});
                var $h1 = $("<h3>", {id: "", text: "₡ " + snap.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")});
                var $p0 = $("<p>", {id:"", text: snap.description});

                var $h03 = $("<h3>", {id: "qty", class:"qty", text: "Cantidad"});
                var $spanQ = $("<span>", {id:"", class:"quick-drop resizeWidth"});
                var $selectQ = $("<select>", {id:"guiest_id4", name:"guiest_id4", class:"selectOptions"});
                // var $optionQ = $("<option>", {value:"1", text:"1"});
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

                var $option15 = $("<option>", {value:"16", text:"16"});
                var $option16 = $("<option>", {value:"17", text:"17"});
                var $option17 = $("<option>", {value:"18", text:"18"});
                var $option18 = $("<option>", {value:"19", text:"19"});
                var $option19 = $("<option>", {value:"20", text:"20"});
                var $option20 = $("<option>", {value:"21", text:"21"});
                var $option21 = $("<option>", {value:"22", text:"22"});
                var $option22 = $("<option>", {value:"23", text:"23"});
                var $option23 = $("<option>", {value:"24", text:"24"});
                var $option24 = $("<option>", {value:"25", text:"25"});
                var $option25 = $("<option>", {value:"26", text:"26"});
                var $option26 = $("<option>", {value:"27", text:"27"});
                var $option27 = $("<option>", {value:"28", text:"28"});
                var $option28 = $("<option>", {value:"29", text:"29"});
                var $option29 = $("<option>", {value:"30", text:"30"});

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
                var $li3 = $("<li>", {id:"", class:"", text: "Marca: " + snap.tradeMark});
                var $li4 = $("<li>", {id:"", class:"", text: "Código de Barras: " + snap.barCode});
                var $li5 = $("<li>", {id:"", class:"", text: "Código de Producto: " + id});

                var $div4 = $("<div>", {id:"about-art", class:"tab-pane fade"});
                var $ul2 = $("<ul>", {id:"", class:"unorder-list lists space-bottom-25"});
                var $li6 = $("<li>", {id:"", class:"", text: "Modelo: " + snap.model});
                var $li7 = $("<li>", {id:"", class:"", text: "Materiales: " + snap.materials});
                var $li8 = $("<li>", {id:"", class:"", text: "Dimensiones: " + snap.size});

                var $div5 = $("<div>", {id:"sizing", class:"tab-pane fade"});
                var $ul3 = $("<ul>", {id:"", class:"unorder-list lists space-bottom-25"});
                var $li9 = $("<li>", {id:"", class:"", text: "Todo Express: " + "1-2 días hábiles"});
                var $li10 = $("<li>", {id:"", class:"", text: "Correos de Costa Rica: " + "3-4 días hábiles"});             

                $("#img-modal").append($img0);
                $("#modal-data").append($h0);
                $("#modal-data").append($h00);
                $("#modal-data").append($h1);
                $("#modal-data").append($p0);
                $("#modal-data").append($h03);
                $("#modal-data").append($spanQ);
                $($spanQ).append($selectQ);
                // $($selectQ).append($optionQ);
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

                $($selectQ).append($option15);
                $($selectQ).append($option16);
                $($selectQ).append($option17);
                $($selectQ).append($option18);
                $($selectQ).append($option19);
                $($selectQ).append($option20);
                $($selectQ).append($option21);
                $($selectQ).append($option22);
                $($selectQ).append($option23);
                $($selectQ).append($option24);
                $($selectQ).append($option25);
                $($selectQ).append($option26);
                $($selectQ).append($option27);
                $($selectQ).append($option28);
                $($selectQ).append($option29);

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
                var $h1 = $("<h3>", {id: "", text: "₡ " + snap.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")});
                var $p0 = $("<p>", {id:"", text: snap.description});

                var $h03 = $("<h3>", {id: "qty", class:"qty", text: "Cantidad"});
                var $spanQ = $("<span>", {id:"", class:"quick-drop resizeWidth"});
                var $selectQ = $("<select>", {id:"guiest_id4", name:"guiest_id4", class:"selectOptions"});
                // var $optionQ = $("<option>", {value:"1", text:"Cantidad"});
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

                var $option15 = $("<option>", {value:"16", text:"16"});
                var $option16 = $("<option>", {value:"17", text:"17"});
                var $option17 = $("<option>", {value:"18", text:"18"});
                var $option18 = $("<option>", {value:"19", text:"19"});
                var $option19 = $("<option>", {value:"20", text:"20"});
                var $option20 = $("<option>", {value:"21", text:"21"});
                var $option21 = $("<option>", {value:"22", text:"22"});
                var $option22 = $("<option>", {value:"23", text:"23"});
                var $option23 = $("<option>", {value:"24", text:"24"});
                var $option24 = $("<option>", {value:"25", text:"25"});
                var $option25 = $("<option>", {value:"26", text:"26"});
                var $option26 = $("<option>", {value:"27", text:"27"});
                var $option27 = $("<option>", {value:"28", text:"28"});
                var $option28 = $("<option>", {value:"29", text:"29"});
                var $option29 = $("<option>", {value:"30", text:"30"});

                var $div0 = $("<div>", {id:"btn-area", class:"btn-area"});
                var $btn0 = $("<button>", {id:"", "type":"button", class:"btn btn-default"});
                var $a0 = $("<a>", {id: id, onclick:'addToShoppingCart(this.id)', class:"btn btn-primary btn-block", text: "Agregar al Carrito"});
                var $i0 = $("<i>", {id:"", class:"fa fa-angle-right", "aria-hidden":"true"});

                var $div1 = $("<div>", {id:"tab-area", "class":"tabArea"});
                var $ul0 = $("<ul>", {id:"", "class":"nav nav-tabs"});
                var $li0 = $("<li>", {id:"", "class":"active"});
                var $a1 = $("<a>", {id:"", "data-toggle":"tab", "href":"#details", text:"Descripción"});
                var $li1 = $("<li>", {id:"", "class":""});
                var $a2 = $("<a>", {id:"", "data-toggle":"tab", "href":"#about-art", text:"Detalles"});
                var $li2 = $("<li>", {id:"", "class":""});
                var $a3 = $("<a>", {id:"", "data-toggle":"tab", "href":"#sizing", text:"Envío"});

                var $div2 = $("<div>", {id:"tab-container", class:"tab-content"});
                var $div3 = $("<div>", {id:"details", class:"tab-pane fade in active"});
                var $ul1 = $("<ul>", {id:"", class:"unorder-list lists space-bottom-25"});
                var $li3 = $("<li>", {id:"", class:"", text: "Marca: " + snap.tradeMark});
                var $li4 = $("<li>", {id:"", class:"", text: "Código de Barras: " + snap.barCode});
                var $li5 = $("<li>", {id:"", class:"", text: "Código de Producto: " + id});

                var $div4 = $("<div>", {id:"about-art", class:"tab-pane fade"});
                var $ul2 = $("<ul>", {id:"", class:"unorder-list lists space-bottom-25"});
                var $li6 = $("<li>", {id:"", class:"", text: "Modelo: " + snap.model});
                var $li7 = $("<li>", {id:"", class:"", text: "Materiales: " + snap.materials});
                var $li8 = $("<li>", {id:"", class:"", text: "Dimensiones: " + snap.size});

                var $div5 = $("<div>", {id:"sizing", class:"tab-pane fade"});
                var $ul3 = $("<ul>", {id:"", class:"unorder-list lists space-bottom-25"});
                var $li9 = $("<li>", {id:"", class:"", text: "Todo Express: " + "1-2 días hábiles"});
                var $li10 = $("<li>", {id:"", class:"", text: "Correos de Costa Rica: " + "3-4 días hábiles"});             

                $("#img-modal").append($img0);
                $("#modal-data").append($h0);
                $("#modal-data").append($h00);
                $("#modal-data").append($h1);
                $("#modal-data").append($p0);
                $("#modal-data").append($h03);
                $("#modal-data").append($spanQ);
                $($spanQ).append($selectQ);
                // $($selectQ).append($optionQ);
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

                $($selectQ).append($option15);
                $($selectQ).append($option16);
                $($selectQ).append($option17);
                $($selectQ).append($option18);
                $($selectQ).append($option19);
                $($selectQ).append($option20);
                $($selectQ).append($option21);
                $($selectQ).append($option22);
                $($selectQ).append($option23);
                $($selectQ).append($option24);
                $($selectQ).append($option25);
                $($selectQ).append($option26);
                $($selectQ).append($option27);
                $($selectQ).append($option28);
                $($selectQ).append($option29);

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
                //$('#success').modal('show');

        }else{
                var index = storedIDS.findIndex(x => x.id == id);
                if(index == -1){
                        storedIDS.push({
                            id:id,
                            lot:quantity,
                            route:category,   
                        });
                        console.log("nuevo");                                
                        localStorage.setItem("cartIDS", JSON.stringify(storedIDS));
                        window.location.href = 'cart-page.html';
                        //$('#success').modal('show');
                }else{
                        console.log("existe")
                        if ($('#guiest_id4').length > 0){
                            var lot = storedIDS[index].lot;
                            storedIDS[index].lot = parseInt(lot) + parseInt($('#guiest_id4 option:selected').val()); 
                            localStorage.setItem("cartIDS", JSON.stringify(storedIDS));
                            console.log("sumar Cantidad " + storedIDS[index].lot)
                            window.location.href = 'cart-page.html';
                        }else{
                            var lot = storedIDS[index].lot;
                            storedIDS[index].lot = parseInt(lot) + 1; 
                            localStorage.setItem("cartIDS", JSON.stringify(storedIDS));
                            console.log("sumar 1 " + storedIDS[index].lot)
                            window.location.href = 'cart-page.html'; 
                        }
                }
        }
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

            var $i0 = $("<i>", {id:"", class:"fa fa-shopping-cart", text:" "+ "₡ " + storedTOTALPRICE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")});    
            var $li1 = $("<li>", {id:"", class:""});
            var $a1 = $("<a>", {id:"", href:"single-product.html"});
            var $div0 = $("<div>", {id:"", class:"media media-especial"});
            var $img0 = $("<img>", {id:"", class:"media-left media-object", src: snap.catalog[0]});
            var $div1 = $("<div>", {id:"", class:"media-body"});
            var $h0 = $("<h5>", {id:"", class:"media-heading", text: snap.name});
            var $br1 = $("<br>", {id:""});
            var $span2 = $("<span>", {id:"", class:"", text: "Cantidad: " + quantity + " x " + "₡ " + snap.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")});
            
            $("#cartOne").append($i0);

            $("#ul_master").append($li1);
            $($li1).append($a1);
            $($a1).append($div0);
            $($div0).append($img0);
            $($div0).append($div1);
            $($div1).append($h0);
            $($h0).append($br1);
            $($h0).append($span2); 
        }
        
    });       
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

function showProfile(){
    $('#logout').modal('show');

    if(displayName == ""){
        var $img = $("<img>", {id:"", class:"img-circle", src: photoURL});
        var $text = $("<h3>", {id:"", class:"", text: displayName});

        $("#eleOfBody").append($img);
        $("#eleOfBody").append($text);
    }else{
        $("#eleOfBody").empty();

        var $img = $("<img>", {id:"", class:"img-circle", src: photoURL});
        var $text = $("<h3>", {id:"", class:"", text: displayName});

        $("#eleOfBody").append($img);
        $("#eleOfBody").append($text);
    }
}

// Custom Code
$("#categoriesFilter").on('click touchstart', function (e) {
    e.preventDefault();
    if($("#categoriesFilterBody").hasClass("panel-hidden")){
        $("#categoriesFilterBody").removeClass("panel-hidden");
        $("#categoriesFilterBody").addClass("animated fadeIn");
    }else{
        $("#categoriesFilterBody").removeClass("animated fadeIn");
        $("#categoriesFilterBody").addClass("panel-hidden");
    }
});

// Custom Code
$("#priceFilter").on('click touchstart', function (e) {
    e.preventDefault();
    if($("#priceFilterBody").hasClass("panel-hidden")){
        $("#priceFilterBody").removeClass("panel-hidden");
        $("#priceFilterBody").addClass("animated fadeIn");
    }else{
        $("#priceFilterBody").removeClass("animated fadeIn");
        $("#priceFilterBody").addClass("panel-hidden");
    }
});

$(window).load(function(){
    if (storedIDS == null || storedIDS.length < 1){
        $("#cartbtn").addClass("btn-is-disabled");
        $("#checkoutbtn").addClass("btn-is-disabled");
    }
    
    if ($(window).width() > 768){
        $("#categoriesFilterBody").removeClass("panel-hidden");
        $("#priceFilterBody").removeClass("panel-hidden");
    }else{
        $("#categoriesFilterBody").addClass("panel-hidden");
        $("#priceFilterBody").addClass("panel-hidden");

        // Custom Code
        $("#Electro li a").on('click touchstart', function (e) {
            e.preventDefault();
            if($("#categoriesFilterBody").hasClass("panel-hidden")){
                $("#categoriesFilterBody").removeClass("panel-hidden");
                $("#categoriesFilterBody").addClass("animated fadeIn");
            }else{
                $("#categoriesFilterBody").removeClass("animated fadeIn");
                $("#categoriesFilterBody").addClass("panel-hidden");
            }
        });

        // Custom Code
        $("#Entretenimiento li a").on('click touchstart', function (e) {
            e.preventDefault();
            if($("#categoriesFilterBody").hasClass("panel-hidden")){
                $("#categoriesFilterBody").removeClass("panel-hidden");
                $("#categoriesFilterBody").addClass("animated fadeIn");
            }else{
                $("#categoriesFilterBody").removeClass("animated fadeIn");
                $("#categoriesFilterBody").addClass("panel-hidden");
            }
        });

        // Custom Code
        $("#Hogar li a").on('click touchstart', function (e) {
            e.preventDefault();
            if($("#categoriesFilterBody").hasClass("panel-hidden")){
                $("#categoriesFilterBody").removeClass("panel-hidden");
                $("#categoriesFilterBody").addClass("animated fadeIn");
            }else{
                $("#categoriesFilterBody").removeClass("animated fadeIn");
                $("#categoriesFilterBody").addClass("panel-hidden");
            }
        });

        // Custom Code
        $("#Cocina li a").on('click touchstart', function (e) {
            e.preventDefault();
            if($("#categoriesFilterBody").hasClass("panel-hidden")){
                $("#categoriesFilterBody").removeClass("panel-hidden");
                $("#categoriesFilterBody").addClass("animated fadeIn");
            }else{
                $("#categoriesFilterBody").removeClass("animated fadeIn");
                $("#categoriesFilterBody").addClass("panel-hidden");
            }
        });

        // Custom Code
        $("#BBQ li a").on('click touchstart', function (e) {
            e.preventDefault();
            if($("#categoriesFilterBody").hasClass("panel-hidden")){
                $("#categoriesFilterBody").removeClass("panel-hidden");
                $("#categoriesFilterBody").addClass("animated fadeIn");
            }else{
                $("#categoriesFilterBody").removeClass("animated fadeIn");
                $("#categoriesFilterBody").addClass("panel-hidden");
            }
        });

        // Custom Code
        $("#Deportes li a").on('click touchstart', function (e) {
            e.preventDefault();
            if($("#categoriesFilterBody").hasClass("panel-hidden")){
                $("#categoriesFilterBody").removeClass("panel-hidden");
                $("#categoriesFilterBody").addClass("animated fadeIn");
            }else{
                $("#categoriesFilterBody").removeClass("animated fadeIn");
                $("#categoriesFilterBody").addClass("panel-hidden");
            }
        });

        // Custom Code
        $("#Salud li a").on('click touchstart', function (e) {
            e.preventDefault();
            if($("#categoriesFilterBody").hasClass("panel-hidden")){
                $("#categoriesFilterBody").removeClass("panel-hidden");
                $("#categoriesFilterBody").addClass("animated fadeIn");
            }else{
                $("#categoriesFilterBody").removeClass("animated fadeIn");
                $("#categoriesFilterBody").addClass("panel-hidden");
            }
        });

        // Custom Code
        $("#Viajes li a").on('click touchstart', function (e) {
            e.preventDefault();
            if($("#categoriesFilterBody").hasClass("panel-hidden")){
                $("#categoriesFilterBody").removeClass("panel-hidden");
                $("#categoriesFilterBody").addClass("animated fadeIn");
            }else{
                $("#categoriesFilterBody").removeClass("animated fadeIn");
                $("#categoriesFilterBody").addClass("panel-hidden");
            }
        });
    }
    //Function Listener
    getDataOfProduct();
    loadDataOfCartItems();
    // localStorage.removeItem('cartIDS');
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
  
        $($span0).detach();
        $($a0).detach();
        $($small).detach();
        $($a1).detach();

        var $a = $("<a>", {id:"displayName", class:"logText", "data-toggle":"modal", href:"#", onclick:"showProfile()", text: " " + user.displayName});
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

    
    
    var minimum = 2000;
    var maximum = 80000;

    $("#price-range").slider({
        range: true,
        min: minimum,
        max: maximum,
        values: [minimum, maximum],
        slide: function(event, ui) {
            $("#price-amount-1").val("₡" + ui.values[0]);
            $("#price-amount-2").val("₡" + ui.values[1]);
            rangelow = ui.values[0];
            rangeHigh = ui.values[1];
        }
    });

    $("#price-amount-1").val("₡" + $("#price-range").slider("values", 0));
    $("#price-amount-2").val("₡" + $("#price-range").slider("values", 1));
});

