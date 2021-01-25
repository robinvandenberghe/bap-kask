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

  register = (userObj) => {
    return fetch(`/auth/register`, {
      method: `POST`,
      headers: {
        "content-type": `application/json`
      },
      body: JSON.stringify(userObj)
    }).then(res => {
      if (res.status === 200) {
        Promise.resolve();
      } else {
        Promise.reject();
      }
    });
  };

  getAllConversations = async id => {
    const r = await fetch(
      `/auth/messages`, 
    this.getOptions(`get`, {id: id})
    );
    return await r.json();
  };

  create = async entity => {
    const r = await fetch(
      `/api/${this.entity}`,
      this.getOptions(`post`, entity.values)
    );
    return await r.json();
  };

  update = async entity => {
    const r = await fetch(
      `/api/${this.entity}/${entity.id}`,
      this.getOptions(`put`, entity.values)
    );
    return await r.json();
  };

  delete = async entity => {
    const r = await fetch(
      `/api/${this.entity}/${entity.id}`,
      this.getOptions(`delete`)
    );
    return r.json();
  };

  getOptions = (method, body = null) => {
    const options = {
      method: method.toUpperCase(),
      headers: {
        "content-type": `application/json`
      }
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return options;
  };
}

export default Auth;
