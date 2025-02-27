document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("waitlist-form");
  const emailInput = document.getElementById("email");
  const errorMessage = document.getElementById("error-message");
  const submitButton = document.getElementById("submit-btn");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim();
    if (!email) {
      errorMessage.textContent = "";
    } else if (!validateEmail(email)) {
      errorMessage.textContent = "Please enter a valid email address";
    } else {
      errorMessage.textContent = "";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!email || !validateEmail(email)) {
      errorMessage.textContent = "Please enter a valid email address";
      return;
    }

    submitButton.classList.add("loading");

    try {
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        emailInput.value = "";
        errorMessage.textContent = "";
        alert("Thank you for joining the waitlist!");
      } else {
        const data = await response.json();
        throw new Error(data.error || "Submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
      errorMessage.textContent =
        "Something went wrong. Please try again later.";
    } finally {
      submitButton.classList.remove("loading");
    }
  });
});
