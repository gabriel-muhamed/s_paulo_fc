import React from "react";
import { Zoom } from "react-awesome-reveal";

const Animation = () => {
    return(
        <div className="promotion_animation">
            <div className="left">
                <Zoom>
                    <div>
                        <span>Ganhe uma</span>
                        <span>Camiseta</span>
                    </div>
                </Zoom>
            </div>
            <div className="right">
                <Zoom>
                    <div className="saopaulo"></div>
                </Zoom>
            </div>
        </div>
    )
}

export default Animation;