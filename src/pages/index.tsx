import type { NextPage } from "next";
import { Box, Typography, useTheme } from "@mui/material";
import NavButton from "@/components/nav-button";

const Home: NextPage = () => {

  const theme = useTheme();

  return (
    <Box
      width="100%"
      height="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h1" color={theme.palette.text.primary}>Welcome to PantryPal</Typography>
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        <NavButton text="Sign In" size="large" width="15%" route="/signin" />
        <NavButton text="Sign Up" size="large" width="15%" route="/signup" />
      </Box>
    </Box>
  );
};

export default Home;
