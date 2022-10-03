import React, { useEffect, useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { abi, contractAddresses } from "../utils/constants";
import { useNotification } from "web3uikit";
import GameInput from "./GameInput";
import GameInfo from "./GameInfo";

const Game = () => {
  const { chainId: chainIdHex, isWeb3Enabled, Moralis, account } = useMoralis();
  const userAddress = Moralis.User.Address;
  const chainId = parseInt(chainIdHex);
  const GuessGameAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const   runContractOptions = {abi, contractAddress: GuessGameAddress}

  const [guessRange, setGuessRange] = useState("0");
  const [owner, setOwner] = useState("");
  const [entranceFee, setEntranceFee] = useState("");
  const [recentPlayer, setRecentPlayer] = useState("");
  const [recentWinner, setRecentWinner] = useState("");
  const [lenghtPlayer, setLenghtPlayer] = useState("");
  const [lenghtWinner, setLenghtWinner] = useState("");
  const [latestAnswer, setLatestAnswer] = useState("");
  const [recentGuess, setRecentGuess] = useState("");
  const [gameBalance, setGameBalance] = useState("");
  const [gameState, setGameState] = useState(0);
  const [gameStateInput, setGameStateInput] = useState(0);
  const dispatch = useNotification();



  //   const { runContractFunction: enterRaffle } = useWeb3Contract({
  //     abi: abi,
  //     contractAddress: GuessGameAddress,
  //     functionName: "enterRaffle",
  //     msgValue: entranceFee,
  //     params: {},
  //   });

  const { runContractFunction: getGuessRange } = useWeb3Contract({
    ...runContractOptions, // specify the networkId
    functionName: "getGuessRange",
    params: {},
  });
  const { runContractFunction: s_owner } = useWeb3Contract({
    ...runContractOptions, // specify the networkId
    functionName: "getOwner",
    params: {},
  });
  const { runContractFunction: isOwner } = useWeb3Contract({
    ...runContractOptions, // specify the networkId
    functionName: "isOwner",
    params: { _player: owner },
  });
  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    ...runContractOptions,// specify the networkId
    functionName: "getEntranceFee",
    params: {},
  });
  const { runContractFunction: getRecentPlayer } = useWeb3Contract({
    ...runContractOptions, // specify the networkId
    functionName: "getRecentPlayer",
    params: {},
  });
  const { runContractFunction: getLengthOfPlayers } = useWeb3Contract({
    ...runContractOptions, // specify the networkId
    functionName: "getLengthOfPlayers",
    params: {},
  });
  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    ...runContractOptions, // specify the networkId
    functionName: "getRecentWinner",
    params: {},
  });
  const { runContractFunction: getLengthOfWinners } = useWeb3Contract({
    ...runContractOptions, // specify the networkId
    functionName: "getLengthOfWinners",
    params: {},
  });
  const { runContractFunction: getRecentGuess } = useWeb3Contract({
    ...runContractOptions, // specify the networkId
    functionName: "getRecentGuess",
    params: {},
  });
  const { runContractFunction: getBalance } = useWeb3Contract({
    ...runContractOptions, // specify the networkId
    functionName: "getBalance",
    params: {},
  });
  const { runContractFunction: getGameState } = useWeb3Contract({
    ...runContractOptions, // specify the networkId
    functionName: "getGameState",
    params: {},
  });
  const { runContractFunction: getLatestAnswer } = useWeb3Contract({
    ...runContractOptions, // specify the networkId
    functionName: "getLatestAnswer",
    params: {},
  });
  

  // const { runContractFunction: getGuessRange } = useWeb3Contract({
  //   abi: abi,
  //   contractAddress: GuessGameAddress,
  //   functionName: "getGuessRange",
  //   params: {},
  // });
  async function updateUIValues() {
    const getGuessRangeFromCall = (await getGuessRange()).toString();
    setGuessRange(getGuessRangeFromCall);
    const getownerFromCall = await s_owner();
    setOwner(getownerFromCall);
    const getEntranceFeeFromCall = (await getEntranceFee()).toString();
    setEntranceFee(getEntranceFeeFromCall);
    const getRecentPlayerFromCall = (await getRecentPlayer()).toString();
    setRecentPlayer(getRecentPlayerFromCall);
    const getLengthOfPlayersFromCall = (await getLengthOfPlayers()).toString();
    setLenghtPlayer(getLengthOfPlayersFromCall);
    const getRecentWinnerFromCall = (await getRecentWinner()).toString();
    setRecentWinner(getRecentWinnerFromCall);
    const getLengthOfWinnersFromCall = (await getLengthOfWinners()).toString();
    setLenghtWinner(getLengthOfWinnersFromCall);
    const getLatestAnswerFromCall = (await getLatestAnswer()).toString();
    setLatestAnswer(getLatestAnswerFromCall);
    const getBalanceFromCall = (await getBalance()).toString();
    setGameBalance(getBalanceFromCall);
    const getGameStateFromCall = await getGameState();
    setGameState(getGameStateFromCall);
    const getRecentGuessFromCall = (await getRecentGuess()).toString();
    setRecentGuess(getRecentGuessFromCall);
    
  }

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
    });
  };

  const handleSuccess = async (tx) => {
    await tx.wait(1);
    updateUIValues();
    handleNewNotification(tx);
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUIValues();
    }
  }, [isWeb3Enabled]);
  return (
    <>
      {GuessGameAddress ? (
        <>
          <GameInput
            entranceFee={entranceFee}
            GuessGameAddress={GuessGameAddress}
            abi={abi}
            guessRange={guessRange}
            functionName="hackableGuess"
            handleSuccess={handleSuccess}
            title="Your Guess (Hackable)"
          />
          <GameInput
            entranceFee={entranceFee}
            GuessGameAddress={GuessGameAddress}
            abi={abi}
            functionName="unhackableGuess"
            guessRange={guessRange}
            handleSuccess={handleSuccess}
            title="Your Guess (UnHackable)"
          />
          <GameInfo
            owner={owner}
            guessRange={guessRange}
            entranceFee={entranceFee}
            recentPlayer={recentPlayer}
            recentWinner={recentWinner}
            lenghtPlayer={lenghtPlayer}
            lenghtWinner={lenghtWinner}
            latestAnswer={latestAnswer}
            recentGuess={recentGuess}
            gameBalance={gameBalance}
            gameState={gameState}
            handleSuccess={handleSuccess}
            isOwner = {account.toLowerCase() === owner.toLowerCase()}
            
          />
        </>
      ) : (
        <div>
          Please connect to a supported chain, Supported chains are localhost
          and Goerli. Contact{" "}
          <a href="https://github.com/UpgradeOfficial">
            Odeyemi Increase Ayobami
          </a>{" "}
          For changes and features{" "}
        </div>
      )}

      {isOwner ? (<div className="pt-3">
        <label
        for="default-toggle"
        className="inline-flex relative items-center cursor-pointer"
      >
        <input
          type="checkbox"
          onClick={(e)=> setGameStateInput(e.target.value)}
          value={0}
          id="default-toggle"
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Game State
        </span>
      </label>
      </div>):(<></>)}
    </>
  );
};

export default Game;
