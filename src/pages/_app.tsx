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
        <meta name="description" content="Welcome to PantryPal, your ultimate inventory management solution." />
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
