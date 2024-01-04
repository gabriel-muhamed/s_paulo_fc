import React from "react";
import { createRoot } from "react-dom/client";
import "./Resources/css/app.css";
import { auth } from "./firebase";
import RoutesComponent from "./routesComponent";

const App = (props) => {
  
  return <RoutesComponent {...props} />;
};

const root = createRoot(document.getElementById("root"));

auth.onAuthStateChanged((user) => {
  root.render(<App user={user} />);
});
