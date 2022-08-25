import style from './../detailOneHour/style.module.css'
const DetailOneHour=(props)=>{
   const checkClass=(property,isMsg,low,middle,high,critical)=>{
      let clazz='';
      let msg='';
      if(property>=low[0]&&property<=[1]){
         clazz=style.uviLow;
      }else if(property>middle[0]&&property<=middle[1]){
         clazz=style.uviMiddle;
         msg='(підвищений)';
      }else if(property>high[0]&&property<[high[1]]){
         clazz=style.uviHigh;
         msg='(високий)';
      }else if(property>=critical[0]){
         clazz=style.uviDanger;
         msg='(критичний)';
      }
      if(isMsg){
         return [clazz,msg];
      }else{
         return [clazz]
      }
   }
   if(props.currentHours){
      let weather=props.weather[props.currentHours];

      let [uviClass,msgUvi]=checkClass(weather.uvi,true,[2,4],[4,6],[6,10],[10]);
      let [windClass]=checkClass(weather.wind,false,[4,6],[6,10],[10,18],[18]);
      let [windGust]=checkClass(weather.wind_gust,false,[4,6],[6,10],[10,18],[18]);

      return <div className={style.wrapper} style={{height:'100%'}}>
         <div className={style.boxInfo}>
            <h3 className={style.boxInfo__title}>
               {weather.time}
            </h3>
            <div className={style.row}>
               <div className={style.boxInfo__Col}>
                  <p>Відчувається як: <span>{weather.feelingAs}&deg;</span></p>
                  <p>Пориви вітру: 🚩 <span className={windGust}>{weather.wind_gust} м/с</span></p>
                  <p>Ймовірність опадів: 💧 <span>{Math.round(weather.pop)}%</span></p>
                  <p>УФВ: <span className={uviClass}>{weather.uvi} {msgUvi&&msgUvi} </span></p>
                  
               </div>
               <div className={style.boxInfo__Col}>
                  <p>Хмарність: <span>{weather.clouds}%</span></p>
                  <p>Вітер: <span className={windClass}>{weather.wind} м/с</span></p>
                  {weather.volume>0.001&&(<p>К-сть опадів: <span>{Math.ceil(weather.volume*100)/100}мм</span></p>)}
                  <p>Вологість: <span>{weather.humidity}%</span></p>
               </div>
            </div>
         </div>
      </div>
   }else{

       return <div className={style.wrapper + " "+style.wrapperClosed} >
         <div className={style.boxInfo}>
            <h3 className={style.boxInfo__title}>
            </h3>
            <div className={style.row}>
               <div className={style.boxInfo__Col}>
                  <p>Відчувається як: <span>&deg;</span></p>
                  <p>Пориви вітру: 🚩 <span >м/с</span></p>
                  <p>Ймовірність опадів: 💧 <span>%</span></p>
                  <p>УФВ: <span > </span></p>
                  
               </div>
               <div className={style.boxInfo__Col}>
                  <p>Хмарність: <span>%</span></p>
                  <p>Вітер: <span > м/с</span></p>
                  <p>Вологість: <span>%</span></p>
               </div>
            </div>
         </div>
      </div>
   }
}

export default DetailOneHour;