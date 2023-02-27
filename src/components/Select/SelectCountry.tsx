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

  const dataFilter = data.filter((item: any) => "currencies" in item);
  const dataCountries = dataFilter.map((item: any) => {
    return ` ${Object.keys(item.currencies)}`
  });


  console.log(dataCountries)

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