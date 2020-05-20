const axios = require('axios');

const getClima = async(lat, lng) => {

    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lng }&appid=38107f4982067d64ae4929c46aa83f6b&units=metric`);

    //todo el objeto recibido  en resp es conocido como data y vamos a usar solo la temperatura
    return resp.data.main.temp;

}

module.exports = {

    getClima
}