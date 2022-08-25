import HourslyForecastContainer from "../hourslyForecast/HourslyForecastContainer";
import WeeklyForecastContainer from "../weeklyForecast/WeeklyForecastContainer";
import styles from './style.module.css';
import {connect} from 'react-redux';
import NotificationContainer from "../notification/NotificationContainer";
import { getIsInitialize,getLat,getLon,} from "../../redux/initializeSelector";
import Preloader from './../common/preloader/Preloader'
import { getCurrentWeather } from '../../redux/initializeReducer';
import { useEffect } from "react";

const PageBuilder=(props)=>{
   useEffect(()=>{
      props.getCurrentWeather(props.lat,props.lon);
   },[props.lat,props.lon]);
   return(
      <div className={styles.wrapper}>
         
      {props.isInitialize
      ?<Preloader />
      :<div className="wrapper">
            <HourslyForecastContainer />
            <NotificationContainer />
            <WeeklyForecastContainer />
         </div>}
      </div>
   )
}

const mapStateToProps=(state)=>{
   return{
      isInitialize:getIsInitialize(state),
      lat:getLat(state),
      lon:getLon(state)
   }
}
const mapDispatchToProps=(dispatch)=>{
   return{
      getCurrentWeather:getCurrentWeather(dispatch),
     
   }
}
export default connect(mapStateToProps,mapDispatchToProps)(PageBuilder);