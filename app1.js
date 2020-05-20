/* ejercicio sin optimizar */

//yargs permite configurar argumentos o colocar comandos en la raiz de la aplicacion
// esto para que podamos poner node app -d Madrid
//https://rapidapi.com/dev132/api/city-geo-location-lookup (user margamba)
const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad para obtener el clima',
        demand: true
    }
}).argv;


//tenemos que escapar la direccion por si tiene espacios en blanco, para ello usamos encodeURI

const encodeUrl = encodeURI(argv.direccion);

//imprimiria New%  es decir transforma los caracteres especiales
console.log(encodeUrl);

//importamos el axios

const axios = require('axios');
//como nuestra peticion requiere de la configuracion de los headers 
//para ello configuramos la instancia de la peticion, solo nos interesa el primer resultado de data.Results
const instance = axios.create({
    baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${ encodeUrl }`,
    headers: { 'x-rapidapi-key': 'e472eefed2msha318265c28f4efbp1a70dcjsn4c9c0b3b04eb' }
});

instance.get().then(resp => console.log(resp.data.Results[0]))
    .catch(err => console.log('ERROR!!!!', err));