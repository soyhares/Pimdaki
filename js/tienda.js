//Variables
var category = localStorage.getItem('category');
var productId = localStorage.getItem('productId');
//...
var storedIDS = JSON.parse(localStorage.getItem("cartIDS"));
var storedCTS = JSON.parse(localStorage.getItem("cartCTS"));
var cartIDS = [];
var cartCTS = [];
var oldID;

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
var quantity = 1;

var category,subCategory,id,barCode,name,model,lot,price,oldPrice,tradeMark,size,description;

var bag = [];

var beaches = [
  ['Pindaki', 9.987997, -84.111632, 1]
];
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

function initMap() {
  var map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 18,
    center: {lat: 9.987997, lng: -84.111632}
  });
  setMarkers(map);
}

function setMarkers(map) { 
  var image = {
    url: 'img/pdk-map.png',
    origin: new google.maps.Point(0, 0),
    center:new google.maps.Point(85, 85),
    scaledSize: new google.maps.Size(85, 85)
  };

  for (var i = 0; i < beaches.length; i++) {
    var beach = beaches[i];
    var marker = new google.maps.Marker({
      position: {lat: beach[1], lng: beach[2]},
      map: map,
      animation: google.maps.Animation.BOUNCE,
      icon: image,
      title: beach[0],
      zIndex: beach[3]
    });
  }
}

jQuery(document).ready(function(){
  //Function Listener
  initMap();
});