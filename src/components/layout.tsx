import Box from "@mui/material/Box";

const Layout = ({ children }: any) => {
  return (
    <Box
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        background:
          "radial-gradient(circle at bottom, rgb(231, 231, 231) 0%, rgb(128, 176, 232) 100%)",
      }}
    >
      <Box
        height="calc(100vh - 16px)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingY="4"
        paddingX="8"
        sx={{
          width: {
            xs: "100vw",
            sm: "calc(100vw - 8px)",
            md: "calc(100vw - 16px)",
            lg: "calc(100vw - 32px)",
            xl: "calc(100vw - 64px)",
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
