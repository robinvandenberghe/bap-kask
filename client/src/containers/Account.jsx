import React from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { useStores } from "../hooks/useStores";

const Account = () => {
  const { uiStore } = useStores();

  return (
    <section>
      <h3>{uiStore.authUser.name+ ` `+ uiStore.authUser.surname}</h3>
    </section>
  );
};

export default (withAuthentication(Account));
