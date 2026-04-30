const year = document.querySelector("[data-year]");
const commandForm = document.querySelector("[data-command-form]");
const commandInput = document.querySelector("#command-input");
const terminalBody = document.querySelector("[data-terminal-body]");
const previewKind = document.querySelector("[data-preview-kind]");
const previewTitle = document.querySelector("[data-preview-title]");
const previewSubtitle = document.querySelector("[data-preview-subtitle]");
const previewImage = document.querySelector("[data-preview-image]");
const previewCopy = document.querySelector("[data-preview-copy]");
const previewDetails = document.querySelector("[data-preview-details]");
const primaryLink = document.querySelector("[data-primary-link]");
const secondaryLink = document.querySelector("[data-secondary-link]");
const treeItems = [...document.querySelectorAll(".tree-item")];
const commandButtons = [...document.querySelectorAll("[data-command]")];

const email = "leandrocanela279@gmail.com";
const resumeUrl = "https://porfoli-leo.vercel.app/cvLeo.pdf";

const projectMap = {
  "news-landing": {
    kind: "project",
    title: "Landing page de noticias",
    subtitle: "frontend / 2025",
    image: "assets/project1-small.png",
    copy: "Ejercicio de maquetacion centrado en ritmo visual, estructura y limpieza con HTML y CSS.",
    details: [
      ["stack", "HTML, CSS"],
      ["type", "public landing"],
      ["link", "deploy available"],
    ],
    primary: {
      label: "open project",
      href: "https://leo-deploy-pages-883021.gitlab.io/ejercicio-noticias/index.html",
    },
    secondary: {
      label: "open github",
      href: "https://github.com/Leocanela279",
    },
    terminal: [
      "Landing page de noticias",
      "stack: HTML, CSS",
      "focus: maquetacion y composicion visual",
      "url: https://leo-deploy-pages-883021.gitlab.io/ejercicio-noticias/index.html",
    ],
  },
  "school-leagues": {
    kind: "project",
    title: "Sistema de ligas escolares",
    subtitle: "management / 2025",
    image: "assets/project2-small.png",
    copy: "Aplicacion para gestionar equipos, ligas y partidos en un entorno educativo con paneles de administracion.",
    details: [
      ["stack", "web app"],
      ["type", "private build"],
      ["focus", "admin flows"],
    ],
    primary: {
      label: "private build",
      href: "https://github.com/Leocanela279",
    },
    secondary: {
      label: "contact me",
      href: `mailto:${email}`,
    },
    terminal: [
      "Sistema de ligas escolares",
      "status: private build",
      "focus: gestion de equipos, ligas y partidos",
      "notes: interfaz interna orientada a administracion",
    ],
  },
  "restaurant-saas": {
    kind: "project",
    title: "Restaurant management SaaS",
    subtitle: "saas / 2026",
    image: "assets/project3-small.png",
    copy: "Plataforma multi-tenant hecha con Laravel para operaciones de restaurantes, roles y gestion diaria.",
    details: [
      ["stack", "Laravel, MySQL"],
      ["type", "multi-tenant SaaS"],
      ["status", "live product"],
    ],
    primary: {
      label: "open project",
      href: "https://leo-dev.es/login",
    },
    secondary: {
      label: "contact",
      href: `mailto:${email}`,
    },
    terminal: [
      "Restaurant management SaaS",
      "stack: Laravel, MySQL",
      "mode: multi-tenant",
      "url: https://leo-dev.es/login",
    ],
  },
  "password-manager": {
    kind: "project",
    title: "Password Manager",
    subtitle: "desktop app / 2026",
    image: "assets/password-manager-logo-small.png",
    copy: "Gestor local-first con Electron, Vue, SQLite y cifrado con crypto de Node.js.",
    details: [
      ["stack", "Electron, Vue, SQLite"],
      ["type", "desktop app"],
      ["security", "local-first encryption"],
    ],
    primary: {
      label: "open repo",
      href: "https://github.com/Leocanela279/password-manager",
    },
    secondary: {
      label: "github profile",
      href: "https://github.com/Leocanela279",
    },
    terminal: [
      "Password Manager",
      "stack: Electron, Vue, SQLite",
      "security: bcrypt + crypto module",
      "repo: https://github.com/Leocanela279/password-manager",
    ],
  },
};

const previewMap = {
  profile: {
    kind: "profile",
    title: "Leandro Canela",
    subtitle: "backend-minded web developer",
    image: "assets/project3-small.png",
    copy: "Construyo productos web con interes especial en backend, SaaS, apps de escritorio y paneles de gestion.",
    details: [
      ["focus", "backend + product"],
      ["status", "available for internships"],
      ["current", "restaurant SaaS"],
    ],
    primary: {
      label: "open github",
      href: "https://github.com/Leocanela279",
    },
    secondary: {
      label: "contact",
      href: `mailto:${email}`,
    },
  },
  stack: {
    kind: "stack",
    title: "stack.json",
    subtitle: "core tools",
    image: "assets/password-manager-logo-small.png",
    copy: "Stack principal para producto web, backend, interfaces y herramientas de escritorio.",
    details: [
      ["frontend", "HTML, CSS, JavaScript, Vue, Astro"],
      ["backend", "Node.js, Express, PHP, Laravel"],
      ["data", "MySQL, SQLite, Tailwind, Electron"],
    ],
    primary: {
      label: "open resume",
      href: resumeUrl,
    },
    secondary: {
      label: "open github",
      href: "https://github.com/Leocanela279",
    },
  },
  contact: {
    kind: "contact",
    title: "contact.sh",
    subtitle: "ready to reach out",
    image: "assets/project1-small.png",
    copy: "Si tienes una oportunidad o quieres colaborar, la via mas directa es el email.",
    details: [
      ["email", email],
      ["github", "Leocanela279"],
      ["reply", "usually fast"],
    ],
    primary: {
      label: "send email",
      href: `mailto:${email}`,
    },
    secondary: {
      label: "resume",
      href: resumeUrl,
    },
  },
};

