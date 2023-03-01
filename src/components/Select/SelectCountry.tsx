import { Autocomplete, Grid, Skeleton, TextField } from "@mui/material"
import { useAxios } from "../hooks/useAxios";
import {useState} from "react";



const SelectCountry = () => {
  const [data, loaded, error] = useAxios("https://restcountries.com/v3.1/all");
  const [value, setValue] = useState()
  if(loaded) {
    return (
      <Grid item xs={12} md={3}>
        <Skeleton variant="rounded" height={60}/>
      </Grid>
    )
  }
  if(error) {
    return "Something went wrong!"
  }

  console.log(data)
  
  const dataFilter = data.filter((item: any) => "currencies" in item);

 
  const dataCountries = dataFilter.map((item: any) => {
    return `${Object.keys(item.currencies)[0]}`
    
  });
  console.log(dataCountries)

  // const dataCountries = dataFilter.map((item:any)=>{

  // })
  // const getCurrencies = (arr: any[])=>{

  //   const currencies: any[] = [];
  //   arr.forEach((el:any)=>{
  //     for(let prop in el.currencies){
  //       currencies.push(el.currencies[prop])
  //     }
  //   })
  //   return currencies
  // }
  // console.log(getCurrencies(data))

  return (
      <Autocomplete
        value={value}
        disableClearable
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        options={dataCountries}
        renderInput={(params) => <TextField {...params} label={"Currencies"} />}
      />
  )
}

export default SelectCountry