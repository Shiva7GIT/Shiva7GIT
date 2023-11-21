import React, { useState } from 'react';
import Cities from './MetroContext';
import { FormControl, InputLabel, MenuItem, Select, Container, Grid } from '@mui/material';
import Ticket from './Ticket';
import {Places} from './Places';

// import './City.css'
const City = () => {
  const [selectedCity, setSelectedCity] = useState('');

  const changeCity = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Select City:</InputLabel>
            <Select name="City" onChange={changeCity} value={selectedCity}>
              <MenuItem value="" disabled>
                Select a city
              </MenuItem>
              <MenuItem value="hyderabad">Hyderabad</MenuItem>
              <MenuItem value="delhi">Delhi</MenuItem>
              <MenuItem value="chennai">Chennai</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Cities.Provider value={selectedCity}>
            <Places />
            <Ticket />
          </Cities.Provider>
        </Grid>
      </Grid>
    </Container>
  );
};

export default City;
