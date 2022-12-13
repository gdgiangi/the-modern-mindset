import dynamic from "next/dynamic";
import React from "react";
import Header from "./Header";

const NewsletterSignupBanner = dynamic(
  () => import("./NewsletterSignupBanner"),
  { ssr: false }
);

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <NewsletterSignupBanner />
      <Header />
      {children}
    </>
  );
};

export default Layout;
