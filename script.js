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

  updateSchedule("UI/UX Design cho người mới");
});
