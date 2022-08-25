import React from "react";
import Notification from "./Notifcation"
import { connect } from 'react-redux';
import { getCurrentVolume, getHourslyForecast, getWeather16Days } from "../../redux/initializeSelector";

const NotificationContainer=React.memo((props)=>{
   let rainInfo='';
   const nearestRain=(days,hours)=>{
      if(props.currentRain){
         rainInfo='протягом години';
         return;
      }
      for (const key in days) {
        if(days[key].volume>0.0001){
            if(+key===0){
               rainInfo='сьогодні';
            }else if(+key===1){
               rainInfo='завтра';
            }else if(+key===2){
               rainInfo='післязавтра';
            }else{
               let time =new Date(days[key].dt);
               rainInfo=`${(time.getMonth()+1)<10 
                  ?`0${time.getMonth()+1}`
                  :time.getMonth()+1}.${time.getDate()}`;
               return;
            }
            break;
         }
      }
      for (const key in hours) {
         if(hours[key].volume>0.0001){
            rainInfo+=` o ${hours[key].time}`;
            break;
         }
      }
   }
   nearestRain(props.weather16Days,props.hourslyForecast);
   return <Notification rainInfo={rainInfo} />
});

const mapStateToProps=state=>{
   return{
      hourslyForecast:getHourslyForecast(state),
      weather16Days:getWeather16Days(state),
      currentRain:getCurrentVolume(state),
   }
}

export default connect(mapStateToProps,null)(NotificationContainer);