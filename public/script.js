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

  document.querySelectorAll(".js-whatsapp-link").forEach((link) => {
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

function setupReveals() {
  const elements = document.querySelectorAll(".reveal");

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px"
    }
  );

  elements.forEach((element) => observer.observe(element));
}

setupWhatsAppLinks();
setupReveals();
