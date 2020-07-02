const axios = require("axios");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/forecast?access_key=5c31b4c31db715d3799c3176f54716d7&query=${latitude},${longitude} `;

  axios
    .get(url)
    .then(({ data: { current: { weather_descriptions } } }) =>
      callback(undefined, `It is currently ${weather_descriptions[0]}`)
    )
    .catch((err) => callback(err, undefined));
};

module.exports = forecast;
