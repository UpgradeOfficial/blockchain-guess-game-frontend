import React, { useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../utils/constants";
import {console} from "console-browserify"
const SettingsInput = ({ functionName,  handleSuccess, name }) => {
  const { chainId: chainIdHex} = useMoralis();
  const chainId = parseInt(chainIdHex);
  const GuessGameAddress =
    chainId in contractAddresses ? contractAddresses[chainId][contractAddresses[chainId].length-1] : null;

  const runContractOptions = { abi, contractAddress: GuessGameAddress };
  const [input, setInput] = useState("");
  
  const {
    runContractFunction: setFunction,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    ...runContractOptions,
    functionName: functionName,
    params: {_value: input},
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInput("")
    await setFunction({
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
          {name}
        </label>
        <input
          type="number"
          id="email"
          onChange={(e) => setInput(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={name}
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

export default SettingsInput;
