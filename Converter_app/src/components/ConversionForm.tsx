import { useContext, useState, useMemo } from "react";
import { conversionContext } from "../context/conversionContext";
import { Grid, Paper,TextField } from "@mui/material";
import UnitSelect from "./UnitSelect";
import { allConverionUnits } from "../store/conversionStore";
import { ConversionType } from "../types/types";
import ValueCalculator from "./Result";

export default function ConversionForm() {
    const {selectedConversion} = useContext(conversionContext);

    const [fromUnit, setFromUnit] = useState('');
    const [toUnit, setToUnit] = useState('');
    const [input, setInput] = useState(0);

    const units = useMemo(() => {
        return selectedConversion ? allConverionUnits(selectedConversion as ConversionType): [];
    }, [selectedConversion])

    // const canShowValue = useMemo(() => {
    //     return selectedConversion && fromUnit && toUnit;
    // }, [fromUnit, toUnit]);

    function handleFromUnitChange(unit: string) {
        setFromUnit(unit);
    }

    function handleToUnitChange(unit: string) {
        setToUnit(unit);
    }

    function handleInputChange(event:any) {
        setInput(event.target.value);
    }

    return(
        <Paper>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Enter" variant="outlined" type="number" onChange={handleInputChange} />
                </Grid>
                <Grid item xs={6}>
                        <UnitSelect label="To" units={units} selected={toUnit} onUnitChange={handleToUnitChange}></UnitSelect>
                </Grid>
                <Grid item xs={6}>
                        <ValueCalculator conversion={selectedConversion as ConversionType} from={fromUnit} to={toUnit} input={input}></ValueCalculator> 
                </Grid>
                <Grid item xs={6}>
                        <UnitSelect label="From" units={units} selected={fromUnit} onUnitChange={handleFromUnitChange}></UnitSelect> 
                </Grid>
            </Grid>
        </Paper>
    )
}