const siteConfig = {
  whatsappNumber: "",
  whatsappMessage:
    "Olá! Vi a apresentação dos serviços pelo site e gostaria de saber mais e solicitar um orçamento."
};

function buildWhatsAppUrl(number, message) {
  if (!number) return null;

  const normalizedNumber = number.replace(/\D/g, "");
  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`;
}

function setupWhatsAppLinks() {
  const url = buildWhatsAppUrl(
    siteConfig.whatsappNumber,
    siteConfig.whatsappMessage
  );

  const links = document.querySelectorAll(".js-whatsapp-link");

  links.forEach((link) => {
    if (!url) {
      link.setAttribute("href", "#");
      link.setAttribute("aria-disabled", "true");
      link.setAttribute(
        "title",
        "Adicionar o número de WhatsApp em public/script.js"
      );
      return;
    }

    link.setAttribute("href", url);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    link.removeAttribute("aria-disabled");

    link.addEventListener("click", () => {
      window.dispatchEvent(
        new CustomEvent("whatsapp_click", {
          detail: {
            source: "landing_page",
            utm_source: new URLSearchParams(window.location.search).get(
              "utm_source"
            )
          }
        })
      );
    });
  });
}

setupWhatsAppLinks();
