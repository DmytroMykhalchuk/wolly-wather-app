import styles from './styles.module.css';

const DetailForecastSection=(props)=>{
   if(!props.hourslyForecast){return;}
   const hourRows=()=>{
      const toEndPoint=24 - parseInt(props.hourslyForecast[0].time);

         let list=[]
         let i=props.dayKey===0?0:props.dayKey===1?toEndPoint:24+toEndPoint;
         let to=props.dayKey===0?toEndPoint:24*props.dayKey+toEndPoint;
         for(;i<to;i++){
            let weather=props.hourslyForecast[i];
         list.push(
            (<div key={i} className={styles.verticalCarousel__item} data-key={i} onClick={props.onChooseHourHandle}> 
               <div className={styles.item__header}>
                  <span>{weather.time}</span>
               </div>
               <div className={styles.item__body}>
                  <img src={weather.icon} /> 
               </div>
               <div className={styles.item__footer}>
                  <span>{weather.temperature}&deg;</span>
                  <span>💧{Math.round(weather.pop)}%</span>
                  <span >{weather.wind} м/с {(weather.wind_gust-weather.wind)>6?'🚩':null}</span>
               </div>
            </div>)
         )
         
      }
      return list;
      
   }
   return(
      <div className={styles.detailHoursData}>
      <div className={styles.verticalCarousel}>
        {hourRows()}
      </div>
</div>
   )
}
export default DetailForecastSection;