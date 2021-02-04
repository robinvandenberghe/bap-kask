const ROUTES = {
  home: `/`,
  search: `/search`,
  overview: `/overview`,
  planning: `/schedule/`,
  projectDetail: { path: `/project/:slug`, to: `/project/` },
  studentDetail: { path: `/profile/:slug`, to: `/profile/` },
  scheduleDetail: { path: `/schedule/:id`, to: `/schedule/` },
  arDetail : { path: `/augmented-reality/:id`, to: `/augmented-reality/` },
  admin: `/admin`,
  about: `/about`,
  account: `/account`,
  login: `/login`,
  register: `/register`,
  chat: `/conversations`,
  savedWorks: `/saved-projects`,
};

export default ROUTES;