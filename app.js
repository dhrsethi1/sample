const DEMO_EMAIL = "member@miracles.org";
const DEMO_PASSWORD = "Miracles2026";
const AUTH_KEY = "miracles_member_auth";

const dashboardData = {
  discussions: [
    "Orientation Replay: Miracles Community Vision",
    "Getting Started Q&A with mentors",
    "Recorded Webinar: Building a daily transformation rhythm"
  ],
  events: [
    "Basic Course Cohort (Online) — Monday, 6:30 PM",
    "Basic Course Coaching Circle — Thursday, 7:00 PM",
    "Basic Course Seminar Weekend (In Person) — Next Month"
  ],
  volunteer: [
    "3-Day Seminar: Inner Renewal Intensive",
    "Physical Retreat: Mountain Reset Weekend",
    "Regional Retreat: Community Leadership & Practice"
  ],
  members: [
    { name: "Ava Robinson", team: "Teacher Training" },
    { name: "Noah Thompson", team: "Basic Course Coaching" },
    { name: "Sophia Chen", team: "Membership Support" },
    { name: "Mason Patel", team: "Retreat Facilitation" },
    { name: "Isabella Rivera", team: "Webinar Production" }
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
    results.innerHTML = "<p>No trainers or coaches match your search.</p>";
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
