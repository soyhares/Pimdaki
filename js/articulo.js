//Variables
var category = localStorage.getItem('category');
var productId = localStorage.getItem('productId');

var materials = {};
var colors = {};
var catalog = {};

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
	        console.log(id);
	        console.log(snap);




        }); 
    } else{
        //Limpiamos el modal para que no agregue una img sobre otra
        //Volvemos a realizar la consulta
        firebase.database().ref('storage/products/categories/' + category + "/" + productId).on('value', function(data) {
	        //Cargamos el objeto y sus atributos
	        var snap = data.val();
	        id = data.key;
	        console.log(id);
	        console.log(snap.catalog);
	        

	        //Create ele dinamically
	        var $div0 = $("<div>", {id:"", "class":"col-xs-12"});
	        var $div1 = $("<div>", {id:"", class: "media"});
	        var $div2 = $("<div>", {id:"", class:"media-left productSlider"});
	        var $div3 = $("<div>", {id:"carousel", class:"carousel slide", "data-ride":"carousel"});
	        var $div4 = $("<div>", {id:"", class:"carousel-inner"});
	        var $div5 = $("<div>", {id:"", class:"item active", "data-thumb": "0"});
	        //var $img0 = $("<img>", {id:"", class:"", src: });

	        $("#singleDiv").append($div0);
	        $($div0).append($div1);
	        $($div1).append($div2);
	        $($div2).append($div3);
	        $($div3).append($div4);
	        $($div4).append($div5);


        });
    }
}

jQuery(document).ready(function(){
	//Function Listener
	loadSingleProduct();
});