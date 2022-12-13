import "../styles/globals.scss";
import type { AppProps } from "next/app";
import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { Layout } from "../components";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-RRTKDYCN7V"
      />
        
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-RRTKDYCN7V', {
      page_path: window.location.pathname,
     });
    `,
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </>
  );
}

export default MyApp;
