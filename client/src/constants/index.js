const ROUTES = {
  home: `/`,
  search: `/search`,
  overview: `/overview`,
  schedule: `/schedule/`,
  projectDetail: { path: `/work/:slug`, to: `/work/` },
  profileDetail: { path: `/profile/:slug`, to: `/profile/` },
  scheduleDetail: { path: `/schedule/:id`, to: `/schedule/` },
  arDetail : `/augmented-reality`,
  admin: `/admin`,
  about: `/about`,
  account: `/account`,
  login: `/login`,
  register: `/register`,
  chat: `/conversations`,
};

export default ROUTES;