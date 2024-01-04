import React from "react";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";

import Alisson from '../../../Resources/images/players/Alisson.png';
import FelipeAlves from '../../../Resources/images/players/FelipeAlves.png';
import Galoppo from '../../../Resources/images/players/Galoppo.png';
import PlayerCard from "../../Utils/playerCard";

let cards = [
    {
        bottom: 90,
        left: 300,
        player: Galoppo,
        name: 'Giuliano',
        lastname: 'Galoppo',
        number: '14'
    },
    {
        bottom: 60,
        left: 200,
        player: Alisson,
        name: 'Alisson',
        lastname: 'Casto',
        number: '25'
    },
    {
        bottom: 30,
        left: 100,
        player: FelipeAlves,
        name: 'Felipe',
        lastname: 'Alves',
        number: '1'
    },
    {
        bottom: 0,
        left: 0,
        player: Galoppo,
        name: 'Giuliano',
        lastname: 'Galoppo',
        number: '14'
    },

]

const HomeCards = (props) => {

    const sortedCards = cards.slice().sort((a, b) => a.bottom - b.bottom);

    const showAnimateCards = () => (
        sortedCards.map((card, i)=>(
            <Animate
                show={props.show}
                start={{
                    left:0,
                    bottom:0
                }}
                enter={{
                    left:[card.left],
                    bottom:[card.bottom],
                    timing:{ duration: 200, ease: easePolyOut, delay: i * 500 }
                }}
            >
                {({left, bottom}) => (
                    <div
                        style={{
                            position:'absolute',
                            left,
                            bottom,
                            zIndex: cards.length - i,
                        }}
                    >
                        <PlayerCard 
                            number={card.number}
                            name={card.name}
                            lastname={card.lastname}
                            bck={card.player}
                        />
                    </div>
                )}
            </Animate>
        ))
    )

    return (
        <div>
            {showAnimateCards()}
        </div>
    )
}

export default HomeCards