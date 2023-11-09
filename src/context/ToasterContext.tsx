"use client";
import { Toaster } from "react-hot-toast";

export default function ToasterContext() {
  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 10000,
          style: {},
        }}
      />
    </>
  );
}
