const fs = require('fs');
const resto = fs.readFileSync("./infoBib.json", "utf8");
const restoM = fs.readFileSync("./infoMaitre.json", "utf8");
const restoBib = JSON.parse(resto)
const restoMaitre = JSON.parse(restoM)

function compare(restoA, restoB){
	dict = {}

	for(let i=0; i<restoA.length; i++)
	{	
		for(let j=0; j<restoB.length; j++){

			 var test = String(restoA[i].tel).localeCompare(String(restoB[j].tel), undefined, { sensitivity: 'base' });	
			 if(test == 0){
			 	dict[restoA[i].tel] = {"name" : restoA[i].name, "address":restoA[i].address, "image": restoA[i].image};
		    }
		}
			 
	}
	console.log(Object.keys(dict).length);
	return dict;
}

const restos = compare(restoBib, restoMaitre);
const tab = []
for(var tel in restos){
	var name = restos[tel].name
	var address = restos[tel].address
	var image = restos[tel].image
	tab.push({name, address, tel, image})
}

WriteJsonFile(tab, "restos.json");
function WriteJsonFile(array, filename) {
	var arrayToString = JSON.stringify(Object.assign([], array));
	fs.writeFileSync(filename, arrayToString);
	return arrayToString;
}