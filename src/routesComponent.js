import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Components/Header_footer/header";
import Footer from "./Components/Header_footer/footer";
import Home from "./Components/Home";
import SignIn from "./Components/Signin";
import Dashboard from "./Components/Admin/Dashboard";
import AuthGuard from "./Hoc/auth";
import AdminPlayers from "./Components/Admin/players";
import AddEditPlayers from "./Components/Admin/players/addEditPlayers";

const RoutesComponent = ({ user }) => {
  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path="/admin_players/edit_player/:playerid" element={<AddEditPlayers />} />
          <Route path="/admin_players/add_player" element={<AddEditPlayers />} />
          <Route path="/admin_dashboard" element={<Dashboard />} />
          <Route path="/admin_players" element={<AdminPlayers />} />
        </Route>
        <Route path="/sign_in" element={<SignIn user={user} />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
};

export default RoutesComponent;
