import styles from './styles.module.css';

const HeaderHourslyForecast=(props)=>{
   return (
      <div className={styles.row}>
         <div className={styles.summaryData}>
            <span className={styles.summaryData__currentTime}>
               {props.hours}:{props.minutes}
               </span>
            <div className={styles.row}>
               <span className={styles.summaryData__temperature}>{props.temperature}&deg;</span>
               <img className={styles.summaryData__icon} src={props.icon}/>
            </div>
            <span className={styles.summaryData__description}>{props.description}</span>
            <span className={styles.summaryData__feelings}>Відчувається як {props.feelingAs}&deg;</span>
         </div>
         
      </div>
   );
}

export default HeaderHourslyForecast;