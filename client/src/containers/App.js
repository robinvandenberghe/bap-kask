import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import Home from "./Home/";
import Account from "./Account";
import ARDetail from "./ARDetail";
import ProfileDetail from "./ProfileDetail";
import ROUTES from "../constants";
import Login from "./Login";
import Register from "./Register";
import Search from "./Search";
import PageHeader from "../components/PageHeader";
import Divider from "../components/Divider";
import ProjectDetail from "./ProjectDetail";
import Overview from "./Overview";
import Schedule from "./Schedule";
import Chat from "./Chat";
import FDDetail from "./FDDetail";

const App = () => {

  return (
    <div className={styles.container}>
      <PageHeader />
      <Divider />
      <main className={styles.layout}>
        <Switch>
          <Route path={ROUTES.home} exact strict component={Home} />
          <Route exact path={ROUTES.chat} component={Chat} />
          <Route exact path={ROUTES.account} component={Account}/>
          <Route exact path={ROUTES.login} component={Login} />
          <Route exact path={ROUTES.register} component={Register} />
          <Route exact path={ROUTES.search} component={Search} />
          <Route exact path={ROUTES.projectDetail.path} component={ProjectDetail} />
          <Route exact path={ROUTES.overview} component={Overview} />
          <Route exact path={ROUTES.scheduleDetail.path} component={Schedule}/>
          <Route path={ROUTES.schedule} component={Schedule}/>
          <Route exact path={ROUTES.chatDetail.path} component={Chat}/>
          <Route path={ROUTES.chat} component={Chat} />
          <Route exact path={ROUTES.profileDetail.path} component={ProfileDetail} />          
          <Route exact path={ROUTES.arDetail} component={ARDetail} />
          <Route exact path={ROUTES.festivalDigital} component={FDDetail} />
        </Switch>
      </main>
      <Divider />
      <footer className={styles.footer}>
        <p className={styles.footerText}>Digital Graduation Expo 07.09 - 22.09</p>
        <div className={styles.bottomFooter}>
          <NavLink exact to={ROUTES.home} className={styles.bottomLink} activeClassName={styles.active}>home</NavLink>
          <NavLink to={ROUTES.schedule} className={styles.bottomLink} activeClassName={styles.active}>schedule</NavLink>
          <NavLink to={ROUTES.overview} className={styles.bottomLink} activeClassName={styles.active}>overview</NavLink>
        </div>
      </footer>
    </div>
  );
}

export default App;
