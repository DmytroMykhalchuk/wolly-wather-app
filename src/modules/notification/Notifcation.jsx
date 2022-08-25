
import styles from './style.module.css'

const Notification=(props)=>{
   let alerts=props.rainInfo?`Найближчий дощ очікується ${props.rainInfo}`:"У найближчі дні без дощу";
   return(
      <div className={styles.wrapper}>
         <p className={styles.wrapper__message} >{alerts}</p>
      </div>
   )
}
export default Notification;