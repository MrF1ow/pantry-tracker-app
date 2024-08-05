import { Avatar, Typography, Box } from "@mui/material";
import SearchBar from "./search-bar";

const NavBar = ({ inventoryItems, onSearch }: SearchBarProps) => {
  return (
    <Box
      width="100%"
      height="auto"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      paddingY="4"
    >
      <Typography variant="h4">PantryPal</Typography>
      <SearchBar inventoryItems={inventoryItems} onSearch={onSearch} />
      <Avatar />
    </Box>
  );
};

export default NavBar;
