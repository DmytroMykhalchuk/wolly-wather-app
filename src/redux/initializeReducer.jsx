import { apiWeatherInitialize } from "../api/api";
import { getCookie } from "../modules/utils/getDataFromCoockie";
import { test } from './../testing/test-data-json'

const SET_CURRENT_WEATHER='SET_CURRENT_WEATHER';
const SET_16DAY_WEATHER='SET_16DAY_WEATHER';
const SET_HOURSLY_WEATHER='SET_HOURSLY_WEATHER';
const SET_INITIALIZING_FALSE='SET_INITIALIZING_FALSE';
const SET_LIST_LOCATIONS='SET_LIST_LOCATIONS';
const UNSSET_LIST_LOCATION='UNSSET_LIST_LOCATION';
const SET_COORD='SET_COORD';


let initialState={
   background:{
      morning:['morning1.jpg','morning2.jpg','morning3.webp','morning4.jpg','morning5.jpg','morning6.jpg','morning7.jpg','morning8.jpg','morning9.jpg','morning10.jpg'],
      daytime:['daytime1.jpg','daytime2.jpg','daytime3.jpg','daytime4.png','daytime5.jpg','daytime6.webp','daytime7.jpg','daytime8.webp','daytime9.jpg','daytime10.jpg','daytime11.jpg','daytime12.jpg'],
      evening:['evening1.jpg','evening2.webp','evening3.jpg','evening4.jpg','evening5.jpg','evening6.jpg','evening7.jpg','evening8.jpg','evening9.jpg','evening10.jpg','evening11.jpg','evening12.jpg','evening13.jpg','evening14.jpg'],
      night:['night1.jpg','night2.jpg','night3.jpg'],
   },
   listLocations:null,
   currentLocation:getCookie('currentLocation')?getCookie('currentLocation'):'Київ',
   lat:getCookie('lat')?getCookie('lat'):'51',
   lon:getCookie('lon')?getCookie('lon'):'30.30',
   weatherNow:{ 
      // temperature:21,
      // icon:'☀',
      // description:"Ясно",
      // feelingAs:'12',
      // humidity:'45',
      // clouds:0,
      // uvi:0,
      // cloudly:0,
      // wind_deg: 232,
      // wind_gust: 13.76,
      // wind: 9.11, //speed
   },
   weather16Days:[
      // {
      // temp:{
      //    day:21,
      //    night:14,
      // },
      // icon:'☀',
      // description:"Ясно",
      // feelingAs:'12',
      // wind:'3',
      // humidity:'45',
      // sunrise:1560343627,
      // sunset:1568396563,
      // }
   ],
   weatherHoursly:[],
   isInitialize:true
   

}



const initializeReducer=(state=initialState,action)=>{
   switch (action.type) {
      case SET_CURRENT_WEATHER:
         return {
            ...state,
            weatherNow:action.data
         }
      case SET_16DAY_WEATHER:
         return {
            ...state,
            weather16Days:{...action.data}
         }
      case SET_HOURSLY_WEATHER:
         return{
            ...state,
            weatherHoursly:{...action.data}
         }
   
      case SET_INITIALIZING_FALSE:
        return{
            ...state,
            isInitialize:false
        }
        case SET_LIST_LOCATIONS:
            return{
                ...state,
                listLocations:action.listLocations
            }
        case UNSSET_LIST_LOCATION:
            return{
                ...state,
                listLocations:[]
            }
        case SET_COORD:
            document.cookie=`lat=${action.lat};max-age=5259486`;
            document.cookie=`lon=${action.lot};max-age=5259486`;
            document.cookie=`currentLocation=${action.name};max-age=5259486`
                return{
                    ...state,
                    lat:action.lat,
                    lon:action.lot,
                    currentLocation:action.name,
                    isInitialize:true,
                }
            
      default:
         return state;
   }
   
}
const fnCorrectTime=(time)=>{
    time=new Date(time);
    let minutes=time.getMinutes()<10 
    ? `0${time.getMinutes()}`
    : time.getMinutes();
    let hours=time.getHours()<10 
    ? `0${time.getHours()}`
    : time.getHours();
    return [hours,minutes];
}
const setCurrentWeather=(data)=>{
    let [sunriseHours,sunriseMinute]=fnCorrectTime(data.sunrise*1000);
    let [sunsetHours,sunsetMinute]=fnCorrectTime(data.sunset*1000);
    let volume=0;
    
    if(data.rain){
        volume=data.rain['1h'];
    }else if(data.snow){
        volume=data.snow['1h']
    }
    return {
    type:SET_CURRENT_WEATHER,
    data:{
        clouds:data.clouds,
        feelingAs:data.feels_like,
        humidity:data.humidity,
        sunriseTime: `${sunriseHours}:${sunriseMinute}`,
        sunsetTime: `${sunsetHours}:${sunsetMinute}`,
        temperature:data.temp,
        uvi:data.uvi,
        icon:`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`, 
        description:data.weather[0].description,
        wind_deg: data.wind_deg,
        wind_gust: data.wind_gust,
        wind: data.wind_speed, //speed
        volume:volume
    }
   }
}

