
const axios=require("axios").default;

const instance=axios.create({
   baseURL:`https://api.openweathermap.org/data/3.0/`,
   // headers:{
   //    "API_KEY":'bae86f7c1137e05aa6c6cea6f6ddba18'
   // },
});

const API='bae86f7c1137e05aa6c6cea6f6ddba18';

export const apiWeatherInitialize={
      getWeatherCurrent(lat,lon){
         return instance.get(`onecall?lat=${lat}&lon=${lon}&units=metric&lang=uk&appid=${API}`)
         .then((response)=>{
            return response.data;
         })
      },
      
      geoDecoding(location){
         const options = {
            method: 'GET',
            url: 'https://google-maps-geocoding.p.rapidapi.com/geocode/json',
            params: {address:location, language: 'uk'},
            headers: {
              'X-RapidAPI-Key': '0f2ea67d85msh85704bb847912f8p121045jsn00aa5c06d33a',
              'X-RapidAPI-Host': 'google-maps-geocoding.p.rapidapi.com'
            }
         };
         return axios.request(options).then(function (response) {
            return response.data.results;
         }).catch(function (error) {
            console.error(error);
         });
      },
      getWeatherHoursly(lat,lon){
         const options = {
         method: 'GET',
         url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly',
         params: {lat: lat, lon: lon, lang: 'uk', hours: '72', units: 'metric'},
         headers: {
            'X-RapidAPI-Key': '0f2ea67d85msh85704bb847912f8p121045jsn00aa5c06d33a',
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
         }
         };

         return axios.request(options).then(function (response) {
            return response.data.data;
         }).catch(function (error) {
            console.error(error);
         });
      },
      getWeather16Days(lat,lon){
      const options = {
         method: 'GET',
         url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily',
         params: {lat: lat, lon: lon},
         headers: {
            'X-RapidAPI-Key': '0f2ea67d85msh85704bb847912f8p121045jsn00aa5c06d33a',
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
         }
      };

      return axios.request(options).then(function (response) {
         return response.data.data;
      }).catch(function (error) {
         console.error(error);
      });
      }
}
/*
method: 'GET',
  url: '',
  params: {address: 'Білокриниччя', language: 'en'},
  headers: {
    
  }
  */
//https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}