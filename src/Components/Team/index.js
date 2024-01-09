import React, { useEffect, useState } from "react";
import PlayerCard from "../Utils/playerCard";
import { Slide } from "react-awesome-reveal";

import { playersCollection, get, getRef, storage } from "../../firebase";
import { CircularProgress } from "@mui/material";
import { getDownloadURL } from "firebase/storage";

const TheTeam = () => {
    const [loading, setLoading] = useState(false)
    const [players, setPlayers] = useState(null)

    useEffect(() => {
        if (!players) {
            get(playersCollection)
                .then(snapshot => {
                    const players = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    let promises = []

                    players.forEach((player, index) => {
                        promises.push(
                            new Promise((resolve, reject) => {
                                const imageRef = getRef(storage, `players/${player.image}`)
                                getDownloadURL(imageRef)
                                    .then(url => {
                                        players[index].url = url;
                                        resolve()
                                    }).catch(error => {
                                        reject()
                                    })
                            })
                        )
                    })

                    Promise.all(promises).then(() => {
                        setPlayers(players);
                    })
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    setLoading(false)
                })
        }
    }, [players])

    const showPlayerByCategory = (category) => (
        players ? 
            players.map((player, i)=>{
                return player.position === category ? 
                <Slide left key={player.id} triggerOnce>
                    <div className="item">
                        <PlayerCard 
                            number={player.number}
                            name={player.name}
                            lastname={player.lastname}
                            bck={player.url}
                        />
                    </div>
                </Slide>
                :null
            })
         :null
    )

    return (
        <div className="the_team_container">
            {loading ?
                <div className="progress">
                    <CircularProgress />
                </div>
                :
                <div>
                    <div className="team_category_wrapper">
                        <div className="title">Goleiros</div>
                        <div className="team_cards">
                            {showPlayerByCategory('Goleiro')}
                        </div>
                    </div>
                    <div className="team_category_wrapper">
                        <div className="title">Zagueiro</div>
                        <div className="team_cards">
                            {showPlayerByCategory('Zagueiro')}
                        </div>
                    </div>
                    <div className="team_category_wrapper">
                        <div className="title">Lateral Direito</div>
                        <div className="team_cards">
                            {showPlayerByCategory('Lateral Direito')}
                        </div>
                    </div>
                    <div className="team_category_wrapper">
                        <div className="title">Lateral Esquerdo</div>
                        <div className="team_cards">
                            {showPlayerByCategory('Lateral Esquerdo')}
                        </div>
                    </div>
                    <div className="team_category_wrapper">
                        <div className="title">Volante</div>
                        <div className="team_cards">
                            {showPlayerByCategory('Volante')}
                        </div>
                    </div>
                    <div className="team_category_wrapper">
                        <div className="title">Meia</div>
                        <div className="team_cards">
                            {showPlayerByCategory('Meia')}
                        </div>
                    </div>
                    <div className="team_category_wrapper">
                        <div className="title">Atacantes</div>
                        <div className="team_cards">
                            {showPlayerByCategory('Atacante')}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default TheTeam;