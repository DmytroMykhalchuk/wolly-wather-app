
import styles from './style.module.css';
const Preloader=props=>{
   return(
   <div className={styles.wrapper}>
      <span className={styles.loader}></span>
   </div>
   )
};
export default Preloader;