import React from "react";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div className="ui container">
      <Switch>
        <Route exact path="/" component={PageOne} />
        <Route exact path="/pageTwo" component={PageTwo} />
      </Switch>
    </div>
  );
};

export default App;
