import React, { useEffect, useReducer, useState } from "react";

import { CircularProgress } from "@mui/material";
import { get, mCollection } from "../../firebase";

import MatchesList from "./matchesList";

const TheMatches = () => {
    const [matches, setMatches] = useState(null)
    const [state, dispatch] = useReducer((prevState, nextState) => {
        return { ...prevState, ...nextState }
    }, {
        filterMatches: null,
        playedFilter: "All",
        resultFilter: "All"
    })

    useEffect(() => {
        if (!matches) {
            get(mCollection)
                .then(snapshot => {
                    const matches = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setMatches(matches)
                    dispatch({ ...state, filterMatches: matches })
                }).catch(error => {
                    console.log(error)
                })
        }
    }, [matches, state]);

    const showPlayed = (played) => {
        const list = matches.filter((match) => {
            return match.final === played
        })

        dispatch({
            ...state,
            filterMatches: played === 'All' ? matches : list,
            playedFilter: played,
            resultFilter: 'All'
        })
    }

    const showResult = (result) => {
        const list = matches.filter((match) => {
            return match.result === result
        })

        dispatch({
            ...state,
            filterMatches: result === 'All' ? matches : list,
            playedFilter: 'All',
            resultFilter: result
        })
    }

    console.log(state.filterMatches)

    return (
        <>
            {matches ?
                <div className="the_matches_container">
                    <div className="the_matches_wrapper">
                        <div className="left">
                            <div className="match_filters">
                                <div className="match_filters_box">
                                    <div className="tag">
                                        Partidas
                                    </div>
                                    <div className="cont">
                                        <div className={`option ${state.playedFilter === 'All' ? 'active' : ''}`}
                                            onClick={() => showPlayed('All')}
                                        >
                                            Todos
                                        </div>
                                        <div className={`option ${state.playedFilter === 'yes' ? 'active' : ''}`}
                                            onClick={() => showPlayed('yes')}
                                        >
                                            Partidas ocorridas
                                        </div>
                                        <div className={`option ${state.playedFilter === 'no' ? 'active' : ''}`}
                                            onClick={() => showPlayed('no')}
                                        >
                                            Partidas futuras
                                        </div>
                                    </div>
                                </div>
                                <div className="match_filters_box">
                                    <div className="tag">
                                        Resultado das partidas
                                    </div>
                                    <div className="cont">
                                        <div className={`option ${state.resultFilter === 'All' ? 'active' : ''}`}
                                            onClick={() => showResult('All')}
                                        >
                                            Todos
                                        </div>
                                        <div className={`option ${state.resultFilter === 'W' ? 'active' : ''}`}
                                            onClick={() => showResult('W')}
                                        >
                                            G
                                        </div>
                                        <div className={`option ${state.resultFilter === 'L' ? 'active' : ''}`}
                                            onClick={() => showResult('L')}
                                        >
                                            D
                                        </div>
                                        <div className={`option ${state.resultFilter === 'D' ? 'active' : ''}`}
                                            onClick={() => showResult('D')}
                                        >
                                            E
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <MatchesList matches={state.filterMatches} />
                        </div>
                    </div>
                </div>
                :
                <div className="progress">
                    <CircularProgress />
                </div>
            }
        </>
    )
}

export default TheMatches