// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title> Netflix</title>
        <link   rel="icon" href="/images/cl.png" />
        <script async src="https://pay.google.com/gp/p/js/pay.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
