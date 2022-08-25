import styles from './style.module.css';
const nameDay=['Пн','Вт','Ср','Чт','Пт','Сб','Нд'];

const WeeklyForecast=(props)=>{
   let w=Date.now();
   let numberWeekDay=new Date(w).getDay()-1;
      const tablePrepareRow=(nameDay)=>{
         let list=[];
         let cuurentDay=null;
         let time=null;
         for(let j=0,it=0;j<6;j++){
            for(let i=0;i<7;i++,it++){
               if(!props.getWeather16Days[it]){break;}
               if(j===0&&i<numberWeekDay){
                  cuurentDay=props.getWeather16Days[0];
                  it--;
                  time=0;
               }else{
                  cuurentDay=props.getWeather16Days[it];
                  time=new Date(props.getWeather16Days[it].dt).getDate();
               }
               let classForDiv = (j===0 && i < numberWeekDay) 
               ? styles.table__item+' '+styles.table__itemTransperent
               : styles.table__item;
               list.push((
                  <div key={list.length} 
                  className = { classForDiv }>
                     <div className={styles.item__title}>
                        <span>{nameDay[i]}</span>
                        <span>{time}</span>
                     </div>
                     <div className={styles.item__icon}>
                        <img src={cuurentDay.icon} />
                     </div>
                     <div className={styles.item__temperature}>
                        <span className={styles.day}>{Math.round(cuurentDay.tempDay)}&deg;</span>
                        <span className={styles.night}>{Math.round(cuurentDay.tempNight)}&deg;</span>
                     </div>
                     <div className={styles.item__pop}>
                        <span>💧 {Math.round(cuurentDay.pop)}%</span>
                     </div>
                     {cuurentDay.volume>0.001&&(
                     <div className={styles.item__pop}>
                        <span>{Math.ceil(cuurentDay.volume*100)/100}мм</span>
                     </div>
                     )}
                  </div>
               ));
            }
            if(!props.getWeather16Days[it]){break;}
         }
         
         return list;
      }
   
      return(
         <div className={styles.Wrapper}>
            <h3 className={styles.Wrapper__title}>Погода на місяць</h3>
               <div className={styles.table}>
                  {tablePrepareRow(nameDay)}
            </div>
         </div>
      )
}

export default WeeklyForecast;