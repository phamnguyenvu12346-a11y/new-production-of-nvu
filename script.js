document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const scheduleMap = {
    "UI/UX Design cho người mới": {
      title: "UI/UX Design cho người mới",
      summary: [
        "⚡ 5 buổi học online",
        "📘 3 buổi thực hành",
        "🧠 2 buổi phản hồi mentor"
      ],
      timetable: [
        { day: "Thứ 2", lesson: "Wireframe", time: "08:00 - 10:00" },
        { day: "Thứ 3", lesson: "Figma cơ bản", time: "09:00 - 11:00" },
        { day: "Thứ 4", lesson: "UX Research", time: "13:30 - 15:30" },
        { day: "Thứ 5", lesson: "Prototype", time: "14:00 - 16:00" },
        { day: "Thứ 6", lesson: "Review dự án", time: "10:00 - 11:30" }
      ],
      progress: 72,
      nextLesson: "Wireframe",
      nextTime: "Thứ 2 · 08:00 - 10:00"
    },
    "Frontend Development": {
      title: "Frontend Development",
      summary: [
        "⚡ 6 buổi học online",
        "📘 4 buổi coding lab",
        "🧠 2 buổi mentor review"
      ],
      timetable: [
        { day: "Thứ 2", lesson: "HTML & CSS", time: "08:00 - 10:00" },
        { day: "Thứ 3", lesson: "JavaScript", time: "09:00 - 11:00" },
        { day: "Thứ 4", lesson: "DOM & Events", time: "13:30 - 15:30" },
        { day: "Thứ 5", lesson: "Mini Project", time: "14:00 - 16:00" },
        { day: "Thứ 6", lesson: "Code review", time: "10:00 - 11:30" }
      ],
      progress: 68,
      nextLesson: "HTML & CSS",
      nextTime: "Thứ 2 · 08:00 - 10:00"
    },
    "Marketing Digital cơ bản": {
      title: "Marketing Digital cơ bản",
      summary: [
        "⚡ 4 buổi học online",
        "📘 3 buổi thực hành chiến dịch",
        "🧠 2 buổi coaching"
      ],
      timetable: [
        { day: "Thứ 2", lesson: "Branding cơ bản", time: "08:00 - 09:30" },
        { day: "Thứ 3", lesson: "Content strategy", time: "09:00 - 10:30" },
        { day: "Thứ 4", lesson: "Social media ads", time: "13:30 - 15:00" },
        { day: "Thứ 5", lesson: "Funnel marketing", time: "14:00 - 15:30" },
        { day: "Thứ 6", lesson: "Review KPI", time: "10:00 - 11:00" }
      ],
      progress: 74,
      nextLesson: "Branding cơ bản",
      nextTime: "Thứ 2 · 08:00 - 09:30"
    }
  };

  const updateSchedule = (courseName) => {
    const scheduleCourseTitle = document.getElementById("scheduleCourseTitle");
    const scheduleSummary = document.getElementById("scheduleSummary");
    const scheduleTimetable = document.getElementById("scheduleTimetable");
    const dashboardCourseName = document.getElementById("dashboardCourseName");
    const dashboardProgressValue = document.getElementById("dashboardProgressValue");
    const dashboardNextLesson = document.getElementById("dashboardNextLesson");
    const dashboardNextTime = document.getElementById("dashboardNextTime");

    if (!scheduleCourseTitle || !scheduleSummary || !scheduleTimetable) return;

    const selectedCourse = scheduleMap[courseName] || scheduleMap["Frontend Development"];

    scheduleCourseTitle.textContent = selectedCourse.title;
    scheduleSummary.innerHTML = selectedCourse.summary.map((item) => `<li><span>•</span> ${item}</li>`).join("");

    scheduleTimetable.innerHTML = selectedCourse.timetable
      .map(
        (item, index) => `
          <div class="day ${index === 0 ? "active" : ""}">
            <span>${item.day}</span>
            <strong>${item.lesson}</strong>
            <small>${item.time}</small>
          </div>
        `
      )
      .join("");

    if (dashboardCourseName) dashboardCourseName.textContent = selectedCourse.title;
    if (dashboardProgressValue) dashboardProgressValue.textContent = `${selectedCourse.progress}%`;
    if (dashboardNextLesson) dashboardNextLesson.textContent = selectedCourse.nextLesson;
    if (dashboardNextTime) dashboardNextTime.textContent = selectedCourse.nextTime;
  };

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
  const courseSelect = document.getElementById("course");
  const dashboardStudentName = document.getElementById("dashboardStudentName");

  const showMessage = (message, type) => {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
  };

  const openModal = (event) => {
    if (!modal) return;

    const courseButton = event.currentTarget;
    const selectedCourse = courseButton.dataset.course || "Frontend Development";
    if (courseSelect) {
      courseSelect.value = selectedCourse;
      updateSchedule(selectedCourse);
    }

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

  courseSelect?.addEventListener("change", (event) => {
    updateSchedule(event.target.value || "Frontend Development");
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

    const confirmPassword = formData.get("confirmPassword").trim();

    if (!student.fullName || !student.email || !student.course || student.password.length < 8) {
      showMessage("Vui lòng điền đúng thông tin và mật khẩu tối thiểu 8 ký tự.", "error");
      return;
    }

    if (student.password !== confirmPassword) {
      showMessage("Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.", "error");
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
    localStorage.setItem("edunovaCurrentStudent", JSON.stringify(student));
    if (dashboardStudentName) {
      dashboardStudentName.textContent = student.fullName;
    }
    updateSchedule(student.course);

    showMessage("Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm.", "success");
    form.reset();

    setTimeout(() => {
      closeModal();
      showMessage("", "success");
    }, 2200);
  });

  const savedCurrentStudent = JSON.parse(localStorage.getItem("edunovaCurrentStudent") || "null");
  if (savedCurrentStudent && dashboardStudentName) {
    dashboardStudentName.textContent = savedCurrentStudent.fullName;
  }

  // ============ Password Strength Indicator ============
  const passwordInput = document.getElementById("password");
  const passwordStrength = document.getElementById("passwordStrength");
  
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    
    if (strength <= 1) return "weak";
    if (strength === 2 || strength === 3) return "medium";
    return "strong";
  };

  if (passwordInput) {
    passwordInput.addEventListener("input", (e) => {
      if (passwordStrength) {
        const strength = getPasswordStrength(e.target.value);
        passwordStrength.className = `password-strength ${strength}`;
      }
    });
  }

  // ============ Toggle Password Visibility ============
  const toggleButtons = document.querySelectorAll(".toggle-password");
  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (input) {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        btn.textContent = isPassword ? "👁️‍🗨️" : "👁️";
      }
    });
  });

  // ============ Login Modal ============
  const loginModal = document.getElementById("loginModal");
  const loginForm = document.getElementById("loginForm");
  const loginFormMessage = document.getElementById("loginFormMessage");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const userProfile = document.getElementById("userProfile");
  const userName = document.getElementById("userName");
  const logoutBtn = document.getElementById("logoutBtn");
  
  const openLoginModal = () => {
    if (!loginModal) return;
    loginModal.classList.remove("hidden");
    loginModal.setAttribute("aria-hidden", "false");
  };

  const closeLoginModal = () => {
    if (!loginModal) return;
    loginModal.classList.add("hidden");
    loginModal.setAttribute("aria-hidden", "true");
  };

  // ============ Form Switching ============
  const switchToLogin = document.getElementById("switchToLogin");
  const switchToSignup = document.getElementById("switchToSignup");
  
  if (switchToLogin) {
    switchToLogin.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal();
      setTimeout(openLoginModal, 300);
    });
  }

  if (switchToSignup) {
    switchToSignup.addEventListener("click", (e) => {
      e.preventDefault();
      closeLoginModal();
      setTimeout(() => openModal({ currentTarget: { dataset: { course: "" } } }), 300);
    });
  }

  // ============ Login Form Handler ============
  const showLoginMessage = (message, type) => {
    if (loginFormMessage) {
      loginFormMessage.textContent = message;
      loginFormMessage.className = `form-message ${type}`;
    }
  };

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const loginEmail = document.getElementById("loginEmail").value.trim();
      const loginPassword = document.getElementById("loginPassword").value.trim();
      
      if (!loginEmail || !loginPassword) {
        showLoginMessage("Vui lòng điền đầy đủ email và mật khẩu.", "error");
        return;
      }
      
      const students = JSON.parse(localStorage.getItem("edunovaStudents") || "[]");
      const student = students.find(
        (s) => s.email.toLowerCase() === loginEmail.toLowerCase() && s.password === loginPassword
      );
      
      if (!student) {
        showLoginMessage("Email hoặc mật khẩu không chính xác.", "error");
        return;
      }
      
      localStorage.setItem("edunovaCurrentStudent", JSON.stringify(student));
      if (dashboardStudentName) {
        dashboardStudentName.textContent = student.fullName;
      }
      updateSchedule(student.course);
      
      showLoginMessage("Đăng nhập thành công!", "success");
      loginForm.reset();
      
      setTimeout(() => {
        closeLoginModal();
        updateAuthUI();
        showLoginMessage("", "success");
      }, 1500);
    });
  }

  // ============ Update Auth UI ============
  const updateAuthUI = () => {
    const currentStudent = JSON.parse(localStorage.getItem("edunovaCurrentStudent") || "null");
    
    if (currentStudent) {
      if (signupBtn) signupBtn.style.display = "none";
      if (loginBtn) loginBtn.style.display = "none";
      if (userProfile) userProfile.style.display = "flex";
      if (userName) userName.textContent = currentStudent.fullName;
    } else {
      if (signupBtn) signupBtn.style.display = "block";
      if (loginBtn) loginBtn.style.display = "block";
      if (userProfile) userProfile.style.display = "none";
    }
  };

  // ============ Logout Handler ============
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        localStorage.removeItem("edunovaCurrentStudent");
        if (dashboardStudentName) {
          dashboardStudentName.textContent = "Học viên EduNova";
        }
        updateAuthUI();
        updateSchedule("UI/UX Design cho người mới");
      }
    });
  }

  // ============ Login Button Click ============
  if (loginBtn) {
    loginBtn.addEventListener("click", openLoginModal);
  }

  // ============ Login Modal Close Handlers ============
  const loginCloseButtons = document.querySelectorAll("[data-close-login]");
  loginCloseButtons.forEach((btn) => {
    btn.addEventListener("click", closeLoginModal);
  });

  loginModal?.addEventListener("click", (event) => {
    if (event.target === loginModal) {
      closeLoginModal();
    }
  });

  // ============ Initial Auth UI Setup ============
  updateAuthUI();

  updateSchedule("UI/UX Design cho người mới");
});
