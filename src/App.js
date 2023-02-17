import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </div>
  );
}

export default App;
