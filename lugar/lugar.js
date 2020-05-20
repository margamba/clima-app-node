//importamos el axios
const axios = require('axios');

//la funcion al ser const no se va a poder reasignar
const getLugarLatLng = async(dir) => {
    //tenemos que escapar la direccion por si tiene espacios en blanco, para ello usamos encodeURI

    const encodeUrl = encodeURI(dir);

    //imprimiria New%  es decir transforma los caracteres especiales
    //console.log(encodeUrl);


    //como nuestra peticion requiere de la configuracion de los headers 
    //para ello configuramos la instancia de la peticion, solo nos interesa el primer resultado de data.Results
    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${ encodeUrl }`,
        headers: { 'x-rapidapi-key': 'e472eefed2msha318265c28f4efbp1a70dcjsn4c9c0b3b04eb' }
    });

    //  como es una promesa para manejar el get podemos usar async y await
    const resp = await instance.get();

    if (resp.data.Results.length === 0) {

        throw new Error(`No hay resultados para ${ dir }`)
    }

    const data = resp.data.Results[0];
    const direccion = data.name;
    const lat = data.lat;
    const lng = data.lon;

    return {
        direccion,
        lat,
        lng
    }


}

module.exports = {

    getLugarLatLng
}