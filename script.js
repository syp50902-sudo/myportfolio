const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name");

  formStatus.textContent = `${name}님, 메시지를 확인했습니다. 곧 답변드릴게요!`;
  contactForm.reset();
});

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("is-selected");
  });
});
