// import Script from "next/script";
// import { AppProvider } from "./context/appProvider";
// import Layout from "./components/layout/Layout";
// import "../styles/globals.css";

// function App({ Component, pageProps }) {
//   return (
//     <>
//       <AppProvider>
//         <Script src="https://code.jquery.com/jquery-3.6.0.min.js"></Script>
//         <Layout>
//         <Component {...pageProps} />
//         </Layout>
//       </AppProvider>
//     </>
//   );
// }

// export default App;
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

// In Next.js, the process of creating a folder for all your context and related state hooks is very similar to how you would do it in React. Here's an example:

// Create a new folder called "context" in your project's root directory.

// Inside the context folder, create a new file called "AppContext.js" (or whatever name you prefer) and define your context object and related state hooks.

// jsx
// Copy code
// import { createContext, useState } from 'react';

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   return (
//     <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
//       {children}
//     </AppContext.Provider>
//   );
// };
// Import your context provider in your _app.js file and wrap your app's components in it.
// jsx
// Copy code
// import { AppProvider } from '../context/AppContext';

// function MyApp({ Component, pageProps }) {
//   return (
//     <AppProvider>
//       <Component {...pageProps} />
//     </AppProvider>
//   );
// }

// export default MyApp;
// Use the useContext hook to access the state values from your components.
// jsx
// Copy code
// import { useContext } from 'react';
// import { AppContext } from '../context/AppContext';

// function Navbar() {
//   const { isLoggedIn, user } = useContext(AppContext);

//   return (
//     <nav>
//       {isLoggedIn ? (
//         <p>Welcome back, {user.name}!</p>
//       ) : (
//         <p>Please log in.</p>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
// That's it! You can now use your context and state hooks throughout your Next.js app without having to pass props down through multiple levels of components.
