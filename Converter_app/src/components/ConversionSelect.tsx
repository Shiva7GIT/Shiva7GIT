import * as React from "react";
import { ConversionType } from "../types/types";
import { allConversions } from "../store/conversionStore";
import { Container, Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
// import './ConversionSelect.css'
const ConversionSelect=({name, onConversionChange}: {name:string, onConversionChange: (conversionType: ConversionType) => void }) => {
    const conversions = React.useMemo(allConversions, []);
    
    const handleChange = (e: SelectChangeEvent) =>{
        onConversionChange as any as (conversionType: ConversionType) => void;
        onConversionChange(e.target.value as ConversionType);
    }
    
    return (
        
        <Box sx={{ minWidth: 120,justifyContent:"center" }}>
         <Container maxWidth="md">
            <Grid container spacing={2}>
                <FormControl fullWidth>
                    <InputLabel >Conversion</InputLabel>
                    <Select value={name} onChange={handleChange}>
                        {
                            conversions.map((conversion)=> 
                            (<MenuItem value={conversion}>{conversion}</MenuItem>)
                            )
                        }
                    </Select>
                </FormControl>
            </Grid>
         </Container>
        </Box>
    )
}
 export default ConversionSelect
 