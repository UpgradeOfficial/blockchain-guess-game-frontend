import "./App.css";
import Game from "./components/Game";
import Header from "./components/Header";

// import ManualHeader from './components/ManualHeader';
// the below can be used to control the head file
// import { Helmet } from "react-helmet";
function App() {
  return (
    <div className="App">
      <Header />

      <Game />
    </div>
  );
}

export default App;
