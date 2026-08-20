document.addEventListener("DOMContentLoaded", () => {
  // ============ Year in Footer ============
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // ============ Default Data Setup ============
  const DEFAULT_COURSES = [
    {
      id: "course-1",
      title: "UI/UX Design cho người mới",
      category: "design",
      price: "1.200.000đ",
      rating: "4.9 ★",
      desc: "Học cách tạo giao diện đẹp, dễ dùng và tối ưu trải nghiệm người dùng.",
      bgClass: "design-bg",
      author: "Giảng viên EduNova"
    },
    {
      id: "course-2",
      title: "Frontend Development",
      category: "coding",
      price: "1.600.000đ",
      rating: "4.8 ★",
      desc: "Thiết kế website, hiểu HTML, CSS, JavaScript và xây dựng giao diện thật.",
      bgClass: "coding-bg",
      author: "Giảng viên EduNova"
    },
    {
      id: "course-3",
      title: "Marketing Digital cơ bản",
      category: "business",
      price: "1.100.000đ",
      rating: "4.7 ★",
      desc: "Hiểu cách xây dựng thương hiệu, funnel và tăng trưởng mạnh mẽ trên mạng.",
      bgClass: "business-bg",
      author: "Giảng viên EduNova"
    }
  ];

  const DEFAULT_ASSIGNMENTS = [
    {
      id: "assign-1",
      title: "Thực hành Thiết kế Wireframe Landing Page",
      course: "UI/UX Design cho người mới",
      deadline: "2026-09-15",
      desc: "Sử dụng Figma vẽ wireframe tối thiểu 3 màn hình chính: Hero section, Khóa học và Form đăng ký. Đảm bảo phân cấp thị giác rõ ràng.",
      link: "https://www.figma.com",
      teacherName: "Thầy Hùng (EduNova)"
    },
    {
      id: "assign-2",
      title: "Xây dựng Giao diện Todo List bằng JS",
      course: "Frontend Development",
      deadline: "2026-09-20",
      desc: "Viết ứng dụng danh sách công việc với các tính năng: Thêm, Xóa, Đánh dấu hoàn thành và Lưu trữ dữ liệu vào LocalStorage.",
      link: "https://github.com",
      teacherName: "Cô Lan (EduNova)"
    }
  ];

  // Helper functions for safe LocalStorage access
  const safeGetJSON = (key, defaultValue) => {
    try {
      const data = localStorage.getItem(key);
      if (!data) return defaultValue;
      return JSON.parse(data);
    } catch (e) {
      console.warn(`Lỗi đọc localStorage key: ${key}`, e);
      return defaultValue;
    }
  };

  const safeSetJSON = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Lỗi ghi localStorage key: ${key}`, e);
    }
  };

  const getStoredCourses = () => {
    const courses = safeGetJSON("edunovaCourses", null);
    if (!courses || !Array.isArray(courses) || courses.length === 0) {
      safeSetJSON("edunovaCourses", DEFAULT_COURSES);
      return DEFAULT_COURSES;
    }
    return courses;
  };

  const saveStoredCourses = (courses) => {
    safeSetJSON("edunovaCourses", courses);
  };

  const getStoredAssignments = () => {
    const assignments = safeGetJSON("edunovaAssignments", null);
    if (!assignments || !Array.isArray(assignments) || assignments.length === 0) {
      safeSetJSON("edunovaAssignments", DEFAULT_ASSIGNMENTS);
      return DEFAULT_ASSIGNMENTS;
    }
    return assignments;
  };

  const saveStoredAssignments = (assignments) => {
    safeSetJSON("edunovaAssignments", assignments);
  };

  const getStoredSubmissions = () => {
    const data = safeGetJSON("edunovaSubmissions", []);
    return Array.isArray(data) ? data : [];
  };

  const saveStoredSubmissions = (submissions) => {
    safeSetJSON("edunovaSubmissions", submissions);
  };

  const getStoredUsers = () => {
    const data = safeGetJSON("edunovaStudents", []);
    return Array.isArray(data) ? data : [];
  };

  const saveStoredUsers = (users) => {
    safeSetJSON("edunovaStudents", users);
  };

  const getCurrentUser = () => {
    return safeGetJSON("edunovaCurrentStudent", null);
  };

  const setCurrentUser = (user) => {
    if (user) {
      safeSetJSON("edunovaCurrentStudent", user);
    } else {
      localStorage.removeItem("edunovaCurrentStudent");
    }
  };

  // ============ Schedule Map ============
  const scheduleMap = {
    "UI/UX Design cho người mới": {
      title: "UI/UX Design cho người mới",
      summary: [
        "⚡ 5 buổi học online",
        "📘 3 buổi thực hành",
        "🧠 2 buổi phản hồi mentor"
      ],
      timetable: [
        { day: "Thứ 2", lesson: "Wireframe & Phân tích", time: "08:00 - 10:00" },
        { day: "Thứ 3", lesson: "Figma cơ bản & UI Components", time: "09:00 - 11:00" },
        { day: "Thứ 4", lesson: "UX Research & User Flow", time: "13:30 - 15:30" },
        { day: "Thứ 5", lesson: "Prototype & Micro-interactions", time: "14:00 - 16:00" },
        { day: "Thứ 6", lesson: "Review & Trình bày dự án", time: "10:00 - 11:30" }
      ],
      progress: 72,
      nextLesson: "Wireframe & Phân tích",
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
        { day: "Thứ 2", lesson: "HTML5 Semantic & CSS Grid", time: "08:00 - 10:00" },
        { day: "Thứ 3", lesson: "JavaScript ES6+ & DOM Events", time: "09:00 - 11:00" },
        { day: "Thứ 4", lesson: "Responsive Web Design", time: "13:30 - 15:30" },
        { day: "Thứ 5", lesson: "Mini Project Interactive UI", time: "14:00 - 16:00" },
        { day: "Thứ 6", lesson: "Code review & Best Practices", time: "10:00 - 11:30" }
      ],
      progress: 68,
      nextLesson: "HTML5 Semantic & CSS Grid",
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
        { day: "Thứ 2", lesson: "Branding cơ bản & Target Audience", time: "08:00 - 09:30" },
        { day: "Thứ 3", lesson: "Content strategy & Social Media", time: "09:00 - 10:30" },
        { day: "Thứ 4", lesson: "Social media ads & Tracking", time: "13:30 - 15:00" },
        { day: "Thứ 5", lesson: "Funnel marketing", time: "14:00 - 15:30" },
        { day: "Thứ 6", lesson: "Review KPI & Tối ưu", time: "10:00 - 11:00" }
      ],
      progress: 74,
      nextLesson: "Branding cơ bản & Target Audience",
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

    let selectedCourse = scheduleMap[courseName];
    if (!selectedCourse) {
      selectedCourse = {
        title: courseName || "Khóa học EduNova",
        summary: ["⚡ 5 buổi học chuyên sâu", "📘 3 buổi thực hành dự án", "🧠 2 buổi mentor 1-on-1"],
        timetable: [
          { day: "Thứ 2", lesson: "Nhập môn & Nền tảng", time: "08:00 - 10:00" },
          { day: "Thứ 3", lesson: "Kỹ năng chuyên môn", time: "09:00 - 11:00" },
          { day: "Thứ 4", lesson: "Thực hành bài tập", time: "13:30 - 15:30" },
          { day: "Thứ 5", lesson: "Mini Project", time: "14:00 - 16:00" },
          { day: "Thứ 6", lesson: "Đánh giá & Tổng kết", time: "10:00 - 11:30" }
        ],
        progress: 50,
        nextLesson: "Nhập môn & Nền tảng",
        nextTime: "Thứ 2 · 08:00 - 10:00"
      };
    }

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

  // ============ Render Courses Dynamically ============
  let currentCategoryFilter = "all";

  const renderCourses = () => {
    const courseGrid = document.getElementById("courseGrid");
    if (!courseGrid) return;

    const courses = getStoredCourses();
    const filteredCourses = courses.filter((course) => {
      if (currentCategoryFilter === "all") return true;
      return course.category === currentCategoryFilter;
    });

    if (filteredCourses.length === 0) {
      courseGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <span>🔍</span>
          <p>Chưa có khóa học nào trong danh mục này.</p>
        </div>
      `;
      return;
    }

    courseGrid.innerHTML = filteredCourses
      .map((course) => {
        const categoryLabel =
          course.category === "design"
            ? "Design"
            : course.category === "coding"
            ? "Coding"
            : course.category === "business"
            ? "Business"
            : "Chuyên sâu";

        const bgClass = course.bgClass || `${course.category || "coding"}-bg`;

        return `
          <article class="course-card" data-category="${course.category}">
            <div class="course-image ${bgClass}"></div>
            <div class="course-body">
              <div class="course-meta">
                <span>${categoryLabel}</span>
                <span>${course.rating || "4.9 ★"}</span>
              </div>
              <h3>${course.title}</h3>
              <p>${course.desc}</p>
              <div class="course-footer">
                <strong>${course.price}</strong>
                <a href="#contact" data-open-signup data-course="${course.title}">Đăng ký</a>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    // Reattach signup click events
    courseGrid.querySelectorAll("[data-open-signup]").forEach((button) => {
      button.addEventListener("click", openSignupModal);
    });
  };

  // Populate Course Dropdowns (for signup & assign homework)
  const populateCourseDropdowns = () => {
    const courses = getStoredCourses();
    const courseSelect = document.getElementById("course");
    const assignmentCourseSelect = document.getElementById("assignmentCourse");

    const optionsHtml = [
      '<option value="">-- Chọn khóa học --</option>',
      ...courses.map((c) => `<option value="${c.title}">${c.title}</option>`)
    ].join("");

    if (courseSelect) {
      const currentVal = courseSelect.value;
      courseSelect.innerHTML = optionsHtml;
      if (currentVal) courseSelect.value = currentVal;
    }

    if (assignmentCourseSelect) {
      const currentVal = assignmentCourseSelect.value;
      assignmentCourseSelect.innerHTML = optionsHtml;
      if (currentVal) assignmentCourseSelect.value = currentVal;
    }
  };

  // Filter Tabs Event
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      currentCategoryFilter = tab.dataset.filter || "all";
      renderCourses();
    });
  });

  // ============ Modals Management Helpers ============
  const openModalElement = (modal) => {
    if (!modal) return;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModalElement = (modal) => {
    if (!modal) return;
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  };

  // ============ Signup Modal ============
  const signupModal = document.getElementById("signupModal");
  const signupForm = document.getElementById("signupForm");
  const formMessage = document.getElementById("formMessage");
  const courseSelect = document.getElementById("course");
  const signupBtns = document.querySelectorAll("[data-open-signup]");
  const closeSignupBtns = document.querySelectorAll("[data-close-signup]");

  const showMessage = (msg, type) => {
    if (formMessage) {
      formMessage.textContent = msg;
      formMessage.className = `form-message ${type}`;
    }
  };

  const openSignupModal = (event) => {
    if (!signupModal) return;
    const trigger = event?.currentTarget;
    const selectedCourse = trigger?.dataset?.course;
    if (selectedCourse && courseSelect) {
      courseSelect.value = selectedCourse;
      updateSchedule(selectedCourse);
    }
    if (formMessage) {
      formMessage.textContent = "";
      formMessage.className = "form-message";
    }
    openModalElement(signupModal);
  };

  signupBtns.forEach((btn) => btn.addEventListener("click", openSignupModal));
  closeSignupBtns.forEach((btn) => btn.addEventListener("click", () => closeModalElement(signupModal)));

  signupModal?.addEventListener("click", (e) => {
    if (e.target === signupModal) closeModalElement(signupModal);
  });

  // Radio button change in Signup Modal (adjust labels)
  const accountTypeRadios = document.querySelectorAll('input[name="accountType"]');
  const signupCourseLabel = document.getElementById("signupCourseLabel");
  accountTypeRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (signupCourseLabel) {
        signupCourseLabel.textContent =
          e.target.value === "teacher" ? "Khóa học / Chuyên môn giảng dạy" : "Khóa học quan tâm";
      }
    });
  });

  // Clear message on input
  signupForm?.querySelectorAll("input, select")?.forEach((el) => {
    el.addEventListener("input", () => {
      if (formMessage && formMessage.textContent) {
        formMessage.textContent = "";
        formMessage.className = "form-message";
      }
    });
  });

  // Signup Submit Handler
  signupForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const accountTypeChecked = document.querySelector('input[name="accountType"]:checked');
    const courseInput = document.getElementById("course");

    const fullName = (fullNameInput?.value || "").trim();
    const email = (emailInput?.value || "").trim();
    const password = (passwordInput?.value || "").trim();
    const confirmPassword = (confirmPasswordInput?.value || "").trim();
    const accountType = accountTypeChecked ? accountTypeChecked.value : "student";
    const course = (courseInput?.value || "").trim() || "UI/UX Design cho người mới";

    // 1. Validation
    if (!fullName) {
      showMessage("Vui lòng nhập họ và tên của bạn.", "error");
      fullNameInput?.focus();
      return;
    }

    if (!email || !email.includes("@")) {
      showMessage("Vui lòng nhập địa chỉ email hợp lệ.", "error");
      emailInput?.focus();
      return;
    }

    if (!password || password.length < 6) {
      showMessage("Mật khẩu cần tối thiểu 6 ký tự.", "error");
      passwordInput?.focus();
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.", "error");
      confirmPasswordInput?.focus();
      return;
    }

    // 2. Check duplicate email
    const existingUsers = getStoredUsers();
    const isDuplicate = existingUsers.some(
      (u) => u && typeof u.email === "string" && u.email.trim().toLowerCase() === email.toLowerCase()
    );

    if (isDuplicate) {
      showMessage("Email này đã được đăng ký. Vui lòng dùng email khác hoặc Đăng nhập.", "error");
      return;
    }

    // 3. Create and Save User
    const newUser = {
      id: `user-${Date.now()}`,
      fullName,
      email,
      accountType, // "student" or "teacher"
      course,
      password,
      registeredAt: new Date().toISOString()
    };

    existingUsers.push(newUser);
    saveStoredUsers(existingUsers);
    setCurrentUser(newUser);

    // 4. Success UI
    showMessage("🎉 Đăng ký thành công! Đang tự động đăng nhập...", "success");
    signupForm.reset();

    updateAuthUI();
    if (newUser.course) {
      updateSchedule(newUser.course);
    }

    setTimeout(() => {
      closeModalElement(signupModal);
      showMessage("", "success");
    }, 1000);
  });

  // ============ Login Modal ============
  const loginModal = document.getElementById("loginModal");
  const loginForm = document.getElementById("loginForm");
  const loginFormMessage = document.getElementById("loginFormMessage");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const userProfile = document.getElementById("userProfile");
  const userName = document.getElementById("userName");
  const userRoleBadge = document.getElementById("userRoleBadge");
  const logoutBtn = document.getElementById("logoutBtn");
  const closeLoginBtns = document.querySelectorAll("[data-close-login]");

  const showLoginMessage = (message, type) => {
    if (loginFormMessage) {
      loginFormMessage.textContent = message;
      loginFormMessage.className = `form-message ${type}`;
    }
  };

  const openLoginModal = () => {
    if (loginFormMessage) {
      loginFormMessage.textContent = "";
      loginFormMessage.className = "form-message";
    }
    openModalElement(loginModal);
  };
  const closeLoginModal = () => closeModalElement(loginModal);

  if (loginBtn) loginBtn.addEventListener("click", openLoginModal);
  closeLoginBtns.forEach((btn) => btn.addEventListener("click", closeLoginModal));
  loginModal?.addEventListener("click", (e) => {
    if (e.target === loginModal) closeLoginModal();
  });

  // Switch form links
  const switchToLogin = document.getElementById("switchToLogin");
  const switchToSignup = document.getElementById("switchToSignup");
  if (switchToLogin) {
    switchToLogin.addEventListener("click", (e) => {
      e.preventDefault();
      closeModalElement(signupModal);
      setTimeout(openLoginModal, 250);
    });
  }
  if (switchToSignup) {
    switchToSignup.addEventListener("click", (e) => {
      e.preventDefault();
      closeLoginModal();
      setTimeout(() => openSignupModal(), 250);
    });
  }

  // Clear login message on input
  loginForm?.querySelectorAll("input")?.forEach((el) => {
    el.addEventListener("input", () => {
      if (loginFormMessage && loginFormMessage.textContent) {
        loginFormMessage.textContent = "";
        loginFormMessage.className = "form-message";
      }
    });
  });

  // Login Form Submit
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const loginEmail = (document.getElementById("loginEmail")?.value || "").trim();
      const loginPassword = (document.getElementById("loginPassword")?.value || "").trim();

      if (!loginEmail || !loginPassword) {
        showLoginMessage("Vui lòng điền đầy đủ email và mật khẩu.", "error");
        return;
      }

      const users = getStoredUsers();
      const matchedUser = users.find(
        (u) =>
          u &&
          typeof u.email === "string" &&
          u.email.toLowerCase() === loginEmail.toLowerCase() &&
          u.password === loginPassword
      );

      if (!matchedUser) {
        showLoginMessage("Email hoặc mật khẩu không chính xác.", "error");
        return;
      }

      setCurrentUser(matchedUser);
      showLoginMessage("🎉 Đăng nhập thành công!", "success");
      loginForm.reset();

      updateAuthUI();
      if (matchedUser.course) {
        updateSchedule(matchedUser.course);
      }

      setTimeout(() => {
        closeLoginModal();
        showLoginMessage("", "success");
      }, 800);
    });
  }

  // ============ Password Strength & Visibility ============
  const passwordInputEl = document.getElementById("password");
  const passwordStrength = document.getElementById("passwordStrength");

  const getPasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[!@#$%^&*]/.test(pwd)) strength++;
    if (strength <= 1) return "weak";
    if (strength === 2 || strength === 3) return "medium";
    return "strong";
  };

  if (passwordInputEl) {
    passwordInputEl.addEventListener("input", (e) => {
      if (passwordStrength) {
        const val = e.target.value;
        if (!val) {
          passwordStrength.className = "password-strength";
          return;
        }
        const strength = getPasswordStrength(val);
        passwordStrength.className = `password-strength ${strength}`;
      }
    });
  }

  const toggleButtons = document.querySelectorAll(".toggle-password");
  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (input) {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        btn.textContent = isPassword ? "🚫" : "👁";
      }
    });
  });

  // ============ Teacher Dashboard Logic ============
  const teacherDashboard = document.getElementById("teacherDashboard");
  const studentDashboard = document.getElementById("studentDashboard");
  const navTeacherLink = document.getElementById("navTeacherLink");
  const navStudentLink = document.getElementById("navStudentLink");

  // Create Course Modal Elements
  const createCourseModal = document.getElementById("createCourseModal");
  const openCreateCourseBtn = document.getElementById("openCreateCourseBtn");
  const quickCreateCourseBtn = document.getElementById("quickCreateCourseBtn");
  const closeCreateCourseBtns = document.querySelectorAll("[data-close-create-course]");
  const createCourseForm = document.getElementById("createCourseForm");
  const createCourseMessage = document.getElementById("createCourseMessage");

  const openCreateCourse = () => {
    if (createCourseMessage) {
      createCourseMessage.textContent = "";
      createCourseMessage.className = "form-message";
    }
    openModalElement(createCourseModal);
  };
  const closeCreateCourse = () => closeModalElement(createCourseModal);

  if (openCreateCourseBtn) openCreateCourseBtn.addEventListener("click", openCreateCourse);
  if (quickCreateCourseBtn) quickCreateCourseBtn.addEventListener("click", openCreateCourse);
  closeCreateCourseBtns.forEach((btn) => btn.addEventListener("click", closeCreateCourse));
  createCourseModal?.addEventListener("click", (e) => {
    if (e.target === createCourseModal) closeCreateCourse();
  });

  // Handle Create Course Form Submit
  if (createCourseForm) {
    createCourseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const currentUser = getCurrentUser() || {};
      const title = (document.getElementById("newCourseTitle")?.value || "").trim();
      const category = document.getElementById("newCourseCategory")?.value || "coding";
      const price = (document.getElementById("newCoursePrice")?.value || "").trim();
      const desc = (document.getElementById("newCourseDesc")?.value || "").trim();

      if (!title || !price || !desc) {
        if (createCourseMessage) {
          createCourseMessage.textContent = "Vui lòng nhập đầy đủ thông tin khóa học.";
          createCourseMessage.className = "form-message error";
        }
        return;
      }

      const courses = getStoredCourses();
      const newCourse = {
        id: `course-${Date.now()}`,
        title,
        category,
        price,
        rating: "5.0 ★",
        desc,
        bgClass: `${category}-bg`,
        author: currentUser.fullName || "Giảng viên EduNova",
        createdByEmail: currentUser.email || ""
      };

      courses.unshift(newCourse);
      saveStoredCourses(courses);

      if (createCourseMessage) {
        createCourseMessage.textContent = "🎉 Tạo khóa học thành công!";
        createCourseMessage.className = "form-message success";
      }

      createCourseForm.reset();
      renderCourses();
      populateCourseDropdowns();
      renderTeacherDashboard();

      setTimeout(() => {
        closeCreateCourse();
        if (createCourseMessage) createCourseMessage.textContent = "";
      }, 1000);
    });
  }

  // Create Assignment Modal Elements
  const createAssignmentModal = document.getElementById("createAssignmentModal");
  const openCreateAssignmentBtn = document.getElementById("openCreateAssignmentBtn");
  const quickAssignBtn = document.getElementById("quickAssignBtn");
  const closeCreateAssignmentBtns = document.querySelectorAll("[data-close-create-assignment]");
  const createAssignmentForm = document.getElementById("createAssignmentForm");
  const createAssignmentMessage = document.getElementById("createAssignmentMessage");

  const openCreateAssignment = () => {
    populateCourseDropdowns();
    if (createAssignmentMessage) {
      createAssignmentMessage.textContent = "";
      createAssignmentMessage.className = "form-message";
    }
    openModalElement(createAssignmentModal);
  };
  const closeCreateAssignment = () => closeModalElement(createAssignmentModal);

  if (openCreateAssignmentBtn) openCreateAssignmentBtn.addEventListener("click", openCreateAssignment);
  if (quickAssignBtn) quickAssignBtn.addEventListener("click", openCreateAssignment);
  closeCreateAssignmentBtns.forEach((btn) => btn.addEventListener("click", closeCreateAssignment));
  createAssignmentModal?.addEventListener("click", (e) => {
    if (e.target === createAssignmentModal) closeCreateAssignment();
  });

  // Handle Create Assignment Form Submit
  if (createAssignmentForm) {
    createAssignmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const currentUser = getCurrentUser() || {};
      const title = (document.getElementById("assignmentTitle")?.value || "").trim();
      const course = document.getElementById("assignmentCourse")?.value;
      const deadline = document.getElementById("assignmentDeadline")?.value;
      const desc = (document.getElementById("assignmentDesc")?.value || "").trim();
      const link = (document.getElementById("assignmentLink")?.value || "").trim();

      if (!title || !course || !deadline || !desc) {
        if (createAssignmentMessage) {
          createAssignmentMessage.textContent = "Vui lòng điền đủ tiêu đề, khóa học, hạn nộp và yêu cầu.";
          createAssignmentMessage.className = "form-message error";
        }
        return;
      }

      const assignments = getStoredAssignments();
      const newAssignment = {
        id: `assign-${Date.now()}`,
        title,
        course,
        deadline,
        desc,
        link,
        teacherName: currentUser.fullName || "Giảng viên EduNova",
        createdByEmail: currentUser.email || "",
        createdAt: new Date().toISOString()
      };

      assignments.unshift(newAssignment);
      saveStoredAssignments(assignments);

      if (createAssignmentMessage) {
        createAssignmentMessage.textContent = "🎉 Giao bài tập thành công!";
        createAssignmentMessage.className = "form-message success";
      }

      createAssignmentForm.reset();
      renderTeacherDashboard();
      renderStudentAssignments();

      setTimeout(() => {
        closeCreateAssignment();
        if (createAssignmentMessage) createAssignmentMessage.textContent = "";
      }, 1000);
    });
  }

  // ============ Render Teacher Dashboard ============
  const renderTeacherDashboard = () => {
    const courses = getStoredCourses();
    const assignments = getStoredAssignments();
    const submissions = getStoredSubmissions();

    // Stats
    const teacherCoursesCount = document.getElementById("teacherCoursesCount");
    const teacherAssignmentsCount = document.getElementById("teacherAssignmentsCount");
    const teacherSubmissionsCount = document.getElementById("teacherSubmissionsCount");

    if (teacherCoursesCount) teacherCoursesCount.textContent = courses.length;
    if (teacherAssignmentsCount) teacherAssignmentsCount.textContent = assignments.length;
    if (teacherSubmissionsCount) teacherSubmissionsCount.textContent = submissions.length;

    // Render Assignment List for Teacher
    const teacherAssignmentList = document.getElementById("teacherAssignmentList");
    if (teacherAssignmentList) {
      if (assignments.length === 0) {
        teacherAssignmentList.innerHTML = `
          <div class="empty-state">
            <span>📝</span>
            <p>Chưa có bài tập nào được giao. Hãy bấm "Giao bài" để tạo bài tập đầu tiên.</p>
          </div>
        `;
      } else {
        teacherAssignmentList.innerHTML = assignments
          .map((assign) => {
            const assignSubmissions = submissions.filter((s) => s.assignmentId === assign.id);
            const isExpired = new Date(assign.deadline) < new Date(new Date().toDateString());

            return `
              <div class="assignment-item" data-id="${assign.id}">
                <div class="assignment-top">
                  <h4 class="assignment-title">${assign.title}</h4>
                  <span class="badge-deadline ${isExpired ? "" : "active"}">
                    ${isExpired ? "⏰ Hết hạn" : "⏳ Hạn: " + assign.deadline}
                  </span>
                </div>
                <div class="assignment-meta">
                  <span class="badge-course">📚 ${assign.course}</span>
                  ${assign.link ? `<a href="${assign.link}" target="_blank" rel="noopener" style="color: var(--primary); font-size: 0.82rem;">🔗 Tài liệu</a>` : ""}
                </div>
                <p class="assignment-desc-text">${assign.desc}</p>
                <div class="assignment-footer-actions">
                  <span class="submissions-count-badge">📥 ${assignSubmissions.length} bài đã nộp</span>
                  <div class="action-btn-group">
                    <button class="btn-icon-text view-submissions-btn" data-id="${assign.id}">👁 Xem bài nộp (${assignSubmissions.length})</button>
                    <button class="btn-icon-text danger delete-assignment-btn" data-id="${assign.id}">🗑 Xóa</button>
                  </div>
                </div>
              </div>
            `;
          })
          .join("");

        // Attach delete assignment events
        teacherAssignmentList.querySelectorAll(".delete-assignment-btn").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            const assignId = e.currentTarget.dataset.id;
            if (confirm("Bạn có chắc chắn muốn xóa bài tập này không?")) {
              const currentAssignments = getStoredAssignments().filter((a) => a.id !== assignId);
              saveStoredAssignments(currentAssignments);
              renderTeacherDashboard();
              renderStudentAssignments();
            }
          });
        });

        // Attach view submissions events
        teacherAssignmentList.querySelectorAll(".view-submissions-btn").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            const assignId = e.currentTarget.dataset.id;
            openSubmissionsModal(assignId);
          });
        });
      }
    }

    // Render Teacher Courses List
    const teacherCourseList = document.getElementById("teacherCourseList");
    if (teacherCourseList) {
      teacherCourseList.innerHTML = courses
        .map((course) => `
          <div class="teacher-course-item">
            <div class="teacher-course-info">
              <strong>${course.title}</strong>
              <span>${course.category} · ${course.price} · ${course.rating || "5.0 ★"}</span>
            </div>
            <div>
              <button class="btn-icon-text danger delete-course-btn" data-id="${course.id}">🗑</button>
            </div>
          </div>
        `)
        .join("");

      teacherCourseList.querySelectorAll(".delete-course-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const courseId = e.currentTarget.dataset.id;
          if (confirm("Bạn có chắc chắn muốn gỡ khóa học này?")) {
            const currentCourses = getStoredCourses().filter((c) => c.id !== courseId);
            saveStoredCourses(currentCourses);
            renderCourses();
            populateCourseDropdowns();
            renderTeacherDashboard();
          }
        });
      });
    }
  };

  // ============ View Submissions Modal Logic ============
  const viewSubmissionsModal = document.getElementById("viewSubmissionsModal");
  const closeViewSubmissionsBtns = document.querySelectorAll("[data-close-view-submissions]");
  const viewSubmissionsSubTitle = document.getElementById("viewSubmissionsSubTitle");
  const submissionsListContainer = document.getElementById("submissionsListContainer");

  const openSubmissionsModal = (assignmentId) => {
    const assignments = getStoredAssignments();
    const assignment = assignments.find((a) => a.id === assignmentId);
    const submissions = getStoredSubmissions().filter((s) => s.assignmentId === assignmentId);

    if (viewSubmissionsSubTitle && assignment) {
      viewSubmissionsSubTitle.textContent = `Khóa học: ${assignment.course} | Bài tập: ${assignment.title}`;
    }

    if (submissionsListContainer) {
      if (submissions.length === 0) {
        submissionsListContainer.innerHTML = `
          <div class="empty-state">
            <span>📥</span>
            <p>Chưa có học viên nào nộp bài cho bài tập này.</p>
          </div>
        `;
      } else {
        submissionsListContainer.innerHTML = submissions
          .map(
            (sub) => `
            <div class="submission-card">
              <div class="submission-card-header">
                <strong>👨‍🎓 ${sub.studentName} (${sub.studentEmail})</strong>
                <time>🕒 ${sub.submittedAt}</time>
              </div>
              <div class="submission-link-box">
                <span>Link bài làm:</span>
                <a href="${sub.url}" target="_blank" rel="noopener">🔗 ${sub.url}</a>
              </div>
              ${sub.note ? `<div class="submission-notes"><strong>Ghi chú:</strong> ${sub.note}</div>` : ""}
            </div>
          `
          )
          .join("");
      }
    }

    openModalElement(viewSubmissionsModal);
  };

  closeViewSubmissionsBtns.forEach((btn) => {
    btn.addEventListener("click", () => closeModalElement(viewSubmissionsModal));
  });
  viewSubmissionsModal?.addEventListener("click", (e) => {
    if (e.target === viewSubmissionsModal) closeModalElement(viewSubmissionsModal);
  });

  // ============ Student Assignment & Submission Logic ============
  const submitAssignmentModal = document.getElementById("submitAssignmentModal");
  const closeSubmitAssignmentBtns = document.querySelectorAll("[data-close-submit-assignment]");
  const submitAssignmentForm = document.getElementById("submitAssignmentForm");
  const submitAssignmentTitle = document.getElementById("submitAssignmentTitle");
  const submitAssignmentCourseName = document.getElementById("submitAssignmentCourseName");
  const submitAssignmentInstruction = document.getElementById("submitAssignmentInstruction");
  const submitAssignmentId = document.getElementById("submitAssignmentId");
  const submitAssignmentMessage = document.getElementById("submitAssignmentMessage");

  const openSubmitAssignment = (assignmentId) => {
    const assignments = getStoredAssignments();
    const assignment = assignments.find((a) => a.id === assignmentId);
    if (!assignment) return;

    if (submitAssignmentId) submitAssignmentId.value = assignment.id;
    if (submitAssignmentTitle) submitAssignmentTitle.textContent = `Nộp bài: ${assignment.title}`;
    if (submitAssignmentCourseName) submitAssignmentCourseName.textContent = `Khóa học: ${assignment.course}`;
    if (submitAssignmentInstruction) {
      submitAssignmentInstruction.innerHTML = `
        <strong>Yêu cầu đề bài:</strong>
        <p style="margin: 6px 0 0;">${assignment.desc}</p>
        ${assignment.link ? `<p style="margin: 6px 0 0;"><a href="${assignment.link}" target="_blank" rel="noopener" style="color: var(--primary); font-weight: 600;">🔗 Mở tài liệu đề bài</a></p>` : ""}
      `;
    }

    if (submitAssignmentMessage) {
      submitAssignmentMessage.textContent = "";
      submitAssignmentMessage.className = "form-message";
    }

    openModalElement(submitAssignmentModal);
  };

  closeSubmitAssignmentBtns.forEach((btn) => {
    btn.addEventListener("click", () => closeModalElement(submitAssignmentModal));
  });
  submitAssignmentModal?.addEventListener("click", (e) => {
    if (e.target === submitAssignmentModal) closeModalElement(submitAssignmentModal);
  });

  // Submit Assignment Form Handler
  if (submitAssignmentForm) {
    submitAssignmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const currentUser = getCurrentUser() || {};
      const assignmentId = submitAssignmentId?.value;
      const submissionUrl = (document.getElementById("submissionUrl")?.value || "").trim();
      const submissionNote = (document.getElementById("submissionNote")?.value || "").trim();

      if (!submissionUrl) {
        if (submitAssignmentMessage) {
          submitAssignmentMessage.textContent = "Vui lòng nhập link bài làm của bạn.";
          submitAssignmentMessage.className = "form-message error";
        }
        return;
      }

      const submissions = getStoredSubmissions();
      // Remove any existing submission by this student for this assignment
      const filtered = submissions.filter(
        (s) => !(s.assignmentId === assignmentId && s.studentEmail === (currentUser.email || ""))
      );

      const newSubmission = {
        id: `sub-${Date.now()}`,
        assignmentId,
        studentName: currentUser.fullName || "Học viên EduNova",
        studentEmail: currentUser.email || "student@edunova.com",
        url: submissionUrl,
        note: submissionNote,
        submittedAt: new Date().toLocaleString("vi-VN")
      };

      filtered.unshift(newSubmission);
      saveStoredSubmissions(filtered);

      if (submitAssignmentMessage) {
        submitAssignmentMessage.textContent = "🎉 Nộp bài thành công! Giảng viên sẽ sớm nhận được.";
        submitAssignmentMessage.className = "form-message success";
      }

      submitAssignmentForm.reset();
      renderStudentAssignments();
      renderTeacherDashboard();

      setTimeout(() => {
        closeModalElement(submitAssignmentModal);
        if (submitAssignmentMessage) submitAssignmentMessage.textContent = "";
      }, 1000);
    });
  }

  // Render Student Assignments in Dashboard
  const renderStudentAssignments = () => {
    const studentAssignmentList = document.getElementById("studentAssignmentList");
    const studentPendingAssignmentsCount = document.getElementById("studentPendingAssignmentsCount");
    const currentUser = getCurrentUser() || {};
    const assignments = getStoredAssignments();
    const submissions = getStoredSubmissions();

    if (!studentAssignmentList) return;

    // Filter relevant assignments
    const userCourse = currentUser.course || "";
    let relevantAssignments = assignments;
    if (userCourse) {
      const matched = assignments.filter(
        (a) => a && a.course && a.course.toLowerCase() === userCourse.toLowerCase()
      );
      if (matched.length > 0) relevantAssignments = matched;
    }

    let pendingCount = 0;

    if (relevantAssignments.length === 0) {
      studentAssignmentList.innerHTML = `
        <div class="empty-state" style="padding: 16px;">
          <p>Hiện chưa có bài tập nào được giao.</p>
        </div>
      `;
    } else {
      studentAssignmentList.innerHTML = relevantAssignments
        .map((assign) => {
          const isSubmitted = submissions.some(
            (s) => s.assignmentId === assign.id && s.studentEmail === currentUser.email
          );

          if (!isSubmitted) pendingCount++;

          return `
            <div class="student-task-item">
              <div class="student-task-header">
                <h4>${assign.title}</h4>
                <span class="status-chip ${isSubmitted ? "submitted" : "pending"}">
                  ${isSubmitted ? "✓ Đã nộp" : "⏳ Chưa nộp"}
                </span>
              </div>
              <div class="assignment-meta" style="font-size: 0.8rem;">
                <span class="badge-course">${assign.course}</span>
                <span class="badge-deadline active">📅 Hạn: ${assign.deadline}</span>
              </div>
              <button class="btn btn-primary small-btn submit-task-btn" data-id="${assign.id}" style="margin-top: 4px; align-self: flex-start;">
                ${isSubmitted ? "Cập nhật bài nộp" : "Nộp bài ngay"}
              </button>
            </div>
          `;
        })
        .join("");

      studentAssignmentList.querySelectorAll(".submit-task-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const assignId = e.currentTarget.dataset.id;
          openSubmitAssignment(assignId);
        });
      });
    }

    if (studentPendingAssignmentsCount) {
      studentPendingAssignmentsCount.textContent = `${pendingCount < 10 ? "0" + pendingCount : pendingCount}`;
    }
  };

  // ============ Update Auth UI (Role Based) ============
  const updateAuthUI = () => {
    const currentUser = getCurrentUser();
    const dashboardStudentName = document.getElementById("dashboardStudentName");

    if (currentUser) {
      if (signupBtn) signupBtn.style.display = "none";
      if (loginBtn) loginBtn.style.display = "none";
      if (userProfile) userProfile.style.display = "flex";
      if (userName) userName.textContent = currentUser.fullName;

      const isTeacher = currentUser.accountType === "teacher";

      if (userRoleBadge) {
        userRoleBadge.style.display = "inline-flex";
        if (isTeacher) {
          userRoleBadge.textContent = "👨‍🏫 Giảng viên";
          userRoleBadge.className = "role-badge teacher";
        } else {
          userRoleBadge.textContent = "👨‍🎓 Học viên";
          userRoleBadge.className = "role-badge student";
        }
      }

      if (isTeacher) {
        if (teacherDashboard) teacherDashboard.style.display = "block";
        if (studentDashboard) studentDashboard.style.display = "none";
        if (navTeacherLink) navTeacherLink.style.display = "inline-block";
        if (navStudentLink) navStudentLink.style.display = "none";
        renderTeacherDashboard();
      } else {
        if (teacherDashboard) teacherDashboard.style.display = "none";
        if (studentDashboard) studentDashboard.style.display = "block";
        if (navTeacherLink) navTeacherLink.style.display = "none";
        if (navStudentLink) navStudentLink.style.display = "inline-block";
        if (dashboardStudentName) dashboardStudentName.textContent = currentUser.fullName;
        renderStudentAssignments();
      }
    } else {
      if (signupBtn) signupBtn.style.display = "";
      if (loginBtn) loginBtn.style.display = "";
      if (userProfile) userProfile.style.display = "none";
      if (userRoleBadge) userRoleBadge.style.display = "none";
      if (teacherDashboard) teacherDashboard.style.display = "none";
      if (studentDashboard) studentDashboard.style.display = "block";
      if (navTeacherLink) navTeacherLink.style.display = "none";
      if (navStudentLink) navStudentLink.style.display = "none";
      if (dashboardStudentName) dashboardStudentName.textContent = "Học viên EduNova";
      renderStudentAssignments();
    }
  };

  // ============ Logout Handler ============
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        setCurrentUser(null);
        updateAuthUI();
        updateSchedule("UI/UX Design cho người mới");
      }
    });
  }

  // Keyboard accessibility (Escape key to close any modal)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      [
        signupModal,
        loginModal,
        createCourseModal,
        createAssignmentModal,
        submitAssignmentModal,
        viewSubmissionsModal
      ].forEach((m) => closeModalElement(m));
    }
  });

  // ============ Initialize App ============
  renderCourses();
  populateCourseDropdowns();
  updateAuthUI();

  const savedUser = getCurrentUser();
  if (savedUser && savedUser.course) {
    updateSchedule(savedUser.course);
  } else {
    updateSchedule("UI/UX Design cho người mới");
  }
});
