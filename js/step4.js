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
            			dispatcher( obj.shippingList );	
            			console.log("dispatcher!")			
               		}
                
          })
          .catch(( error )=>console.log("Error: "+error));		
};



//obtinene el objeto
const dispatcher = (list) =>{
	for (var i = 0; i < list.length; i++) {
		let route = "storage/products/categories/"+list[i].route+"/"+list[i].id;
		let order = list[i];
		let span =$("#txt_orderLot").val();
		span="";
		firebase.database()
          .ref(route+"/lot")
          .on('value', function(snapshot){
          		
          		if(span==""){
          			span=snapshot.val()
          		}
            updateNode(route+"/lot", span-order.lot); //here!

		});
	
	}
	setTimeout(()=>{ location.reload();}, 1000);	
	
 

}

//despacha los productos
const updateNode = (route, lot ) =>{
	console.log(route);
	console.log(lot)
	firebase.database()
      .ref(route)
      .set(lot)
      .then(()=>console.log("Actualizado con exito!"))
      .catch((error)=>console.log("Error: "+error));
};




//class to add point in amount
var formatNumber = {
	separador: ",", // separador para los miles
	sepDecimal: ".", // separador para los decimales
	formatear:function (num){
		num +="";
		var splitStr = num.split('.');
		var splitLeft = splitStr[0];
		var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
		var regx = /(\d+)(\d{3})/;
		while (regx.test(splitLeft)) {
		splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
	}
	return this.simbol + splitLeft +splitRight;
	},
	format:function(num, simbol){
		this.simbol = simbol ||'';
	return this.formatear(num);
	}
}

//Function Listener
jQuery(document).ready(function(){
	// let cantidad = 1350000;
	// let total =formatNumber.format(cantidad, "₡")
	// console.log(total);
    $("#btn_order").click(()=>_orderManager());
});