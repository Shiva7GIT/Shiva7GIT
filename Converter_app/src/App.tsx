import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Header from './components/Header';
import ConversionSelect from './components/ConversionSelect';
import { ConversionType } from './types/types';
import { conversionContext } from './context/conversionContext';
import ConversionForm from './components/ConversionForm';
// import '../src/components/ConversionSelect.css'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function App() {
  const [selectedConversion, setSelectedConversion] = React.useState('');

  function handleChange(conversionType: ConversionType) {
    setSelectedConversion(conversionType);
  }

  return (
    <conversionContext.Provider value={{selectedConversion}}>
    <Box sx={{ flexGrow: 1 }}>
      <Header></Header>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item></Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <ConversionSelect name={selectedConversion} onConversionChange={handleChange}/>
          </Item>
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>
            {selectedConversion && <ConversionForm/>}
          </Item>
        </Grid>
      </Grid>
    </Box>
    </conversionContext.Provider>
  );
}