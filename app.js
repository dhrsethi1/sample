const DEMO_EMAIL = "member@miracles.org";
const DEMO_PASSWORD = "Miracles2026";
const AUTH_KEY = "miracles_member_auth";

const byId = (id) => document.getElementById(id);

const isLoggedIn = () => sessionStorage.getItem(AUTH_KEY) === "true";
const logIn = () => sessionStorage.setItem(AUTH_KEY, "true");
const logOut = () => sessionStorage.removeItem(AUTH_KEY);

const openModal = () => byId("login-modal")?.classList.remove("hidden");
const closeModal = () => byId("login-modal")?.classList.add("hidden");

const wireLoginFlow = () => {
  const loginTriggers = ["open-login", "hero-login", "cta-login"];
  loginTriggers.forEach((id) => byId(id)?.addEventListener("click", openModal));

  byId("close-modal")?.addEventListener("click", closeModal);

  byId("login-form")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = byId("email")?.value.trim().toLowerCase();
    const password = byId("password")?.value;

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      logIn();
      window.location.href = "community.html";
      return;
    }

    byId("error")?.classList.remove("hidden");
  });
};

const guardMembersPage = () => {
  if (window.location.pathname.endsWith("community.html") && !isLoggedIn()) {
    window.location.href = "index.html";
  }
};

const wireLogout = () => {
  byId("logout")?.addEventListener("click", () => {
    logOut();
    window.location.href = "index.html";
  });
};

guardMembersPage();
wireLoginFlow();
wireLogout();
