import { useMoralis } from "react-moralis";
import "./App.css";
import Game from "./components/Game";
import Header from "./components/Header";

// import ManualHeader from './components/ManualHeader';
// the below can be used to control the head file
// import { Helmet } from "react-helmet";
const supportedChains = ["31337", "5"];
function App() {
  const { isWeb3Enabled, chainId } = useMoralis();
  return (

    <>
        <Header />
      {isWeb3Enabled ? (
        <div>
          {supportedChains.includes(parseInt(chainId).toString()) ? (
            <div className="App">
              
              <Game />
            </div>
          ) : (
            <div>{`Please switch to a supported chainId. The supported Chain Ids are: ${supportedChains}`}</div>
          )}
        </div>
      ) : (
        <div className="text-center text-lg">Please connect to a Wallet. Have Problem. Click the number <a href="https://wa.me/%2B2347068448786?text=Hi%20Odeyemi%20Increase%20Ayobami.%20Tried%20out%20your%20game%2C%20having%20some%20slight%20difficulty.%20Can%20you%20be%20of%20any%20assistance%3F">07068448786</a> to chat me up</div>
      )}
    </>
  );
}

export default App;
