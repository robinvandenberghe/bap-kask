import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import styles from "./App.module.css";

import Home from "./Home";
// import Admin from "./Admin";
// import About from "./About";
import ROUTES from "../constants";
import Login from "./Login";
import Register from "./Register";

class App extends Component {
  render() {
    return (
      <main className={styles.layout}>
        <Switch>
          <Route path={ROUTES.home} exact strict component={Home} />
          {/* <Route path={ROUTES.about} component={About} /> */}
          <Route path={ROUTES.login} component={Login} />
          <Route path={ROUTES.register} component={Register} />
          {/* <Route path={ROUTES.chat} component={Chat} />
          <Route path={ROUTES.savedWorks} component={SavedWorks} />
          <Route path={ROUTES.search} component={Search} />
          <Route path={ROUTES.overview} component={Overview} />
          <Route path={ROUTES.projectDetail} component={Project} />
          <Route path={ROUTES.studentDetail} component={Student} />
          <Route path={ROUTES.arDetail} component={ARDetail} />
          <Route path={ROUTES.admin} component={Admin} />*/}

        </Switch>
      </main>
    );
  }
}

export default withRouter(App);
