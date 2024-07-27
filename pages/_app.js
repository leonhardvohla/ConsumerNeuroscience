import "../styles.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Consumer Neuroscience</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
