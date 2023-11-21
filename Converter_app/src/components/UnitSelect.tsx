import { useEffect, useState, ChangeEvent } from "react";
import { Unit } from "../types/types";
import {Grid, TextField, Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

export default function UnitSelect({label, units, selected, onUnitChange, field, onFieldChange}:{label:string, units: Unit[], selected:string, onUnitChange: (name:string)=>void, field:any, onFieldChange:(field:number)=>void}){

    const [input, setInput] = useState(0);
    const handleChange = (e: SelectChangeEvent) => {
        onUnitChange(e.target.value as string);
    };

    function handleInputChange(event:ChangeEvent<HTMLInputElement>) {
        setInput(Number(event.target.value));
        onFieldChange(Number(event.target.value))
    }
    useEffect(() => {
        setInput(field);
      }, [field]);
    return (
        <Box sx={{ minWidth: 120 }}>
                <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Enter" value={input} variant="outlined" type="number" onChange={handleInputChange} />
                </Grid>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select value={selected} onChange={handleChange}>
                        {
                            units.map((unit) => 
                                (<MenuItem value={unit.name}>{unit.name}</MenuItem>)
                            )
                        }
                    </Select>
            </FormControl>
        </Box>
    )
}