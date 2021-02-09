const ROUTES = {
  home: `/`,
  search: `/search`,
  overview: `/overview`,
  schedule: `/schedule/`,
  projectDetail: { path: `/work/:slug`, to: `/work/` },
  profileDetail: { path: `/profile/:id`, to: `/profile/` },
  scheduleDetail: { path: `/schedule/:id`, to: `/schedule/` },
  arDetail : `/augmented-reality`,
  festivalDigital : `/festival-digital`,
  about: `/about`,
  account: `/account`,
  login: `/login`,
  register: `/register`,
  chat: `/conversations/`,
  chatDetail: { path: `/conversations/:userId`, to: `/conversations/` },
};

export default ROUTES;