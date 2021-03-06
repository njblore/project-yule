import React, { useState } from 'react';
import { Polar } from 'react-chartjs-2';
import {
  scoresForEachPlayer,
  averageScoresFromObject,
} from '../../helpers/scoreCalculations';
import { namedColours } from '../../models/agricola/colourScheme';
import { GameScore, SinglePlayerScore } from '../../models/game';
import './multiplayer-radial.css';

interface Props {
  multiplayer: GameScore[];
  twoPlayer: GameScore[];
  allGames: GameScore[];
}

const MultiplayerRadial = (props: Props) => {
  const [set, setSet] = useState(props.multiplayer);
  let allScores = scoresForEachPlayer(set);

  let playerAverages: SinglePlayerScore = averageScoresFromObject(allScores);

  const data = {
    datasets: [
      {
        data: Object.values(playerAverages),
        backgroundColor: Object.keys(playerAverages).map(
          (player) => namedColours[player],
        ),
        label: '',
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
    labels: Object.keys(playerAverages),
  };
  const legendOpts = {
    display: true,
    position: 'right',
    fullWidth: false,
    reverse: false,
    labels: {
      fontColor: 'greysmoke',
    },
  };
  return (
    <div className="radial-container container grid-two">
      <header className="header">Average Game Scores</header>

      <div className="button-container">
        <button
          className={`state-button ${
            set === props.twoPlayer ? 'highlighted' : ''
          }`}
          onClick={() => setSet(props.twoPlayer)}
        >
          Two Player
        </button>
        <button
          className={`state-button ${
            set === props.multiplayer ? 'highlighted' : ''
          }`}
          onClick={() => setSet(props.multiplayer)}
        >
          Mutliplayer
        </button>
        <button
          className={`state-button ${
            set === props.allGames ? 'highlighted' : ''
          }`}
          onClick={() => setSet(props.allGames)}
        >
          All Games
        </button>
      </div>
      <Polar data={data} legend={legendOpts}></Polar>
    </div>
  );
};

export default MultiplayerRadial;
