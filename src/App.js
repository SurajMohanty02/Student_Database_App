import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Card from "./Card/Card";
import AddStudent from "./Card/AddStudent";
import Nav from "./Card/Nav";
import Modal from "./Card/Modal";
import { Provider } from "react-redux";
import store from "./Card/Reducer/store";
import Profile from "./Card/Profile";
import Edit from "./Card/Edit";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Nav />
          <Modal />
        </div>
        <Switch>
          <Route path="/" exact component={Card} />
          <Route path="/Add-student" exact component={AddStudent} />
          <Route path="/profile/:id" exact component={Profile} />
          <Route path="/edit/:id" exact component={Edit} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
