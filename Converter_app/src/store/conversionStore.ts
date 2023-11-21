import {ConversionType} from "../types/types";

const ConversionTypeStore = {
    'TemperatureUnit': {
       'Celsius' : {name : 'celsius'},
       'Fahrenheit' : {name : 'fahrenheit'}
    },
    'SpeedUnit' : {
        'KMPH' : {name : 'kmph'},
        'MPH' : {name : 'mph'}
    },
    'AreaUnit' : {
        'SqMt' : {name : 'sqmt'},
        'SqFt' : {name : 'sqft'}
    }
    
}

export function allConversions(): ConversionType[] {
    return Object.keys(ConversionTypeStore) as ConversionType[];
}

export function allConversionUnits(conversion: ConversionType){
    return Object.values(ConversionTypeStore[conversion]);
}


export function conversionValue(conversion: ConversionType, from: string, to: string, input : number){

    if(conversion == 'TemperatureUnit')
    {
        if((from == 'celsius')&&(to == 'fahrenheit'))
        return 5/9*(input-32);
        else 
        return input * (9/5)+32;
    }

    else if(conversion == 'AreaUnit')
    {
        if(from == 'sqm')
        return input*10.76;
        else
        return input/0.092
    }
    else if(conversion == 'SpeedUnit')
    {
        if(from == 'kmph')
        return input*1.609
        else
        return input/1.609
    }
    
}