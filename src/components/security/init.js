import Keycloak from "keycloak";
import store from "../../store";

let keycloakAuth = new Keycloak("/static/keycloak.json");

export default (next, roles) => {
  keycloakAuth
    .init({ flow: "implicit", onLoad: "login-required" })
    .success(() => {
      store.dispatch("authLogin", keycloakAuth);
      if (roles) {
        if (keycloakAuth.hasRealmRole(roles[0])) {
          next();
        } else {
          next({ name: "Unauthorized" });
        }
      } else {
        next({ name: "Trombinoscope" });
      }
    })
    .error(() => {
      console.log("failed to login");
    });
};
