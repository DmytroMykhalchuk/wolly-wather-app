export const getImgBg=(state)=>{
   let currentHour=new Date().getHours();
   let images=state.initialize.background;
   if(currentHour>=22||currentHour<5){          //night
      images=images.night;
   }else if(currentHour>=5&&currentHour<12){    //morning
      images=images.morning;
   }else if(currentHour>=12&&currentHour<18){   //day
      images=images.daytime;
   }else if(currentHour>=16&&currentHour<22){    //evening
      images=images.evening;
   }else{
      console.warn('no find image:error in checking')
   }
   return `https://raw.githubusercontent.com/KaiDerivor/tet/main/img/${images[Math.floor(images.length*Math.random())]}`;
}

export const getCurrentTemperature=(state)=>{
   return state.initialize.weatherNow.temperature;
}
//       feeling_as:'12'
export const getCurrentIcon=(state)=>{
   return state.initialize.weather16Days[0].icon;
}

export const getCurrentFeelingAs=(state)=>{
   return state.initialize.weatherNow.feelingAs;
}

export const getCurrentDescription=(state)=>{
   return state.initialize.weatherNow.description;
}

export const getCurrentWind=(state)=>{
   return state.initialize.weatherNow.wind;
}

export const getCurrentHumidity=(state)=>{
   return state.initialize.weatherNow.humidity;
}
export const getCurrentDayTemperature=(state)=>{
   return state.initialize.weather16Days[0].tempDay;
}
export const getCurrentNightTemperatur=(state)=>{
   return state.initialize.weather16Days[0].tempNight;
}

export const getSunriseTime=(state)=>{
   return state.initialize.weather16Days[0].sunriseTime;
}

export const getSunsetTime=(state)=>{

   return state.initialize.weather16Days[0].sunsetTime;
}
export const getLat=state=>{
   return state.initialize.lat;
}
export const getLon=state=>{
   return state.initialize.lon;
}
export const getIsInitialize=state=>{
   return state.initialize.isInitialize;
}

export const getHourslyForecast=(state)=>{
   return state.initialize.weatherHoursly;
}

export const getWeather16Days=(state)=>{
   return state.initialize.weather16Days;
}

export const getCurrentLocation=(state)=>{
   return state.initialize.currentLocation;
}

export const getListLocation=(state)=>{
   return state.initialize.listLocations;
}

export const getCurrentVolume=(state)=>{
   return state.initialize.weatherNow.volume;
}