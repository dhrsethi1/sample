const DEMO_EMAIL = "member@miracles.org";
const DEMO_PASSWORD = "Miracles2026";
const AUTH_KEY = "miracles_member_auth";

const dashboardData = {
  discussions: [
    "How to lead neighborhood outreach effectively",
    "Prayer and encouragement thread",
    "Best practices for mentoring new volunteers"
  ],
  events: [
    "Virtual Prayer Circle — Wednesday, 7:00 PM",
    "Food Pantry Service Day — Saturday, 9:00 AM",
    "Leadership Workshop — Next Monday, 6:00 PM"
  ],
  volunteer: [
    "Mentor Program for Youth",
    "Senior Care Visit Team",
    "Community Cleanup & Beautification"
  ],
  members: [
    { name: "Ava Robinson", team: "Mentorship" },
    { name: "Noah Thompson", team: "Prayer Circle" },
    { name: "Sophia Chen", team: "Events" },
    { name: "Mason Patel", team: "Food Pantry" },
    { name: "Isabella Rivera", team: "Outreach" }
  ]
};

const byId = (id) => document.getElementById(id);

const isLoggedIn = () => sessionStorage.getItem(AUTH_KEY) === "true";
const logIn = () => sessionStorage.setItem(AUTH_KEY, "true");
const logOut = () => sessionStorage.removeItem(AUTH_KEY);

const openModal = () => {
  byId("login-modal")?.classList.remove("hidden");
  byId("email")?.focus();
};

const closeModal = () => byId("login-modal")?.classList.add("hidden");

const setList = (id, items) => {
  const list = byId(id);
  if (!list) {
    return;
  }

  list.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
};

const renderMembers = (query = "") => {
  const results = byId("member-results");
  if (!results) {
    return;
  }

  const normalized = query.trim().toLowerCase();
  const filtered = dashboardData.members.filter(
    ({ name, team }) => name.toLowerCase().includes(normalized) || team.toLowerCase().includes(normalized)
  );

  if (!filtered.length) {
    results.innerHTML = "<p>No members match your search.</p>";
    return;
  }

  results.innerHTML = filtered
    .map(({ name, team }) => `<article class="member-card"><strong>${name}</strong><span>${team}</span></article>`)
    .join("");
};

const wireLoginFlow = () => {
  const loginTriggers = ["open-login", "hero-login", "cta-login"];
  loginTriggers.forEach((id) => byId(id)?.addEventListener("click", openModal));

  byId("close-modal")?.addEventListener("click", closeModal);
  byId("login-modal")?.addEventListener("click", (event) => {
    if (event.target === byId("login-modal")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  byId("login-form")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = byId("email")?.value.trim().toLowerCase();
    const password = byId("password")?.value;

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      byId("error")?.classList.add("hidden");
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

const initializeCommunityPage = () => {
  if (!window.location.pathname.endsWith("community.html")) {
    return;
  }

  setList("discussion-list", dashboardData.discussions);
  setList("event-list", dashboardData.events);
  setList("volunteer-list", dashboardData.volunteer);
  renderMembers();

  byId("welcome-title").textContent = `Welcome back, ${DEMO_EMAIL.split("@")[0]}!`;

  byId("member-search")?.addEventListener("input", (event) => {
    renderMembers(event.target.value);
  });
};

guardMembersPage();
wireLoginFlow();
wireLogout();
initializeCommunityPage();
