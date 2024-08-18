import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import Layout from "../components/layouts/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#ffa500",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#2556B4",
      },
      text: {
        primary: "#4D4D4D",
        secondary: "#999999",
      },
      background: {
        default: "#f8f8f8",
      },
      action: {
        hover: "rgba(0, 0, 0, 0.04)",
        selected: "rgba(0, 0, 0, 0.08)",
      },
    },
    typography: {
      fontFamily: "YuGothic,Yu Gothic,Noto Sans JP,sans-serif;",
      fontSize: 16,
      h1: {
        fontSize: "2rem",
        fontWeight: "bold",
        lineHeight: 1.5,
      },
      h2: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        lineHeight: 1.5,
      },
      h3: {
        fontSize: "1.25rem",
        fontWeight: "bold",
        lineHeight: 1.5,
      },
      h4: {
        fontSize: "1rem",
        fontWeight: "bold",
        lineHeight: 1.5,
      },
      h5: {
        fontSize: "1rem",
        fontWeight: "bold",
        lineHeight: 1.5,
      },
    },
    spacing: 4,
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
