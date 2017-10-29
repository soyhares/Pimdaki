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
		id:order.userId == "" ? id : order.userId,
		userType:order.userId == ""?userType[0]:userType[1],
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
		total:order.totalOrder,
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

	addNode(currentCustomer,"orders/users/"+currentCustomer.userType+"/"+currentCustomer.id);//clientes
	addNode(purchase,"orders/purchase/",id);//lista de compras
	addNode(destination,"orders/destination/", id);//direcciones
	addNode(shipping,"orders/shipping/",id);//envios
	addNode(cashOrder,"orders/cashOrder/",id);//factura
	addNode(Order,"orders/"+Order.status+"/",id);//factura
	

	let ordeId ={id:id};
	$.extend(ordeId, order);
 	localStorage.setItem('order', JSON.stringify(ordeId));
    console.log(JSON.parse(localStorage.getItem("order")));

	console.log("exito!")

	setTimeout(()=>{
		window.location.href = 'checkout-complete.html'
	},1000);
	
}

//agrega un obj al grafo de ordenes
const addNode = ( obj , route, id) =>{
	route=route+id
	console.log(route);
	firebase.database()
          .ref(route)
          .set({..._cleanObj( obj )})
          .then(()=>{
          			if(route == "orders/purchase/"+id){
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


