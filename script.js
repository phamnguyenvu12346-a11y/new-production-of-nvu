document.addEventListener("DOMContentLoaded", () => {
  // ============ Year in Footer ============
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // ============ 9 Phổ Biến: Toán, Lý, Hóa, Sinh, Văn, Anh, Sử, Địa, Tin ============
  const DEFAULT_COURSES = [
    {
      id: "course-math",
      title: "Toán học - Đại số & Hình học không gian",
      category: "natural",
      price: "499.000đ",
      rating: "4.9 ★",
      desc: "Nắm vững lý thuyết trọng tâm, phương pháp giải nhanh trắc nghiệm và tư duy logic các dạng bài thi THPT.",
      bgClass: "math-bg",
      icon: "📐",
      author: "Thầy Hùng (Chuyên Toán)"
    },
    {
      id: "course-physics",
      title: "Vật lý - Cơ học & Sóng điện từ",
      category: "natural",
      price: "450.000đ",
      rating: "4.8 ★",
      desc: "Giải thích hiện tượng thực tế, nắm chắc định luật Vật lý và thành thạo bài tập từ cơ bản đến nâng cao.",
      bgClass: "physics-bg",
      icon: "⚡",
      author: "Thầy Tuấn (Vật lý EduNova)"
    },
    {
      id: "course-chemistry",
      title: "Hóa học - Vô cơ & Hữu cơ trọng tâm",
      category: "natural",
      price: "450.000đ",
      rating: "4.9 ★",
      desc: "Phương pháp cân bằng phản ứng, sơ đồ chuyển hóa hóa học và kỹ năng giải nhanh bài tập định lượng.",
      bgClass: "chemistry-bg",
      icon: "🧪",
      author: "Cô Lan (Hóa học)"
    },
    {
      id: "course-biology",
      title: "Sinh học - Di truyền & Quần thể sinh thái",
      category: "natural",
      price: "399.000đ",
      rating: "4.8 ★",
      desc: "Hệ thống hóa quy luật di truyền Menđen, cấu trúc ADN tế bào và sinh thái học một cách dễ nhớ.",
      bgClass: "biology-bg",
      icon: "🧬",
      author: "Cô Hương (Sinh học)"
    },
    {
      id: "course-literature",
      title: "Ngữ văn - Kỹ năng Đọc hiểu & Nghị luận xã hội",
      category: "social",
      price: "420.000đ",
      rating: "4.9 ★",
      desc: "Bí quyết phân tích tác phẩm văn học sâu sắc, cách triển khai đoạn văn nghị luận 200 chữ đạt điểm cao.",
      bgClass: "literature-bg",
      icon: "📖",
      author: "Cô Mai (Ngữ văn)"
    },
    {
      id: "course-english",
      title: "Tiếng Anh - Ngữ pháp & Luyện thi THPT / IELTS",
      category: "tech_lang",
      price: "550.000đ",
      rating: "5.0 ★",
      desc: "Xây chắc nền tảng ngữ pháp, 3.000 từ vựng cốt lõi, chiến thuật đọc hiểu và phát âm chuẩn quốc tế.",
      bgClass: "english-bg",
      icon: "🌍",
      author: "Thầy David & Cô Linh"
    },
    {
      id: "course-history",
      title: "Lịch sử - Lịch sử Việt Nam & Thế giới hiện đại",
      category: "social",
      price: "380.000đ",
      rating: "4.8 ★",
      desc: "Học lịch sử bằng sơ đồ tư duy dòng thời gian, ghi nhớ sự kiện logic và phân tích nguyên nhân ý nghĩa.",
      bgClass: "history-bg",
      icon: "🏛️",
      author: "Thầy Hưng (Lịch sử)"
    },
    {
      id: "course-geography",
      title: "Địa lý - Địa lý tự nhiên & Kinh tế Việt Nam",
      category: "social",
      price: "380.000đ",
      rating: "4.7 ★",
      desc: "Thành thạo kỹ năng đọc Atlat Địa lý Việt Nam, phân tích biểu đồ số liệu và các vùng kinh tế trọng điểm.",
      bgClass: "geography-bg",
      icon: "🗺️",
      author: "Cô Trâm (Địa lý)"
    },
    {
      id: "course-it",
      title: "Tin học - Lập trình Python & Tư duy thuật toán",
      category: "tech_lang",
      price: "499.000đ",
      rating: "4.9 ★",
      desc: "Làm quen với tư duy lập trình, thuật toán cơ bản, xử lý mảng và giải quyết bài toán thực tế bằng Python.",
      bgClass: "it-bg",
      icon: "💻",
      author: "Thầy Minh (Tin học)"
    }
  ];

  const DEFAULT_ASSIGNMENTS = [
    {
      id: "assign-math-1",
      title: "Giải phương trình lượng giác và khảo sát hàm bậc 3",
      course: "Toán học - Đại số & Hình học không gian",
      deadline: "2026-09-15",
      desc: "Làm bài tập trắc nghiệm 20 câu chương Hàm số và vẽ đồ thị hàm số bậc 3 trên vở, chụp ảnh hoặc nộp file PDF.",
      link: "https://drive.google.com",
      teacherName: "Thầy Hùng (Chuyên Toán)"
    },
    {
      id: "assign-eng-1",
      title: "Luyện đọc hiểu Reading Comprehension Unit 3",
      course: "Tiếng Anh - Ngữ pháp & Luyện thi THPT / IELTS",
      deadline: "2026-09-18",
      desc: "Hoàn thành 3 đoạn văn Reading Comprehension về chủ đề Môi trường và ghi chép tối thiểu 15 từ vựng mới.",
      link: "https://drive.google.com",
      teacherName: "Cô Linh (Tiếng Anh)"
    },
    {
      id: "assign-lit-1",
      title: "Viết đoạn văn 200 chữ: Tinh thần tự học trong kỷ nguyên số",
      course: "Ngữ văn - Kỹ năng Đọc hiểu & Nghị luận xã hội",
      deadline: "2026-09-20",
      desc: "Viết đoạn văn nghị luận xã hội khoảng 200 chữ nêu suy nghĩ của em về tầm quan trọng của việc chủ động tự học.",
      link: "",
      teacherName: "Cô Mai (Ngữ văn)"
    },
    {
      id: "assign-it-1",
      title: "Viết chương trình Python tìm số nguyên tố và sắp xếp mảng",
      course: "Tin học - Lập trình Python & Tư duy thuật toán",
      deadline: "2026-09-22",
      desc: "Sử dụng Python viết hàm kiểm tra số nguyên tố và hàm sắp xếp mảng tăng dần. Nộp link GitHub hoặc file .py.",
      link: "https://github.com",
      teacherName: "Thầy Minh (Tin học)"
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
    // Tự động chuyển đổi nếu chưa có hoặc đang chứa dữ liệu cũ
    const isOldCourses =
      Array.isArray(courses) &&
      courses.length > 0 &&
      courses.some((c) => c.title === "UI/UX Design cho người mới" || c.title === "Frontend Development");

    if (!courses || !Array.isArray(courses) || courses.length === 0 || isOldCourses) {
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
    const isOldAssignments =
      Array.isArray(assignments) &&
      assignments.some((a) => a.title.includes("Wireframe") || a.title.includes("Todo List"));

    if (!assignments || !Array.isArray(assignments) || assignments.length === 0 || isOldAssignments) {
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

  // ============ Schedule Map (Thời khóa biểu môn học) ============
  const scheduleMap = {
    "Toán học - Đại số & Hình học không gian": {
      title: "Toán học - Đại số & Hình học không gian",
      summary: [
        "⚡ 5 buổi học lý thuyết & phương pháp",
        "📘 3 buổi luyện giải đề thi thử",
        "🧠 2 buổi mentor sửa lỗi sai"
      ],
      timetable: [
        { day: "Thứ 2", lesson: "Khảo sát & Vẽ đồ thị hàm số", time: "08:00 - 10:00" },
        { day: "Thứ 3", lesson: "Phương trình & Hệ lượng giác", time: "09:00 - 11:00" },
        { day: "Thứ 4", lesson: "Hình học không gian Oxyz", time: "13:30 - 15:30" },
        { day: "Thứ 5", lesson: "Tích phân & Ứng dụng thực tế", time: "14:00 - 16:00" },
        { day: "Thứ 6", lesson: "Giải đề thi thử trắc nghiệm", time: "10:00 - 11:30" }
      ],
      progress: 78,
      nextLesson: "Khảo sát & Vẽ đồ thị hàm số",
      nextTime: "Thứ 2 · 08:00 - 10:00"
    },
    "Vật lý - Cơ học & Sóng điện từ": {
      title: "Vật lý - Cơ học & Sóng điện từ",
      summary: [
        "⚡ 4 buổi phân tích hiện tượng",
        "📘 3 buổi thực hành giải đề",
        "🧠 2 buổi tổng ôn công thức"
      ],
      timetable: [
        { day: "Thứ 2", lesson: "Dao động điều hòa & Con lắc", time: "08:00 - 10:00" },
        { day: "Thứ 3", lesson: "Sóng cơ & Giao thoa sóng", time: "09:00 - 11:00" },
        { day: "Thứ 4", lesson: "Dòng điện xoay chiều RLC", time: "13:30 - 15:30" },
        { day: "Thứ 5", lesson: "Sóng ánh sáng & Tán sắc", time: "14:00 - 16:00" },
        { day: "Thứ 6", lesson: "Luyện đề thi THPT môn Vật lý", time: "10:00 - 11:30" }
      ],
      progress: 72,
      nextLesson: "Dao động điều hòa & Con lắc",
      nextTime: "Thứ 2 · 08:00 - 10:00"
    },
    "Hóa học - Vô cơ & Hữu cơ trọng tâm": {
      title: "Hóa học - Vô cơ & Hữu cơ trọng tâm",
      summary: [
        "⚡ 5 buổi sơ đồ chuyển hóa",
        "📘 3 buổi bài tập định lượng",
        "🧠 2 buổi ghi nhớ phản ứng"
      ],
      timetable: [
        { day: "Thứ 2", lesson: "Kim loại kiềm & Hợp chất", time: "08:00 - 09:30" },
        { day: "Thứ 3", lesson: "Este - Lipit & Cacbohydrat", time: "09:00 - 10:30" },
        { day: "Thứ 4", lesson: "Amin - Amino axit - Peptit", time: "13:30 - 15:00" },
        { day: "Thứ 5", lesson: "Tổng hợp bài toán hữu cơ", time: "14:00 - 15:30" },
        { day: "Thứ 6", lesson: "Giải đề thi thử Hóa học", time: "10:00 - 11:00" }
      ],
      progress: 70,
      nextLesson: "Kim loại kiềm & Hợp chất",
      nextTime: "Thứ 2 · 08:00 - 09:30"
    },
    "Ngữ văn - Kỹ năng Đọc hiểu & Nghị luận xã hội": {
      title: "Ngữ văn - Kỹ năng Đọc hiểu & Nghị luận xã hội",
      summary: [
        "⚡ 4 buổi kỹ năng làm bài",
        "📘 3 buổi luyện viết đoạn văn",
        "🧠 2 buổi sửa bài 1-on-1"
      ],
      timetable: [
        { day: "Thứ 2", lesson: "Chiến thuật Đọc hiểu văn bản", time: "08:00 - 10:00" },
        { day: "Thứ 3", lesson: "Kỹ năng viết Nghị luận xã hội", time: "09:00 - 11:00" },
        { day: "Thứ 4", lesson: "Phân tích tác phẩm Thơ", time: "13:30 - 15:30" },
        { day: "Thứ 5", lesson: "Phân tích tác phẩm Văn xuôi", time: "14:00 - 16:00" },
        { day: "Thứ 6", lesson: "Luyện đề thi Ngữ văn", time: "10:00 - 11:30" }
      ],
      progress: 80,
      nextLesson: "Chiến thuật Đọc hiểu văn bản",
      nextTime: "Thứ 2 · 08:00 - 10:00"
    },
    "Tiếng Anh - Ngữ pháp & Luyện thi THPT / IELTS": {
      title: "Tiếng Anh - Ngữ pháp & Luyện thi THPT / IELTS",
      summary: [
        "⚡ 5 buổi ngữ pháp & từ vựng",
        "📘 4 buổi luyện đề Reading/Listening",
        "🧠 2 buổi chấm chữa bài chi tiết"
      ],
      timetable: [
        { day: "Thứ 2", lesson: "12 Thì & Cấu trúc câu nâng cao", time: "08:00 - 10:00" },
        { day: "Thứ 3", lesson: "Từ vựng theo chủ đề & Collocations", time: "09:00 - 11:00" },
        { day: "Thứ 4", lesson: "Kỹ năng làm bài Reading", time: "13:30 - 15:30" },
        { day: "Thứ 5", lesson: "Ngữ âm & Trọng âm chuẩn xác", time: "14:00 - 16:00" },
        { day: "Thứ 6", lesson: "Giải đề thi Tiếng Anh", time: "10:00 - 11:30" }
      ],
      progress: 85,
      nextLesson: "12 Thì & Cấu trúc câu nâng cao",
      nextTime: "Thứ 2 · 08:00 - 10:00"
    },
    "Tin học - Lập trình Python & Tư duy thuật toán": {
      title: "Tin học - Lập trình Python & Tư duy thuật toán",
      summary: [
        "⚡ 5 buổi coding online",
        "📘 4 buổi bài tập thuật toán",
        "🧠 2 buổi review code"
      ],
      timetable: [
        { day: "Thứ 2", lesson: "Cú pháp Python & Kiểu dữ liệu", time: "08:00 - 10:00" },
        { day: "Thứ 3", lesson: "Vòng lặp & Cấu trúc rẽ nhánh", time: "09:00 - 11:00" },
        { day: "Thứ 4", lesson: "Mảng, List & Xử lý chuỗi", time: "13:30 - 15:30" },
        { day: "Thứ 5", lesson: "Thuật toán tìm kiếm & Sắp xếp", time: "14:00 - 16:00" },
        { day: "Thứ 6", lesson: "Mini Project giải toán Python", time: "10:00 - 11:30" }
      ],
      progress: 75,
      nextLesson: "Cú pháp Python & Kiểu dữ liệu",
      nextTime: "Thứ 2 · 08:00 - 10:00"
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
        title: courseName || "Môn học EduNova",
        summary: ["⚡ 5 buổi học chuyên sâu", "📘 3 buổi luyện giải đề thi", "🧠 2 buổi mentor 1-on-1"],
        timetable: [
          { day: "Thứ 2", lesson: "Lý thuyết & Khái niệm nền tảng", time: "08:00 - 10:00" },
          { day: "Thứ 3", lesson: "Các dạng bài tập trọng tâm", time: "09:00 - 11:00" },
          { day: "Thứ 4", lesson: "Luyện kỹ năng giải nhanh", time: "13:30 - 15:30" },
          { day: "Thứ 5", lesson: "Làm đề thi thử tổng hợp", time: "14:00 - 16:00" },
          { day: "Thứ 6", lesson: "Sửa bài & Tổng kết kiến thức", time: "10:00 - 11:30" }
        ],
        progress: 65,
        nextLesson: "Lý thuyết & Khái niệm nền tảng",
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
          <p>Chưa có môn học nào trong danh mục này.</p>
        </div>
      `;
      return;
    }

    courseGrid.innerHTML = filteredCourses
      .map((course) => {
        const categoryLabel =
          course.category === "natural"
            ? "Tự nhiên"
            : course.category === "social"
            ? "Xã hội"
            : course.category === "tech_lang"
            ? "Ngoại ngữ & Tin"
            : "Chuyên sâu";

        const bgClass = course.bgClass || "math-bg";
        const icon = course.icon || "📚";

        return `
          <article class="course-card" data-category="${course.category}">
            <div class="course-image ${bgClass}">
              <span>${icon}</span>
            </div>
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
      '<option value="">-- Chọn môn học --</option>',
      ...courses.map((c) => `<option value="${c.title}">${c.icon || "📚"} ${c.title}</option>`)
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
          e.target.value === "teacher" ? "Môn học / Chuyên môn giảng dạy" : "Môn học quan tâm";
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
    const course = (courseInput?.value || "").trim() || "Toán học - Đại số & Hình học không gian";

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
      const category = document.getElementById("newCourseCategory")?.value || "natural";
      const price = (document.getElementById("newCoursePrice")?.value || "").trim();
      const desc = (document.getElementById("newCourseDesc")?.value || "").trim();

      if (!title || !price || !desc) {
        if (createCourseMessage) {
          createCourseMessage.textContent = "Vui lòng nhập đầy đủ thông tin môn học.";
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
        bgClass: `${category === "natural" ? "math-bg" : category === "social" ? "literature-bg" : "it-bg"}`,
        icon: category === "natural" ? "📐" : category === "social" ? "📖" : "💻",
        author: currentUser.fullName || "Giảng viên EduNova",
        createdByEmail: currentUser.email || ""
      };

      courses.unshift(newCourse);
      saveStoredCourses(courses);

      if (createCourseMessage) {
        createCourseMessage.textContent = "🎉 Tạo môn học thành công!";
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
          createAssignmentMessage.textContent = "Vui lòng điền đủ tiêu đề, môn học, hạn nộp và yêu cầu.";
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
              <strong>${course.icon || "📚"} ${course.title}</strong>
              <span>${course.category === "natural" ? "Tự nhiên" : course.category === "social" ? "Xã hội" : "Ngoại ngữ & Tin"} · ${course.price} · ${course.rating || "5.0 ★"}</span>
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
          if (confirm("Bạn có chắc chắn muốn gỡ môn học này?")) {
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
      viewSubmissionsSubTitle.textContent = `Môn học: ${assignment.course} | Bài tập: ${assignment.title}`;
    }

    if (submissionsListContainer) {
      if (submissions.length === 0) {
        submissionsListContainer.innerHTML = `
          <div class="empty-state">
            <span>📥</span>
            <p>Chưa có học sinh nào nộp bài cho bài tập này.</p>
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
    if (submitAssignmentCourseName) submitAssignmentCourseName.textContent = `Môn học: ${assignment.course}`;
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
        studentName: currentUser.fullName || "Học sinh EduNova",
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
          <p>Hiện chưa có bài tập nào được giao cho môn học này.</p>
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
                <span class="badge-course">📚 ${assign.course}</span>
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
          userRoleBadge.textContent = "👨‍🎓 Học sinh";
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
      if (dashboardStudentName) dashboardStudentName.textContent = "Học sinh EduNova";
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
        updateSchedule("Toán học - Đại số & Hình học không gian");
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
    updateSchedule("Toán học - Đại số & Hình học không gian");
  }
});
