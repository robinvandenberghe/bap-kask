const ROUTES = {
  home: `/`,
  search: `/zoeken`,
  overview: `/overzicht`,
  projectDetail :  { path: `/project/:id`, to: `/project/` },
  studentDetail :  { path: `/profiel/:id`, to: `/profiel/` },
  arDetail : { path: `/augmented-reality/:id`, to: `/augmented-reality/` },
  admin: `/admin`,
  about: `/about`,
  login: `/login`,
  register: `/registreer`,
  chat: `/conversaties`,
  savedWorks: `/opgeslagen-werken`,
};

export default ROUTES;