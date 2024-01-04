import React, { useState, useEffect } from "react";
import { Slide } from "react-awesome-reveal";

import { get, mCollection } from "../../../firebase";
import MatchesBlocks from "../../Utils/matchesBlock";

const Blocks = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if(matches.length === 0){
        get(mCollection)
            .then((snapshot) => {
                const matchesData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id    
            }));
            setMatches(matchesData);
            }).catch(error => {
                console.log(error)
            })
    }
  }, [matches])

  const showMatches = (matches) => {
    return matches ? 
        matches.map((match) => (
            <Slide bottom key={match.id} className="item" triggerOnce>
                <div>
                    <div className="wrapper">
                        <MatchesBlocks match={match} />
                    </div>
                </div>
            </Slide>
        ))
    :
    null
  }

  return (
  <div className="home_matches">
    {showMatches(matches)}
  </div>
  );
};

export default Blocks;
