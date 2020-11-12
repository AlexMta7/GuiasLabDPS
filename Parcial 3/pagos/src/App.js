import React from "react";

import Application from "./Components/Application";
import UserProvider from "./providers/UserProvider";

//Importamos la librería para utilizar las notificaciones
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    // <UserProvider>
    //   <Application />
    //   <div className="footer">
    //   </div>
    // </UserProvider>
    <UserProvider>
    <div className="container-fluid pb-3 mt-5">
      <Application />
      <ToastContainer />
    </div>
    </UserProvider>

  );
}

export default App;