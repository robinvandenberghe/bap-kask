import React from "react";
import { observer } from "mobx-react";
import withAuthentication from "../components/auth/WithAuthentication";

const Account = () => {
  return (
    <section>

    </section>
  );
};

export default (withAuthentication(observer(Account)));
