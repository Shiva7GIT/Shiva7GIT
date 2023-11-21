import { Unit } from "../types/types";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

export default function UnitSelect({label, units, selected, onUnitChange}:{label:string, units: Unit[], selected:string, onUnitChange: (name:string)=>void}){

    const handleChange = (e: SelectChangeEvent) => {
        onUnitChange(e.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
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