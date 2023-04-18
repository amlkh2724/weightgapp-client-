
import Script from "next/script";
import { AppProvider } from "./context/appProvider";
import Layout from "./components/layout/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  function onBackButtonEvent(event) {
    event.preventDefault();
    window.history.pushState(null, "", window.location.pathname);
    router.push("/");
  }

  return (
    <>
      <AppProvider>
        <Script src="https://code.jquery.com/jquery-3.6.0.min.js"></Script>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </>
  );
}

export default App;