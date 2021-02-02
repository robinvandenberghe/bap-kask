const ROUTES = {
  home: `/`,
  search: `/zoeken`,
  overview: `/overzicht`,
  planning: `/planning`,
  projectDetail: { path: `/project/:slug`, to: `/project/` },
  studentDetail: { path: `/profiel/:slug`, to: `/profiel/` },
  arDetail : { path: `/augmented-reality/:id`, to: `/augmented-reality/` },
  admin: `/admin`,
  about: `/about`,
  account: `/account`,
  login: `/login`,
  register: `/registreer`,
  chat: `/conversaties`,
  savedWorks: `/opgeslagen-werken`,
};

export default ROUTES;