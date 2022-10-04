import React, { useState} from "react";
import { useWeb3Contract } from "react-moralis";
import {console} from "console-browserify"
const GameInput = ({
  entranceFee,
  GuessGameAddress,
  abi,
  guessRange,
  handleSuccess,
  functionName,
  title,
}) => {
  const [guessInput, setGuessInput] = useState("44");
  const {
    runContractFunction: HackableGuess,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: GuessGameAddress,
    functionName,
    msgValue: entranceFee,
    params: { _guess: guessInput },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await HackableGuess({
      // onComplete:
      // onError:
      onSuccess: handleSuccess,
      onError: (error) => console.log(error),
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          for="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {title}
        </label>
        <input
          type="number"
          id="email"
          onChange={(e) => setGuessInput(e.target.value)}
          min="0"
          max={guessRange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Take a guess, You can be the beginning of a new thing"
          required=""
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={isLoading || isFetching}
      >
        {isLoading || isFetching ? (
          <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default GameInput;
