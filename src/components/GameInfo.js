import React, { useState } from "react";
import GameInfoStatisticItem from "./GameInfoStatisticItem";
import GameInput from "./GameInput";

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
  gameBalance,
  gameState,
}) => {
  const gameStatisticsDatas = [
    {
        data: owner,
        text: "Owner"
    },
    {
        data: guessRange,
        text: "Guess Range"
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
  return (
    <div className="w-full bg-white rounded-lg pt-2 border shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="sm:hidden">
        <label for="tabs" className="sr-only">
          Select tab
        </label>
        <select
          id="tabs"
          className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 sm:text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option onClick={handleStatisticState}>Statistics</option>
          {isOwner ? (
            <>
              <option onClick={handleSettingState}>Settings</option>
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
            {/* gameStatisticsDatas.map(({data, text}) => (
                <GameInfoStatisticItem data={data} text={text} />
            )) */}
            <div className="flex flex-col justify-center items-center">
              <dt className="mb-2 text-3xl font-extrabold">
                {owner.slice(0, 6)}...
                {owner.slice(owner.length - 4)}
              </dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Owner
              </dd>
            </div>
            <div className="flex flex-col justify-center items-center">
              <dt className="mb-2 text-3xl font-extrabold">
                {" "}
                0 - {guessRange}
              </dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Guess Range
              </dd>
            </div>
            <div className="flex flex-col justify-center items-center">
              <dt className="mb-2 text-3xl font-extrabold">
                {entranceFee} Wei
              </dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Entrance Fee
              </dd>
            </div>
            <div className="flex flex-col justify-center items-center">
              <dt className="mb-2 text-3xl font-extrabold">
                {recentPlayer.slice(0, 6)}...
                {recentPlayer.slice(recentPlayer.length - 4)}
              </dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Recent Player
              </dd>
            </div>
            <div className="flex flex-col justify-center items-center">
              <dt className="mb-2 text-3xl font-extrabold">{lenghtPlayer}</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Games Played
              </dd>
            </div>
            <div className="flex flex-col justify-center items-center">
              <dt className="mb-2 text-3xl font-extrabold">
                {recentWinner.slice(0, 6)}...
                {recentWinner.slice(recentWinner.length - 4)}
              </dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Recent Winner
              </dd>
            </div>
            <div className="flex flex-col justify-center items-center">
              <dt className="mb-2 text-3xl font-extrabold">{lenghtWinner}</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Games Won
              </dd>
            </div>
            <div className="flex flex-col justify-center items-center">
              <dt className="mb-2 text-3xl font-extrabold">{recentGuess}</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Last Guess
              </dd>
            </div>
            <div className="flex flex-col justify-center items-center">
              <dt className="mb-2 text-3xl font-extrabold">{latestAnswer}</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Last Answer
              </dd>
            </div>
            <div className="flex flex-col justify-center items-center">
              <dt className="mb-2 text-3xl font-extrabold">
                {isOwner ? "true" : "false"}
              </dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                isOwner?
              </dd>
            </div>
            <div className="flex flex-col justify-center items-center">
              <dt className="mb-2 text-3xl font-extrabold">
                {gameBalance} Wei
              </dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Game Balance
              </dd>
            </div>
            <div className="flex flex-col justify-center items-center">
              <dt className="mb-2 text-3xl font-extrabold">
                {gameState? "Pending": "Open"} 
              </dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Game State
              </dd>
            </div>
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
            <GameInput />
            <GameInput />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
