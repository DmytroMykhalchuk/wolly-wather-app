import { useState } from "react";
import { connect } from "react-redux";
import { getGeocodes, setCoordinates } from "../../redux/initializeReducer";
import { getCurrentLocation, getListLocation } from "../../redux/initializeSelector";
import Header from "./Header";

const HeaderContainer = (props) => {
   const [isOpenField, setIsOpenField] = useState(false)
   const [city, setCity] = useState('')
   const [searchMode, setSearchMode] = useState(false)
   const cityValueHandler = (city) => {
      setCity(city);
      props.getGeocodes(city);

   };
   const onOpenFieldHadler = () => {
      setIsOpenField(!isOpenField)
      setSearchMode(!isOpenField)

   }
   const onBlurSearchHandler = () => {
      setIsOpenField(false)
      setSearchMode(false)
   }
   const chooseCityHandler = (el) => {
      let lat = el.target.dataset.lat;
      let lon = el.target.dataset.lng;
      let place = el.target.dataset.place;
      props.setCoordinates(lat, lon, place);
      onBlurSearchHandler();
   }
   return <Header currentLocation={props.currentLocation} isOpenField={isOpenField}
      onOpenFieldHadler={onOpenFieldHadler}
      cityValueHandler={cityValueHandler}
      listLocations={props.listLocations}
      searchMode={searchMode}
      city={city}
      chooseCityHandler={chooseCityHandler}
   />;
}

const mapStateToProps = (state) => {
   return {
      currentLocation: getCurrentLocation(state),
      listLocations: getListLocation(state)
   }
}
const mapDispatchToProps = (dispatch) => {
   return {
      getGeocodes: getGeocodes(dispatch),
      setCoordinates: (lat, lon, place) => {
         dispatch(setCoordinates(lat, lon, place))
      }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);