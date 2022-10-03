import React, { useState } from "react";
import GameInfoStatisticItem from "./GameInfoStatisticItem";
import GameInput from "./GameInput";
import SettingsInput from "./SettingsInput";

const GameInfo = ({
  owner,
  guessRange,
  entranceFee,
  recentPlayer,
  lenghtPlayer,
  recentWinner,
  lenghtWinner,
  latestAnswer,
  recentGuess,
  isOwner,
  handleSuccess,
  gameBalance,
  gameState,
}) => {
  const gameStatisticsDatas = [
    {
      data: owner,
      text: "Owner",
    },
    {
      data: guessRange,
      text: "Guess Range",
    },
  ];
  const [settingsState, setSettingsState] = useState(false);
  const [statisticsState, setStatisticsState] = useState(true);

  const handleSettingState = () => {
    setSettingsState(true);
    setStatisticsState(false);
  };
  const handleStatisticState = () => {
    setSettingsState(false);
    setStatisticsState(true);
  };
  const handleOptions = (e) => {
      const value = e.target.value
      if (value === "Settings"){
        handleSettingState()
      }else{
        handleStatisticState()
      }
  };
  return (
    <div className="w-full bg-white rounded-lg pt-2 border shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="sm:hidden">
        <label for="tabs" className="sr-only">
          Select tab
        </label>
        <select
          id="tabs"
          onClick={(e)=>handleOptions(e)}
          className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 sm:text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option >Statistics</option>
          {isOwner ? (
            <>
              <option >Settings</option>
            </>
          ) : (
            <></>
          )}
        </select>
      </div>
      <ul
        className="hidden text-sm font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 sm:flex dark:divide-gray-600 dark:text-gray-400"
        id="fullWidthTab"
        data-tabs-toggle="#fullWidthTabContent"
        role="tablist"
      >
        <li className="w-full" onClick={handleStatisticState}>
          <button
            id="stats-tab"
            data-tabs-target="#stats"
            type="button"
            role="tab"
            aria-controls="stats"
            aria-selected="true"
            className="inline-block p-4 w-full bg-gray-50 rounded-tl-lg hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500"
          >
            Statistics
          </button>
        </li>
        {isOwner ? (
          <>
            <li class="w-full" onClick={handleSettingState}>
              <button
                id="about-tab"
                data-tabs-target="#about"
                type="button"
                role="tab"
                aria-controls="about"
                aria-selected="false"
                class="inline-block p-4 w-full bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Settings
              </button>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
      <div
        id="fullWidthTabContent"
        className="border-t border-gray-200 dark:border-gray-600"
      >
        <div
          className={
            statisticsState
              ? "p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
              : "hidden"
          }
          id="stats"
          role="tabpanel"
          aria-labelledby="stats-tab"
        >
          <dl className="grid grid-cols-1 gap-8 p-4 mx-auto max-w-screen-xl text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
            <GameInfoStatisticItem
              data={`${owner.slice(0, 6)}...${owner.slice(owner.length - 4)}`}
              text="Owner"
            />
            <GameInfoStatisticItem
              data={` 0 - ${guessRange}`}
              text="Guess Range"
            />
            <GameInfoStatisticItem
              data={`${entranceFee} Wei`}
              text="Entrance Fee"
            />
            <GameInfoStatisticItem
              data={`${recentPlayer.slice(0, 6)}...${recentPlayer.slice(
                recentPlayer.length - 4
              )}`}
              text="Recent Player"
            />
            <GameInfoStatisticItem data={lenghtPlayer} text="Games Played" />
            <GameInfoStatisticItem
              data={`${recentWinner.slice(0, 6)}...${recentWinner.slice(
                recentWinner.length - 4
              )}`}
              text="Recent Winner"
            />
            <GameInfoStatisticItem data={lenghtWinner} text="Games Won" />
            <GameInfoStatisticItem data={recentGuess} text="Last Guess" />
            <GameInfoStatisticItem data={latestAnswer} text="Last Answer" />
            <GameInfoStatisticItem
              data={isOwner ? "true" : "false"}
              text="isOwner?"
            />
            <GameInfoStatisticItem
              data={`${gameBalance} Wei`}
              text="Game Balance"
            />
            <GameInfoStatisticItem
              data={gameState ? "Pending" : "Open"}
              text="Game State"
            />
          </dl>
        </div>
        <div
          class={
            settingsState
              ? "p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
              : "hidden"
          }
          id="about"
          role="tabpanel"
          aria-labelledby="about-tab"
        >
          <h2 class="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Game Setting Page
          </h2>
          {/* <!-- List --> */}
          <ul role="list" class="space-y-4 text-gray-500 dark:text-gray-400">
            <SettingsInput functionName="setEntranceFee"  handleSuccess={handleSuccess} name="Set Entrance Fee" />
            <SettingsInput functionName="setGuessRange" handleSuccess={handleSuccess} name="Set Game Range" />
          
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
