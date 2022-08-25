import styles from './styles.module.css';

const Metrics=(props)=>{
   return( <div className={styles.metrics}>
      <div className={styles.row}>
         <div className={styles.metrics__section}>{props.humanity}%</div>
         <div className={styles.metrics__section}>
            {Math.round(props.tempDay)}&deg; 
            <span style={{opacity:0}}> l </span>
            <span className={styles.metrics__sectionDark}> {Math.round(props.tempNight)}&deg; </span>
         </div>
         <div className={styles.metrics__section}>{props.wind}м/c</div>
         {props.volume>0.01&&(<div className={styles.metrics__section}>{Math.round(props.volume*100)/100}мм</div>)}

      </div>
      <div className={styles.row}>
         <div className={styles.metrics__sectionDark}>Схід сонця: {props.sunriseTime} </div>
         <div className={styles.metrics__sectionDark}>Захід сонця: {props.sunsetTime} </div>
      </div>
   </div>)
}
export default Metrics;