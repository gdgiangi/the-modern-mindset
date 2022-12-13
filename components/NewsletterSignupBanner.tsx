import { AcademicCapIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";

import { submitEmail } from "../services";

const NewsletterSignupBanner = () => {
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const emailEl = useRef();

  useEffect(() => {
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  const handleEmailSubmission = () => {
    setError(false);

    const { value: email } = emailEl.current;

    if (!email) {
      setError(true);
      return;
    }

    const emailObj = {
      email,
    };

    submitEmail(emailObj).then((res) => {
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-fuchsia-600/25">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-fuchsia-600 p-2">
              <AcademicCapIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </span>
            <p className="ml-3 truncate font-medium text-white">
              <span className="md:hidden">Sign up to our newsletter!</span>
              <span className="hidden md:inline">
                Be the first to know about the latest tech trends and business
                advice.
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 mr-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <input
              type="text"
              ref={emailEl}
              className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 text-sm font-medium bg-white text-gray-700 "
              placeholder="example@gmail.com"
              name="email"
            />
          </div>
          <div className="order-4 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <button
              type="button"
              onClick={handleEmailSubmission}
              className="transition duration-500 ease hover:bg-fuchsia-700 inline-block bg-fuchsia-600 text-sm rounded-md text-white px-8 py-3 w-full cursor-pointer"
            >
              Subscribe
            </button>
          </div>
          {showSuccessMessage && (
            <span className="text-xs float-right mt-3 text-green-500">
              Email submitted successfully!
            </span>
          )}
          {error && (
            <p className="text-xs text-red-500">Something went wrong.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignupBanner;