const helpText = [
  "Comandos disponibles:",
  "help",
  "whoami",
  "ls projects",
  "cat stack",
  "contact",
  "resume",
  "open restaurant-saas",
  "open password-manager",
  "open news-landing",
  "open school-leagues",
  "clear",
].join("\n");

if (year) {
  year.textContent = new Date().getFullYear();
}

function setActiveTree(command) {
  treeItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.command === command);
  });
}

function renderPreview(data) {
  if (!data) {
    return;
  }

  previewKind.textContent = data.kind;
  previewTitle.textContent = data.title;
  previewSubtitle.textContent = data.subtitle;
  previewImage.src = data.image;
  previewImage.alt = data.title;
  previewCopy.textContent = data.copy;
  primaryLink.textContent = data.primary.label;
  primaryLink.href = data.primary.href;
  secondaryLink.textContent = data.secondary.label;
  secondaryLink.href = data.secondary.href;

  previewDetails.innerHTML = data.details
    .map(
      ([label, value]) => `
        <div>
          <dt>${label}</dt>
          <dd>${value}</dd>
        </div>
      `
    )
    .join("");
}

function appendCommandLine(command) {
  const line = document.createElement("div");
  line.className = "terminal-line";
  line.innerHTML = `
    <span class="prompt">visitor@portfolio</span>
    <span class="path">~/workspace</span>
    <span class="symbol">$</span>
    <span>${command}</span>
  `;
  terminalBody.append(line);
}

function appendResponse(content) {
  const response = document.createElement("div");
  response.className = "terminal-response";

  if (Array.isArray(content)) {
    content.forEach((line) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = line;
      response.append(paragraph);
    });
  } else if (content.includes("\n")) {
    const pre = document.createElement("pre");
    pre.textContent = content;
    response.append(pre);
  } else {
    const paragraph = document.createElement("p");
    paragraph.textContent = content;
    response.append(paragraph);
  }

  terminalBody.append(response);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

function clearTerminal() {
  terminalBody.innerHTML = "";
}

function openProject(projectId) {
  const project = projectMap[projectId];

  if (!project) {
    appendResponse(`Proyecto no reconocido: ${projectId}`);
    return;
  }

  renderPreview(project);
  appendResponse(project.terminal);
}

function runCommand(rawCommand) {
  const command = rawCommand.trim();
  const normalized = command.toLowerCase();

  if (!command) {
    appendResponse("Escribe un comando. Prueba con help.");
    return;
  }

  appendCommandLine(command);

  if (normalized === "clear") {
    clearTerminal();
    appendCommandLine("clear");
    appendResponse("Terminal limpiada.");
    return;
  }

  if (normalized === "help") {
    setActiveTree("");
    appendResponse(helpText);
    return;
  }

  if (normalized === "whoami") {
    setActiveTree("whoami");
    renderPreview(previewMap.profile);
    appendResponse([
      "Leandro Canela",
      "backend-minded web developer",
      "Interes principal: producto, backend, SaaS y herramientas utiles.",
    ]);
    return;
  }

  if (normalized === "ls projects") {
    setActiveTree("ls projects");
    appendResponse([
      "projects/",
      "  news-landing",
      "  school-leagues",
      "  restaurant-saas",
      "  password-manager",
    ]);
    return;
  }

  if (normalized === "cat stack") {
    setActiveTree("cat stack");
    renderPreview(previewMap.stack);
    appendResponse(`{
  "frontend": ["HTML", "CSS", "JavaScript", "Vue", "Astro"],
  "backend": ["Node.js", "Express", "PHP", "Laravel"],
  "data": ["MySQL", "SQLite"],
  "desktop": ["Electron"],
  "ui": ["Tailwind CSS"]
}`);
    return;
  }

  if (normalized === "contact") {
    setActiveTree("contact");
    renderPreview(previewMap.contact);
    appendResponse([
      `email: ${email}`,
      "github: https://github.com/Leocanela279",
      "resume: /cvLeo.pdf",
    ]);
    return;
  }

  if (normalized === "resume") {
    window.open(resumeUrl, "_blank", "noopener,noreferrer");
    appendResponse("Abriendo resume.pdf");
    return;
  }

  if (normalized.startsWith("open ")) {
    const target = normalized.replace("open ", "").trim();

    if (target in projectMap) {
      setActiveTree(`open ${target}`);
      openProject(target);
      return;
    }

    if (target === "github") {
      window.open("https://github.com/Leocanela279", "_blank", "noopener,noreferrer");
      appendResponse("Abriendo GitHub.");
      return;
    }

    if (target === "gitlab") {
      window.open("https://gitlab.com/leandrocanela279", "_blank", "noopener,noreferrer");
      appendResponse("Abriendo GitLab.");
      return;
    }

    appendResponse(`No existe el target: ${target}`);
    return;
  }

  appendResponse(`Comando no reconocido: ${command}`);
}

commandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const { command } = button.dataset;

    if (!command) {
      return;
    }

    commandInput.value = command;
    runCommand(command);
  });
});

if (commandForm) {
  commandForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(commandForm);
    const command = String(formData.get("command") || "");

    runCommand(command);
    commandForm.reset();
  });
}

renderPreview(previewMap.profile);

if (commandInput) {
  commandInput.focus();
}
