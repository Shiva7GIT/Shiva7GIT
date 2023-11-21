import React, { useState } from 'react';
import Cities from './MetroContext';
import Ticket from './Ticket';
import {Places} from './Places';

const City = () => {
  const [selectedCity, setSelectedCity] = useState('');

  const changeCity = (e) => {
    setSelectedCity(e.target.value);
  }
  return (
    <>
      <div>
        <label>Select City:</label>
      
      <select name="City" onChange={changeCity} value={selectedCity}>
        <option value="" disabled>Select a city</option>
        <option value="hyderabad">Hyderabad</option>
        <option value="delhi">Delhi</option>
        <option value="chennai">Chennai</option>
      </select>
    </div>

    <Cities.Provider value={selectedCity}>
        <Places />
        <Ticket />   
    </Cities.Provider>

</>
  );
};


export default City;