import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "../styles/theme";
import { initFirebase } from "@/firebase/firebaseApp";
import ReduxProvider from "@/redux/redux-provider";
import Head from "next/head";
import { CssBaseline } from "@mui/material";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  initFirebase();

  return (
    <ReduxProvider>
      <Head>
        <title>PantryPal</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default MyApp;
