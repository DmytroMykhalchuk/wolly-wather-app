import WeeklyForecast from "./WeeklyForecast"
import { connect } from 'react-redux'
import { getWeather16Days } from "../../redux/initializeSelector";

const WeeklyForecastContainer=(props)=>{
   // console.log(props.getWeather16Days);
   return <WeeklyForecast getWeather16Days={props.getWeather16Days}/>
}
const mapStateToProps=(state)=>{
   return {
      getWeather16Days:getWeather16Days(state)
   }
}
export default connect(mapStateToProps,null)(WeeklyForecastContainer);