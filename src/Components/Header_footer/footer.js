import React from "react";

import { SPLogo } from "../Utils/tools";

const Footer = () => {
  return (
    <>
      <footer
        style={{
          backgroundColor: "#310d0d",
        }}
      >
        <div className="footer_logo">
          <SPLogo link={true} linkTo={"/"} width="70px" height="70px" />
        </div>
        <div className="footer_desc">
            São Paulo 2023. Todos os direitos reservados
        </div>
      </footer>
    </>
  );
};

export default Footer;
