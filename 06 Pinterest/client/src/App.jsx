import React from "react";
import { Route, Routes } from "react-router";
import Approutes from "./routes/Approutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Approutes />

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default App;
