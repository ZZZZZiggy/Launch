document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".email-form");

  forms.forEach((form) => {
    const emailInput = form.querySelector('input[type="email"]');
    const errorMessage = form.querySelector(".error-message");
    const submitButton = form.querySelector(".submit-button");

    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    emailInput.addEventListener("input", () => {
      const email = emailInput.value.trim();
      if (!email) {
        errorMessage.textContent = "";
        errorMessage.style.display = "none";
      } else if (!validateEmail(email)) {
        errorMessage.textContent = "Please enter a valid email address";
        errorMessage.style.display = "block";
      } else {
        errorMessage.textContent = "";
        errorMessage.style.display = "none";
      }
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      // 隐藏之前的错误信息
      errorMessage.style.display = "none";

      if (!email) {
        errorMessage.textContent = "Email is required";
        errorMessage.style.display = "block";
        return;
      }

      submitButton.classList.add("loading");

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          emailInput.value = "";
          alert("Thank you for joining the waitlist!");
        } else {
          throw new Error("Submission failed");
        }
      } catch (error) {
        errorMessage.textContent =
          "Something went wrong. Please try again later.";
        errorMessage.style.display = "block";
      } finally {
        submitButton.classList.remove("loading");
      }
    });
  });
});
