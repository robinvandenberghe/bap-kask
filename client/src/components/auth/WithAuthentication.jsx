// withAuthentication.jsx
import React from "react";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import ROUTES from "../../constants";
import { useStores } from "../../hooks/useStores";

const withAuthentication = ComponentToProtect => {
  const WithAuth = props => {
    const { uiStore } = useStores();
    if (!uiStore.authUser) {
      return <Redirect to={ROUTES.login} />;
    }
    return <ComponentToProtect {...props} authUser={uiStore.authUser} />;
  };

  return observer(WithAuth);
};
export default withAuthentication;
