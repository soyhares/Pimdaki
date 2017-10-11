//Variables
var category = localStorage.getItem('category');

var materials = {};
var colors = {};
var catalog = {};

var category,subCategory,id,barCode,name,model,lot,price,oldPrice,tradeMark,size,description;

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

function getDataOfProduct(){
	console.log(category);
	//Creamos la consulta 
	firebase.database().ref('storage/products/categories/' + category).on('child_added', function(data) {
                //Cargamos el objeto y sus atributos 
                var snap = data.val();
                id = data.key;
                console.log(id);
                console.log(data.val());

                //Create ele dinamically
                var $divParent = $("<div>", {id: "", "class": "col-sm-4 col-xs-12"});
                var $div0 = $("<div>", {id: "", "class": "productBox animated bounceIn"});
                var $div1 = $("<div>", {id: "", "class": "productImage clearfix"});
                var $img0 = $("<img>", {id: "img0", "src": snap.catalog[0]});
                var $div2 = $("<div>", {id: "", "class": "productMasking"});
                var $ul = $("<ul>", {id: "", "class": "list-inline btn-group", "role": "group"});
                var $li0 = $("<li>", {id: ""});
                var $a0 = $("<a>", {id: "", "data-toggle":"modal", "href":".login-modal", "class":"btn btn-default"});
                var $i0 = $("<i>", {id: "", class:"fa fa-heart"});
                var $li1 = $("<li>", {id: ""});
                var $a1 = $("<a>", {id: "", "href":"cart-page.html", "class":"btn btn-default"});
                var $i1 = $("<i>", {id: "", class:"fa fa-shopping-cart"});
                var $li2 = $("<li>", {id: ""});
                var $a2 = $("<a>", {id: id, "class":"btn btn-default", onclick:'quickViewModal(this.id)'});
                var $i2 = $("<i>", {id: "", class:"fa fa-eye"});
                var $div3 = $("<div>", {id: "", "class": "productCaption clearfix"});
                var $a3 = $("<a>", {id: id, onclick:'singleProduct(this.id)', "href":"#"});
                var $h0 = $("<h5>", {id: "Product_Name", text: snap.name});
                var $h1 = $("<h3>", {id: "Product_Price", text: "₡ " + snap.price});

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
        setTimeout(function(){ $('#spinner').hide(); }, 1500);
}

// Custom Code
$("#grid_left_category li a").click(function(e) {
        e.preventDefault();
        if (this.id != ""){
                $("#catalog_parend").empty();
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
                        var $divParent = $("<div>", {id: "", "class": "col-sm-4 col-xs-12"});
                        var $div0 = $("<div>", {id: "", "class": "productBox animated bounceIn"});
                        var $div1 = $("<div>", {id: "", "class": "productImage clearfix"});
                        var $img0 = $("<img>", {id: "img0", "src": snap.catalog[0]});
                        var $div2 = $("<div>", {id: "", "class": "productMasking"});
                        var $ul = $("<ul>", {id: "", "class": "list-inline btn-group", "role": "group"});
                        var $li0 = $("<li>", {id: ""});
                        var $a0 = $("<a>", {id: "", "data-toggle":"modal", "href":".login-modal", "class":"btn btn-default"});
                        var $i0 = $("<i>", {id: "", class:"fa fa-heart"});
                        var $li1 = $("<li>", {id: ""});
                        var $a1 = $("<a>", {id: "", "href":"cart-page.html", "class":"btn btn-default"});
                        var $i1 = $("<i>", {id: "", class:"fa fa-shopping-cart"});
                        var $li2 = $("<li>", {id: ""});
                        var $a2 = $("<a>", {id: id, "class":"btn btn-default", onclick:'quickViewModal(this.id)'});
                        var $i2 = $("<i>", {id: "", class:"fa fa-eye"});
                        var $div3 = $("<div>", {id: "", "class": "productCaption clearfix"});
                        var $a3 = $("<a>", {id: id, onclick:'singleProduct(this.id)', "href":"#"});
                        var $h0 = $("<h5>", {id: "Product_Name", text: snap.name});
                        var $h1 = $("<h3>", {id: "Product_Price", text: "₡ " + snap.price});

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
                setTimeout(function(){ $('#spinner').hide(); }, 1500); 
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
        //Creamos la consulta
        if (id == "") {
                console.log(id);
                firebase.database().ref('storage/products/categories/' + category + "/" + id).on('value', function(data) {
                //Cargamos el objeto y sus atributos 
                var snap = data.val();
                console.log(id);
                //Create ele dinamically
                var $img0 = $("<img>", {id: "img0", "alt":"Image", "class": "media-object","src": snap.catalog[0]});
                var $h0 = $("<h2>", {id: "", text: snap.name});
                var $h00 = $("<h3>", {id: "", text: snap.tradeMark});
                var $h1 = $("<h3>", {id: "", text: "₡ " + snap.price});
                var $p0 = $("<p>", {id:"", text: snap.description});
                var $div0 = $("<div>", {id:"btn-area", class:"btn-area"});
                var $btn0 = $("<button>", {id:"", "type":"button", class:"btn btn-default"});
                var $a0 = $("<a>", {id:"", href:"cart-page.html", class:"btn btn-primary btn-block", text: "Agregar al Carrito"});
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
                var $ul1 = $("<ul>", {id:"", class:"list-unstyled"});
                var $li3 = $("<li>", {id:"", class:"", text: "✓ Código de Producto: " + id});
                var $li4 = $("<li>", {id:"", class:"", text: "✓ GS1: " + snap.barCode});
                var $li5 = $("<li>", {id:"", class:"", text: "✓ Marca: " + snap.tradeMark});

                var $div4 = $("<div>", {id:"about-art", class:"tab-pane fade"});
                var $ul2 = $("<ul>", {id:"", class:"list-unstyled"});
                var $li6 = $("<li>", {id:"", class:"", text: "✓ Dimensiones: " + snap.size});
                var $li7 = $("<li>", {id:"", class:"", text: "✓ Materiales: " + snap.materials});
                var $li8 = $("<li>", {id:"", class:"", text: "✓ Modelo: " + snap.model});

                var $div5 = $("<div>", {id:"sizing", class:"tab-pane fade"});
                var $ul3 = $("<ul>", {id:"", class:"list-unstyled"});
                var $li9 = $("<li>", {id:"", class:"", text: "✓ Correos de Costa Rica. " + " Tiempo Estimado: 48 horas."});
                var $li10 = $("<li>", {id:"", class:"", text: "✓ GoPato. " + " Tiempo Estimado: 4 horas."});             

                $("#img-modal").append($img0);
                $("#modal-data").append($h0);
                $("#modal-data").append($h00);
                $("#modal-data").append($h1);
                $("#modal-data").append($p0);
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
                console.log(snap);
                //Create ele dinamically
                var $img0 = $("<img>", {id: "img0", "alt":"Image", "class": "media-object","src": snap.catalog[0]});
                var $h0 = $("<h2>", {id: "", text: snap.name});
                var $h00 = $("<h3>", {id: "", text: snap.tradeMark});
                var $h1 = $("<h3>", {id: "", text: "₡ " + snap.price});
                var $p0 = $("<p>", {id:"", text: snap.description});
                var $div0 = $("<div>", {id:"btn-area", class:"btn-area"});
                var $btn0 = $("<button>", {id:"", "type":"button", class:"btn btn-default"});
                var $a0 = $("<a>", {id:"", href:"cart-page.html", class:"btn btn-primary btn-block", text: "Agregar al Carrito"});
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
                var $ul1 = $("<ul>", {id:"", class:"list-unstyled"});
                var $li3 = $("<li>", {id:"", class:"", text: "✓ Código de Producto: " + id});
                var $li4 = $("<li>", {id:"", class:"", text: "✓ GS1: " + snap.barCode});
                var $li5 = $("<li>", {id:"", class:"", text: "✓ Marca: " + snap.tradeMark});

                var $div4 = $("<div>", {id:"about-art", class:"tab-pane fade"});
                var $ul2 = $("<ul>", {id:"", class:"list-unstyled"});
                var $li6 = $("<li>", {id:"", class:"", text: "✓ Dimensiones: " + snap.size});
                var $li7 = $("<li>", {id:"", class:"", text: "✓ Materiales: " + snap.materials});
                var $li8 = $("<li>", {id:"", class:"", text: "✓ Modelo: " + snap.model});

                var $div5 = $("<div>", {id:"sizing", class:"tab-pane fade"});
                var $ul3 = $("<ul>", {id:"", class:"list-unstyled"});
                var $li9 = $("<li>", {id:"", class:"", text: "✓ Correos de Costa Rica. " + " Tiempo Estimado: 48 horas."});
                var $li10 = $("<li>", {id:"", class:"", text: "✓ GoPato. " + " Tiempo Estimado: 4 horas."});             

                $("#img-modal").append($img0);
                $("#modal-data").append($h0);
                $("#modal-data").append($h00);
                $("#modal-data").append($h1);
                $("#modal-data").append($p0);
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


jQuery(document).ready(function(){
	//Function Listener
	getDataOfProduct();
});