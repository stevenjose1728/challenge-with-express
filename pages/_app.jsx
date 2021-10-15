import App, { AppProps } from "next/app";
import {wrapper} from "../store";
import { useSelector, useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Nav } from '../widgets';
import { Provider } from 'react-redux';

import "bootstrap/dist/css/bootstrap.min.css";
import '../utils/react-hold-on/src/css/react-hold-on.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  const router = useRouter();
  const user = useSelector(state => state.user)
  useEffect(() => {
      if(!user && router.pathname !== '/login'){
        router.push({
            pathname: '/login',
        });
      }
  }, []);
  return (
    <Provider store={store}>
        <PersistGate persistor={store.__persistor} loading={null}>
            <Head>
                <title>Next.js 11 - JWT Authentication Example</title>
            </Head>
            <div className="app-container bg-light">
                {
                    !!user && (
                        <Nav />
                    )
                }
                <div className="container pt-4 pb-4">
                    <Component {...pageProps} />
                </div>
            </div>
            {/* credits */}
            <div className="text-center mt-4">
                <p>
                    <a href="https://google.com" target="_top">&copy; Copyright</a>
                </p>
                <p>
                    <a href="https://google.com" target="_top">Website</a>
                </p>
            </div>
        </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);