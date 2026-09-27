const siteConfig = {
  whatsappNumber: "556492138965",
  whatsappMessage:
    "Oi! Vi seu catálogo de serviços e gostei do seu trabalho. Gostaria de saber mais e verificar os horários disponíveis para agendar. 💕",
  calendlyUrl: "https://calendly.com/jhordannaaraujo7"
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
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

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


function openCalendlyPopup(event) {
  event.preventDefault();

  if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
    window.Calendly.initPopupWidget({
      url: siteConfig.calendlyUrl
    });
    return;
  }

  window.open(siteConfig.calendlyUrl, "_blank", "noopener,noreferrer");
}

function setupCalendlyLinks() {
  document.querySelectorAll(".js-calendly-link").forEach((link) => {
    link.href = siteConfig.calendlyUrl;
    link.addEventListener("click", openCalendlyPopup);
  });

  window.addEventListener("message", (event) => {
    if (!event.data || typeof event.data.event !== "string") return;
    if (!event.data.event.startsWith("calendly.")) return;

    if (event.data.event === "calendly.event_scheduled") {
      const params = new URLSearchParams(window.location.search);

      window.dispatchEvent(
        new CustomEvent("booking_scheduled", {
          detail: {
            source: "calendly",
            utm_source: params.get("utm_source"),
            utm_medium: params.get("utm_medium"),
            utm_campaign: params.get("utm_campaign")
          }
        })
      );
    }
  });
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    items.forEach((item) => item.classList.add("is-visible"));
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
      threshold: 0.1,
      rootMargin: "0px 0px -6% 0px"
    }
  );

  items.forEach((item) => observer.observe(item));
}

setupWhatsAppLinks();
setupCalendlyLinks();
setupReveal();
