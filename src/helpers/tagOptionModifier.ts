import React from 'react'
import { stringCrop } from './stringCrop';

const tagOptionModifier = (options: any,propOptions: any) => {
    let modifiedOptions = [];
    console.log("Prop Options ====>",propOptions)
    if(propOptions.length > 3){
        modifiedOptions = options
    }else{
        if (options.length === 0) {
            modifiedOptions = options.map((option: any) => {
                return {
                    value: option.value,
                    label: stringCrop(option.label, 10),
                };
            });
        } else if (options.length === 1) {
            modifiedOptions = options.map((option: any) => {
                return {
                    value: option.value,
                    label: option.label,
                };
            });
        } else if (options.length === 2) {
            modifiedOptions = options.map((option: any) => {
                return {
                    value: option.value,
                    label: stringCrop(option.label, 7),
                };
            });
        } else if (options.length === 3) {
            modifiedOptions = options.map((option: any) => {
                return {
                    value: option.value,
                    label: stringCrop(option.label, 2),
                };
            });
        }else{
            modifiedOptions=options
        }
    }

    return modifiedOptions

}

export default tagOptionModifier