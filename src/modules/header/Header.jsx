import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.css'
import {faMagnifyingGlassLocation} from '@fortawesome/free-solid-svg-icons';

const Header=(props)=>{
   let listLocations=[];
   if(props.listLocations){
      listLocations=props.listLocations.map((el,i)=>{
         if(el.geometry.location_type==="APPROXIMATE"){
            return( <li key={i} data-lng={el.geometry.location.lng} data-place={el.address_components[0].long_name} data-lat={el.geometry.location.lat}>{el.formatted_address}</li>)
         }
   })}
   listLocations=listLocations.filter(el=>el!=undefined)
   let clazzFieldWrapper=props.isOpenField?styles.fieldWrapper+" "+styles.fieldWrapperOpened:styles.fieldWrapper;
   return (
   <div className={styles.wrapper}>
      <div className={styles.header}>
         <h1 className={styles.wrapper__title}>{props.currentLocation}</h1>
         <button className={styles.btnSearch} onClick={props.onOpenFieldHadler}>
            <FontAwesomeIcon icon={faMagnifyingGlassLocation} />
         </button>
      </div>
      <div className={clazzFieldWrapper}>
         <div className={styles.box+' '+props.searchMode&&styles.boxOpened}>

         {props.searchMode&&(
            <>
               <div style={{display:'flex',justifyContent:'center,'}}>
                  <input type='text' placeholder='City...' 
                  autoFocus={true}
                  maxLength={20} value={props.city} list="locations"
                  onChange={props.cityValueHandler}/>
               </div>
               <div className={styles.listWrapper}>
                  <ul className={styles.list} onClick={props.chooseCityHandler}>
               {listLocations.length > 0 && listLocations
               ?listLocations: (<li>no results</li>)}
                  </ul>
               </div>
               </>
               )} 
             </div> 
      </div>   
      </div>   
   )
}

export default Header;