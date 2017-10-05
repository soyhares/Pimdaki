


 // Initialize Firebase
const config = {
    apiKey: "AIzaSyDzrlNuSRMeGYAqWvFS_3h53WeFsmMNxNg",
    authDomain: "pimdaki-e16a0.firebaseapp.com",
    databaseURL: "https://pimdaki-e16a0.firebaseio.com",
    projectId: "pimdaki-e16a0",
    storageBucket: "pimdaki-e16a0.appspot.com",
    messagingSenderId: "172646261705"
  };
 firebase = firebase.initializeApp(config);

const agregar = (ruta, obj, id)=>{
	firebase.database()
		.ref(ruta+'/'+id)
		.set({...obj})
		.then(()=>console.log("Realizado con exito!"))
		.catch((error)=>console.log("Error: "+error));
}

const actualizar=(ruta, dato)=>{
	firebase.database()
		.ref(ruta+'/')
		.set({dato})
		.then(()=>console.log("Realizado con exito!"))
		.catch((error)=>console.log("Error: "+error));
}

const borrar=(ruta)=>{
	alert(ruta);
}
	
const mostrar=(ruta, detalle="")=>{
	firebase.database().ref(ruta+'/'+detalle).on('value', function(snapshot) {
  		console.log(snapshot.val());
	});	
}

