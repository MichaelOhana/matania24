const PHONE_NUMBER = "0524218501";
const WHATSAPP_NUMBER = "972524218501";

const defaultMessage =
  "היי מתניה, הגעתי אליך דרך האתר";

function buildWhatsAppUrl(message = defaultMessage) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function updateWhatsAppLinks() {
  document.querySelectorAll(".js-whatsapp-link").forEach((link) => {
    link.setAttribute("href", buildWhatsAppUrl());
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  });
}

function getFieldValue(form, fieldName, fallback = "לא צוין") {
  const value = new FormData(form).get(fieldName);
  return value && value.toString().trim() ? value.toString().trim() : fallback;
}

function handleLeadForm() {
  const form = document.querySelector("#lead-form");
  const problemSelect = document.querySelector("#problem");
  const otherProblemWrap = document.querySelector("#other-problem-wrap");
  const otherProblemInput = document.querySelector("#other-problem");

  if (!form || !problemSelect || !otherProblemWrap || !otherProblemInput) {
    return;
  }

  problemSelect.addEventListener("change", () => {
    const isOther = problemSelect.value === "אחר";
    otherProblemWrap.classList.toggle("hidden", !isOther);
    otherProblemInput.toggleAttribute("required", isOther);

    if (!isOther) {
      otherProblemInput.value = "";
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedProblem = getFieldValue(form, "problem");
    const otherProblem = getFieldValue(form, "otherProblem", "");
    const problem = selectedProblem === "אחר" && otherProblem ? otherProblem : selectedProblem;

    const detailsRaw = (form.querySelector("#details")?.value ?? "").trim();

    const secondLine = detailsRaw ? detailsRaw : `יש לי ${problem}`;

    const message = [
      `היי מתניה, זה ${getFieldValue(form, "name")}`,
      secondLine,
      `אני מ${getFieldValue(form, "area")}`,
    ].join("\n");

    window.open(buildWhatsAppUrl(message), "_blank", "noopener");
  });
}

function syncPhoneLinks() {
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.setAttribute("href", `tel:${PHONE_NUMBER}`);
  });
}

updateWhatsAppLinks();
syncPhoneLinks();
handleLeadForm();
