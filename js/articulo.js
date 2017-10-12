//Variables
var category = localStorage.getItem('category');
var productId = localStorage.getItem('productId');

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
	storageBucket: "",
	messagingSenderId: "172646261705"
};
firebase.initializeApp(config);

function loadSingleProduct(){
    if (productId == "") {
        firebase.database().ref('storage/products/categories/' + category + "/" + productId).on('value', function(data) {
	        //Cargamos el objeto y sus atributos 
	        var snap = data.val();
	        id = data.key;
	        validator = snap.barCode;
	 



        }); 
    } else{
        //Limpiamos el modal para que no agregue una img sobre otra
        //Volvemos a realizar la consulta
        firebase.database().ref('storage/products/categories/' + category + "/" + productId).on('value', function(data) {
	        //Cargamos el objeto y sus atributos
	        var snap = data.val();
	        id = data.key;
	        validator = snap.barCode;
	        console.log(id);
	        if (snap.catalog.length == 1) {
	        	url0 = snap.catalog[0];
	        	url1 = snap.catalog[0];
	        	url2 = snap.catalog[0];
	        	url3 = snap.catalog[0];
	        }else if(snap.catalog.length == 2){
	        	url0 = snap.catalog[0];
	        	url1 = snap.catalog[1];
	        	url2 = snap.catalog[0];
	        	url3 = snap.catalog[1];
	        }else if(snap.catalog.length == 3){
	        	url0 = snap.catalog[0];
	        	url1 = snap.catalog[1];
	        	url2 = snap.catalog[2];
	        	url3 = snap.catalog[0];
	        }else if(snap.catalog.length == 4){
	        	url0 = snap.catalog[0];
	        	url1 = snap.catalog[1];
	        	url2 = snap.catalog[2];
	        	url3 = snap.catalog[3];
	        }else{
	        	url0 = snap.catalog[0];
	        	url1 = snap.catalog[1];
	        	url2 = snap.catalog[2];
	        	url3 = snap.catalog[3];
	        }


	        //Create ele dinamically
	        var $div0 = $("<div>", {id:"", "class":"col-xs-12"});
	        var $div1 = $("<div>", {id:"", class: "media"});
	        var $div2 = $("<div>", {id:"", class:"media-left productSlider"});
	        var $div3 = $("<div>", {id:"carousel", class:"carousel slide", "data-ride":"carousel"});
	        var $div4 = $("<div>", {id:"", class:"carousel-inner"});

	        var $div5 = $("<div>", {id:"", class:"item active", "data-thumb": "0"});
	        var $img0 = $("<img>", {id:"", class:"", src: url0});
	        var $div6 = $("<div>", {id:"", class:"item", "data-thumb": "1"});
	        var $img1 = $("<img>", {id:"", class:"", src: url1});
	        var $div7 = $("<div>", {id:"", class:"item", "data-thumb": "2"});
	        var $img2 = $("<img>", {id:"", class:"", src: url2});
	        var $div8 = $("<div>", {id:"", class:"item", "data-thumb": "3"});
	        var $img3 = $("<img>", {id:"", class:"", src: url3});

	        var $div9 = $("<div>", {id:"", class:"clearfix"});
	        var $div10 = $("<div>", {id:"thumbcarousel", class:"carousel slide", "data-interval":"false"});
	        var $div11 = $("<div>", {id:"", class:"carousel-inner"});

	        var $div12 = $("<div>", {id:"", "data-target":"#carousel", "data-slide-to":"0", "class":"thumb"});
	        var $img4 = $("<img>", {id:"", src: url0});
	        var $div13 = $("<div>", {id:"", "data-target":"#carousel", "data-slide-to":"1", "class":"thumb"});
	        var $img5 = $("<img>", {id:"", src: url1});
	        var $div14 = $("<div>", {id:"", "data-target":"#carousel", "data-slide-to":"2", "class":"thumb"});
	        var $img6 = $("<img>", {id:"", src: url2});
	        var $div15 = $("<div>", {id:"", "data-target":"#carousel", "data-slide-to":"3", "class":"thumb"});
	        var $img7 = $("<img>", {id:"", src: url3});

	        var $a0 = $("<a>", {id:"", class:"left carousel-control", "href":"#thumbcarousel", "role":"button", "data-slide":"prev"});
	        var $span0 = $("<span>", {id:"", class:"glyphicon glyphicon-chevron-left"});
	        var $a1 = $("<a>", {id:"", class:"right carousel-control", "href":"#thumbcarousel", "role":"button", "data-slide":"next"});
	        var $span1 = $("<span>", {id:"", class:"glyphicon glyphicon-chevron-right"});

	        var $div16 = $("<div>", {id:"", class:"media-body"});
	        var $ul0 = $("<ul>", {id:"", class:"list-inline"});
	        var $li0 = $("<li>", {id:"", class:""});
	        var $a2 = $("<a>", {id:"", "href":"product-grid-left-sidebar.html", text: "Continuar Comprando "});
	        var $i0 = $("<i>", {id:"", "class":"fa fa-reply", "aria-hidden":"true"});
	        var $li1 = $("<li>", {id:"", class:""});
	        var $a3 = $("<a>", {id:"", "href":"#", text:"Compartir "});
	        var $i1 = $("<i>", {id:"", class:"fa fa-plus", "aria-hidden": "true"});
	        var $h0 = $("<h2>", {id:"", class:"", text: snap.name});
	        var $h1 = $("<h3>", {id:"", class:"", text: "₡ " + snap.price});
	        var $p0 = $("<p>", {id:"", class:"", text: snap.description});
	        var $div17 = $("<div>", {id:"", class:"btn-area"});
	        var $a4 = $("<a>", {id:"", class:"btn btn-primary btn-block", "href":"#", text:"Agregar al Carrito"});
	        var $i2 = $("<i>", {id:"", class:"fa fa-angle-right", "aria-hidden":"true"});

	        var $div18 = $("<div>", {id:"", class:"tabArea"});
	        var $ul1 = $("<ul>", {id:"", class:"nav nav-tabs"});
	        var $li2 = $("<li>", {id:"", class:"active"});
	        var $a5 = $("<a>", {id:"", "data-toggle":"tab", "href":"#details", text:"Detalles"});
	        var $li3 = $("<li>", {id:"", class:""});
	        var $a6 = $("<a>", {id:"", "data-toggle":"tab", "href":"#about-art", text:"Acerca de"});
	        var $li4 = $("<li>", {id:"", class:""});
	        var $a7 = $("<a>", {id:"", "data-toggle":"tab", "href": "#sizing", text:"Envío"});

	        var $div19 = $("<div>", {id:"", class:"tab-content"});
	        var $div20 = $("<div>", {id:"details", class:"tab-pane fade in active"});
	        var $ul2 = $("<ul>", {id:"", class:"list-unstyled"});
	        var $li5 = $("<li>", {id:"", class:"", text: "Código de Producto: " + id});
	        var $li6 = $("<li>", {id:"", class:"", text: "GS1: " + snap.barCode});
	        var $li7 = $("<li>", {id:"", class:"", text: "Marca: " + snap.tradeMark});

	        var $div21 = $("<div>", {id:"about-art", class:"tab-pane fade"});
	        var $ul3 = $("<ul>", {id:"", class:"list-unstyled"});
	        var $li8 = $("<li>", {id:"", class:"", text: "Dimensiones: " + snap.size});
	        var $li9 = $("<li>", {id:"", class:"", text: "Materiales: " + snap.materials});
	        var $li10 = $("<li>", {id:"", class:"", text: "Modelo: " + snap.model});

	        var $div22 = $("<div>", {id:"sizing", class:"tab-pane fade"});
	        var $ul4 = $("<ul>", {id:"", class:"list-unstyled"});
	        var $li11 = $("<li>", {id:"", class:"", text: "Correos de Costa Rica. " + " Tiempo Estimado: 48 horas."});
	        var $li12 = $("<li>", {id:"", class:"", text: "GoPato. " + " Tiempo Estimado: 4 horas."});


	        $("#singleDiv").append($div0);
	        $($div0).append($div1);
	        $($div1).append($div2);
	        $($div2).append($div3);
	        $($div3).append($div4);

	        $($div4).append($div5);
	        $($div5).append($img0);
	        $($div4).append($div6);
	        $($div6).append($img1);
	        $($div4).append($div7);
	        $($div7).append($img2);
	        $($div4).append($div8);
	        $($div8).append($img3);

	        $($div2).append($div9);
	        $($div9).append($div10);
	        $($div10).append($div11);

	        $($div11).append($div12);
	        $($div12).append($img4);
	        $($div11).append($div13);
	        $($div13).append($img5);
	        $($div11).append($div14);
	        $($div14).append($img6);
	        $($div11).append($div15);
	        $($div15).append($img7);

	        $($div10).append($a0);
	        $($a0).append($span0);
	        $($div10).append($a1);
	        $($a1).append($span1);

	        $($div1).append($div16);
	        $($div16).append($ul0);
	        $($ul0).append($li0);
	        $($li0).append($a2);
	        $($a2).append($i0);
	        $($ul0).append($li1);
	        $($li1).append($a3);
	        $($a3).append($i1);
	        $($div16).append($h0);
	        $($div16).append($h1);
	        $($div16).append($p0);

	        $($div16).append($div17);
	        $($div17).append($a4);
	        $($a4).append($i2);
	        $($div16).append($div18);
	        $($div18).append($ul1);
	        $($ul1).append($li2);
	        $($li2).append($a5);
	        $($ul1).append($li3);
	        $($li3).append($a6);
	        $($ul1).append($li4);
	        $($li4).append($a7);

	        $($div18).append($div19);
	        $($div19).append($div20);
	        $($div20).append($ul2);
	        $($ul2).append($li5);
	        $($ul2).append($li6);
	        $($ul2).append($li7);

	        $($div19).append($div21);
	        $($div21).append($ul3);
	        $($ul3).append($li8);
	        $($ul3).append($li9);
	        $($ul3).append($li10);

	        $($div19).append($div22);
	        $($div22).append($ul4);
	        $($ul4).append($li11);
	        $($ul4).append($li12);


	        //Second lot
	        //GET THE FIREBASE RELATED ELEMENTS
	        //SAVE IN ARRAY
	        firebase.database().ref('storage/products/categories/' + category).on('child_added', function(data) {
                //Cargamos el objeto y sus atributos 
                var snap = data.val();
                id = data.key;
                if (validator != data.val().barCode){
                	array.push(data);
                }
			});

			setTimeout(function(){
				if (array != null) {
					if (array.length >= 4){
						var obj0 = array[0];
						var obj1 = array[1];
						var obj2 = array[2];
						var obj3 = array[3];
						
		        		array2.push(obj0.val());
		        		array2.push(obj1.val());
		        		array2.push(obj2.val());
		        		array2.push(obj3.val());

		        		arrayid.push(obj0.key);
		        		arrayid.push(obj1.key);
		        		arrayid.push(obj2.key);
		        		arrayid.push(obj3.key);

		        		var $div23 = $("<div>", {id:"", class:"col-xs-12"});
				        var $div24 = $("<div>", {id:"", class:"page-header"});
				        var $h2 = $("<h4>", {id:"", class:"", text: "Productos Relacionados"});

				        //Porducto Relacionado 1
				        var $div25 = $("<div>", {id:"", class:"col-md-3 col-sm-6 col-xs-12"});
				        var $div26 = $("<div>", {id:"", class:"productBox"});
				        var $div27 = $("<div>", {id:"", class:"productImage clearfix"});
				        var $img8 = $("<img>", {id:"", class:"", src: array2[0].catalog[0]});
				        var $div28 = $("<div>", {id:"", class:"productMasking"});
				        var $ul5 = $("<ul>", {id:"", class:"list-inline btn-group", "role":"group"});
				        var $li13 = $("<li>", {id:"", class:""});
				        var $a8 = $("<a>", {id:"", "data-toggle":"modal", "href":".login-modal", class:"btn btn-default"});
				        var $i3 = $("<i>", {id:"", class:"fa fa-heart"});
				        var $li14 = $("<li>", {id:"", class:""});
				        var $a9 = $("<a>", {id:"", "href":"cart-page.html", "class":"btn btn-default"});
				        var $i4 = $("<i>", {id:"", class:"fa fa-shopping-cart"});
				        var $li15 = $("<li>", {id:"", class:""});
				        var $a10 = $("<a>", {id: arrayid[0], class:"btn btn-default", onclick:'quickViewModal(this.id)'});
				        var $i5 = $("<i>", {id:"", class:"fa fa-eye"});

				        var $div29 = $("<div>", {id:"", class:"productCaption clearfix"});
				        var $h3 = $("<h5>", {id:"", class:"", text: array2[0].name});
				        var $h4 = $("<h3>", {id:"", class:"", text: "₡ " + array2[0].price});

				        //Porducto Relacionado 2
				        var $div30 = $("<div>", {id:"", class:"col-md-3 col-sm-6 col-xs-12"});
				        var $div31 = $("<div>", {id:"", class:"productBox"});
				        var $div32 = $("<div>", {id:"", class:"productImage clearfix"});
				        var $img9 = $("<img>", {id:"", class:"", src: array2[1].catalog[0]});
				        var $div33 = $("<div>", {id:"", class:"productMasking"});
				        var $ul6 = $("<ul>", {id:"", class:"list-inline btn-group", "role":"group"});
				        var $li16 = $("<li>", {id:"", class:""});
				        var $a11 = $("<a>", {id:"", "data-toggle":"modal", "href":".login-modal", class:"btn btn-default"});
				        var $i6 = $("<i>", {id:"", class:"fa fa-heart"});
				        var $li17 = $("<li>", {id:"", class:""});
				        var $a12 = $("<a>", {id:"", "href":"cart-page.html", "class":"btn btn-default"});
				        var $i7 = $("<i>", {id:"", class:"fa fa-shopping-cart"});
				        var $li18 = $("<li>", {id:"", class:""});
				        var $a13 = $("<a>", {id: arrayid[1], class:"btn btn-default", onclick:'quickViewModal(this.id)'});
				        var $i8 = $("<i>", {id:"", class:"fa fa-eye"});

				        var $div34 = $("<div>", {id:"", class:"productCaption clearfix"});
				        var $h5 = $("<h5>", {id:"", class:"", text: array2[1].name});
				        var $h6 = $("<h3>", {id:"", class:"", text: "₡ " + array2[1].price});

				        //Producto Relacionado 3
				        var $div35 = $("<div>", {id:"", class:"col-md-3 col-sm-6 col-xs-12"});
				        var $div36 = $("<div>", {id:"", class:"productBox"});
				        var $div37 = $("<div>", {id:"", class:"productImage clearfix"});
				        var $img10 = $("<img>", {id:"", class:"", src: array2[2].catalog[0]});
				        var $div38 = $("<div>", {id:"", class:"productMasking"});
				        var $ul7 = $("<ul>", {id:"", class:"list-inline btn-group", "role":"group"});
				        var $li19 = $("<li>", {id:"", class:""});
				        var $a14 = $("<a>", {id:"", "data-toggle":"modal", "href":".login-modal", class:"btn btn-default"});
				        var $i9 = $("<i>", {id:"", class:"fa fa-heart"});
				        var $li20 = $("<li>", {id:"", class:""});
				        var $a15 = $("<a>", {id:"", "href":"cart-page.html", "class":"btn btn-default"});
				        var $i10 = $("<i>", {id:"", class:"fa fa-shopping-cart"});
				        var $li21 = $("<li>", {id:"", class:""});
				        var $a16 = $("<a>", {id: arrayid[2], class:"btn btn-default", onclick:'quickViewModal(this.id)'});
				        var $i11 = $("<i>", {id:"", class:"fa fa-eye"});

				        var $div39 = $("<div>", {id:"", class:"productCaption clearfix"});
				        var $h7 = $("<h5>", {id:"", class:"", text: array2[2].name});
				        var $h8 = $("<h3>", {id:"", class:"", text: "₡ " + array2[2].price});

				        //Producto Relacionado 4
				        var $div40 = $("<div>", {id:"", class:"col-md-3 col-sm-6 col-xs-12"});
				        var $div41 = $("<div>", {id:"", class:"productBox"});
				        var $div42 = $("<div>", {id:"", class:"productImage clearfix"});
				        var $img11 = $("<img>", {id:"", class:"", src: array2[3].catalog[0]});
				        var $div43 = $("<div>", {id:"", class:"productMasking"});
				        var $ul8 = $("<ul>", {id:"", class:"list-inline btn-group", "role":"group"});
				        var $li22 = $("<li>", {id:"", class:""});
				        var $a17 = $("<a>", {id:"", "data-toggle":"modal", "href":".login-modal", class:"btn btn-default"});
				        var $i12 = $("<i>", {id:"", class:"fa fa-heart"});
				        var $li23 = $("<li>", {id:"", class:""});
				        var $a18 = $("<a>", {id:"", "href":"cart-page.html", "class":"btn btn-default"});
				        var $i13 = $("<i>", {id:"", class:"fa fa-shopping-cart"});
				        var $li24 = $("<li>", {id:"", class:""});
				        var $a19 = $("<a>", {id: arrayid[3], class:"btn btn-default", onclick:'quickViewModal(this.id)'});
				        var $i14 = $("<i>", {id:"", class:"fa fa-eye"});

				        var $div44 = $("<div>", {id:"", class:"productCaption clearfix"});
				        var $h9 = $("<h5>", {id:"", class:"", text: array2[3].name});
				        var $h10 = $("<h3>", {id:"", class:"", text: "₡ " + array2[3].price});

				        // Second Lot
				        $("#divReleated").append($div23);
				        $($div23).append($div24);
				        $($div24).append($h2);

				        //Producto Relacionado 1
				        $("#divReleated").append($div25);
				        $($div25).append($div26);
				        $($div26).append($div27);
				        $($div27).append($img8);
				        $($div27).append($div28);
				        $($div28).append($ul5);
				        $($ul5).append($li13);
				        $($li13).append($a8);
				        $($a8).append($i3);
				        $($ul5).append($li14);
				        $($li14).append($a9);
				        $($a9).append($i4);
				        $($ul5).append($li15);
				        $($li15).append($a10);
				        $($a10).append($i5);
				        $($div26).append($div29);
				        $($div29).append($h3);
				        $($div29).append($h4);

				        //Producto Relacionado 2
				        $("#divReleated").append($div30);
				        $($div30).append($div31);
				        $($div31).append($div32);
				        $($div32).append($img9);
				        $($div32).append($div33);
				        $($div33).append($ul6);
				        $($ul6).append($li16);
				        $($li16).append($a11);
				        $($a11).append($i6);
				        $($ul6).append($li17);
				        $($li17).append($a12);
				        $($a12).append($i7);
				        $($ul6).append($li18);
				        $($li18).append($a13);
				        $($a13).append($i8);
				        $($div31).append($div34);
				        $($div34).append($h5);
				        $($div34).append($h6);

				        //Producto Relacionado 3
				        $("#divReleated").append($div35);
				        $($div35).append($div36);
				        $($div36).append($div37);
				        $($div37).append($img10);
				        $($div37).append($div38);
				        $($div38).append($ul7);
				        $($ul7).append($li19);
				        $($li19).append($a14);
				        $($a14).append($i9);
				        $($ul7).append($li20);
				        $($li20).append($a15);
				        $($a15).append($i10);
				        $($ul7).append($li21);
				        $($li21).append($a16);
				        $($a16).append($i11);
				        $($div36).append($div39);
				        $($div39).append($h7);
				        $($div39).append($h8);

				        //Producto Relacionado 4
				        $("#divReleated").append($div40);
				        $($div40).append($div41);
				        $($div41).append($div42);
				        $($div42).append($img11);
				        $($div42).append($div43);
				        $($div43).append($ul8);
				        $($ul8).append($li22);
				        $($li22).append($a17);
				        $($a17).append($i12);
				        $($ul8).append($li23);
				        $($li23).append($a18);
				        $($a18).append($i13);
				        $($ul8).append($li24);
				        $($li24).append($a19);
				        $($a19).append($i14);
				        $($div41).append($div44);
				        $($div44).append($h9);
				        $($div44).append($h10);

		        	}
				}
			}, 3000); 

	        

        });
    }
}

