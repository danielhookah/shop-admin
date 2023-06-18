import React from "react";
import "./App.css";
import AppRouter from "router/AppRouter";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <AppRouter />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
