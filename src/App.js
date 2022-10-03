import { useMoralis } from "react-moralis";
import "./App.css";
import Game from "./components/Game";
import Header from "./components/Header";

// import ManualHeader from './components/ManualHeader';
// the below can be used to control the head file
// import { Helmet } from "react-helmet";
const supportedChains = ["31337", "4"];
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
        <div>Please connect to a Wallet</div>
      )}
    </>
  );
}

export default App;
