import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";import './App.css';
import Navigation from './router-nav/Navigation.js';
import jwt from "jsonwebtoken";
import UserContext from "./auth/UserContext";
import TrainlyApi from './api/TrainlyApi.js';

export const TOKEN_STORAGE_ID = "jobly-token";


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
      "App",
      "infoLoaded=", infoLoaded,
      "currentUser=", currentUser,
      "token=", token,
  );

  return (
    <div className="App">
      <Navigation />
    </div>
  );
}

export default App;
