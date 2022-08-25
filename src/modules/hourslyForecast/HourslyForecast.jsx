import DetailForecastSection from './DetailForecastSection';
import HeaderHourslyForecast from './Header';
import Metrics from './Metrics';
import { useEffect,useState} from 'react';
import {connect} from 'react-redux';
import styles from './styles.module.css';
import { getImgBg } from '../../redux/initializeSelector';
import DetailOneHour from './DetailOneHour';
import HeaderContainer from '../header/HeaderContainer';

const HourslyForecast=(props)=>{
   const [img, setImg] = useState(null)
   let [hours, setHours] = useState(null);
   let [minutes,setMinutes]=useState(null);
   const [currentHours, setCurrentHours] = useState(null)
useEffect(()=>{
   
   setImg(props.imgBg);
   setInterval(()=>{
      let minutes=new Date().getMinutes();
      minutes=minutes>=10?minutes:`0${minutes}`;
      setHours(new Date().getHours());
      setMinutes(minutes);
   },1000);
   },[]);

   useEffect(() => {
     return () => {
      setCurrentHours(null);
     };
   }, [props.dayKey])

   const onChooseHourHandle=(e)=>{
      const keyHour=e.target.dataset.key
      ?e.target.dataset.key:
      e.target.parentNode.dataset.key?
      e.target.parentNode.dataset.key:e.target.parentNode.parentNode.dataset.key
      ;

      if(!keyHour){
         console.warn('Error: HourslyForecastContainer=> keyDay is undefined');
      }
      if(currentHours===keyHour){
         setCurrentHours(null);
         return;
      }else{
         setCurrentHours(keyHour);
      }
   }




   return(<>
   <div className={styles.wrapper} 
      style={{backgroundImage:`url(${img?img:'https://github.com/KaiDerivor/tet/blob/main/img/morning2.jpg?raw=true'}`}}>
      <HeaderContainer />
      <HeaderHourslyForecast minutes={minutes}
         hours={hours}
         temperature={props.temperature}
         icon={props.icon}
         description={props.description}
         feelingAs={props.feelingAs}
      />
      <Metrics
      wind={props.wind}
      humanity={props.humanity}
      tempDay={props.tempDay}
      tempNight={props.tempNight}
      sunriseTime={props.sunriseTime}
      sunsetTime={props.sunsetTime}
      volume={props.volume}
      />
      
      <DetailForecastSection hourslyForecast={props.hourslyForecast} dayKey={props.dayKey} onChooseHourHandle={onChooseHourHandle} />
   </div>
      <DetailOneHour weather={props.hourslyForecast} currentHours={currentHours}/>
   </>
   )
}

const mapStateToProps=(state)=>{
   return{
      imgBg:getImgBg(state),
    
   }
}

export default connect(mapStateToProps,null)(HourslyForecast);