const set16DayWeather=(data)=>{
   const dailyWeather=data.map(el=>{
    let [sunriseHours,sunriseMinute]=fnCorrectTime((el.sunrise_ts)*1000);
    let [sunsetHours,sunsetMinute]=fnCorrectTime((el.sunset_ts)*1000);
      return{
        feelingAs:{
            day:el.app_max_temp,
            night:el.app_min_temp
        },
         clouds:el.clouds,
         humidity: el.rh,
         pop: el.pop,
         sunriseTime: `${sunriseHours}:${sunriseMinute}`,
         sunsetTime: `${sunsetHours}:${sunsetMinute}`,
         tempDay:el.max_temp,
         tempNight: el.min_temp,
         uvi: el.uv,
         description:el.weather.description,
         icon:`https://www.weatherbit.io/static/img/icons/${el.weather.icon}.png`,
         wind_deg: el.wind_dir,
         wind_gust: el.wind_gust_spd,
         wind: el.wind_spd, //speed
         dt:el.datetime,
         volume:el.precip
      }
    
   })
      return{
         type:SET_16DAY_WEATHER,
         data:dailyWeather
      }
}
const setHourslyWeather=(el)=>{
   
   let weather=el.map(el=>{
    let volume=el.precip;
    // if(el.rain){
    //     volume=el.rain['1h'];
    // }else if(el.snow){
    //     volume=el.snow['1h']
    // }
    let hours=new Date(el.timestamp_local).getHours();
    let time=hours<10?`0${hours}`:hours;
    return{
         clouds:el.clouds,
         feelingAs:el.app_temp,
         humidity:el.rh,
         temperature:el.temp,
         uvi:el.uv,
         icon:`https://www.weatherbit.io/static/img/icons/${el.weather.icon}.png`,
         description:el.weather.description,
         wind_deg: el.wind_dir,
         wind_gust: el.wind_gust_spd,
         wind: el.wind_spd,
         time:`${time}:00`,
         pop: el.pop,
         volume:volume
      }
   })
   return{
      type: SET_HOURSLY_WEATHER,
      data:weather
   }
}
const setListocations=(data)=>{
   return{
    type:SET_LIST_LOCATIONS,
    listLocations:data
   }
}
const setInitializingFalse=()=>{
   return{
      type:SET_INITIALIZING_FALSE
   }
}
const unsetListLocations=()=>{
    return{
        type:UNSSET_LIST_LOCATION
    }
}
export const setCoordinates=(lot,lat,name)=>{
    return{
        type:SET_COORD,
        lat,lot,name
    }
}
export const getCurrentWeather=(dispatch)=>(lat,lon)=>{
   let promise1=apiWeatherInitialize.getWeatherCurrent(lon,lat)
   .then(data=>{
        dispatch(setCurrentWeather(data.current));
    });
    let promise2=apiWeatherInitialize.getWeather16Days(lon,lat).then(data=>{
        dispatch(set16DayWeather(data));
      //  console.log(data);
    });

    let promise3=apiWeatherInitialize.getWeatherHoursly(lon,lat).then(data=>{
        dispatch(setHourslyWeather(data));
       // console.log(data);

    });
   Promise.all([promise1,promise2,promise3]).then(()=>{
    dispatch(setInitializingFalse());
 }); 
   // let promise=new Promise(resolve=>{
   //    setTimeout(()=>{
   //       return resolve(test);
   //    },300)
   // });
   // promise.then(data=>{
   //    dispatch(setCurrentWeather(data.current));
   //    dispatch(set16DayWeather(data.daily));
   //    dispatch(setHourslyWeather(data.hourly));
   //    dispatch(setInitializingFalse());
   // })
}
export const getGeocodes=(dispatch)=>(location)=>{
    if(location===''){
        dispatch(unsetListLocations());
        return;
    } ;
   apiWeatherInitialize.geoDecoding(location).then((data)=>{
    dispatch(setListocations(data));
   })
    
}
export default initializeReducer;