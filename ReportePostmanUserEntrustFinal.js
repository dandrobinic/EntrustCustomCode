/* Body */

{   
    "attributes": [
      "userAttributeValues",
      "userAliases"
   ],
   "cursor":{{currentNextCursor}},
    "limit": 100
}

/* Pre Request Script */

console.log("Inicia Pre Request Script");
console.log("pm.info.iteration: ",pm.info.iteration);
console.log("pm.info.iterationCount: ",pm.info.iterationCount);

if(pm.info.iteration == 0){
    //pm.collectionVariables.set("nextCursor",null);
    //pm.collectionVariables.set("nextCursor","eyJjdXJzb3IiOlt7InZhbHVlIjoiODAyNTg4NDEiLCJ0eXBlIjoiU1RSSU5HIn1dLCJuZXh0UGFnZSI6dHJ1ZSwic2VhcmNoQnlBdHRyaWJ1dGVzIjpbXSwib3JkZXJCeUF0dHJpYnV0ZSI6eyJuYW1lIjoidXNlcklkIiwiYXNjZW5kaW5nIjp0cnVlfSwibGltaXQiOjEwMCwiYXR0cmlidXRlcyI6WyJ1c2VyQXR0cmlidXRlVmFsdWVzIiwidXNlckFsaWFzZXMiXX0=");
}
//console.log("nextCursor on Pre-Request Script Tab: ",pm.collectionVariables.get("nextCursor"));
//pm.variables.set("currentNextCursor", '"'+pm.collectionVariables.get("nextCursor")+'"' );

if(pm.info.iteration == 0){      
    //pm.variables.set("currentNextCursor",null);
    //pm.variables.set("currentNextCursor", '"'+pm.collectionVariables.get("nextCursor")+'"' );
}else{
    pm.variables.set("currentNextCursor", '"'+pm.collectionVariables.get("nextCursor")+'"' );
}

console.log("currentNextCursor: ",pm.variables.get("currentNextCursor"));
console.log("Finalizo el Pre request Script!");

/* TEST TAB */


//Se obtiene la respuesta de la API
const response = pm.response.json();
//Obtengo todo los resultado de la API
const users = response.results;
//Obtengo el siguiente cursor que requiere la API 
const nextCursor = response.paging.nextCursor;
//Recorro todos los usuario y los almaceno en la variable usersMapped
const usersMapped = users.map(
    user  => {
        return {
            id: user.id, 
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            phone: user.phone,
            NitDistribuidor: user.userAttributeValues[0].value,
            NombreDistribuidor: user.userAttributeValues[1].value,
            IdentificacionJefe : user.userAttributeValues[2].value,
            CodigoDistribuidor : user.userAttributeValues[3].value
        };
});
//Valido que usersMapped tenga datos 
if(usersMapped){
    const temporal1 = [...usersMapped];
}

//pm.collectionVariables.set("varTest","Hola Mundo");

//Asigno el siguiente cursor en la variable nextCursor
pm.collectionVariables.set("nextCursor",nextCursor);
console.log("nextCursor on Test Tab: ",pm.collectionVariables.get("nextCursor"));

//Cuenta cada recorrido que hace el run
let count = pm.variables.get("count") == undefined ? 0 : pm.variables.get("count");
let counSuma = count+1;
pm.variables.set('count',counSuma);
//Concateno y guardo en una variable global el arreglo anterior con 100 registros con el nuevo 
let objectCurrent = pm.variables.get("objectCurrent");
if(objectCurrent == undefined ){
    pm.variables.set("objectCurrent",usersMapped);
}else{
    let objectUpdate = [...objectCurrent, ...usersMapped];
    pm.variables.set("objectCurrent",objectUpdate);
}
//console.log("1")
//console.log(nextCursor)
//Valido si ya se llego al limite de recorridos para mostrar el json completo en texto plano y el siguiente token de consulta
if(counSuma == 10){
    const objectFinish = pm.variables.get("objectCurrent");
    console.log(JSON.stringify(objectFinish));
    console.log(pm.collectionVariables.get("nextCursor"));
}


