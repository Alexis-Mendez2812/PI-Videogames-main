import { Route } from 'react-router-dom';
import './App.css';

import Landing from "./components/Landing"
import Home from './components/Home';
import GameDetail from './components/GameDetail';
import AddGame from './components/AddGame';

function App() {
  return (
    <>
    <Route path="/" exact component={Landing} />
    <Route path="/home" exact component={Home} />
    <Route path="/home/:id" exact component={GameDetail} />
    <Route path="/AddGame" exact component={AddGame} />
    </>
  );
}

export default App;
