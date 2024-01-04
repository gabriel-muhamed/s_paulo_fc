import React from "react";
import { Tag } from "../../Utils/tools";
import Blocks from "./Blocks";

const MatchesHome = () => {
    return(
        <div className="home_matches_wrapper">
            <div className="container">
                <Tag
                    bck="#310d0d"
                    fs="50px"
                    cl="white"
                >
                    Partidas
                </Tag>
                <Blocks />
                <Tag
                    fs="22px"
                    link={true}
                    linkTo="/matches"
                >
                    Partidas
                </Tag>
            </div>
        </div>
    )
}

export default MatchesHome;