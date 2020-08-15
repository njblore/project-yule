import React, { useState, useEffect } from "react";
import PieCharts from "./PieCharts";
import FinalScoresBar from "./FinalScoresBar";
import CategoryAverage from "./CategoryAverages";
import Stats from "./Stats";
import MultiplayerRadial from "./MultiplayerRadial";
import ScatterRelationships from "./ScatterRelationships";
import { scoresForEachPlayer } from "../helpers/scoreCalculations";
import axios from "axios";
import { GameScore } from "../models/game";
import { PlayerAllScores } from "../models/playerScore";

const AgricolaPage = () => {
  const [allGames, setAllGames] = useState<GameScore[]>();
  const [totals, setTotals] = useState<PlayerAllScores>();
  const [tashVsThom, setTashVsThom] = useState<GameScore[]>();
  const [multiplayer, setMultiplayer] = useState<GameScore[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(
        "https://api.jsonbin.io/b/5ea01b9b2940c704e1dc9684/latest",
        {
          headers: {
            "secret-key":
              "$2b$10$tVk/rIX8TJ15Zm5Oghjz1.0zwMVyQyzIUggpp/cngra1xISpd9N/q",
          },
        }
      );
      return result.data;
    };
    fetchData().then((data) => {
      setAllGames(data.agricolaGames);
      setTotals(scoresForEachPlayer(data.agricolaGames));
      setTashVsThom(
        data.agricolaGames.filter((game) => game.players.length === 2)
      );
      setMultiplayer(
        data.agricolaGames.filter((game) => game.players.length > 2)
      );
      setIsLoading(false);
    });
  }, []);

  if (!isLoading) {
    return (
      <div className="agricola-page-container">
        <header className="page-header header">Agricola: The Reckoning</header>
        <Stats
          totals={totals}
          tashVsThom={tashVsThom}
          multiplayer={multiplayer}
          allGames={allGames}
        ></Stats>
        <PieCharts tashVsThom={tashVsThom}></PieCharts>
        <FinalScoresBar
          games={allGames}
          twoPlayer={tashVsThom}
          multiplayer={multiplayer}
        ></FinalScoresBar>
        <CategoryAverage
          games={allGames}
          twoPlayer={tashVsThom}
          multiplayer={multiplayer}
        ></CategoryAverage>
        <MultiplayerRadial
          multiplayer={multiplayer}
          twoPlayer={tashVsThom}
          allGames={allGames}
        ></MultiplayerRadial>
        <ScatterRelationships allGames={allGames}></ScatterRelationships>
      </div>
    );
  } else {
    return <div>loading</div>;
  }
};

export default AgricolaPage;