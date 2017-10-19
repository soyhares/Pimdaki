//storage
var order = JSON.parse(localStorage.getItem("order"));
var storedIDS = JSON.parse(localStorage.getItem("cartIDS"));
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
//============= 
const ORDERS = "orders";
// const ORDER_REQUEST =  ORDERS + "/status/request";
// const ORDER_CHECKED =  ORDERS + "/status/checked";
// const ORDER_DONE =  ORDERS + "/status/done";

/**
 * Optimizador de informacion de objetos
 * -limpia los datos nulos o vacios
 * - retorna el objeto con la informacion necesaria
 */
const _cleanObj = ( obj ) =>
  {
    for( let prop in obj ){
      if( obj[prop] == '' || obj[prop] == null ){ delete obj[prop]; }
    }
    return obj;
  } 

// //numero de orden
const _orderId = () =>new Date().getTime(); 

//administra el registro de ordenes
const _orderManager = (id = _orderId()) => {
	let userType = ["guess","customer","merber"];
	let currentCustomer = {
		id,
		userType:userType[0],
		name:order.name,
		lastName:order.lastName,
		email:order.email,
		phone:order.phone,
	};
	let purchase = {
		id,
		shippingList:storedIDS
	};
	let destination = {
		id,
		address:order.address,
	};
	let shipping = {
		id,
		zip:order.zip,
		address:order.address,
		country:order.country,
		city:order.city,
		messenger:order.company,
		deliveryTime:order.deliveryTime,
		cost:order.value
	};
	let cashOrder = {
		wayToPay:order.wayToPay,
		fullPay:order.subTotal,
		discount:order.discount,
		total:order.total,
		shipping:shipping.id
	};
	let Order = {
		id,
		status:"request",
		createdAt: firebase.database.ServerValue.TIMESTAMP,
		user:currentCustomer.id,
		cashOrder:cashOrder.id,
		purchase: purchase.id

	}

	addNode(currentCustomer,ORDERS+"/users/"+currentCustomer.email.replace('.',''),id);//clientes
	addNode(purchase,ORDERS+"/purchase/",id);//lista de compras
	addNode(destination,ORDERS+"/destination/", id);//direcciones
	addNode(shipping,ORDERS+"/shipping/",id);//envios
	addNode(cashOrder,ORDERS+"/cashOrder/",id);//factura
	addNode(Order,ORDERS+"/"+Order.status+"/",id);//factura
}

//agrega un obj al grafo de ordenes
const addNode = ( obj , route, id) =>{
	route=route+id
	firebase.database()
          .ref(route)
          .set({..._cleanObj( obj )})
          .then(()=>{
	                	if(route == ORDERS+"/purchase/"+id){
	                		dispatcher( obj )
	                	}else{
	                		console.log("Realizado con exito!")
	                	}
                    }
          	)
          .catch(( error )=>console.log("Error: "+error));		
};

//despacha los productos
const dispatcher = ( purchase ) =>{
	let list =purchase.shippingList;
	let lot="";
	for (var i in list) {
		 lot = "storage"+"/"+list[i].route+"/"+list[i].id+"/lot";
		// firebase.database()
  //         .ref(lot)
  //         .update()
  //         .then(()=>console.log("Realizado con exito!"))
  //         .catch((error)=>console.log("Error: "+error));
         
		console.log(lot)
	}
  

};

//
jQuery(document).ready(function(){
	//Function Listener
    console.log(order);
    console.log(storedIDS);
    console.log(_orderId());
    $("#btn_order").click(()=>_orderManager());
});