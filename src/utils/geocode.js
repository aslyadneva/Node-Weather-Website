const axios = require("axios");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYXNseWFkbmV2YSIsImEiOiJjazVpaGlnbncwZXBpM2VtdHZhZHhwbm80In0.0YWeTs37GdCU8CSY2BmSKg`;

  axios
    .get(url)
    .then(({ data: { features } }) => {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name,
      });
    })
    .catch((err) =>
      callback("Unable to locate. Try another search.", undefined)
    );
};

module.exports = geocode;
