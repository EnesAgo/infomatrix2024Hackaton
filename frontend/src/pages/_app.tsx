import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {useRouter} from "next/router";
import React, {useEffect} from "react";
import redirectIfNotLoggedIn from "@/requests/redirectIfNotLogedIn";

import 'react-toastify/dist/ReactToastify.css';
import ToastContainerDefault from "@/components/ToastConatiner";

export default function App({ Component, pageProps }: AppProps) {

  const routerNext = useRouter()

  if (typeof document === 'undefined') {
    React.useLayoutEffect = React.useEffect;
  }

  useEffect(() => {
      redirectIfNotLoggedIn(routerNext)
  }, [])

  return (
      <>
        <Component {...pageProps} />
        <ToastContainerDefault />
      </>
  )

  return <Component {...pageProps} />;
}
