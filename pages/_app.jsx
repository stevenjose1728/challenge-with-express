import App, { AppProps } from "next/app";
import { wrapper } from "../store";
import { useSelector, useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { Nav } from 'components';

import "bootstrap/dist/css/bootstrap.min.css";
import '../utils/react-hold-on/src/css/react-hold-on.css';

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const user = useSelector(state => state.user)
  useEffect(() => {
      // run auth check on initial load
      authCheck(router.asPath);

      // set authorized to false to hide page content while changing routes
      const hideContent = () => setAuthorized(false);
      router.events.on('routeChangeStart', hideContent);

      // run auth check on route change
      router.events.on('routeChangeComplete', authCheck)

      // unsubscribe from events in useEffect return function
      return () => {
          router.events.off('routeChangeStart', hideContent);
          router.events.off('routeChangeComplete', authCheck);
      }
  }, []);
  function authCheck(url) {
      // redirect to login page if accessing a private page and not logged in 
      const publicPaths = ['/login'];
      const path = url.split('?')[0];
      if (!user && !publicPaths.includes(path)) {
          setAuthorized(false);
          router.push({
              pathname: '/login',
              query: { returnUrl: router.asPath }
          });
      } else {
          setAuthorized(true);
      }
  }
  return (
      <>
        <Head>
            <title>Next.js 11 - JWT Authentication Example</title>
        </Head>

        <div className="app-container bg-light">
            {/* <Nav /> */}
            <div className="container pt-4 pb-4">
                {
                  authorized && (
                    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
                      <Component {...pageProps} />
                    </PersistGate>
                  )
                }
            </div>
        </div>

            {/* credits */}
        <div className="text-center mt-4">
            <p>
                <a href="https://jasonwatmore.com/post/2021/08/04/next-js-11-jwt-authentication-tutorial-with-example-app" target="_top">Next.js 11 - JWT Authentication Tutorial with Example App</a>
            </p>
            <p>
                <a href="https://jasonwatmore.com" target="_top">JasonWatmore.com</a>
            </p>
        </div>
      </>
  );
}

export default wrapper.withRedux(MyApp);