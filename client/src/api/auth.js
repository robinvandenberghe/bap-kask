class Auth {
  login = async (email, password) => {
    const r = await fetch(`/auth/login`, {
      method: `POST`,
      headers: {
        "content-type": `application/json`
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    if(r.status === 200){
      return { success: true };
    }else{
      return await r.json();
    }
  };

  logout = () => {
    return fetch(`/auth/logout`, {
      method: `POST`,
      headers: {
        "content-type": `application/json`
      }
    });
  };

  register = async (userObj) => {
    const r = await fetch(`/auth/register`, {
      method: `POST`,
      headers: {
        "content-type": `application/json`
      },
      body: JSON.stringify(userObj)
    });
    if(r.status === 200){
      return { success: true };
    }else{
      return await r.json();
    }
  };

  saveWork = async (userId, workId) => {
    const r = await fetch(
      `/auth/save-work`,
      this.getOptions(`post`, {userId, workId})
    );
    return await r.json();
  };

  getAllSavedWorks = async () => {
    const r = await fetch( `/auth/saved-works` );
    return await r.json();
  };

  getUser = async (id) => {
    const r = await fetch( `/auth/user/${id}`);
    return await r.json();
  };

  create = async entity => {
    const r = await fetch(
      `/api/${this.entity}`,
      this.getOptions(`post`, entity.values)
    );
    return await r.json();
  };

  createStudent = async entity => {
    const r = await fetch(
      `/auth/create-student`,
      this.getOptions(`post`, entity)
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
