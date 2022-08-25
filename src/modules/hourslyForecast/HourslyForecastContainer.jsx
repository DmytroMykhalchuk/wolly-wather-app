import Buttons from "./Buttons";
import HourslyForecast from "./HourslyForecast"
import { connect } from "react-redux";
import {  useState } from 'react';
import { getCurrentDayTemperature, getCurrentDescription, getCurrentFeelingAs,
   getCurrentHumidity, getCurrentIcon, getCurrentNightTemperatur, getCurrentTemperature,
   getCurrentWind, getSunriseTime, getSunsetTime, getHourslyForecast, getWeather16Days, getIsInitialize, getCurrentVolume } 
   from '../../redux/initializeSelector';

const HourslyForecastContainer=(props)=>{
      
   const [currentDay, setCurrentDay] = useState(0)

   const onClickDayButtonHandler=(e)=>{
      const keyDay=e.target.nodeName==='BUTTON'
      ?e.target.dataset.key:
      e.target.parentNode.dataset.key;
      if(!keyDay){
         console.warn('Error: HourslyForecastContainer=> keyDay is undefined');
      }
      setCurrentDay(+keyDay);
   }
   // nearestRain();
      return (
         <>
            <HourslyForecast 
            temperature={currentDay===0?props.temperature:`${props.weather16Days[currentDay].tempDay} - ${props.weather16Days[currentDay].tempNight}`}
            icon={currentDay===0 ? props.icon : props.weather16Days[1].icon}
            description={currentDay===0 ? props.description : props.weather16Days[currentDay].description}
            feelingAs={currentDay===0 ? props.feelingAs : `${props.weather16Days[currentDay].feelingAs.day} - ${props.weather16Days[currentDay].feelingAs.night}`}
            wind={currentDay===0 ? props.wind : props.weather16Days[currentDay].wind}
            humanity={currentDay===0 ? props.humanity : props.weather16Days[currentDay].humidity}
            tempDay={currentDay===0 ? props.tempDay : props.weather16Days[currentDay].tempDay}
            tempNight={currentDay===0 ? props.tempNight : props.weather16Days[currentDay].tempNight}
            sunriseTime={currentDay===0 ? props.sunriseTime : props.weather16Days[currentDay].sunriseTime}
            sunsetTime={currentDay===0 ? props.sunsetTime : props.weather16Days[currentDay].sunsetTime}
            volume={currentDay===0 ? props.volume : props.weather16Days[currentDay].volume}
            hourslyForecast={props.hourslyForecast}
            dayKey={currentDay}
            />
            <Buttons onClick={onClickDayButtonHandler}
            todayTempDay={props.tempDay} todayTempNight={props.weather16Days[0].tempNight} todayWind={props.weather16Days[0].wind}
            tommorowTempDay={props.weather16Days[1].tempDay} tommorowTempNight={props.weather16Days[1].tempNight} tommorowWind={props.weather16Days[1].wind}
            tommorowAfterTempDay={props.weather16Days[2].tempDay} tommorowAfterTempNight={props.weather16Days[2].tempNight} tommorowAfterWind={props.weather16Days[2].wind}    

            />
         </>
      );
}
const mapStateToProps=(state)=>{
   return{
      temperature:getCurrentTemperature(state),
      icon:getCurrentIcon(state),
      description:getCurrentDescription(state),
      feelingAs:getCurrentFeelingAs(state),
      humanity:getCurrentHumidity(state),
      wind:getCurrentWind(state),
      tempDay:getCurrentDayTemperature(state),
      tempNight:getCurrentNightTemperatur(state),
      sunriseTime:getSunriseTime(state),
      sunsetTime:getSunsetTime(state),
      volume:getCurrentVolume(state),
      hourslyForecast:getHourslyForecast(state),
      weather16Days:getWeather16Days(state),
   }
}
export default connect(mapStateToProps,null)(HourslyForecastContainer);