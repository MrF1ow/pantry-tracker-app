import { Autocomplete, TextField } from "@mui/material";

export default function SearchBar({ inventoryItems, onSearch }: SearchBarProps): JSX.Element {
  return (
    <Autocomplete
      disablePortal
      id="search-bar"
      options={inventoryItems}
      onInputChange={(event, newInputValue) => onSearch(newInputValue)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search" />}
    />
  );
}
