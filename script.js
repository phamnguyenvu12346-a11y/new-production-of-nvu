document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const tabs = document.querySelectorAll(".tab");
  const cards = document.querySelectorAll(".course-card");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.dataset.filter;

      cards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow = filter === "all" || category === filter;
        card.classList.toggle("hidden", !shouldShow);
      });
    });
  });

  const modal = document.getElementById("signupModal");
  const openButtons = document.querySelectorAll("[data-open-signup]");
  const closeButtons = document.querySelectorAll("[data-close-signup]");
  const form = document.getElementById("signupForm");
  const formMessage = document.getElementById("formMessage");

  const showMessage = (message, type) => {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
  };

  const openModal = () => {
    if (!modal) return;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const student = {
      fullName: formData.get("fullName").trim(),
      email: formData.get("email").trim(),
      course: formData.get("course").trim(),
      password: formData.get("password").trim(),
    };

    if (!student.fullName || !student.email || !student.course || student.password.length < 6) {
      showMessage("Vui lòng điền đúng thông tin và mật khẩu tối thiểu 6 ký tự.", "error");
      return;
    }

    const existingStudents = JSON.parse(localStorage.getItem("edunovaStudents") || "[]");
    const sameEmail = existingStudents.some((item) => item.email.toLowerCase() === student.email.toLowerCase());

    if (sameEmail) {
      showMessage("Email này đã được đăng ký. Vui lòng dùng email khác.", "error");
      return;
    }

    existingStudents.push(student);
    localStorage.setItem("edunovaStudents", JSON.stringify(existingStudents));

    showMessage("Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm.", "success");
    form.reset();

    setTimeout(() => {
      closeModal();
      showMessage("", "success");
    }, 2200);
  });
});
