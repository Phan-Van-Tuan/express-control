const DEFINE_ROUTERS = {
  home: "/",
  dashboard: "/dashboard",
  analysis: "/analysis",
  inbox: "/inbox",
  users: {
    index: "/account",
    rider: "/account/rider",
    driver: "account/driver",
    driver_id: "account/driver/:id",
  },
  route: "/route",
  events: "/events",
  config: "/configs",
  notifications: {
    index: "/notify",
    create: "/notify/create",
  },
  logout: "/logout",
  login: "/login",
  otp: "/otp",
  test: "/test",
};

export { DEFINE_ROUTERS };