function quickViewModal(id){
	$('#quick-modal').modal('show');
	console.log(id);
	//Creamos la consulta
	if (id == "") {
		console.log(id);
		firebase.database().ref('storage/products/categories/' + category + "/" + id).on('value', function(data) {
		    //Cargamos el objeto y sus atributos 
		    var snap = data.val();

		    //Create ele dinamically
	        var $img0 = $("<img>", {id: "img0", "alt":"Image", "class": "media-object","src": snap.catalog[0]});
	     	var $h0 = $("<h2>", {id: "", text: snap.name});
	     	var $h1 = $("<h3>", {id: "", text: "₡ " + snap.price});
	     	var $p0 = $("<p>", {id:"", text: snap.description});
	     	var $div0 = $("<div>", {id:"btn-area", class:"btn-area"});
	     	var $btn0 = $("<button>", {id:"", "type":"button", class:"btn btn-default"});
	     	var $a0 = $("<a>", {id:"", href:"cart-page.html", class:"btn btn-primary btn-block", text: "Agregar al Carrito"});
	     	var $i0 = $("<i>", {id:"", class:"fa fa-angle-right", "aria-hidden":"true"});

	     	var $div1 = $("<div>", {id:"tab-area", class:"tab-area"});
	     	var $ul0 = $("<ul>", {id:"", class:"nav nav-tabs"});
	     	var $li0 = $("<li>", {id:"", class:"active"});
	     	var $a1 = $("<a>", {id:"", "data-toggle":"tab", "href":"#details", text:"Detalles"});
	     	var $li1 = $("<li>", {id:"", class:""});
	     	var $a2 = $("<a>", {id:"", "data-toggle":"tab", "href":"#about-art", text:"Acerca de"});
	     	var $li2 = $("<li>", {id:"", class:""});
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
		console.log(id);
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
	loadSingleProduct();
});