import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { SPLogo } from "../Utils/tools";
import { logoutHandler } from "../Utils/tools"

const Header = ({ user }) => {

  const navigate = useNavigate()

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "#d71920",
        boxShadow: "none",
        padding: "10px 0",
        borderBottom: "2px solid #960F0F",
      }}
    >
      <Toolbar className="header_tb" style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <div className="header_logo">
            <SPLogo link={true} linkTo={"/"} width="70px" height="70px" />
          </div>
        </div>

        <Link to="/the_team">
          <Button color="inherit">Elenco</Button>
        </Link>
        <Link to="/matches">
          <Button color="inherit">Partidas</Button>
        </Link>

        {user ? (
          <>
            <Link to="/admin_dashboard">
              <Button color="inherit">Painel</Button>
            </Link>

            <Button color="inherit" onClick={() => logoutHandler(navigate)}>
              Sair
            </Button>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
