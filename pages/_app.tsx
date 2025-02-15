import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";

interface CustomAppProps extends AppProps {
  pageProps: {
    session?: Session;
  };
}

function App({ Component, pageProps }: CustomAppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;
