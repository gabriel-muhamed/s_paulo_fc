import React, { useState } from "react";
import { Tag } from "../../Utils/tools";
import { Fade } from "react-awesome-reveal";
import HomeCards from "./cards";

let tagDefault = {
  bck: "#310E0E",
  fs: "100px",
  cl: "#ffffff",
};

const MeetPlayers = () => {

  const [show, setShow] = useState(false)

  const showTextTag = (text) => (
    <Tag
      {...tagDefault}
      add={{
        display: "inline-block",
        marginBottom: "20px",
      }}
    >
      {text}
    </Tag>
  );

  return (
    <Fade
      onVisibilityChange={(inView) => {
        if (inView) { setShow(true) }
      }}
      triggerOnce

    >
      <div className="home_meetplayers">
        <div className="container">
          <div className="home_meetplayers_wrapper">
            <div className="home_card_wrapper">
              <HomeCards 
                show={show}
              />
            </div>
            <div className="home_text_wrapper">
              <div>{showTextTag("Conheça")}</div>
              <div>{showTextTag("Os")}</div>
              <div>{showTextTag("Jogadores")}</div>
              <div>
                <Tag
                  bck="#ffffff"
                  fs="27px"
                  cl="#0e1731"
                  link={true}
                  linkTo="/the_team"
                  add={{
                    display: "inline-block",
                    marginBottom: "20px",
                    border: "1px solid #0e1731"
                  }}
                >
                  Elenco
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default MeetPlayers;
