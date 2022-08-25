import styles from './styles.module.css'

const Buttons=(props)=>{
   return(
      <div className='buttonsWrapper'>
         <button className={styles.buttonDay} onClick={props.onClick} data-key="0">
            <div className={styles.buttonDay__title}>Сьогодні</div>
            <span className={styles.temperature}>{Math.round(props.todayTempDay)}&deg;</span>
            <span className={styles.temperatureNight}>{Math.round(props.todayTempNight)}&deg;</span>
            <span className={styles.wind}>{Math.round(props.todayWind)}м/с</span>
         </button>
         <button className={styles.buttonDay} onClick={props.onClick} data-key="1">
            <div className={styles.buttonDay__title}>Завтра</div>
            <span className={styles.temperature}>{Math.round(props.tommorowTempDay)}&deg;</span>
            <span className={styles.temperatureNight}>{Math.round(props.tommorowTempNight)}&deg;</span>
            <span className={styles.wind}>{Math.round(props.tommorowWind)}м/с</span>
         </button>
         <button className={styles.buttonDay} onClick={props.onClick} data-key="2">
            <div className={styles.buttonDay__title}>Післязавтра</div>
            <span className={styles.temperature}>{Math.round(props.tommorowAfterTempDay)}&deg;</span>
            <span className={styles.temperatureNight}>{Math.round(props.tommorowAfterTempNight)}&deg;</span>
            <span className={styles.wind}>{Math.round(props.tommorowAfterWind)}м/с</span>
         </button>
      </div>
   )
}

export default Buttons;