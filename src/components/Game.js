import React, { useEffect, useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { abi, contractAddresses } from "../utils/constants";
import { useNotification } from "web3uikit";
import GameInput from "./GameInput";

const Game = () => {
  const { chainId: chainIdHex, isWeb3Enabled, Moralis, account } = useMoralis();
  const userAddress = Moralis.User.Address;
  const chainId = parseInt(chainIdHex);
  const GuessGameAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const [guessRange, setGuessRange] = useState("0");
  const [owner, setOwner] = useState("");
  const [entranceFee, setEntranceFee] = useState("");
  const [recentPlayer, setRecentPlayer] = useState("");
  const dispatch = useNotification();

  //   const { runContractFunction: enterRaffle } = useWeb3Contract({
  //     abi: abi,
  //     contractAddress: GuessGameAddress,
  //     functionName: "enterRaffle",
  //     msgValue: entranceFee,
  //     params: {},
  //   });

  const { runContractFunction: getGuessRange } = useWeb3Contract({
    abi: abi,
    contractAddress: GuessGameAddress, // specify the networkId
    functionName: "getGuessRange",
    params: {},
  });
  const { runContractFunction: s_owner } = useWeb3Contract({
    abi: abi,
    contractAddress: GuessGameAddress, // specify the networkId
    functionName: "getOwner",
    params: {},
  });
  const { runContractFunction: isOwner } = useWeb3Contract({
    abi: abi,
    contractAddress: GuessGameAddress, // specify the networkId
    functionName: "isOwner",
    params: { _player: owner },
  });
  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: GuessGameAddress, // specify the networkId
    functionName: "getEntranceFee",
    params: {},
  });
  const { runContractFunction: getRecentPlayer } = useWeb3Contract({
    abi: abi,
    contractAddress: GuessGameAddress, // specify the networkId
    functionName: "getRecentPlayer",
    params: {},
  });

  // const { runContractFunction: getGuessRange } = useWeb3Contract({
  //   abi: abi,
  //   contractAddress: GuessGameAddress,
  //   functionName: "getGuessRange",
  //   params: {},
  // });

  async function updateUIValues() {
    // Another way we could make a contract call:
    // const options = { abi, contractAddress: GuessGameAddress }
    // const fee = await Moralis.executeFunction({
    //     functionName: "getEntranceFee",
    //     ...options,
    // })
    const getGuessRangeFromCall = (await getGuessRange()).toString();
    setGuessRange(getGuessRangeFromCall);
    const getownerFromCall = await s_owner();
    setOwner(getownerFromCall);
    const getEntranceFeeFromCall = (await getEntranceFee()).toString();
    setEntranceFee(getEntranceFeeFromCall);
    const getRecentPlayerFromCall = (await getRecentPlayer()).toString();
    setRecentPlayer(getRecentPlayerFromCall);
    //
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
          />
          {/* <GameInput/> */}
          <div>
            Guess Range: {guessRange}, owner: {owner}, entranceFee {entranceFee}
            recentPlayer: {recentPlayer}
          </div>
        </>
      ) : (
        <div>Please connect to a supported chain, Support chains are: </div>
      )}
    </>
  );
};

export default Game;
