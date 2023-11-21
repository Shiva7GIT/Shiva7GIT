import React, { useContext, useState } from "react";
import Ticket from "./Ticket";
import Locationselect from "./Locationselect";
import Cities  from "./MetroContext";


const Location = (CityName) => {
  if(CityName=='hyderabad'){
    return ['Ameerpet','SR Nagar','ECIL','Erragadda'];
  }
  else if(CityName=='delhi'){
    return ['Muneerabad','Park','Hotel','Red Fort'];
  }
  else if(CityName=='chennai'){
    return ['Thoraipakkam','Medavakkam','Anna Nagar','Tiruvanmayur'];
  }
  else{
    return []
  }
}

const Places=()=>{
  const [fromloc,setFromloc]=useState();
  const [toloc,setToloc]=useState();

  const CityName=useContext(Cities);
  const receivedArray=Location(CityName)
console.log(receivedArray)
  const handleFromChange = ( value) => {
    setFromloc(value);
  };
  const handleToChange = ( value) => {
    setToloc(value);
  };
return(
    <>

    <h3>From:</h3><Locationselect names={receivedArray}  onSelectionChange={handleFromChange} /><br></br>
    
    <h3>To:</h3> <Locationselect  names={receivedArray} onSelectionChange={handleToChange} /><br />

    <Ticket fromloc={fromloc} toloc={toloc}/>
   
    </>
)

}
export  {Places,Location};