const year = document.querySelector("[data-year]");
const copyButton = document.querySelector("[data-copy-email]");
const output = document.querySelector("[data-command-output]");
const commandForm = document.querySelector("[data-command-form]");
const commandInput = document.querySelector("#command-input");
const navLinks = [...document.querySelectorAll(".nav-link")];
const shortcutButtons = [...document.querySelectorAll("[data-command]")];
const panels = [...document.querySelectorAll("[data-panel]")];
const email = "leandrocanela279@gmail.com";
const resumeUrl = "https://porfoli-leo.vercel.app/cvLeo.pdf";

const commandMap = {
  help: {
    message: "Comandos disponibles: overview, projects, stack, contact, resume, email, clear.",
  },
  overview: {
    target: "overview",
    message: "Abriendo overview: presentacion general y estado actual.",
  },
  about: {
    target: "overview",
    message: "Abriendo overview: perfil, foco y forma de trabajar.",
  },
  projects: {
    target: "projects",
    message: "Abriendo projects: trabajos seleccionados y builds recientes.",
  },
  work: {
    target: "projects",
    message: "Abriendo projects: trabajos seleccionados y builds recientes.",
  },
  stack: {
    target: "stack",
    message: "Abriendo stack: herramientas y tecnologias principales.",
  },
  contact: {
    target: "contact",
    message: "Abriendo contact: email listo para escribir.",
  },
  email: {
    action: async () => {
      await copyEmail();
      return "Email copiado al portapapeles.";
    },
  },
  resume: {
    action: () => {
      window.open(resumeUrl, "_blank", "noopener,noreferrer");
      return "Abriendo CV en una nueva pestana.";
    },
  },
  clear: {
    message: "Pantalla limpiada. Escribe help para ver los comandos otra vez.",
    clear: true,
  },
};

if (year) {
  year.textContent = new Date().getFullYear();
}

function setActiveLink(targetId) {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.target === targetId);
  });
}

function flashPanel(targetId) {
  const panel = document.getElementById(targetId);

  if (!panel) {
    return;
  }

  panel.classList.remove("panel-highlight");
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
  panel.classList.add("panel-highlight");

  window.setTimeout(() => {
    panel.classList.remove("panel-highlight");
  }, 1400);
}

async function copyEmail() {
  if (!copyButton || !navigator.clipboard) {
    throw new Error("Clipboard API unavailable");
  }

  const originalLabel = copyButton.textContent;

  try {
    await navigator.clipboard.writeText(email);
    copyButton.textContent = "copied";
  } finally {
    window.setTimeout(() => {
      copyButton.textContent = originalLabel;
    }, 1500);
  }
}

function printOutput(message) {
  if (!output) {
    return;
  }

  output.textContent = message;
}

async function runCommand(rawCommand) {
  const normalizedCommand = rawCommand.trim().toLowerCase();

  if (!normalizedCommand) {
    printOutput("Escribe un comando. Prueba con help.");
    return;
  }

  const entry = commandMap[normalizedCommand];

  if (!entry) {
    printOutput(`Comando no reconocido: ${normalizedCommand}. Usa help.`);
    return;
  }

  if (entry.clear) {
    printOutput(entry.message);
    return;
  }

  if (entry.target) {
    setActiveLink(entry.target);
    flashPanel(entry.target);
  }

  if (entry.action) {
    try {
      const actionMessage = await entry.action();
      printOutput(actionMessage);
    } catch {
      printOutput("No pude completar ese comando en este navegador.");
    }
    return;
  }

  printOutput(entry.message);
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const { target } = link.dataset;

    if (!target) {
      return;
    }

    setActiveLink(target);
    flashPanel(target);
    printOutput(`Saltando a ${target}.`);
  });
});

shortcutButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const { command } = button.dataset;

    if (commandInput && command) {
      commandInput.value = command;
    }

    runCommand(command || "");
  });
});

if (commandForm) {
  commandForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(commandForm);
    const command = String(formData.get("command") || "");

    runCommand(command);
  });
}

if (copyButton && navigator.clipboard) {
  copyButton.addEventListener("click", async () => {
    try {
      await copyEmail();
      printOutput("Email copiado al portapapeles.");
    } catch {
      printOutput("No pude copiar el email desde este navegador.");
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

    if (!visibleEntry) {
      return;
    }

    setActiveLink(visibleEntry.target.id);
  },
  {
    threshold: 0.45,
  }
);

panels.forEach((panel) => {
  observer.observe(panel);
});
