class Auth {
  login = (email, password) => {
    return fetch(`/auth/login`, {
      method: `POST`,
      headers: {
        "content-type": `application/json`
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => {
      if (res.status === 200) {
        Promise.resolve();
      } else {
        Promise.reject();
      }
    });
  };

  logout = () => {
    return fetch(`/auth/logout`, {
      method: `POST`,
      headers: {
        "content-type": `application/json`
      }
    });
  };

  register = (name, surname, email, password) => {
    return fetch(`/auth/register`, {
      method: `POST`,
      headers: {
        "content-type": `application/json`
      },
      body: JSON.stringify({
        name,
        surname,
        email,
        password
      })
    }).then(res => {
      if (res.status === 200) {
        Promise.resolve();
      } else {
        Promise.reject();
      }
    });
  };
}

export default Auth;
