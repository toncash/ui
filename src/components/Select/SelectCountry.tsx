import { Autocomplete, Grid, Skeleton, TextField } from "@mui/material"
import { useAxios } from "../hooks/useAxios";



const SelectCountry = (props: any) => {
  const { value, setValue, label } = props;
  const [data, loaded, error] = useAxios("https://restcountries.com/v3.1/all");



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
    return  ` ${Object.keys(item.currencies)[0]}`
    
  });


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
        renderInput={(params) => <TextField {...params} label={label} />}
      />
  )
}

export default SelectCountry