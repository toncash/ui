import React, { useState } from 'react'
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material'
import "/node_modules/flag-icons/css/flag-icons.min.css";
// import countriesData from '../../config/countries.json'

interface Currency {
    countryCode: string,
    currencyCode: string
}




//   const CountryFlag = ({ data }: any) => (
//     <span>
//       <img
//         src={`https://www.worldometers.info//img/flags/small/tn_al-flag.gif`}
//         alt={data.value.slice(0, 2)}
//         width="24"
//         height="24"
//       />
//     </span>
//   );

export const CurrencySelect = () => {
    // const [selectedCurrency, setSelectedCurrency] = useState<Currency>(countriesData.countries.country[0]);
    // const [currencyOptions, setCurrencyOptions] = useState<Currency>(countriesData.countries.country);
    //
    // console.log( countriesData )
    //
    // const handleCurrencyChange = (event: SelectChangeEvent) => {
    //     console.log(event.target.value)
    //     setSelectedCurrency(event.target.value);
    // };

    //   let flag = {} ;
    return (
        <div></div>
        // <FormControl>
        //     <InputLabel id="currency-label">Currency</InputLabel>
        //     <Select
        //         labelId="demo-simple-select-label"
        //         id="demo-simple-select"
        //         value={selectedCurrency}
        //         label={"Cur"}
        //         onChange={handleCurrencyChange}
        //     >
        //         {currencyOptions.map((currency) => (
        //             <MenuItem value={currency.currencyCode}>
        //                 {currency.currencyCode}
        //                 <span className={`fi fi-${currency.countryCode.toLowerCase()} `}></span>
        //             </MenuItem>
        //         ))}
        //     </Select>
        // </FormControl>
    );
};

export default CurrencySelect;
