const siteConfig = {
  whatsappNumber: "556492138965",
  whatsappMessage:
    "Oi! Vi seu catálogo de serviços e gostei do seu trabalho. Gostaria de saber mais e verificar os horários disponíveis para agendar. 💕"
};

function buildWhatsAppUrl(number, message) {
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
    link.setAttribute("href", url);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");

    link.addEventListener("click", () => {
      const params = new URLSearchParams(window.location.search);

      window.dispatchEvent(
        new CustomEvent("whatsapp_click", {
          detail: {
            source: "landing_page",
            utm_source: params.get("utm_source"),
            utm_medium: params.get("utm_medium"),
            utm_campaign: params.get("utm_campaign")
          }
        })
      );
    });
  });
}

setupWhatsAppLinks();
