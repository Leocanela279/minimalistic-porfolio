const year = document.querySelector("[data-year]");
const copyButton = document.querySelector("[data-copy-email]");
const email = "leandrocanela279@gmail.com";

if (year) {
  year.textContent = new Date().getFullYear();
}

if (copyButton && navigator.clipboard) {
  copyButton.addEventListener("click", async () => {
    const originalLabel = copyButton.textContent;

    try {
      await navigator.clipboard.writeText(email);
      copyButton.textContent = "copiado";
    } catch {
      copyButton.textContent = "no disponible";
    }

    window.setTimeout(() => {
      copyButton.textContent = originalLabel;
    }, 1500);
  });
}
