import React from "react";
import { Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import Home from "./Home";
import Admin from "./Admin";
import Account from "./Account";
// import About from "./About";
import ROUTES from "../constants";
import Login from "./Login";
import Register from "./Register";
import Search from "./Search";
import PageHeader from "../components/PageHeader";
import Divider from "../components/Divider";
import ProjectDetail from "./ProjectDetail";
import Overview from "./Overview";
import Planning from "./Planning";
import Chat from "./Chat";
import { useStores } from "../hooks/useStores";

const App = () => {
  return (
    <div className={styles.container}>
      <PageHeader />
      <Divider />
      <main className={styles.layout}>
        <Switch>
          <Route path={ROUTES.home} exact strict component={Home} />
          <Route path={ROUTES.account} component={Account}/>
          <Route path={ROUTES.chat} component={Chat} />
          <Route path={ROUTES.login} component={Login} />
          <Route path={ROUTES.register} component={Register} />
          <Route path={ROUTES.search} component={Search} />
          <Route path={ROUTES.projectDetail.path} component={ProjectDetail} />
          <Route path={ROUTES.overview} component={Overview} />
          <Route path={ROUTES.planning} component={Planning} />
          <Route path={ROUTES.chat} component={Chat} />
          {/*
          <Route path={ROUTES.savedWorks} component={SavedWorks} />
          
          
          <Route path={ROUTES.studentDetail} component={Student} />
          <Route path={ROUTES.arDetail} component={ARDetail} />*/}
          <Route path={ROUTES.admin} component={Admin} />

        </Switch>
      </main>
      <Divider />
      <footer className={styles.footer}>
        <p className={styles.footerText}>Digital Graduation Expo 07.09 - 22.09</p>
      </footer>
    </div>
  );
}

export default App;
