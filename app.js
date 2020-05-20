//yargs permite configurar argumentos o colocar comandos en la raiz de la aplicacion
// esto para que podamos poner node app -d Madrid
//https://rapidapi.com/dev132/api/city-geo-location-lookup (user margamba)
//https://openweathermap.org/  (user margamba)

const lugar = require('./lugar/lugar');

const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad para obtener el clima',
        demand: true
    }
}).argv;


//una funcion async siempre regresa una promesa que es nuestro caso

const getInfo = async(direccion) => {

    try {
        const coords = await lugar.getLugarLatLng(direccion);
        const temp = await clima.getClima(coords.lat, coords.lng);
        return `El clima de ${coords.direccion} es de ${temp}.`;
    } catch (error) {
        return `No se pudo determinar el clima de ${direccion}`
    }

}

getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log);