import { useMemo } from "react";
import { ConversionType } from "../types/types";
import { conversionValue } from "../store/conversionStore";
import { TextField } from "@mui/material";

export default function ValueCalculator({conversion, from , to, input}: {conversion: ConversionType, from: string, to: string, input: number}){
    
    const value = useMemo(() => conversionValue(conversion, from, to, input), [conversion, from, to, input]);

    return(
        <>
            <TextField id="outlined-basic" label="Result" variant="outlined" value={value} />
        </>
    );
}
