document.addEventListener("DOMContentLoaded", () => {
  // ============ Year in Footer ============
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // ============ Splash Screen & Interactive Particle Grid ============
  const splashScreen = document.getElementById("splashScreen");
  const splashCanvas = document.getElementById("splashParticleCanvas");
  let particleAnimId = null;
  let splashTimerInterval = null;
  let splashExitTriggered = false;

  const exitSplashScreen = () => {
    if (splashExitTriggered || !splashScreen) return;
    splashExitTriggered = true;

    if (splashTimerInterval) clearInterval(splashTimerInterval);

    // Smooth exit animation (transition to main page)
    splashScreen.classList.add("splash-fade-out");
    document.body.style.overflow = "";

    setTimeout(() => {
      splashScreen.classList.add("splash-gone");
      if (particleAnimId) cancelAnimationFrame(particleAnimId);
    }, 750);
  };

  if (splashScreen) {
    document.body.style.overflow = "hidden";

    // Button to go directly to main menu
    const btnEnterMainMenu = document.getElementById("btnEnterMainMenu");
    if (btnEnterMainMenu) {
      btnEnterMainMenu.addEventListener("click", exitSplashScreen);
    }

    // Auto progress bar & countdown (3.2 seconds)
    const progressBar = document.getElementById("splashProgressBar");
    const timerHint = document.getElementById("splashTimerHint");
    const totalDuration = 3200;
    const intervalStep = 40;
    let elapsed = 0;

    splashTimerInterval = setInterval(() => {
      elapsed += intervalStep;
      const progressPercent = Math.min(100, (elapsed / totalDuration) * 100);
      if (progressBar) progressBar.style.width = `${progressPercent}%`;

      const remainingSec = Math.max(1, Math.ceil((totalDuration - elapsed) / 1000));
      if (timerHint && remainingSec > 0) {
        timerHint.textContent = `Tự động chuyển tiếp sau ${remainingSec}s...`;
      }

      if (elapsed >= totalDuration) {
        clearInterval(splashTimerInterval);
        exitSplashScreen();
      }
    }, intervalStep);

    // Initialize Interactive Particle Grid Canvas
    if (splashCanvas && splashCanvas.getContext) {
      const ctx = splashCanvas.getContext("2d");
      let width = (splashCanvas.width = window.innerWidth);
      let height = (splashCanvas.height = window.innerHeight);

      const mouse = { x: null, y: null, radius: 150 };

      const onMouseMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };

      const onMouseLeave = () => {
        mouse.x = null;
        mouse.y = null;
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseleave", onMouseLeave);

      const handleResize = () => {
        if (!splashScreen || splashScreen.classList.contains("splash-gone")) return;
        width = splashCanvas.width = window.innerWidth;
        height = splashCanvas.height = window.innerHeight;
      };
      window.addEventListener("resize", handleResize);

      // Create particles for grid
      const particleCount = Math.min(110, Math.max(55, Math.floor((width * height) / 12000)));
      const particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 2.0 + 1.5,
          baseColor: "rgba(109, 40, 217, ", // Deeper violet
        });
      }

      const animateParticles = () => {
        if (splashExitTriggered && splashScreen.classList.contains("splash-gone")) return;

        ctx.clearRect(0, 0, width, height);

        // Update & Draw particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Mouse interaction (gentle repulsion/attraction)
          if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
              const force = (mouse.radius - dist) / mouse.radius;
              p.x -= (dx / dist) * force * 1.5;
              p.y -= (dy / dist) * force * 1.5;
            }
          }

          // Draw particle dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.baseColor + "0.85)";
          ctx.fill();

          // Connect with nearby particles to form grid network
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 135;

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(109, 40, 217, ${alpha})`;
              ctx.lineWidth = 1.2;
              ctx.stroke();
            }
          }

          // Connect with mouse cursor
          if (mouse.x !== null && mouse.y !== null) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
              const alpha = (1 - dist / mouse.radius) * 0.65;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
              ctx.lineWidth = 1.5;
              ctx.stroke();
            }
          }
        }

        particleAnimId = requestAnimationFrame(animateParticles);
      };

      particleAnimId = requestAnimationFrame(animateParticles);
    }
  }

  // ============ Main Menu Persistent Interactive Particle Grid ============
  const mainMenuCanvas = document.getElementById("mainMenuParticleCanvas");
  if (mainMenuCanvas && mainMenuCanvas.getContext) {
    const ctx = mainMenuCanvas.getContext("2d");
    let width = (mainMenuCanvas.width = window.innerWidth);
    let height = (mainMenuCanvas.height = window.innerHeight);

    const mouse = { x: null, y: null, radius: 140 };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener("resize", () => {
      width = mainMenuCanvas.width = window.innerWidth;
      height = mainMenuCanvas.height = window.innerHeight;
    });

    const count = Math.min(100, Math.max(50, Math.floor((width * height) / 14000)));
    const particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.0 + 1.4,
        baseColor: "rgba(109, 40, 217, ",
      });
    }

    const animateMainMenuParticles = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 1.2;
            p.y -= (dy / dist) * force * 1.2;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.baseColor + "0.80)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 130;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.42;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(109, 40, 217, ${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 1.4;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateMainMenuParticles);
    };

    requestAnimationFrame(animateMainMenuParticles);
  }

  // ============ Global Toast Helper ============
  let toastTimer = null;
  const showToast = (message, duration = 4500) => {
    const toast = document.getElementById("globalToast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove("hidden", "toast-fade");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add("toast-fade");
      setTimeout(() => toast.classList.add("hidden"), 300);
    }, duration);
  };

  // ============ 9 Môn Học Phổ Biến: Toán, Lý, Hóa, Sinh, Văn, Anh, Sử, Địa, Tin ============
  const DEFAULT_COURSES = [
    {
      id: "course-math",
      title: "Toán học",
      category: "natural",
      price: "499.000đ",
      rating: "4.9 ★",
      desc: "Đại số, hình học không gian và phương pháp giải nhanh trắc nghiệm.",
      bgClass: "math-bg",
      icon: "📐",
      author: "Thầy Hùng (Chuyên Toán)"
    },
    {
      id: "course-physics",
      title: "Vật lý",
      category: "natural",
      price: "450.000đ",
      rating: "4.8 ★",
      desc: "Cơ học, sóng điện từ và kỹ năng làm bài trắc nghiệm thực tế.",
      bgClass: "physics-bg",
      icon: "⚡",
      author: "Thầy Tuấn (Vật lý EduNova)"
    },
    {
      id: "course-chemistry",
      title: "Hóa học",
      category: "natural",
      price: "450.000đ",
      rating: "4.9 ★",
      desc: "Hóa vô cơ, hữu cơ và phương pháp giải nhanh bài tập trọng tâm.",
      bgClass: "chemistry-bg",
      icon: "🧪",
      author: "Cô Lan (Hóa học)"
    },
    {
      id: "course-biology",
      title: "Sinh học",
      category: "natural",
      price: "399.000đ",
      rating: "4.8 ★",
      desc: "Quy luật di truyền, cấu trúc tế bào và sinh thái học.",
      bgClass: "biology-bg",
      icon: "🧬",
      author: "Cô Hương (Sinh học)"
    },
    {
      id: "course-literature",
      title: "Ngữ văn",
      category: "social",
      price: "420.000đ",
      rating: "4.9 ★",
      desc: "Kỹ năng đọc hiểu và viết đoạn nghị luận 200 chữ đạt điểm cao.",
      bgClass: "literature-bg",
      icon: "📖",
      author: "Cô Mai (Ngữ văn)"
    },
    {
      id: "course-english",
      title: "Tiếng Anh",
      category: "tech_lang",
      price: "550.000đ",
      rating: "5.0 ★",
      desc: "Ngữ pháp cốt lõi, từ vựng trọng tâm và chiến thuật thi THPT.",
      bgClass: "english-bg",
      icon: "🌍",
      author: "Thầy David & Cô Linh"
    },
    {
      id: "course-history",
      title: "Lịch sử",
      category: "social",
      price: "380.000đ",
      rating: "4.8 ★",
      desc: "Sơ đồ tư duy lịch sử Việt Nam và thế giới hiện đại.",
      bgClass: "history-bg",
      icon: "🏛️",
      author: "Thầy Hưng (Lịch sử)"
    },
    {
      id: "course-geography",
      title: "Địa lý",
      category: "social",
      price: "380.000đ",
      rating: "4.7 ★",
      desc: "Kỹ năng đọc Atlat, phân tích biểu đồ và các vùng kinh tế.",
      bgClass: "geography-bg",
      icon: "🗺️",
      author: "Cô Trâm (Địa lý)"
    },
    {
      id: "course-it",
      title: "Tin học",
      category: "tech_lang",
      price: "499.000đ",
      rating: "4.9 ★",
      desc: "Lập trình Python căn bản, cấu trúc dữ liệu và giải thuật.",
      bgClass: "it-bg",
      icon: "💻",
      author: "Thầy Minh (Tin học)"
    }
  ];

  // ============ Danh sách Đề bài tập tự luận mẫu ============
  const DEFAULT_ASSIGNMENTS = [
    {
      id: "assign-math-1",
      title: "Giải phương trình lượng giác và khảo sát hàm bậc 3",
      course: "Toán học",
      grade: "12",
      deadline: "2026-09-15",
      desc: "Làm bài tập trắc nghiệm 20 câu chương Hàm số và vẽ đồ thị hàm số bậc 3 trên vở, chụp ảnh hoặc nộp file PDF.",
      link: "https://drive.google.com",
      teacherName: "Thầy Hùng (Chuyên Toán)"
    },
    {
      id: "assign-eng-1",
      title: "Luyện đọc hiểu Reading Comprehension Unit 3",
      course: "Tiếng Anh",
      grade: "12",
      deadline: "2026-09-18",
      desc: "Hoàn thành 3 đoạn văn Reading Comprehension về chủ đề Môi trường và ghi chép tối thiểu 15 từ vựng mới.",
      link: "https://drive.google.com",
      teacherName: "Cô Linh (Tiếng Anh)"
    },
    {
      id: "assign-lit-1",
      title: "Viết đoạn văn 200 chữ: Tinh thần tự học trong kỷ nguyên số",
      course: "Ngữ văn",
      grade: "12",
      deadline: "2026-09-20",
      desc: "Viết đoạn văn nghị luận xã hội khoảng 200 chữ nêu suy nghĩ của em về tầm quan trọng của việc chủ động tự học.",
      link: "",
      teacherName: "Cô Mai (Ngữ văn)"
    },
    {
      id: "assign-it-1",
      title: "Viết chương trình Python tìm số nguyên tố và sắp xếp mảng",
      course: "Tin học",
      grade: "12",
      deadline: "2026-09-22",
      desc: "Sử dụng Python viết hàm kiểm tra số nguyên tố và hàm sắp xếp mảng tăng dần. Nộp link GitHub hoặc file .py.",
      link: "https://github.com",
      teacherName: "Thầy Minh (Tin học)"
    }
  ];

  // ============ Danh sách Tài liệu & Video Bài giảng mẫu ============
  const DEFAULT_MATERIALS = [
    {
      id: "mat-math-1",
      title: "Chuyên đề Video: Khảo sát sự biến thiên & Đồ thị hàm số",
      course: "Toán học",
      grade: "12",
      type: "video",
      url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      summary: "1. Đạo hàm và xét dấu y'\n2. Tìm cực trị và tiệm cận đứng, tiệm cận ngang\n3. Lập bảng biến thiên và vẽ đồ thị hàm bậc 3, bậc 4 trùng phương, phân thức bậc nhất.",
      teacherName: "Thầy Hùng (Chuyên Toán)",
      createdAt: new Date().toLocaleDateString("vi-VN")
    },
    {
      id: "mat-phys-1",
      title: "Tài liệu Tổng hợp: 50 Công thức Dao động điều hòa & Sóng cơ",
      course: "Vật lý",
      grade: "12",
      type: "document",
      url: "https://drive.google.com",
      summary: "Tổng hợp toàn bộ công thức cốt lõi: Chu kỳ, tần số, phương trình li độ, vận tốc, gia tốc, động năng, thế năng và năng lượng toàn phần con lắc lò xo.",
      teacherName: "Thầy Tuấn (Vật lý)",
      createdAt: new Date().toLocaleDateString("vi-VN")
    },
    {
      id: "mat-lit-1",
      title: "Đề cương Ôn tập: 10 Dạng đề Nghị luận Xã hội 200 chữ đạt điểm cao",
      course: "Ngữ văn",
      grade: "12",
      type: "exam",
      url: "https://drive.google.com",
      summary: "Hướng dẫn cấu trúc 4 phần chuẩn: Nêu vấn đề, Giải thích - Phân tích chứng minh, Bàn luận mở rộng - Phản đề, Bài học nhận thức và hành động.",
      teacherName: "Cô Mai (Ngữ văn)",
      createdAt: new Date().toLocaleDateString("vi-VN")
    },
    {
      id: "mat-eng-1",
      title: "Chuyên đề Video: Chinh phục 12 Thì trong Tiếng Anh & Mẹo làm bài",
      course: "Tiếng Anh",
      grade: "12",
      type: "video",
      url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      summary: "Hệ thống hóa 12 thì qua trục thời gian (Quá khứ - Hiện tại - Tương lai), cách phân biệt Hiện tại hoàn thành vs Quá khứ đơn, cùng mẹo nhận biết dấu hiệu thời gian.",
      teacherName: "Thầy David & Cô Linh",
      createdAt: new Date().toLocaleDateString("vi-VN")
    },
    {
      id: "mat-it-1",
      title: "Slide Bài giảng: Cấu trúc Dữ liệu & Thuật toán cơ bản với Python",
      course: "Tin học",
      grade: "12",
      type: "document",
      url: "https://github.com",
      summary: "Slide gồm 6 phần: Cú pháp Python, Rẽ nhánh if-else, Vòng lặp for/while, Cấu trúc List/Tuple/Dictionary, Hàm & Giải thuật tìm kiếm nhị phân.",
      teacherName: "Thầy Minh (Tin học)",
      createdAt: new Date().toLocaleDateString("vi-VN")
    }
  ];
  // ============ Danh sách Đề Thi / Luyện Tập Trắc Nghiệm Online ============
  const DEFAULT_QUIZZES = [
    {
      id: "quiz-lit-12-1",
      title: "Khảo sát Ngữ văn: Đọc hiểu & Viết bài văn Nghị luận",
      course: "Ngữ văn",
      grade: "12",
      duration: 45,
      teacherName: "Cô Mai (Ngữ văn)",
      questions: [
        {
          id: "qlit_1",
          type: "multiple_choice",
          question: "Trong bài thơ 'Tây Tiến' của Quang Dũng, hình tượng người lính Tây Tiến mang vẻ đẹp nổi bật nào?",
          options: [
            "Bi tráng, hào hoa, lãng mạn và giàu tinh thần quả cảm",
            "Mộc mạc, chất phác, chân lấm tay bùn",
            "Chỉ mang nét buồn thương, bi lụy",
            "Mang đậm chất sử thi anh hùng thần thoại"
          ],
          answerIndex: 0,
          explanation: "Quang Dũng khắc họa người lính Tây Tiến vừa lãng mạn hào hoa vừa bi tráng bất khuất."
        },
        {
          id: "qlit_2",
          type: "true_false",
          question: "Trong bài văn nghị luận xã hội, thao tác chứng minh đòi hỏi phải chọn lọc những dẫn chứng tiêu biểu, xác thực và mang tính thời sự?",
          correct: "Đúng",
          explanation: "Dẫn chứng trong văn nghị luận xã hội phải chính xác, tiêu biểu và thuyết phục bạn đọc."
        },
        {
          id: "qlit_3",
          type: "short_answer",
          question: "Ai là tác giả của tác phẩm 'Vợ chồng A Phủ' viết về số phận người dân nghèo Tây Bắc?",
          correctAnswer: "Tô Hoài",
          explanation: "Nhà văn Tô Hoài sáng tác truyện ngắn 'Vợ chồng A Phủ' (trích tập Truyện Tây Bắc, 1952)."
        },
        {
          id: "qlit_4",
          type: "essay_writing",
          question: "Phần Viết bài văn (Nghị luận xã hội): Viết một bài văn hoàn chỉnh (tối thiểu 300 từ) bày tỏ suy nghĩ của em về đề tài: 'Khát vọng cống hiến và tinh thần tự lập của tuổi trẻ trong kỷ nguyên số'.",
          outline: [
            "1. Mở bài: Dẫn dắt vấn đề, nêu luận đề về khát vọng cống hiến và tính tự lập của thanh niên hiện nay.",
            "2. Thân bài: Giải thích ý nghĩa của 'khát vọng cống hiến' và 'tự lập'; Phân tích vai trò, sức mạnh của người trẻ tự chủ công nghệ; Nêu dẫn chứng người thật việc thật; Phản đề thói ỷ lại, thụ động; Rút ra bài học hành động thiết thực.",
            "3. Kết bài: Khẳng định lại giá trị của khát vọng sống đẹp và lời nhắn nhủ thế hệ tương lai."
          ],
          explanation: "Bài văn cần có kết cấu 3 phần rõ ràng: Mở bài - Thân bài - Kết bài, lập luận mạch lạc, cảm xúc chân thành."
        }
      ]
    },
    {
      id: "quiz-math-12-1",
      title: "Kiểm tra 15 phút: Cực trị & Sự biến thiên Hàm số",
      course: "Toán học",
      grade: "12",
      duration: 15,
      teacherName: "Thầy Hùng (Chuyên Toán)",
      questions: [
        {
          id: "q1",
          type: "multiple_choice",
          question: "Hàm số y = x³ - 3x² + 2 đạt cực đại tại điểm nào?",
          options: ["x = 0", "x = 2", "x = -1", "x = 1"],
          answerIndex: 0,
          explanation: "y' = 3x² - 6x = 3x(x - 2). y' đổi dấu từ (+) sang (-) qua x = 0 nên đạt cực đại tại x = 0."
        },
        {
          id: "q2",
          type: "true_false",
          question: "Đồ thị hàm số y = (2x - 1) / (x + 1) có đường tiệm cận ngang là đường thẳng y = 2?",
          correct: "Đúng",
          explanation: "Tiệm cận ngang là y = lim(x->∞) (2x - 1)/(x + 1) = 2/1 = 2."
        },
        {
          id: "q3",
          type: "short_answer",
          question: "Số điểm cực trị của hàm số y = x⁴ - 2x² + 3 là bao nhiêu?",
          correctAnswer: "3",
          explanation: "y' = 4x³ - 4x = 4x(x² - 1) = 0 có 3 nghiệm phân biệt x = 0, x = 1, x = -1."
        },
        {
          id: "q4",
          type: "multiple_choice",
          question: "Giá trị lớn nhất của hàm số f(x) = x³ - 3x trên đoạn [0; 2] là:",
          options: ["2", "0", "-2", "4"],
          answerIndex: 0,
          explanation: "f'(x) = 3x² - 3 = 0 => x = 1 ∈ [0; 2]. Ta có f(0) = 0, f(1) = -2, f(2) = 2. Vậy Max = 2."
        },
        {
          id: "q5",
          type: "essay",
          question: "Nêu quy tắc 3 bước để tìm các khoảng đồng biến, nghịch biến và cực trị của một hàm số bất kỳ bằng đạo hàm cấp 1.",
          explanation: "Bước 1: Tìm TXĐ và tính đạo hàm y'. Bước 2: Tìm nghiệm của y' = 0 hoặc điểm y' không xác định. Bước 3: Lập bảng xét dấu y' và kết luận khoảng đơn điệu, cực trị."
        }
      ]
    },
    {
      id: "quiz-eng-12-1",
      title: "Kiểm tra 15 phút: 12 Thì & Mệnh đề quan hệ",
      course: "Tiếng Anh",
      grade: "12",
      duration: 15,
      teacherName: "Cô Linh (Tiếng Anh)",
      questions: [
        {
          id: "q1",
          type: "multiple_choice",
          question: "By the time we arrived at the cinema, the movie ______.",
          options: ["had already started", "has already started", "started", "was starting"],
          answerIndex: 0,
          explanation: "Hành động xảy ra trước một thời điểm trong quá khứ ('By the time + V-ed') dùng Quá khứ hoàn thành (had + V3/ed)."
        },
        {
          id: "q2",
          type: "true_false",
          question: "Mệnh đề quan hệ bắt đầu bằng đại từ 'whose' dùng để chỉ sự sở hữu của cả người và vật?",
          correct: "Đúng",
          explanation: "'Whose' thay thế cho tính từ sở hữu hoặc sở hữu cách của cả người và vật."
        },
        {
          id: "q3",
          type: "multiple_choice",
          question: "If I ______ harder last semester, I would have passed the scholarship exam.",
          options: ["had studied", "studied", "study", "would study"],
          answerIndex: 0,
          explanation: "Câu điều kiện loại 3 (vế if dùng Had + V3/ed, vế chính dùng Would have + V3/ed)."
        },
        {
          id: "q4",
          type: "short_answer",
          question: "Điền đại từ quan hệ thích hợp: 'She is the woman ______ I spoke to yesterday on the phone.'",
          correctAnswer: "whom",
          explanation: "'whom' làm tân ngữ chỉ người sau giới từ to (to whom / whom I spoke to)."
        }
      ]
    },
    {
      id: "quiz-phys-12-1",
      title: "Luyện tập: Dao động điều hòa & Con lắc lò xo",
      course: "Vật lý",
      grade: "12",
      duration: 15,
      teacherName: "Thầy Tuấn (Vật lý)",
      questions: [
        {
          id: "q1",
          type: "multiple_choice",
          question: "Công thức tính chu kỳ dao động của con lắc lò xo là:",
          options: ["T = 2π√(m/k)", "T = 2π√(k/m)", "T = 2π√(g/l)", "T = 2π√(l/g)"],
          answerIndex: 0,
          explanation: "Chu kỳ con lắc lò xo là T = 2π√(m/k)."
        },
        {
          id: "q2",
          type: "true_false",
          question: "Trong dao động điều hòa, gia tốc a luôn biến thiên cùng pha với li độ x?",
          correct: "Sai",
          explanation: "Gia tốc a = -ω²x luôn ngược pha với li độ x (lệch pha π rad)."
        },
        {
          id: "q3",
          type: "multiple_choice",
          question: "Khi vật đi qua vị trí cân bằng thì:",
          options: ["Vận tốc đạt độ lớn cực đại, gia tốc bằng 0", "Vận tốc bằng 0, gia tốc cực đại", "Thế năng cực đại", "Cơ năng bằng 0"],
          answerIndex: 0,
          explanation: "Tại VTCB (x = 0): |v| = vmax = ωA, a = 0, thế năng Wt = 0, động năng Wd cực đại."
        },
        {
          id: "q4",
          type: "essay",
          question: "Trình bày sự chuyển hóa qua lại giữa động năng và thế năng của con lắc lò xo trong một chu kỳ dao động khi bỏ qua ma sát.",
          explanation: "Khi vật từ VTCB ra biên: thế năng tăng từ 0 lên cực đại, động năng giảm từ cực đại về 0. Khi từ biên về VTCB: thế năng giảm về 0, động năng tăng lên cực đại. Tổng cơ năng luôn được bảo toàn."
        }
      ]
    },
    {
      id: "quiz-math-9-1",
      title: "Ôn thi vào 10: Rút gọn biểu thức & Phương trình bậc 2",
      course: "Toán học",
      grade: "9",
      duration: 15,
      teacherName: "Thầy Hùng (Toán THCS)",
      questions: [
        {
          id: "q1",
          type: "multiple_choice",
          question: "Phương trình x² - 5x + 6 = 0 có hai nghiệm là:",
          options: ["x1 = 2, x2 = 3", "x1 = -2, x2 = -3", "x1 = 1, x2 = 6", "x1 = -1, x2 = -6"],
          answerIndex: 0,
          explanation: "Δ = 25 - 24 = 1. Nghiệm x1 = (5+1)/2 = 3, x2 = (5-1)/2 = 2."
        },
        {
          id: "q2",
          type: "true_false",
          question: "Biểu thức √(x - 3) xác định khi và chỉ khi x ≥ 3?",
          correct: "Đúng",
          explanation: "Căn bậc hai xác định khi biểu thức dưới căn không âm: x - 3 ≥ 0 <=> x ≥ 3."
        }
      ]
    }
  ];

  // ============ Ngân Hàng Câu Hỏi Tra Cứu (Question Bank) ============
  const DEFAULT_QUESTIONS = [
    {
      id: "qna-1",
      keyword: "hàm số cực trị đạo hàm tiệm cận khảo sát",
      subject: "Toán học",
      grade: "12",
      question: "Cách tìm các điểm cực trị và đường tiệm cận của hàm số y = f(x)?",
      solution: "1. Đạo hàm y' = f'(x) và giải phương trình y' = 0.\n2. Lập bảng biến thiên: Nếu y' đổi dấu từ (+) sang (-) thì hàm số đạt Cực Đại; từ (-) sang (+) thì đạt Cực Tiểu.\n3. Tiệm cận đứng: x = a nếu lim(x->a) f(x) = ±∞.\n4. Tiệm cận ngang: y = b nếu lim(x->±∞) f(x) = b."
    },
    {
      id: "qna-2",
      keyword: "dao động điều hòa chu kỳ con lắc lò xo vận tốc gia tốc",
      subject: "Vật lý",
      grade: "12",
      question: "Công thức tính chu kỳ, vận tốc cực đại và năng lượng con lắc lò xo?",
      solution: "• Phương trình dao động: x = A cos(ωt + φ)\n• Vận tốc: v = x' = -ωA sin(ωt + φ) => vmax = ωA (tại VTCB)\n• Gia tốc: a = v' = -ω²x => amax = ω²A (tại biên)\n• Chu kỳ: T = 2π/ω = 2π√(m/k)\n• Cơ năng toàn phần: W = 1/2 kA² = 1/2 mω²A² (bảo toàn)."
    },
    {
      id: "qna-3",
      keyword: "este phản ứng xà phòng hóa thủy phân hóa học hữu cơ",
      subject: "Hóa học",
      grade: "12",
      question: "Phản ứng xà phòng hóa este là gì và công thức tổng quát?",
      solution: "• Este đơn chức: RCOOR' + NaOH --(t°)--> RCOONa (muối) + R'OH (ancol)\n• Đặc điểm: Phản ứng một chiều, xảy ra hoàn toàn khi đun nóng trong môi trường kiềm.\n• Lưu ý: Este của phenol tạo ra 2 muối và nước: RCOOC6H5 + 2NaOH -> RCOONa + C6H5ONa + H2O."
    },
    {
      id: "qna-4",
      keyword: "mệnh đề quan hệ relative clause who whom which whose that",
      subject: "Tiếng Anh",
      grade: "12",
      question: "Cách phân biệt Who, Whom, Which, Whose và That trong Tiếng Anh?",
      solution: "• WHO: Thay thế danh từ chỉ người làm Chủ ngữ (e.g., The man who helped me).\n• WHOM: Thay thế danh từ chỉ người làm Tân ngữ (e.g., The girl whom I met).\n• WHICH: Thay thế danh từ chỉ đồ vật/con vật (e.g., The book which is on the table).\n• WHOSE: Chỉ quan hệ sở hữu cho người hoặc vật (e.g., The student whose bag is red).\n• THAT: Có thể thay thế cho Who/Whom/Which trong mệnh đề xác định (không đứng sau dấu phẩy hoặc giới từ)."
    },
    {
      id: "qna-5",
      keyword: "nghị luận xã hội đoạn văn 200 chữ ngữ văn cấu trúc",
      subject: "Ngữ văn",
      grade: "12",
      question: "Cấu trúc 4 bước viết đoạn văn Nghị luận xã hội 200 chữ đạt điểm tối đa?",
      solution: "1. Mở đoạn (1-2 câu): Nêu trực tiếp vấn đề cần nghị luận.\n2. Giải thích & Bàn luận (5-7 câu): Giải thích ý nghĩa từ khóa; đưa ra 2-3 luận điểm chứng minh kèm dẫn chứng thực tế thuyết phục.\n3. Mở rộng & Phản đề (2 câu): Phê phán thái độ/hành vi trái ngược hoặc nêu góc nhìn đa chiều.\n4. Bài học hành động (1-2 câu): Rút ra bài học nhận thức và hành động cụ thể cho bản thân."
    },
    {
      id: "qna-6",
      keyword: "python danh sách list vòng lặp hàm thuật toán sắp xếp",
      subject: "Tin học",
      grade: "12",
      question: "Cách khai báo mảng, duyệt vòng lặp và viết hàm kiểm tra số nguyên tố trong Python?",
      solution: "def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\n# Ví dụ sử dụng:\nnumbers = [2, 3, 4, 5, 10, 13]\nprimes = [x for x in numbers if is_prime(x)]\nprint('Số nguyên tố:', primes) # [2, 3, 5, 13]"
    },
    {
      id: "qna-7",
      keyword: "định lý viet phương trình bậc 2 toán lớp 9 ôn thi vào 10",
      subject: "Toán học",
      grade: "9",
      question: "Định lý Vi-ét cho phương trình bậc hai ax² + bx + c = 0 (a ≠ 0)?",
      solution: "Nếu phương trình có 2 nghiệm x1, x2 (khi Δ ≥ 0):\n• Tổng hai nghiệm: S = x1 + x2 = -b / a\n• Tích hai nghiệm: P = x1 * x2 = c / a\n• Ứng dụng: Nhẩm nghiệm (a + b + c = 0 => x1 = 1, x2 = c/a; a - b + c = 0 => x1 = -1, x2 = -c/a) và tìm hai số khi biết tổng và tích."
    }
  ];
  // Helper chuyển đổi link YouTube sang Embed URL
  const getEmbedUrl = (url) => {
    if (!url) return "";
    try {
      if (url.includes("youtube.com/watch?v=")) {
        const videoId = url.split("v=")[1]?.split("&")[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      }
      if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1]?.split("?")[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      }
    } catch (e) {
      return url;
    }
    return url;
  };

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

  const cleanSubjectName = (name) => {
    if (!name) return "Toán học";
    return name.split(" - ")[0].trim();
  };

  const getStoredCourses = () => {
    let courses = safeGetJSON("edunovaCourses", null);
    if (!courses || !Array.isArray(courses) || courses.length === 0) {
      safeSetJSON("edunovaCourses", DEFAULT_COURSES);
      return DEFAULT_COURSES;
    }
    let updated = false;
    courses = courses.map((c) => {
      const shortTitle = cleanSubjectName(c.title);
      if (c.title !== shortTitle) {
        c.title = shortTitle;
        updated = true;
      }
      return c;
    });
    if (updated) safeSetJSON("edunovaCourses", courses);
    return courses;
  };

  const saveStoredCourses = (courses) => {
    safeSetJSON("edunovaCourses", courses);
  };

  const getStoredAssignments = () => {
    let assignments = safeGetJSON("edunovaAssignments", null);
    if (!assignments || !Array.isArray(assignments) || assignments.length === 0) {
      safeSetJSON("edunovaAssignments", DEFAULT_ASSIGNMENTS);
      return DEFAULT_ASSIGNMENTS;
    }
    let updated = false;
    assignments = assignments.map((a) => {
      const shortCourse = cleanSubjectName(a.course);
      if (a.course !== shortCourse) {
        a.course = shortCourse;
        updated = true;
      }
      return a;
    });
    if (updated) safeSetJSON("edunovaAssignments", assignments);
    return assignments;
  };

  const saveStoredAssignments = (assignments) => {
    safeSetJSON("edunovaAssignments", assignments);
  };

  const getStoredMaterials = () => {
    let materials = safeGetJSON("edunovaMaterials", null);
    if (!materials || !Array.isArray(materials) || materials.length === 0) {
      safeSetJSON("edunovaMaterials", DEFAULT_MATERIALS);
      return DEFAULT_MATERIALS;
    }
    let updated = false;
    materials = materials.map((m) => {
      const shortCourse = cleanSubjectName(m.course);
      if (m.course !== shortCourse) {
        m.course = shortCourse;
        updated = true;
      }
      return m;
    });
    if (updated) safeSetJSON("edunovaMaterials", materials);
    return materials;
  };

  const saveStoredMaterials = (materials) => {
    safeSetJSON("edunovaMaterials", materials);
  };

  const getStoredQuizzes = () => {
    let quizzes = safeGetJSON("edunovaQuizzes", null);
    if (!quizzes || !Array.isArray(quizzes) || quizzes.length === 0) {
      safeSetJSON("edunovaQuizzes", DEFAULT_QUIZZES);
      return DEFAULT_QUIZZES;
    }
    let updated = false;
    quizzes = quizzes.map((q) => {
      const shortCourse = cleanSubjectName(q.course);
      if (q.course !== shortCourse) {
        q.course = shortCourse;
        updated = true;
      }
      return q;
    });
    if (updated) safeSetJSON("edunovaQuizzes", quizzes);
    return quizzes;
  };

  const saveStoredQuizzes = (quizzes) => {
    safeSetJSON("edunovaQuizzes", quizzes);
  };

  // ============ Các hàm Xóa (Môn học, Bài giảng, Bài kiểm tra) ============
  const deleteCourse = (courseId) => {
    const courses = getStoredCourses();
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;
    if (confirm(`Bạn có chắc chắn muốn xóa môn học "${course.title}"?`)) {
      const remaining = courses.filter((c) => c.id !== courseId);
      saveStoredCourses(remaining);
      renderCourses();
      populateCourseDropdowns();
      renderTeacherDashboard();
      showToast(`🗑️ Đã xóa môn học "${course.title}" thành công!`);
    }
  };

  const deleteMaterial = (materialId) => {
    const materials = getStoredMaterials();
    const mat = materials.find((m) => m.id === materialId);
    if (!mat) return;
    if (confirm(`Bạn có chắc chắn muốn xóa bài giảng "${mat.title}"?`)) {
      const remaining = materials.filter((m) => m.id !== materialId);
      saveStoredMaterials(remaining);
      renderTeacherDashboard();
      renderStudentMaterials();
      showToast(`🗑️ Đã xóa bài giảng "${mat.title}" thành công!`);
    }
  };

  const deleteQuiz = (quizId) => {
    const quizzes = getStoredQuizzes();
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) return;
    if (confirm(`Bạn có chắc chắn muốn xóa bài kiểm tra "${quiz.title}"?`)) {
      const remaining = quizzes.filter((q) => q.id !== quizId);
      saveStoredQuizzes(remaining);
      renderTeacherDashboard();
      renderStudentQuizzes();
      showToast(`🗑️ Đã xóa bài kiểm tra "${quiz.title}" thành công!`);
    }
  };

  const getStoredGrades = () => {
    const data = safeGetJSON("edunovaGrades", [
      {
        id: "grade-init-1",
        quizTitle: "Kiểm tra 15 phút: Cực trị & Sự biến thiên Hàm số",
        type: "quiz",
        score: "9.0",
        maxScore: "10",
        feedback: "Làm bài rất tốt! Nắm vững điều kiện đổi dấu đạo hàm.",
        date: new Date().toLocaleDateString("vi-VN")
      }
    ]);
    return Array.isArray(data) ? data : [];
  };

  const saveStoredGrades = (grades) => {
    safeSetJSON("edunovaGrades", grades);
  };

  const getStoredSubmissions = () => {
    const data = safeGetJSON("edunovaSubmissions", []);
    return Array.isArray(data) ? data : [];
  };

  const saveStoredSubmissions = (submissions) => {
    safeSetJSON("edunovaSubmissions", submissions);
  };

  const getStoredExamSubmissions = () => {
    const data = safeGetJSON("edunovaExamSubmissions", [
      {
        id: "sub-exam-1",
        gradeId: "grade-sub-1",
        quizId: "quiz-lit-12-1",
        quizTitle: "Kiểm tra 1 tiết: Nghị luận văn học & Phân tích thơ hiện đại",
        course: "Ngữ văn",
        grade: "12",
        studentName: "Nguyễn Văn A",
        studentEmail: "nguyenvana@gmail.com",
        submittedAt: "01/10/2026, 14:35",
        status: "pending",
        autoScore: "8.0",
        teacherScore: "",
        feedback: "",
        gradedBy: "",
        gradedAt: "",
        questions: [
          {
            id: "lit-q1",
            type: "multiple_choice",
            prompt: "Hình tượng nhân vật trung tâm trong bài thơ Tây Tiến của Quang Dũng là ai?",
            options: ["Người lính Tây Tiến hào hoa, bi tráng", "Người nông dân lam lũ", "Hình ảnh thiên nhiên Tây Bắc", "Người mẹ Việt Nam anh hùng"],
            answerIndex: 0
          },
          {
            id: "lit-q2",
            type: "true_false",
            prompt: "Bài thơ Tây Tiến được sáng tác năm 1948 tại làng Phù Lưu Chanh?",
            correct: "Đúng"
          },
          {
            id: "lit-q3",
            type: "essay_writing",
            prompt: "Phân tích vẻ đẹp hào hùng và hào hoa của người lính trong bài thơ Tây Tiến của Quang Dũng.",
            outline: [
              "Gợi ý mở bài: Giới thiệu tác giả Quang Dũng, hoàn cảnh ra đời bài thơ Tây Tiến và cảm hứng lãng mạn, bi tráng.",
              "Gợi ý thân bài: Vẻ đẹp người lính vượt muôn vàn gian nan 'súng ngửi trời'; nét hào hoa, lãng mạn 'mộng qua biên giới', 'dáng kiều thơm'; sự hi sinh bất tử.",
              "Gợi ý kết bài: Khẳng định vị thế bất hủ của tượng đài người lính trong nền thi ca kháng chiến Việt Nam."
            ]
          }
        ],
        answers: {
          "lit-q1": 0,
          "lit-q2": "Đúng",
          "lit-q3": "Trong nền thi ca kháng chiến chống Pháp, bài thơ Tây Tiến của Quang Dũng là một kiệt tác bất hủ kết tinh vẻ đẹp lãng mạn và tinh thần bi tráng. Tác phẩm đã tạc nên một tượng đài nghệ thuật tuyệt đẹp về người lính vệ quốc trong những năm tháng gian nan mà anh dũng.\n\nTrước hết, vẻ đẹp của người lính Tây Tiến gắn liền với chặng đường hành quân đầy thử thách khắc nghiệt giữa núi rừng Tây Bắc hiểm trở: 'Dốc lên khúc khuỷu dốc thăm thẳm / Heo hút cồn mây súng ngửi trời'. Dù đối mặt với muôn vàn gian khổ, thiếu thốn, bệnh tật hiểm nghèo, các anh vẫn giữ vững tinh thần lạc quan, kiên cường và khí phách hiên ngang.\n\nKhông chỉ có chất thép kiên cường, tâm hồn người lính còn ngời sáng chất thơ hào hoa của những chàng trai đất Hà thành: 'Mắt trừng gửi mộng qua biên giới / Đêm mơ Hà Nội dáng kiều thơm'. Giấc mơ về quê hương, về hình bóng người thương không làm nhụt đi ý chí chiến đấu mà trái lại, trở thành nguồn động lực tinh thần to lớn nâng bước các anh trên đường tiến quân.\n\nĐặc biệt, sự hi sinh của người lính Tây Tiến được tác giả miêu tả bằng những ngôn từ trang trọng, bi tráng mà không bi lụy: 'Áo bào thay chiếu anh về đất / Sông Mã gầm lên khúc độc hành'. Dù ngã xuống nơi chiến trường xa xôi, các anh đã hóa thân vào non sông đất nước, bất tử cùng thời gian.\n\nTây Tiến mãi mãi là một bài ca kiêu hãnh về một thế hệ thanh niên Việt Nam sẵn sàng hiến dâng tuổi thanh xuân vì độc lập tự do của Tổ quốc."
        }
      },
      {
        id: "sub-exam-2",
        gradeId: "grade-sub-2",
        quizId: "quiz-math-12-1",
        quizTitle: "Kiểm tra 15 phút: Cực trị & Sự biến thiên Hàm số",
        course: "Toán",
        grade: "12",
        studentName: "Trần Thị Mai",
        studentEmail: "tranmai@gmail.com",
        submittedAt: "01/10/2026, 15:20",
        status: "pending",
        autoScore: "9.0",
        teacherScore: "",
        feedback: "",
        gradedBy: "",
        gradedAt: "",
        questions: [
          {
            id: "math-q1",
            type: "multiple_choice",
            prompt: "Cho hàm số y = f(x) có đạo hàm f'(x) = x(x-1)^2. Số điểm cực trị của hàm số là:",
            options: ["1 điểm cực trị", "2 điểm cực trị", "3 điểm cực trị", "0 điểm cực trị"],
            answerIndex: 0
          },
          {
            id: "math-q2",
            type: "short_answer",
            prompt: "Tìm giá trị cực tiểu của hàm số y = x^3 - 3x + 2 trên R.",
            correctAnswer: "0"
          }
        ],
        answers: {
          "math-q1": 0,
          "math-q2": "0"
        }
      },
      {
        id: "sub-exam-3",
        gradeId: "grade-sub-3",
        quizId: "quiz-phys-12-1",
        quizTitle: "Khảo sát Dao động cơ & Con lắc lò xo",
        course: "Vật lí",
        grade: "12",
        studentName: "Lê Hoàng Long",
        studentEmail: "lelong@gmail.com",
        submittedAt: "30/09/2026, 09:15",
        status: "graded",
        autoScore: "8.5",
        teacherScore: "9.0",
        feedback: "Làm bài rất tốt! Phương pháp lập luận định luật bảo toàn năng lượng chuẩn xác, bài làm sạch sẽ.",
        gradedBy: "Thầy Nguyễn (Bộ môn Tự nhiên)",
        gradedAt: "30/09/2026, 10:00",
        questions: [
          {
            id: "phy-q1",
            type: "multiple_choice",
            prompt: "Chu kỳ dao động điều hòa của con lắc lò xo phụ thuộc vào yếu tố nào?",
            options: ["Khối lượng vật và độ cứng lò xo", "Biên độ dao động", "Gia tốc trọng trường", "Vận tốc ban đầu"],
            answerIndex: 0
          }
        ],
        answers: {
          "phy-q1": 0
        }
      }
    ]);
    return Array.isArray(data) ? data : [];
  };

  const saveStoredExamSubmissions = (submissions) => {
    safeSetJSON("edunovaExamSubmissions", submissions);
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

  // ============ Schedule Map (Thời khóa biểu) ============
  const scheduleMap = {
    "Toán học": {
      title: "Toán học",
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
    "Vật lý": {
      title: "Vật lý",
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
    "Hóa học": {
      title: "Hóa học",
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
    "Ngữ văn": {
      title: "Ngữ văn",
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
    "Tiếng Anh": {
      title: "Tiếng Anh",
      summary: [
        "⚡ 5 buổi ngữ pháp & từ vựng",
        "📘 4 buổi luyện đề Reading/Listening",
        "🧠 2 buổi chấm chữa bài chi tiết"
      ],
      timetable: [
        { day: "Thứ 2", lesson: "Tổng ôn 12 Thì & Mệnh đề", time: "18:00 - 19:30" },
        { day: "Thứ 3", lesson: "Chiến thuật Reading Comprehension", time: "19:30 - 21:00" },
        { day: "Thứ 4", lesson: "Ngữ âm & Trọng âm cốt lõi", time: "18:00 - 19:30" },
        { day: "Thứ 5", lesson: "Từ vựng theo chủ đề THPT", time: "19:30 - 21:00" },
        { day: "Thứ 6", lesson: "Giải đề thi thử THPT Quốc gia", time: "20:00 - 21:30" }
      ],
      progress: 85,
      nextLesson: "Tổng ôn 12 Thì & Mệnh đề",
      nextTime: "Thứ 2 · 18:00 - 19:30"
    },
    "Tin học": {
      title: "Tin học",
      summary: [
        "⚡ 4 buổi cú pháp & mảng",
        "📘 3 buổi thuật toán & bài tập",
        "🧠 2 buổi review code"
      ],
      timetable: [
        { day: "Thứ 2", lesson: "Cấu trúc dữ liệu List & Dict", time: "19:00 - 21:00" },
        { day: "Thứ 4", lesson: "Thuật toán sắp xếp & tìm kiếm", time: "19:00 - 21:00" },
        { day: "Thứ 6", lesson: "Thực hành giải bài tập tự động", time: "19:00 - 21:00" }
      ],
      progress: 75,
      nextLesson: "Cấu trúc dữ liệu List & Dict",
      nextTime: "Thứ 2 · 19:00 - 21:00"
    }
  };

  const updateSchedule = (courseTitle) => {
    const shortName = cleanSubjectName(courseTitle);
    const selectedCourse = scheduleMap[shortName] || scheduleMap[courseTitle] || scheduleMap["Toán học"];
    const scheduleCourseTitle = document.getElementById("scheduleCourseTitle");
    const scheduleSummary = document.getElementById("scheduleSummary");
    const scheduleTimetable = document.getElementById("scheduleTimetable");
    const heroProgressValue = document.getElementById("heroProgressValue");
    const heroNextCourse = document.getElementById("heroNextCourse");

    if (scheduleCourseTitle) scheduleCourseTitle.textContent = selectedCourse.title;
    if (heroNextCourse) heroNextCourse.textContent = selectedCourse.nextLesson;
    if (heroProgressValue) heroProgressValue.textContent = `${selectedCourse.progress}%`;

    if (scheduleSummary) {
      scheduleSummary.innerHTML = selectedCourse.summary.map((item) => `<li>${item}</li>`).join("");
    }

    if (scheduleTimetable) {
      scheduleTimetable.innerHTML = selectedCourse.timetable
        .map(
          (item, idx) => `
            <div class="day ${idx === 0 ? "active" : ""}">
              <div>
                <strong>${item.day}</strong>
                <span>${item.lesson}</span>
              </div>
              <small>${item.time}</small>
            </div>
          `
        )
        .join("");
    }
  };

  // ============ LIVE TIMETABLE & ZOOM VIRTUAL CLASSROOM SYSTEM ============
  const DEFAULT_LIVE_SESSIONS = [
    {
      id: "live-session-1",
      subject: "Ngữ văn",
      title: "Chuyên đề: Cảm hứng lãng mạn & Tinh thần bi tráng trong Tây Tiến (Quang Dũng)",
      teacher: "Cô Mai (Tổ trưởng Ngữ văn)",
      teacherAvatar: "👩‍🏫",
      grade: "12",
      day: "Thứ 6",
      isToday: true,
      time: "19:30 - 21:00",
      meetingId: "889-423-668",
      passcode: "123456",
      status: "live", // "live" | "upcoming"
      studentsCount: 38,
      slides: [
        {
          subject: "NGỮ VĂN 12 · TÂY TIẾN",
          title: "Phần 1: Hoàn cảnh sáng tác & Cảm hứng lãng mạn",
          quote: "« Tây Tiến người đi không hẹn ước / Đường lên thăm thẳm một chia phôi... »",
          points: [
            { icon: "📍", text: "<strong>Hoàn cảnh ra đời:</strong> Sáng tác năm 1948 tại làng Phù Lưu Chanh khi Quang Dũng rời xa đơn vị Tây Tiến chưa bao lâu." },
            { icon: "✨", text: "<strong>Cảm hứng lãng mạn:</strong> Khắc họa vẻ đẹp tâm hồn trẻ trung, mộng mơ và lý tưởng cống hiến vì độc lập của thế hệ trẻ Hà thành." },
            { icon: "⛰️", text: "<strong>Địa bàn hoạt động:</strong> Núi rừng Tây Bắc và biên giới Việt - Lào hiểm trở, hùng vĩ mà thơ mộng." }
          ]
        },
        {
          subject: "NGỮ VĂN 12 · TÂY TIẾN",
          title: "Phần 2: Hình tượng Người Lính vượt gian khổ hiểm nguy",
          quote: "« Dốc lên khúc khuỷu dốc thăm thẳm / Heo hút cồn mây súng ngửi trời »",
          points: [
            { icon: "⚡", text: "<strong>Thiên nhiên dữ dội:</strong> Những con dốc cheo leo, vực sâu thăm thẳm được đặc tả bằng nhịp thơ gân guốc, giàu thanh trắc." },
            { icon: "🎖️", text: "<strong>Tư thế hiên ngang:</strong> 'Súng ngửi trời' thể hiện độ cao của dốc núi lẫn khí phách tếu táo, lạc quan của người lính." },
            { icon: "🌙", text: "<strong>Nét hào hoa:</strong> 'Mắt trừng gửi mộng qua biên giới / Đêm mơ Hà Nội dáng kiều thơm' — tình yêu quê hương tiếp thêm sức mạnh." }
          ]
        },
        {
          subject: "NGỮ VĂN 12 · TÂY TIẾN",
          title: "Phần 3: Bức tượng đài Bi Tráng & Sự hi sinh bất tử",
          quote: "« Áo bào thay chiếu anh về đất / Sông Mã gầm lên khúc độc hành »",
          points: [
            { icon: "🛡️", text: "<strong>Hiện thực khốc liệt:</strong> Bệnh tật sốt rét rừng, thiếu thốn quân trang nhưng tác giả dùng từ trang trọng 'áo bào' để trân trọng sự hi sinh." },
            { icon: "🌊", text: "<strong>Âm hưởng bi tráng:</strong> 'Sông Mã gầm lên khúc độc hành' — thiên nhiên tấu lên bản tráng ca tiễn đưa các anh vào cõi bất tử." },
            { icon: "💎", text: "<strong>Khúc vĩ thanh:</strong> Tác phẩm bất hủ kết tinh chủ nghĩa yêu nước và vẻ đẹp tâm hồn người lính thời đại Hồ Chí Minh." }
          ]
        },
        {
          subject: "NGỮ VĂN 12 · TÂY TIẾN",
          title: "Phần 4: Tổng kết & Bài tập rèn luyện kỹ năng viết",
          quote: "« Hướng dẫn viết đoạn văn nghị luận 200 chữ về vẻ đẹp bi tráng »",
          points: [
            { icon: "📝", text: "<strong>Yêu cầu bài tập:</strong> Viết đoạn văn 200 chữ phân tích vẻ đẹp bi tráng trong 8 câu thơ đầu của bài thơ Tây Tiến." },
            { icon: "⏰", text: "<strong>Hạn nộp bài:</strong> Trước 22:00 Chủ nhật tuần này trên mục Nộp bài tập hệ thống EduNova." },
            { icon: "🎯", text: "<strong>Tiết học tới:</strong> Chữa bài chi tiết và luyện đề đọc hiểu mở rộng tác phẩm Việt Bắc." }
          ]
        }
      ]
    },
    {
      id: "live-session-2",
      subject: "Toán",
      title: "Tổng ôn Cực trị, Điểm uốn & Tương giao Đồ thị Hàm số 12",
      teacher: "Thầy Nguyễn (Chuyên Toán THPT)",
      teacherAvatar: "👨‍🏫",
      grade: "12",
      day: "Thứ 6",
      isToday: true,
      time: "20:00 - 21:30",
      meetingId: "672-918-335",
      passcode: "654321",
      status: "live",
      studentsCount: 45,
      slides: [
        {
          subject: "TOÁN HỌC 12 · HÀM SỐ",
          title: "Phần 1: Điều kiện cần và đủ của Cực trị Hàm số",
          quote: "« Định lý 1: Đạo hàm đổi dấu qua điểm x0 — Định lý 2: Sử dụng đạo hàm cấp 2 »",
          points: [
            { icon: "📐", text: "<strong>Điều kiện cần:</strong> Nếu hàm số đạt cực trị tại x0 và có đạo hàm thì f'(x0) = 0." },
            { icon: "🔄", text: "<strong>Quy tắc 1:</strong> f'(x) đổi dấu từ dương sang âm qua x0 ➔ cực đại; từ âm sang dương ➔ cực tiểu." },
            { icon: "⚡", text: "<strong>Quy tắc 2:</strong> f'(x0) = 0 và f''(x0) < 0 ➔ cực đại; f''(x0) > 0 ➔ cực tiểu." }
          ]
        },
        {
          subject: "TOÁN HỌC 12 · HÀM SỐ",
          title: "Phần 2: Công thức giải nhanh Cực trị Hàm bậc ba & Trùng phương",
          quote: "« y = ax³ + bx² + cx + d có 2 điểm cực trị khi và chỉ khi b² - 3ac > 0 »",
          points: [
            { icon: "🎯", text: "<strong>Đường thẳng đi qua 2 cực trị:</strong> y = (2/3)(c - b²/3a)x + (d - bc/9a)." },
            { icon: "🔺", text: "<strong>Hàm trùng phương:</strong> Có 3 điểm cực trị khi a.b < 0; 3 điểm tạo tam giác vuông khi b³ + 8a = 0." },
            { icon: "💡", text: "<strong>Tam giác đều:</strong> Có 3 điểm cực trị tạo tam giác đều khi b³ + 24a = 0." }
          ]
        },
        {
          subject: "TOÁN HỌC 12 · HÀM SỐ",
          title: "Phần 3: Bài tập ví dụ trắc nghiệm chuyên sâu",
          quote: "« Tìm tất cả giá trị thực của tham số m để hàm số có 3 điểm cực trị »",
          points: [
            { icon: "🔍", text: "<strong>Ví dụ 1:</strong> Cho y = x⁴ - 2mx² + m - 1. Tìm m để tam giác tạo bởi 3 điểm cực trị có diện tích S = 32." },
            { icon: "⚙️", text: "<strong>Phương pháp giải:</strong> Tọa độ 3 đỉnh: A(0; m-1), B(-√m; -m²+m-1), C(√m; -m²+m-1). Áp dụng S = √m⁵ = 32 ➔ m = 4." },
            { icon: "✨", text: "<strong>Kỹ năng Casio:</strong> Sử dụng chức năng Table (Mode 8) để quét nhanh khoảng nghiệm tham số m." }
          ]
        },
        {
          subject: "TOÁN HỌC 12 · HÀM SỐ",
          title: "Phần 4: Tổng kết & Đề thi thử kiểm tra kiến thức",
          quote: "« Hệ thống hóa toàn bộ công thức và phương pháp phân tích bảng biến thiên »",
          points: [
            { icon: "📊", text: "<strong>Luyện đề:</strong> Truy cập mục 'Làm bài kiểm tra' trên EduNova để làm đề 15 phút Toán cực trị." },
            { icon: "🏆", text: "<strong>Đua bảng xếp hạng:</strong> Điểm số bài thi sẽ được cộng trực tiếp vào Bảng xếp hạng tuần!" }
          ]
        }
      ]
    },
    {
      id: "live-session-3",
      subject: "Vật lí",
      title: "Khảo sát Mạch RLC nối tiếp, Hiện tượng Cộng hưởng & Bài toán Cực trị",
      teacher: "Thầy Hoàng (Chuyên Lý)",
      teacherAvatar: "👨‍🏫",
      grade: "12",
      day: "Thứ 7",
      isToday: false,
      time: "08:00 - 09:30",
      meetingId: "331-892-104",
      passcode: "112233",
      status: "upcoming",
      studentsCount: 32,
      slides: [
        {
          subject: "VẬT LÍ 12 · ĐIỆN XOAY CHIỀU",
          title: "Hiện tượng Cộng hưởng điện trong mạch RLC",
          quote: "« Điều kiện cộng hưởng: ZL = ZC hay ω = 1/√(LC) »",
          points: [
            { icon: "⚡", text: "Khi cộng hưởng, trở kháng mạch đạt cực tiểu: Zmin = R." },
            { icon: "📈", text: "Cường độ dòng điện hiệu dụng đạt cực đại: Imax = U/R." },
            { icon: "💡", text: "Điện áp cùng pha với dòng điện: φ = 0, hệ số công suất cosφ = 1." }
          ]
        }
      ]
    },
    {
      id: "live-session-4",
      subject: "Tiếng Anh",
      title: "Mastering Inversion & Advanced Conditional Sentences in THPT",
      teacher: "Cô Jessica (GV Tiếng Anh)",
      teacherAvatar: "👩‍🏫",
      grade: "12",
      day: "Thứ 7",
      isToday: false,
      time: "14:00 - 15:30",
      meetingId: "512-443-890",
      passcode: "998877",
      status: "upcoming",
      studentsCount: 40,
      slides: [
        {
          subject: "TIẾNG ANH 12 · ADVANCED GRAMMAR",
          title: "Inversion with Negative Adverbials",
          quote: "« Seldom / Never / Hardly had S + V3 when S + V2 »",
          points: [
            { icon: "📌", text: "Hardly / Scarcely had I arrived home when the storm broke out." },
            { icon: "📌", text: "No sooner had we finished the exam than the bell rang." },
            { icon: "📌", text: "Only when / Only after + clause + Auxiliary + S + V." }
          ]
        }
      ]
    },
    {
      id: "live-session-5",
      subject: "Hóa học",
      title: "Phân dạng Bài toán Este đa chức & Phương pháp Quy đổi Đồng đẳng hóa",
      teacher: "Thầy Đức (GV Hóa học)",
      teacherAvatar: "👨‍🏫",
      grade: "12",
      day: "Chủ nhật",
      isToday: false,
      time: "09:00 - 10:30",
      meetingId: "782-120-994",
      passcode: "123123",
      status: "upcoming",
      studentsCount: 29,
      slides: [
        {
          subject: "HÓA HỌC 12 · HỢP CHẤT HỮU CƠ",
          title: "Phương pháp Quy đổi Este đa chức",
          quote: "« Quy đổi hỗn hợp về: HCOOH, CH2 và H2 (nếu không no) »",
          points: [
            { icon: "🧪", text: "Bảo toàn nguyên tố C, H, O và bảo toàn liên kết pi." },
            { icon: "⚖️", text: "Xác định nhanh số mol nhóm chức -COO- từ phản ứng thủy phân NaOH." }
          ]
        }
      ]
    }
  ];

  const getStoredLiveSessions = () => {
    const data = safeGetJSON("edunovaLiveSessions", DEFAULT_LIVE_SESSIONS);
    return Array.isArray(data) && data.length > 0 ? data : DEFAULT_LIVE_SESSIONS;
  };

  const saveStoredLiveSessions = (sessions) => {
    safeSetJSON("edunovaLiveSessions", sessions);
  };

  // Live Timetable Filters State
  let liveFilterDay = "all";
  let liveFilterGrade = "all";
  let liveFilterSubject = "all";

  const renderLiveSessionsGrid = () => {
    const grid = document.getElementById("liveSessionsGrid");
    if (!grid) return;

    const sessions = getStoredLiveSessions();
    const filtered = sessions.filter((s) => {
      if (liveFilterDay === "today" && !s.isToday && s.day !== "Thứ 6") return false;
      if (liveFilterDay !== "all" && liveFilterDay !== "today" && s.day !== liveFilterDay) return false;
      if (liveFilterGrade !== "all" && s.grade !== liveFilterGrade) return false;
      if (liveFilterSubject !== "all" && cleanSubjectName(s.subject) !== cleanSubjectName(liveFilterSubject)) return false;
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #ffffff; border-radius: 18px; border: 1.5px dashed #cbd5e1; color: #64748b;">
          <span style="font-size: 2.8rem; display: block; margin-bottom: 12px;">📅</span>
          <h4 style="margin: 0 0 6px 0; color: #1e293b; font-size: 1.1rem;">Chưa có lịch học online nào phù hợp với bộ lọc</h4>
          <p style="margin: 0; font-size: 0.9rem;">Thầy/Cô và học sinh có thể chọn ngày hoặc môn học khác để xem lịch trực tiếp.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered
      .map((s) => {
        const isLive = s.status === "live";
        const subjectClean = cleanSubjectName(s.subject);
        return `
          <div class="live-session-card ${isLive ? "is-live" : ""}">
            <div class="live-card-top-bar">
              <span class="card-subject-pill">${subjectClean} · Khối ${s.grade || "12"}</span>
              ${
                isLive
                  ? `<span class="card-status-badge live"><span class="live-dot-pulse"></span> Đang trực tiếp (${s.studentsCount || 36} HS)</span>`
                  : `<span class="card-status-badge upcoming">⏳ Sắp diễn ra</span>`
              }
            </div>
            <div class="live-card-body">
              <h3 class="live-card-title">${s.title}</h3>
              <div class="live-card-teacher">
                <div class="teacher-avatar-sm">${s.teacherAvatar || "👨‍🏫"}</div>
                <div class="teacher-name-sm">${s.teacher}</div>
              </div>
              <div class="live-card-meta">
                <div class="meta-row">
                  <span>Lịch học:</span>
                  <strong>${s.day} · ${s.time}</strong>
                </div>
                <div class="meta-row">
                  <span>Phòng Zoom ID:</span>
                  <strong>${s.meetingId}</strong>
                </div>
                <div class="meta-row">
                  <span>Mật mã (Pass):</span>
                  <strong>${s.passcode}</strong>
                </div>
              </div>
            </div>
            <div class="live-card-footer">
              <button type="button" class="btn-join-live ${isLive ? "active-live" : "secondary-live"} btn-trigger-join-room" data-session-id="${s.id}">
                <span>${isLive ? "🚀 Vào phòng học ngay" : "🚪 Xem phòng học"}</span>
              </button>
            </div>
          </div>
        `;
      })
      .join("");

    grid.querySelectorAll(".btn-trigger-join-room").forEach((btn) => {
      btn.addEventListener("click", () => {
        openLiveClassroom(btn.dataset.sessionId);
      });
    });
  };

  // Filter day pills
  document.querySelectorAll("#scheduleDayFilters .sched-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll("#scheduleDayFilters .sched-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      liveFilterDay = pill.dataset.day || "all";
      renderLiveSessionsGrid();
    });
  });

  // Filter dropdowns
  const filterLiveGrade = document.getElementById("filterLiveGrade");
  if (filterLiveGrade) {
    filterLiveGrade.addEventListener("change", (e) => {
      liveFilterGrade = e.target.value;
      renderLiveSessionsGrid();
    });
  }

  const filterLiveSubject = document.getElementById("filterLiveSubject");
  if (filterLiveSubject) {
    filterLiveSubject.addEventListener("change", (e) => {
      liveFilterSubject = e.target.value;
      renderLiveSessionsGrid();
    });
  }

  // Quick join first live class
  if (btnQuickJoinLive) {
    btnQuickJoinLive.addEventListener("click", () => {
      const sessions = getStoredLiveSessions();
      const liveOne = sessions.find((s) => s.status === "live") || sessions[0];
      if (liveOne) {
        openLiveClassroom(liveOne.id);
      }
    });
  }

  // Teacher Schedule new online live session
  if (openCreateLiveSessionBtn) {
    openCreateLiveSessionBtn.addEventListener("click", () => {
      openModalElement(createLiveSessionModal);
    });
  }

  const createLiveSessionForm = document.getElementById("createLiveSessionForm");
  if (createLiveSessionForm) {
    createLiveSessionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const subject = document.getElementById("liveSessionSubject")?.value || "Toán";
      const title = document.getElementById("liveSessionTitle")?.value || "Chuyên đề ôn tập";
      const teacher = document.getElementById("liveSessionTeacher")?.value || "Giáo viên EduNova";
      const grade = document.getElementById("liveSessionGrade")?.value || "12";
      const day = document.getElementById("liveSessionDay")?.value || "Thứ 2";
      const time = document.getElementById("liveSessionTime")?.value || "19:30 - 21:00";
      const passcode = document.getElementById("liveSessionPass")?.value || "123456";
      const desc = document.getElementById("liveSessionDesc")?.value || "";

      const randomMeetingId = `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`;

      const newSession = {
        id: `live-session-${Date.now()}`,
        subject,
        title,
        teacher,
        teacherAvatar: "👨‍🏫",
        grade,
        day,
        isToday: false,
        time,
        meetingId: randomMeetingId,
        passcode,
        status: "upcoming",
        studentsCount: 30,
        slides: [
          {
            subject: `${subject.toUpperCase()} ${grade}`,
            title: `Bài giảng: ${title}`,
            quote: `« Giáo viên: ${teacher} — Khung giờ: ${time} »`,
            points: [
              { icon: "📌", text: desc || "Nắm vững lý thuyết trọng tâm và phương pháp giải các bài toán hay gặp." },
              { icon: "💡", text: "Học sinh chuẩn bị vở ghi và tập trung theo dõi bài giảng trực tuyến." }
            ]
          }
        ]
      };

      const sessions = getStoredLiveSessions();
      sessions.unshift(newSession);
      saveStoredLiveSessions(sessions);

      closeModalElement(createLiveSessionModal);
      createLiveSessionForm.reset();
      renderLiveSessionsGrid();
      showToast(`🎉 Đã lên lịch thành công buổi học trực tuyến môn ${subject}! Phòng: ${randomMeetingId}`);
    });
  }

  // ============ ZOOM VIRTUAL CLASSROOM STATE & LOGIC ============
  let activeLiveSession = null;
  let zoomTimerInterval = null;
  let zoomElapsedSeconds = 45 * 60 + 18;
  let isZoomMicOn = true;
  let isZoomCamOn = true;
  let isZoomHandRaised = false;
  let isZoomRecording = true;
  let zoomCurrentSlideIdx = 0;
  let zoomCurrentView = "slide"; // "slide" | "whiteboard" | "gallery"

  // Whiteboard drawing variables
  let chalkColor = "#ffffff";
  let chalkSize = 3;
  let isDrawingChalk = false;
  let lastChalkX = 0;
  let lastChalkY = 0;

  // Mock participants (36 members)
  const ZOOM_PARTICIPANTS = [
    { name: "Thầy Nguyễn (Chủ tọa / GV)", role: "host", avatar: "👨‍🏫", isMic: true, isCam: true, hand: false },
    { name: "Cô Mai (Đồng chủ tọa)", role: "co-host", avatar: "👩‍🏫", isMic: true, isCam: true, hand: false },
    { name: "Nguyễn Văn A (Lớp 12A1)", role: "student", avatar: "👨‍🎓", isMic: false, isCam: true, hand: false },
    { name: "Trần Thị Mai (Lớp 12A2)", role: "student", avatar: "👩‍🎓", isMic: false, isCam: true, hand: false },
    { name: "Lê Hoàng Long (Lớp 12A1)", role: "student", avatar: "👨‍🎓", isMic: true, isCam: true, hand: false },
    { name: "Phạm Minh Đức (Lớp 12A3)", role: "student", avatar: "👨‍🎓", isMic: false, isCam: false, hand: false },
    { name: "Đỗ Bảo Trâm (Lớp 12A1)", role: "student", avatar: "👩‍🎓", isMic: false, isCam: true, hand: false },
    { name: "Vũ Hải Đăng (Lớp 12A2)", role: "student", avatar: "👨‍🎓", isMic: false, isCam: true, hand: false },
    { name: "Hoàng Gia Huy (Lớp 12A1)", role: "student", avatar: "👨‍🎓", isMic: false, isCam: false, hand: false },
    { name: "Nguyễn Thùy Linh (Lớp 12A3)", role: "student", avatar: "👩‍🎓", isMic: false, isCam: true, hand: false },
    { name: "Bùi Tuấn Kiệt (Lớp 12A2)", role: "student", avatar: "👨‍🎓", isMic: false, isCam: true, hand: false },
    { name: "Dương Quỳnh Anh (Lớp 12A1)", role: "student", avatar: "👩‍🎓", isMic: false, isCam: true, hand: false }
  ];

  // Mock chat messages
  const ZOOM_CHAT_HISTORY = [
    { author: "Thầy Nguyễn", time: "19:35", text: "Chào cả lớp, các em chuẩn bị vở ghi và mở tài liệu chuyên đề nhé!" },
    { author: "Nguyễn Văn A", time: "19:36", text: "Dạ em nghe rõ và đã sẵn sàng rồi ạ thầy!" },
    { author: "Trần Thị Mai", time: "19:38", text: "Thầy ơi cho em hỏi phần slide 2 đoạn luận điểm thứ 2 có ghi lại không ạ?" },
    { author: "Thầy Nguyễn", time: "19:40", text: "Có nhé em, cuối buổi thầy gửi slide và video ghi hình đầy đủ lên lớp học." },
    { author: "Lê Hoàng Long", time: "19:45", text: "Phần này hay quá thầy ơi! 👍" }
  ];

  const formatZoomTimer = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h > 0 ? String(h).padStart(2, "0") + ":" : ""}${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const openLiveClassroom = (sessionId) => {
    const sessions = getStoredLiveSessions();
    const session = sessions.find((s) => s.id === sessionId) || sessions[0];
    if (!session) return;

    activeLiveSession = session;
    zoomCurrentSlideIdx = 0;
    zoomElapsedSeconds = 45 * 60 + 18;

    // Header info
    const zoomSubjectPill = document.getElementById("zoomSubjectPill");
    const zoomRoomTitle = document.getElementById("zoomRoomTitle");
    const zoomMeetingId = document.getElementById("zoomMeetingId");
    const zoomMeetingPass = document.getElementById("zoomMeetingPass");
    const zoomTimer = document.getElementById("zoomTimer");

    if (zoomSubjectPill) zoomSubjectPill.textContent = `${cleanSubjectName(session.subject)} ${session.grade || "12"}`;
    if (zoomRoomTitle) zoomRoomTitle.textContent = session.title;
    if (zoomMeetingId) zoomMeetingId.textContent = session.meetingId;
    if (zoomMeetingPass) zoomMeetingPass.textContent = session.passcode;

    // Start live timer
    clearInterval(zoomTimerInterval);
    if (zoomTimer) zoomTimer.textContent = formatZoomTimer(zoomElapsedSeconds);
    zoomTimerInterval = setInterval(() => {
      zoomElapsedSeconds++;
      if (zoomTimer) zoomTimer.textContent = formatZoomTimer(zoomElapsedSeconds);
    }, 1000);

    // Render initial views
    renderZoomSlide(0);
    renderZoomGallery();
    renderZoomFloatingFilmstrip();
    renderZoomParticipantsList();
    renderZoomChatList();
    initWhiteboardCanvas();
    switchZoomView("slide");

    // Open modal window
    openModalElement(liveClassroomModal);
    showToast(`🔴 Đã kết nối vào phòng học trực tuyến: ${session.meetingId}!`);
  };

  const leaveLiveClassroom = () => {
    if (confirm("Bạn có chắc chắn muốn rời khỏi phòng học trực tuyến này?")) {
      clearInterval(zoomTimerInterval);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      closeModalElement(liveClassroomModal);
      showToast("🚪 Bạn đã rời khỏi phòng học trực tuyến.");
    }
  };

  const switchZoomView = (viewMode) => {
    zoomCurrentView = viewMode;
    const btnViewSlide = document.getElementById("btnViewSlide");
    const btnViewWhiteboard = document.getElementById("btnViewWhiteboard");
    const btnViewGallery = document.getElementById("btnViewGallery");
    const zoomSlideView = document.getElementById("zoomSlideView");
    const zoomWhiteboardView = document.getElementById("zoomWhiteboardView");
    const zoomGalleryView = document.getElementById("zoomGalleryView");
    const filmstrip = document.getElementById("zoomFloatingFilmstrip");

    [btnViewSlide, btnViewWhiteboard, btnViewGallery].forEach((b) => b && b.classList.remove("active"));
    [zoomSlideView, zoomWhiteboardView, zoomGalleryView].forEach((v) => v && v.classList.remove("active"));

    if (viewMode === "slide") {
      if (btnViewSlide) btnViewSlide.classList.add("active");
      if (zoomSlideView) zoomSlideView.classList.add("active");
      if (filmstrip) filmstrip.style.display = "flex";
    } else if (viewMode === "whiteboard") {
      if (btnViewWhiteboard) btnViewWhiteboard.classList.add("active");
      if (zoomWhiteboardView) zoomWhiteboardView.classList.add("active");
      if (filmstrip) filmstrip.style.display = "flex";
      resizeWhiteboardCanvas();
    } else if (viewMode === "gallery") {
      if (btnViewGallery) btnViewGallery.classList.add("active");
      if (zoomGalleryView) zoomGalleryView.classList.add("active");
      if (filmstrip) filmstrip.style.display = "none";
    }
  };

  const renderZoomSlide = (idx) => {
    if (!activeLiveSession || !Array.isArray(activeLiveSession.slides) || activeLiveSession.slides.length === 0) return;
    const slides = activeLiveSession.slides;
    zoomCurrentSlideIdx = Math.max(0, Math.min(idx, slides.length - 1));
    const cur = slides[zoomCurrentSlideIdx];

    const zoomSlideSubject = document.getElementById("zoomSlideSubject");
    const zoomSlideTitle = document.getElementById("zoomSlideTitle");
    const slidePageNum = document.getElementById("slidePageNum");
    const zoomSlideBody = document.getElementById("zoomSlideBody");

    if (zoomSlideSubject) zoomSlideSubject.textContent = cur.subject || "BÀI GIẢNG ĐIỆN TỬ";
    if (zoomSlideTitle) zoomSlideTitle.textContent = cur.title;
    if (slidePageNum) slidePageNum.textContent = `Trang ${zoomCurrentSlideIdx + 1} / ${slides.length}`;

    if (zoomSlideBody) {
      zoomSlideBody.innerHTML = `
        ${cur.quote ? `<div class="slide-hero-quote">${cur.quote}</div>` : ""}
        <div class="slide-content-points">
          ${(cur.points || [])
            .map(
              (p) => `
              <div class="slide-point-item">
                <span class="slide-point-icon">${p.icon || "•"}</span>
                <div>${p.text}</div>
              </div>
            `
            )
            .join("")}
        </div>
      `;
    }
  };

  // Slide navigation buttons
  const btnPrevSlide = document.getElementById("btnPrevSlide");
  const btnNextSlide = document.getElementById("btnNextSlide");
  if (btnPrevSlide) btnPrevSlide.addEventListener("click", () => renderZoomSlide(zoomCurrentSlideIdx - 1));
  if (btnNextSlide) btnNextSlide.addEventListener("click", () => renderZoomSlide(zoomCurrentSlideIdx + 1));

  // Gallery Grid rendering
  const renderZoomGallery = () => {
    const grid = document.getElementById("zoomGalleryGrid");
    if (!grid) return;

    grid.innerHTML = ZOOM_PARTICIPANTS.slice(0, 8)
      .map((p, idx) => {
        const isSpeaker = idx === 0;
        return `
          <div class="zoom-video-tile ${isSpeaker ? "active-speaker" : ""}">
            <div class="zoom-tile-avatar">${p.avatar}</div>
            <div class="zoom-tile-name-tag">
              <span>${p.name}</span>
              ${p.role === "host" ? `<span class="zoom-tile-role-badge">Host</span>` : ""}
              <span>${p.isMic ? "🎙️" : "🔇"}</span>
            </div>
          </div>
        `;
      })
      .join("");
  };

  // Floating Filmstrip rendering
  const renderZoomFloatingFilmstrip = () => {
    const strip = document.getElementById("zoomFloatingFilmstrip");
    if (!strip) return;

    strip.innerHTML = ZOOM_PARTICIPANTS.slice(0, 3)
      .map((p, idx) => `
        <div class="filmstrip-tile ${idx === 0 ? "active-speaker" : ""}">
          <div class="tile-avatar-mini">${p.avatar}</div>
          <div class="tile-name-mini">${p.name.split(" ")[0]} ${p.isMic ? "🎙️" : "🔇"}</div>
        </div>
      `)
      .join("");
  };

  // Participants list rendering
  const renderZoomParticipantsList = (query = "") => {
    const list = document.getElementById("zoomParticipantsList");
    const count = document.getElementById("zoomParticipantCount");
    if (!list) return;

    const filtered = ZOOM_PARTICIPANTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    if (count) count.textContent = ZOOM_PARTICIPANTS.length;

    list.innerHTML = filtered
      .map(
        (p) => `
        <div class="zoom-participant-item">
          <div class="part-info-left">
            <span class="part-avatar">${p.avatar}</span>
            <span class="part-name">${p.name}</span>
          </div>
          <div class="part-icons-right">
            ${p.hand ? `<span>✋</span>` : ""}
            <span>${p.isMic ? "🎙️" : "🔇"}</span>
            <span>${p.isCam ? "📹" : "🚫"}</span>
          </div>
        </div>
      `
      )
      .join("");
  };

  const inputSearchParticipants = document.getElementById("inputSearchParticipants");
  if (inputSearchParticipants) {
    inputSearchParticipants.addEventListener("input", (e) => {
      renderZoomParticipantsList(e.target.value.trim());
    });
  }

  const btnMuteAllParticipants = document.getElementById("btnMuteAllParticipants");
  if (btnMuteAllParticipants) {
    btnMuteAllParticipants.addEventListener("click", () => {
      ZOOM_PARTICIPANTS.forEach((p) => {
        if (p.role !== "host") p.isMic = false;
      });
      renderZoomParticipantsList();
      showToast("🔇 Đã tắt tiếng tất cả học sinh trong phòng học.");
    });
  }

  // Live Chat rendering
  const renderZoomChatList = () => {
    const messages = document.getElementById("zoomChatMessages");
    const badge = document.getElementById("zoomChatBadge");
    if (!messages) return;

    if (badge) badge.textContent = ZOOM_CHAT_HISTORY.length;

    messages.innerHTML = ZOOM_CHAT_HISTORY
      .map(
        (m) => `
        <div class="zoom-chat-msg">
          <div class="chat-msg-header">
            <span class="chat-author">${m.author}</span>
            <span class="chat-time">${m.time}</span>
          </div>
          <div class="chat-text">${m.text}</div>
        </div>
      `
      )
      .join("");

    messages.scrollTop = messages.scrollHeight;
  };

  const zoomChatForm = document.getElementById("zoomChatForm");
  const zoomChatInput = document.getElementById("zoomChatInput");
  if (zoomChatForm && zoomChatInput) {
    zoomChatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const txt = zoomChatInput.value.trim();
      if (!txt) return;

      const user = getCurrentUser();
      const author = user ? user.fullName : "Học viên (Bạn)";
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      ZOOM_CHAT_HISTORY.push({ author, time: timeStr, text: txt });
      zoomChatInput.value = "";
      renderZoomChatList();
    });
  }

  // Quick Emoji Reactions
  document.querySelectorAll(".quick-react-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const emoji = btn.dataset.emoji;
      const user = getCurrentUser();
      const author = user ? user.fullName : "Bạn";
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      ZOOM_CHAT_HISTORY.push({ author, time: timeStr, text: `Đã thả biểu cảm ${emoji}` });
      renderZoomChatList();
      showToast(`✨ Đã gửi phản ứng ${emoji} đến lớp học!`);
    });
  });

  // Whiteboard Canvas Interaction
  const initWhiteboardCanvas = () => {
    const canvas = document.getElementById("zoomWhiteboardCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Chalkboard drawing listeners
    const startDraw = (e) => {
      isDrawingChalk = true;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      lastChalkX = (clientX - rect.left) * (canvas.width / rect.width);
      lastChalkY = (clientY - rect.top) * (canvas.height / rect.height);
    };

    const draw = (e) => {
      if (!isDrawingChalk) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const currentX = (clientX - rect.left) * (canvas.width / rect.width);
      const currentY = (clientY - rect.top) * (canvas.height / rect.height);

      ctx.beginPath();
      ctx.moveTo(lastChalkX, lastChalkY);
      ctx.lineTo(currentX, currentY);
      ctx.strokeStyle = chalkColor;
      ctx.lineWidth = chalkSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowBlur = 1.5;
      ctx.shadowColor = chalkColor;
      ctx.stroke();

      lastChalkX = currentX;
      lastChalkY = currentY;
    };

    const stopDraw = () => {
      isDrawingChalk = false;
    };

    canvas.onmousedown = startDraw;
    canvas.onmousemove = draw;
    canvas.onmouseup = stopDraw;
    canvas.onmouseleave = stopDraw;

    canvas.ontouchstart = startDraw;
    canvas.ontouchmove = draw;
    canvas.ontouchend = stopDraw;
  };

  const resizeWhiteboardCanvas = () => {
    const canvas = document.getElementById("zoomWhiteboardCanvas");
    if (!canvas) return;
    const wrap = canvas.parentElement;
    if (wrap && wrap.clientWidth > 0) {
      canvas.width = wrap.clientWidth;
      canvas.height = wrap.clientHeight;
    }
  };

  // Chalk color dots
  document.querySelectorAll(".color-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      document.querySelectorAll(".color-dot").forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");
      chalkColor = dot.dataset.color || "#ffffff";
    });
  });

  // Chalk size buttons
  document.querySelectorAll(".chalk-sizes .size-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".chalk-sizes .size-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      chalkSize = parseInt(btn.dataset.size || "3", 10);
    });
  });

  // Clear whiteboard button
  const btnClearWhiteboard = document.getElementById("btnClearWhiteboard");
  if (btnClearWhiteboard) {
    btnClearWhiteboard.addEventListener("click", () => {
      const canvas = document.getElementById("zoomWhiteboardCanvas");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  }

  // Zoom View Mode Switching Buttons
  const btnViewSlide = document.getElementById("btnViewSlide");
  const btnViewWhiteboard = document.getElementById("btnViewWhiteboard");
  const btnViewGallery = document.getElementById("btnViewGallery");
  if (btnViewSlide) btnViewSlide.addEventListener("click", () => switchZoomView("slide"));
  if (btnViewWhiteboard) btnViewWhiteboard.addEventListener("click", () => switchZoomView("whiteboard"));
  if (btnViewGallery) btnViewGallery.addEventListener("click", () => switchZoomView("gallery"));

  // Zoom Fullscreen Toggle
  const btnToggleZoomFullscreen = document.getElementById("btnToggleZoomFullscreen");
  if (btnToggleZoomFullscreen) {
    btnToggleZoomFullscreen.addEventListener("click", () => {
      const win = document.querySelector(".zoom-classroom-window");
      if (!win) return;
      if (!document.fullscreenElement) {
        win.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  // Zoom Bottom Toolbar Buttons
  const zoomBtnMic = document.getElementById("zoomBtnMic");
  const zoomMicIcon = document.getElementById("zoomMicIcon");
  const zoomMicLabel = document.getElementById("zoomMicLabel");
  if (zoomBtnMic) {
    zoomBtnMic.addEventListener("click", () => {
      isZoomMicOn = !isZoomMicOn;
      if (isZoomMicOn) {
        if (zoomMicIcon) zoomMicIcon.textContent = "🎙️";
        if (zoomMicLabel) zoomMicLabel.textContent = "Tắt tiếng";
        zoomBtnMic.classList.remove("danger-muted");
        showToast("🎙️ Micro của bạn đã được BẬT.");
      } else {
        if (zoomMicIcon) zoomMicIcon.textContent = "🔇";
        if (zoomMicLabel) zoomMicLabel.textContent = "Bật tiếng";
        zoomBtnMic.classList.add("danger-muted");
        showToast("🔇 Micro của bạn đã được TẮT.");
      }
    });
  }

  const zoomBtnCam = document.getElementById("zoomBtnCam");
  const zoomCamIcon = document.getElementById("zoomCamIcon");
  const zoomCamLabel = document.getElementById("zoomCamLabel");
  if (zoomBtnCam) {
    zoomBtnCam.addEventListener("click", () => {
      isZoomCamOn = !isZoomCamOn;
      if (isZoomCamOn) {
        if (zoomCamIcon) zoomCamIcon.textContent = "📹";
        if (zoomCamLabel) zoomCamLabel.textContent = "Tắt Cam";
        zoomBtnCam.classList.remove("danger-muted");
        showToast("📹 Camera đã được BẬT.");
      } else {
        if (zoomCamIcon) zoomCamIcon.textContent = "🚫";
        if (zoomCamLabel) zoomCamLabel.textContent = "Bật Cam";
        zoomBtnCam.classList.add("danger-muted");
        showToast("🚫 Camera đã được TẮT.");
      }
    });
  }

  const zoomBtnShare = document.getElementById("zoomBtnShare");
  if (zoomBtnShare) {
    zoomBtnShare.addEventListener("click", () => {
      switchZoomView("slide");
      showToast("🖥️ Đang trình chiếu màn hình bài giảng điện tử.");
    });
  }

  const zoomBtnWhiteboard = document.getElementById("zoomBtnWhiteboard");
  if (zoomBtnWhiteboard) {
    zoomBtnWhiteboard.addEventListener("click", () => {
      switchZoomView("whiteboard");
      showToast("🎨 Đã mở bảng trắng viết phấn giảng dạy.");
    });
  }

  const zoomSidebar = document.getElementById("zoomSidebar");
  const tabBtnParticipants = document.getElementById("tabBtnParticipants");
  const tabBtnChat = document.getElementById("tabBtnChat");
  const zoomTabParticipants = document.getElementById("zoomTabParticipants");
  const zoomTabChat = document.getElementById("zoomTabChat");

  const switchZoomSidebarTab = (tabName) => {
    if (!zoomSidebar) return;
    zoomSidebar.classList.remove("collapsed");

    if (tabName === "participants") {
      if (tabBtnParticipants) tabBtnParticipants.classList.add("active");
      if (tabBtnChat) tabBtnChat.classList.remove("active");
      if (zoomTabParticipants) zoomTabParticipants.classList.add("active");
      if (zoomTabChat) zoomTabChat.classList.remove("active");
    } else {
      if (tabBtnChat) tabBtnChat.classList.add("active");
      if (tabBtnParticipants) tabBtnParticipants.classList.remove("active");
      if (zoomTabChat) zoomTabChat.classList.add("active");
      if (zoomTabParticipants) zoomTabParticipants.classList.remove("active");
    }
  };

  if (tabBtnParticipants) tabBtnParticipants.addEventListener("click", () => switchZoomSidebarTab("participants"));
  if (tabBtnChat) tabBtnChat.addEventListener("click", () => switchZoomSidebarTab("chat"));

  const zoomBtnParticipants = document.getElementById("zoomBtnParticipants");
  if (zoomBtnParticipants) {
    zoomBtnParticipants.addEventListener("click", () => {
      if (zoomSidebar && !zoomSidebar.classList.contains("collapsed") && zoomTabParticipants && zoomTabParticipants.classList.contains("active")) {
        zoomSidebar.classList.add("collapsed");
      } else {
        switchZoomSidebarTab("participants");
      }
    });
  }

  const zoomBtnChat = document.getElementById("zoomBtnChat");
  if (zoomBtnChat) {
    zoomBtnChat.addEventListener("click", () => {
      if (zoomSidebar && !zoomSidebar.classList.contains("collapsed") && zoomTabChat && zoomTabChat.classList.contains("active")) {
        zoomSidebar.classList.add("collapsed");
      } else {
        switchZoomSidebarTab("chat");
      }
    });
  }

  const zoomBtnRaiseHand = document.getElementById("zoomBtnRaiseHand");
  const zoomHandLabel = document.getElementById("zoomHandLabel");
  const zoomHandRaiseNotice = document.getElementById("zoomHandRaiseNotice");
  if (zoomBtnRaiseHand) {
    zoomBtnRaiseHand.addEventListener("click", () => {
      isZoomHandRaised = !isZoomHandRaised;
      const user = getCurrentUser();
      const userName = user ? user.fullName : "Bạn";

      if (isZoomHandRaised) {
        if (zoomHandLabel) zoomHandLabel.textContent = "Hạ tay";
        zoomBtnRaiseHand.classList.add("active");
        if (zoomHandRaiseNotice) {
          zoomHandRaiseNotice.innerHTML = `✋ <strong>${userName}</strong> đang giơ tay xin phát biểu!`;
          zoomHandRaiseNotice.style.display = "block";
          setTimeout(() => { if (zoomHandRaiseNotice) zoomHandRaiseNotice.style.display = "none"; }, 4000);
        }
        showToast("✋ Bạn đã giơ tay xin phát biểu trong lớp học!");
      } else {
        if (zoomHandLabel) zoomHandLabel.textContent = "Giơ tay";
        zoomBtnRaiseHand.classList.remove("active");
        if (zoomHandRaiseNotice) zoomHandRaiseNotice.style.display = "none";
        showToast("Bạn đã hạ tay.");
      }
    });
  }

  const zoomBtnRecord = document.getElementById("zoomBtnRecord");
  if (zoomBtnRecord) {
    zoomBtnRecord.addEventListener("click", () => {
      isZoomRecording = !isZoomRecording;
      if (isZoomRecording) {
        zoomBtnRecord.classList.add("active");
        showToast("🔴 Đang ghi hình buổi học trực tuyến trên đám mây.");
      } else {
        zoomBtnRecord.classList.remove("active");
        showToast("⏹ Đã dừng ghi hình buổi học.");
      }
    });
  }

  const zoomBtnLeave = document.getElementById("zoomBtnLeave");
  if (zoomBtnLeave) {
    zoomBtnLeave.addEventListener("click", leaveLiveClassroom);
  }

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
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 30px;">
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
                <div style="display: flex; gap: 6px; align-items: center;">
                  <button type="button" class="btn-delete-item-sm delete-course-btn" data-id="${course.id}" title="Xóa môn học">🗑️ Xóa</button>
                  <a href="#contact" data-open-signup data-course="${course.title}">Đăng ký</a>
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    courseGrid.querySelectorAll("[data-open-signup]").forEach((button) => {
      button.addEventListener("click", openSignupModal);
    });

    courseGrid.querySelectorAll(".delete-course-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteCourse(button.dataset.id);
      });
    });
  };

  // Populate Course Dropdowns
  const populateCourseDropdowns = () => {
    const courses = getStoredCourses();
    const courseSelects = [
      document.getElementById("course"),
      document.getElementById("assignmentCourse"),
      document.getElementById("materialCourse"),
      document.getElementById("newQuizCourse"),
      document.getElementById("settingsCourse")
    ];

    courseSelects.forEach((select) => {
      if (!select) return;
      const currentValue = select.value;
      select.innerHTML = '<option value="">-- Chọn môn học --</option>';
      courses.forEach((c) => {
        const option = document.createElement("option");
        option.value = c.title;
        option.textContent = `${c.icon || "📚"} ${c.title}`;
        select.appendChild(option);
      });
      if (currentValue) select.value = currentValue;
    });
  };

  const filterTabs = document.querySelectorAll(".filter-tabs .tab");
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      filterTabs.forEach((t) => t.classList.remove("active"));
      e.currentTarget.classList.add("active");
      currentCategoryFilter = e.currentTarget.dataset.filter || "all";
      renderCourses();
    });
  });
  // ============ Modals Elements ============
  const signupModal = document.getElementById("signupModal");
  const loginModal = document.getElementById("loginModal");
  const createCourseModal = document.getElementById("createCourseModal");
  const createAssignmentModal = document.getElementById("createAssignmentModal");
  const submitAssignmentModal = document.getElementById("submitAssignmentModal");
  const viewSubmissionsModal = document.getElementById("viewSubmissionsModal");
  const createMaterialModal = document.getElementById("createMaterialModal");
  const viewMaterialModal = document.getElementById("viewMaterialModal");
  const takeQuizModal = document.getElementById("takeQuizModal");
  const createQuizModal = document.getElementById("createQuizModal");
  const settingsModal = document.getElementById("settingsModal");
  const gradeExamModal = document.getElementById("gradeExamModal");
  const openGradeExamsBtn = document.getElementById("openGradeExamsBtn");
  const teacherPendingBadge = document.getElementById("teacherPendingBadge");
  const filterPendingCount = document.getElementById("filterPendingCount");
  const inputTeacherScore = document.getElementById("inputTeacherScore");
  const gradeRankTag = document.getElementById("gradeRankTag");
  const gradeAutoHint = document.getElementById("gradeAutoHint");
  const teacherFeedbackText = document.getElementById("teacherFeedbackText");
  const btnSaveGrading = document.getElementById("btnSaveGrading");
  const gradingSubmissionsList = document.getElementById("gradingSubmissionsList");

  const liveClassroomModal = document.getElementById("liveClassroomModal");
  const createLiveSessionModal = document.getElementById("createLiveSessionModal");
  const openCreateLiveSessionBtn = document.getElementById("openCreateLiveSessionBtn");
  const btnQuickJoinLive = document.getElementById("btnQuickJoinLive");

  const signupBtn = document.getElementById("signupBtn");
  const loginBtn = document.getElementById("loginBtn");
  const userProfile = document.getElementById("userProfile");
  const userName = document.getElementById("userName");
  const userRoleBadge = document.getElementById("userRoleBadge");
  const logoutBtn = document.getElementById("logoutBtn");
  const settingsBtn = document.getElementById("settingsBtn");
  const footerSettingsLink = document.getElementById("footerSettingsLink");

  const teacherDashboard = document.getElementById("teacherDashboard");
  const studentDashboard = document.getElementById("studentDashboard");
  const parentDashboard = document.getElementById("parentDashboard");
  const schoolDashboard = document.getElementById("schoolDashboard");
  const navTeacherLink = document.getElementById("navTeacherLink");
  const navStudentLink = document.getElementById("navStudentLink");
  const navParentLink = document.getElementById("navParentLink");
  const navSchoolLink = document.getElementById("navSchoolLink");

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

  // Open Signup / Login
  const openSignupModal = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    openModalElement(signupModal);
    closeModalElement(loginModal);
  };

  const openLoginModal = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    openModalElement(loginModal);
    closeModalElement(signupModal);
  };

  if (signupBtn) signupBtn.addEventListener("click", openSignupModal);
  if (loginBtn) loginBtn.addEventListener("click", openLoginModal);
  document.querySelectorAll("[data-open-signup]").forEach((btn) => btn.addEventListener("click", openSignupModal));
  document.querySelectorAll("[data-open-login]").forEach((btn) => btn.addEventListener("click", openLoginModal));

  const switchToLogin = document.getElementById("switchToLogin");
  const switchToSignup = document.getElementById("switchToSignup");
  if (switchToLogin) switchToLogin.addEventListener("click", openLoginModal);
  if (switchToSignup) switchToSignup.addEventListener("click", openSignupModal);

  document.querySelectorAll("[data-close-signup]").forEach((b) => b.addEventListener("click", () => closeModalElement(signupModal)));
  document.querySelectorAll("[data-close-login]").forEach((b) => b.addEventListener("click", () => closeModalElement(loginModal)));
  document.querySelectorAll("[data-return-menu]").forEach((b) => {
    b.addEventListener("click", () => {
      closeModalElement(signupModal);
      closeModalElement(loginModal);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  document.querySelectorAll("[data-close-create-course]").forEach((b) => b.addEventListener("click", () => closeModalElement(createCourseModal)));
  document.querySelectorAll("[data-close-create-assignment]").forEach((b) => b.addEventListener("click", () => closeModalElement(createAssignmentModal)));
  document.querySelectorAll("[data-close-submit-assignment]").forEach((b) => b.addEventListener("click", () => closeModalElement(submitAssignmentModal)));
  document.querySelectorAll("[data-close-view-submissions]").forEach((b) => b.addEventListener("click", () => closeModalElement(viewSubmissionsModal)));
  document.querySelectorAll("[data-close-create-material]").forEach((b) => b.addEventListener("click", () => closeModalElement(createMaterialModal)));
  document.querySelectorAll("[data-close-view-material]").forEach((b) => b.addEventListener("click", () => closeModalElement(viewMaterialModal)));
  document.querySelectorAll("[data-close-take-quiz]").forEach((b) => b.addEventListener("click", () => closeTakeQuiz()));
  document.querySelectorAll("[data-close-create-quiz]").forEach((b) => b.addEventListener("click", () => closeModalElement(createQuizModal)));
  document.querySelectorAll("[data-close-settings]").forEach((b) => b.addEventListener("click", () => closeModalElement(settingsModal)));
  document.querySelectorAll("[data-close-grade-exam]").forEach((b) => b.addEventListener("click", () => closeModalElement(gradeExamModal)));
  document.querySelectorAll("[data-close-live-classroom]").forEach((b) => b.addEventListener("click", () => leaveLiveClassroom()));
  document.querySelectorAll("[data-close-create-live]").forEach((b) => b.addEventListener("click", () => closeModalElement(createLiveSessionModal)));

  // Open Settings Modal
  const openSettingsModal = () => {
    const user = getCurrentUser();
    if (!user) {
      openLoginModal();
      return;
    }
    const settingsAvatar = document.getElementById("settingsAvatar");
    const settingsDisplayFullName = document.getElementById("settingsDisplayFullName");
    const settingsRoleBadge = document.getElementById("settingsRoleBadge");
    const settingsUserId = document.getElementById("settingsUserId");
    const settingsFullName = document.getElementById("settingsFullName");
    const settingsEmail = document.getElementById("settingsEmail");
    const settingsRole = document.getElementById("settingsRole");
    const settingsGrade = document.getElementById("settingsGrade");
    const settingsCourse = document.getElementById("settingsCourse");
    const settingsJoinedDate = document.getElementById("settingsJoinedDate");

    const role = user.accountType || "student";
    let roleText = "Học sinh học tập";
    let roleBadgeClass = "student";
    let avatarIcon = "👨‍🎓";
    if (role === "teacher") {
      roleText = "Giáo viên giảng dạy";
      roleBadgeClass = "teacher";
      avatarIcon = "👨‍🏫";
    } else if (role === "parent") {
      roleText = "Phụ huynh học sinh";
      roleBadgeClass = "parent";
      avatarIcon = "👨‍👩‍👧";
    } else if (role === "school") {
      roleText = "Ban giám hiệu / Nhà trường";
      roleBadgeClass = "school";
      avatarIcon = "🏫";
    }

    if (settingsAvatar) settingsAvatar.textContent = avatarIcon;
    if (settingsDisplayFullName) settingsDisplayFullName.textContent = user.fullName || "Người dùng";
    if (settingsRoleBadge) {
      settingsRoleBadge.textContent = roleText;
      settingsRoleBadge.className = `role-badge ${roleBadgeClass}`;
    }

    const shortId = user.id ? `EDU-${user.id.replace(/\D/g, "").slice(-6) || "888666"}` : "EDU-888666";
    if (settingsUserId) settingsUserId.textContent = shortId;
    if (settingsFullName) settingsFullName.value = user.fullName || "";
    if (settingsEmail) settingsEmail.value = user.email || "";
    if (settingsRole) settingsRole.value = roleText;
    if (settingsGrade) settingsGrade.value = user.grade || "12";
    if (settingsCourse) settingsCourse.value = user.course || "";
    if (settingsJoinedDate) settingsJoinedDate.value = user.registeredAt || new Date().toLocaleDateString("vi-VN");

    switchSettingsTab("profile");
    openModalElement(settingsModal);
  };

  if (settingsBtn) settingsBtn.addEventListener("click", openSettingsModal);
  if (footerSettingsLink) footerSettingsLink.addEventListener("click", (e) => { e.preventDefault(); openSettingsModal(); });

  // Settings Tab Switching
  const switchSettingsTab = (tabName) => {
    const tabs = ["profile", "security", "help"];
    tabs.forEach((t) => {
      const btn = document.getElementById(`tabBtn${t.charAt(0).toUpperCase() + t.slice(1)}`);
      const content = document.getElementById(`${t}TabContent`);
      if (btn && content) {
        if (t === tabName) {
          btn.classList.add("active");
          content.style.display = "block";
        } else {
          btn.classList.remove("active");
          content.style.display = "none";
        }
      }
    });
  };

  document.querySelectorAll(".settings-tab-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tab = e.currentTarget.dataset.tab;
      switchSettingsTab(tab);
    });
  });

  // Copy ID button
  const copyIdBtn = document.getElementById("copyIdBtn");
  if (copyIdBtn) {
    copyIdBtn.addEventListener("click", () => {
      const idText = document.getElementById("settingsUserId")?.textContent || "";
      if (navigator.clipboard && idText) {
        navigator.clipboard.writeText(idText);
        copyIdBtn.textContent = "✓ Đã copy!";
        setTimeout(() => { copyIdBtn.textContent = "📋 Copy"; }, 2000);
      }
    });
  }

  // Update Profile Form Submit
  const updateProfileForm = document.getElementById("updateProfileForm");
  if (updateProfileForm) {
    updateProfileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const currentUser = getCurrentUser();
      if (!currentUser) return;

      const newFullName = document.getElementById("settingsFullName")?.value.trim();
      const newGrade = document.getElementById("settingsGrade")?.value;
      const newCourse = document.getElementById("settingsCourse")?.value;
      const msg = document.getElementById("profileFormMessage");

      currentUser.fullName = newFullName;
      currentUser.grade = newGrade || "12";
      currentUser.course = newCourse;

      const users = getStoredUsers();
      const idx = users.findIndex((u) => u.email === currentUser.email);
      if (idx !== -1) {
        users[idx] = { ...users[idx], fullName: newFullName, grade: newGrade, course: newCourse };
        saveStoredUsers(users);
      }
      setCurrentUser(currentUser);
      updateAuthUI();

      if (msg) {
        msg.textContent = "✓ Cập nhật thông tin thành công!";
        msg.className = "form-message success";
        setTimeout(() => { msg.textContent = ""; }, 3000);
      }
    });
  }

  // Change Password Form Submit
  const changePasswordForm = document.getElementById("changePasswordForm");
  if (changePasswordForm) {
    changePasswordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const currentUser = getCurrentUser();
      if (!currentUser) return;

      const curPass = document.getElementById("currentPassword")?.value;
      const newPass = document.getElementById("newPassword")?.value;
      const confirmPass = document.getElementById("confirmNewPassword")?.value;
      const msg = document.getElementById("securityFormMessage");

      if (curPass !== currentUser.password) {
        if (msg) {
          msg.textContent = "Mật khẩu hiện tại không chính xác!";
          msg.className = "form-message error";
        }
        return;
      }
      if (newPass !== confirmPass) {
        if (msg) {
          msg.textContent = "Mật khẩu mới không trùng khớp!";
          msg.className = "form-message error";
        }
        return;
      }

      currentUser.password = newPass;
      const users = getStoredUsers();
      const idx = users.findIndex((u) => u.email === currentUser.email);
      if (idx !== -1) {
        users[idx].password = newPass;
        saveStoredUsers(users);
      }
      setCurrentUser(currentUser);

      if (msg) {
        msg.textContent = "✓ Đổi mật khẩu thành công!";
        msg.className = "form-message success";
        changePasswordForm.reset();
        setTimeout(() => { msg.textContent = ""; }, 3000);
      }
    });
  }

  // ============ Enhanced Auth System (Đăng ký / Đăng nhập) ============

  // Auth Switch Tabs between Signup and Login Modals
  const tabBtnToSignup = document.getElementById("tabBtnToSignup");
  const tabBtnToLogin = document.getElementById("tabBtnToLogin");
  const tabBtnLoginActive = document.getElementById("tabBtnLoginActive");
  const tabBtnSignupSwitch = document.getElementById("tabBtnSignupSwitch");

  if (tabBtnToLogin) {
    tabBtnToLogin.addEventListener("click", () => {
      closeModalElement(signupModal);
      openModalElement(loginModal);
    });
  }
  if (tabBtnSignupSwitch) {
    tabBtnSignupSwitch.addEventListener("click", () => {
      closeModalElement(loginModal);
      openModalElement(signupModal);
    });
  }

  // One-Click Quick Demo Login (Dành cho kiểm thử nhanh)
  const btnQuickLoginStudent = document.getElementById("btnQuickLoginStudent");
  if (btnQuickLoginStudent) {
    btnQuickLoginStudent.addEventListener("click", () => {
      const demoStudent = {
        id: "user-demo-student",
        fullName: "Minh Anh",
        email: "minhanh@edunova.vn",
        accountType: "student",
        grade: "12",
        course: "Toán học - Đại số & Hình học không gian",
        registeredAt: new Date().toLocaleDateString("vi-VN")
      };
      setCurrentUser(demoStudent);
      closeModalElement(loginModal);
      window.scrollTo({ top: 0, behavior: "smooth" });
      updateAuthUI();
      updateSchedule(demoStudent.course);
      showToast("🎉 Đăng nhập thành công với tài khoản Học sinh (Lớp 12)!");
    });
  }

  const btnQuickLoginTeacher = document.getElementById("btnQuickLoginTeacher");
  if (btnQuickLoginTeacher) {
    btnQuickLoginTeacher.addEventListener("click", () => {
      const demoTeacher = {
        id: "user-demo-teacher",
        fullName: "Thầy Tuấn (Vật lý EduNova)",
        email: "thaytuan@edunova.vn",
        accountType: "teacher",
        course: "Vật lý - Cơ học & Sóng điện từ",
        registeredAt: new Date().toLocaleDateString("vi-VN")
      };
      setCurrentUser(demoTeacher);
      closeModalElement(loginModal);
      window.scrollTo({ top: 0, behavior: "smooth" });
      updateAuthUI();
      updateSchedule(demoTeacher.course);
      showToast("🎉 Đăng nhập thành công với tài khoản Giáo viên!");
    });
  }

  const btnQuickLoginParent = document.getElementById("btnQuickLoginParent");
  if (btnQuickLoginParent) {
    btnQuickLoginParent.addEventListener("click", () => {
      const demoParent = {
        id: "user-demo-parent",
        fullName: "Bác Nguyễn Văn Nam",
        email: "phuhuynh@edunova.vn",
        accountType: "parent",
        studentName: "Nguyễn Minh Anh (Lớp 12A1)",
        registeredAt: new Date().toLocaleDateString("vi-VN")
      };
      setCurrentUser(demoParent);
      closeModalElement(loginModal);
      window.scrollTo({ top: 0, behavior: "smooth" });
      updateAuthUI();
      showToast("🎉 Đăng nhập thành công với tài khoản Phụ huynh học sinh!");
    });
  }

  const btnQuickLoginSchool = document.getElementById("btnQuickLoginSchool");
  if (btnQuickLoginSchool) {
    btnQuickLoginSchool.addEventListener("click", () => {
      const demoSchool = {
        id: "user-demo-school",
        fullName: "Trường THPT Chuyên EduNova",
        email: "bgh@edunova.vn",
        accountType: "school",
        schoolName: "Trường THPT Chuyên EduNova",
        registeredAt: new Date().toLocaleDateString("vi-VN")
      };
      setCurrentUser(demoSchool);
      closeModalElement(loginModal);
      window.scrollTo({ top: 0, behavior: "smooth" });
      updateAuthUI();
      showToast("🎉 Đăng nhập thành công với Cổng Quản Trị Nhà Trường!");
    });
  }

  // Signup Form Role Toggle
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.querySelectorAll('input[name="accountType"]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        const val = e.target.value;
        const gradeGroup = document.getElementById("signupGradeGroup");
        const courseGroup = document.getElementById("signupCourseGroup");
        const courseLabel = document.getElementById("signupCourseLabel");
        const parentGroup = document.getElementById("signupParentGroup");
        const schoolGroup = document.getElementById("signupSchoolGroup");

        if (val === "student") {
          if (gradeGroup) gradeGroup.style.display = "block";
          if (courseGroup) courseGroup.style.display = "block";
          if (courseLabel) courseLabel.textContent = "Môn học trọng tâm";
          if (parentGroup) parentGroup.style.display = "none";
          if (schoolGroup) schoolGroup.style.display = "none";
        } else if (val === "teacher") {
          if (gradeGroup) gradeGroup.style.display = "none";
          if (courseGroup) courseGroup.style.display = "block";
          if (courseLabel) courseLabel.textContent = "Môn học giảng dạy";
          if (parentGroup) parentGroup.style.display = "none";
          if (schoolGroup) schoolGroup.style.display = "none";
        } else if (val === "parent") {
          if (gradeGroup) gradeGroup.style.display = "none";
          if (courseGroup) courseGroup.style.display = "none";
          if (parentGroup) parentGroup.style.display = "block";
          if (schoolGroup) schoolGroup.style.display = "none";
        } else if (val === "school") {
          if (gradeGroup) gradeGroup.style.display = "none";
          if (courseGroup) courseGroup.style.display = "none";
          if (parentGroup) parentGroup.style.display = "none";
          if (schoolGroup) schoolGroup.style.display = "block";
        }
      });
    });

    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim().toLowerCase();
      const accountType = signupForm.querySelector('input[name="accountType"]:checked')?.value || "student";
      const grade = document.getElementById("signupGrade")?.value || "12";
      const course = document.getElementById("course")?.value || "Toán học";
      const studentName = document.getElementById("signupStudentName")?.value.trim() || "";
      const schoolName = document.getElementById("signupSchoolName")?.value.trim() || "";
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const formMessage = document.getElementById("formMessage");

      if (password !== confirmPassword) {
        formMessage.textContent = "Mật khẩu xác nhận không trùng khớp!";
        formMessage.className = "form-message error";
        return;
      }

      const users = getStoredUsers();
      if (users.some((u) => u.email === email)) {
        formMessage.textContent = "Email này đã được đăng ký tài khoản!";
        formMessage.className = "form-message error";
        return;
      }

      const newUser = {
        id: `user-${Date.now()}`,
        fullName,
        email,
        accountType,
        grade,
        course,
        studentName,
        schoolName,
        password,
        registeredAt: new Date().toLocaleDateString("vi-VN")
      };

      users.push(newUser);
      saveStoredUsers(users);
      setCurrentUser(newUser);

      formMessage.textContent = "✓ Đăng ký thành công! Đang chuyển hướng...";
      formMessage.className = "form-message success";

      setTimeout(() => {
        closeModalElement(signupModal);
        signupForm.reset();
        formMessage.textContent = "";
        window.scrollTo({ top: 0, behavior: "smooth" });
        updateAuthUI();
        if (course && accountType === "student") updateSchedule(course);
        showToast(`🎉 Chào mừng ${fullName} gia nhập EduNova!`);
      }, 800);
    });
  }

  // Login Form Handler
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim().toLowerCase();
      const password = document.getElementById("loginPassword").value;
      const msg = document.getElementById("loginFormMessage");

      const users = getStoredUsers();
      const user = users.find((u) => u.email === email && u.password === password);

      if (!user) {
        msg.textContent = "Email hoặc mật khẩu không chính xác!";
        msg.className = "form-message error";
        return;
      }

      setCurrentUser(user);
      msg.textContent = "✓ Đăng nhập thành công!";
      msg.className = "form-message success";

      setTimeout(() => {
        closeModalElement(loginModal);
        loginForm.reset();
        msg.textContent = "";
        window.scrollTo({ top: 0, behavior: "smooth" });
        updateAuthUI();
        if (user.course) updateSchedule(user.course);
        showToast(`👋 Chào mừng bạn quay trở lại, ${user.fullName || "học viên"}!`);
      }, 700);
    });
  }

  // Toggle password visibility
  document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const targetInput = document.getElementById(targetId);
      if (targetInput) {
        targetInput.type = targetInput.type === "password" ? "text" : "password";
      }
    });
  });
  // ============ Interactive Quiz Engine (Làm bài trắc nghiệm) ============
  let activeQuiz = null;
  let quizTimerInterval = null;
  let quizTimeRemaining = 0;
  let userQuizAnswers = {};

  let activeQuizFilterSubject = "all";

  const openTakeQuiz = (quizId) => {
    const quizzes = getStoredQuizzes();
    activeQuiz = quizzes.find((q) => q.id === quizId) || quizzes[0];
    if (!activeQuiz) return;

    userQuizAnswers = {};
    const takeQuizTitle = document.getElementById("takeQuizTitle");
    const takeQuizMetaText = document.getElementById("takeQuizMetaText");
    const takeQuizCategoryBadge = document.getElementById("takeQuizCategoryBadge");
    const quizQuestionsContainer = document.getElementById("quizQuestionsContainer");
    const quizResultBox = document.getElementById("quizResultBox");
    const quizFooterActions = document.getElementById("quizFooterActions");
    const quizQuestionPills = document.getElementById("quizQuestionPills");
    const quizAnsweredCountText = document.getElementById("quizAnsweredCountText");
    const quizMiniBar = document.getElementById("quizMiniBar");

    const totalQuestions = (activeQuiz.questions || []).length || 1;

    if (takeQuizTitle) takeQuizTitle.textContent = activeQuiz.title;
    if (takeQuizCategoryBadge) takeQuizCategoryBadge.textContent = `⚡ ${activeQuiz.course || "Trắc nghiệm"}`;
    if (takeQuizMetaText) takeQuizMetaText.textContent = `Khối lớp: Lớp ${activeQuiz.grade || "12"} · Thời gian: ${activeQuiz.duration || 15} phút · Số câu: ${totalQuestions} câu`;

    if (quizResultBox) quizResultBox.classList.add("hidden");
    if (quizFooterActions) quizFooterActions.style.display = "block";

    const updateQuestionProgress = () => {
      const answeredCount = Object.keys(userQuizAnswers).length;
      if (quizAnsweredCountText) quizAnsweredCountText.textContent = `${answeredCount}/${totalQuestions} câu`;
      if (quizMiniBar) quizMiniBar.style.width = `${Math.round((answeredCount / totalQuestions) * 100)}%`;
    };

    // Render Question Navigation Pills
    if (quizQuestionPills) {
      quizQuestionPills.innerHTML = (activeQuiz.questions || [])
        .map((_, idx) => `<button type="button" class="q-pill" data-target-q="quizQuestion_${activeQuiz.questions[idx].id}" title="Đến câu ${idx + 1}">${idx + 1}</button>`)
        .join("");

      quizQuestionPills.querySelectorAll(".q-pill").forEach((pill) => {
        pill.addEventListener("click", (e) => {
          const targetId = e.currentTarget.dataset.targetQ;
          const targetCard = document.getElementById(targetId);
          if (targetCard) targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      });
    }

    updateQuestionProgress();

    // Render questions — NO EXPLANATIONS shown during quiz
    if (quizQuestionsContainer) {
      quizQuestionsContainer.innerHTML = (activeQuiz.questions || [])
        .map((q, qIndex) => {
          const qType = q.type || "multiple_choice";
          let badgeHtml = "";
          let inputGroupHtml = "";

          if (qType === "true_false") {
            badgeHtml = `<span class="quiz-qtype-badge tf">⚖️ Đúng / Sai</span>`;
            inputGroupHtml = `
              <div class="quiz-tf-group" data-qid="${q.id}">
                <button type="button" class="quiz-tf-btn" data-qid="${q.id}" data-val="Đúng">✓ Đúng</button>
                <button type="button" class="quiz-tf-btn" data-qid="${q.id}" data-val="Sai">✗ Sai</button>
              </div>
            `;
          } else if (qType === "short_answer") {
            badgeHtml = `<span class="quiz-qtype-badge short">✍️ Trả lời ngắn</span>`;
            inputGroupHtml = `
              <div class="quiz-short-wrap">
                <input type="text" class="quiz-short-input" data-qid="${q.id}" placeholder="Nhập câu trả lời ngắn của bạn vào đây..." />
              </div>
            `;
          } else if (qType === "essay_writing") {
            badgeHtml = `<span class="quiz-qtype-badge writing">🖋️ Phần Viết Bài Văn</span>`;
            const outlineList = q.outline || [
              "1. Mở bài: Dẫn dắt và giới thiệu vấn đề nghị luận.",
              "2. Thân bài: Giải thích - Phân tích dẫn chứng thực tế - Bàn luận mở rộng & Phản đề.",
              "3. Kết bài: Khẳng định lại ý nghĩa vấn đề và rút ra bài học nhận thức, hành động."
            ];
            inputGroupHtml = `
              <div class="quiz-essay-writing-wrap" data-qid="${q.id}">
                <div class="quiz-essay-toolbar">
                  <div class="essay-tools-left">
                    <button type="button" class="essay-tool-btn toggle-outline-btn" data-target="outline_${q.id}">💡 Dàn ý gợi ý</button>
                    <button type="button" class="essay-tool-btn insert-intro-btn" data-qid="${q.id}">📋 Mở bài mẫu</button>
                    <button type="button" class="essay-tool-btn insert-transition-btn" data-qid="${q.id}">🔗 Thêm từ nối</button>
                  </div>
                  <button type="button" class="essay-tool-btn clear-essay-btn" data-qid="${q.id}" style="color: #dc2626;">🧹 Xóa viết lại</button>
                </div>
                <div class="essay-outline-panel hidden" id="outline_${q.id}">
                  <h5>📌 Gợi ý cấu trúc bài viết đạt điểm cao:</h5>
                  <ul>
                    ${outlineList.map((item) => `<li>${item}</li>`).join("")}
                  </ul>
                </div>
                <textarea class="quiz-essay-writing-input" data-qid="${q.id}" rows="8" placeholder="Học sinh làm bài văn hoàn chỉnh tại đây (Mở bài - Thân bài - Kết bài)..."></textarea>
                <div class="quiz-word-count-bar">
                  <div class="word-stats">
                    <span>Số từ: <strong class="word-stat-val word-count" id="wc_${q.id}">0</strong> từ</span>
                    <span>Ký tự: <strong class="word-stat-val char-count" id="cc_${q.id}">0</strong></span>
                    <span>Đoạn: <strong class="word-stat-val para-count" id="pc_${q.id}">0</strong></span>
                  </div>
                  <span style="color: #059669; font-weight: 700;">✓ Tự động lưu bài</span>
                </div>
              </div>
            `;
          } else if (qType === "essay") {
            badgeHtml = `<span class="quiz-qtype-badge essay">📝 Tự luận</span>`;
            inputGroupHtml = `
              <div class="quiz-essay-wrap">
                <textarea class="quiz-essay-input" rows="5" data-qid="${q.id}" placeholder="Trình bày chi tiết bài làm tự luận của bạn tại đây..."></textarea>
              </div>
            `;
          } else {
            // multiple_choice
            badgeHtml = `<span class="quiz-qtype-badge mcq">⚡ Trắc nghiệm</span>`;
            inputGroupHtml = `
              <div class="quiz-options-group">
                ${(q.options || [])
                  .map(
                    (opt, optIndex) => `
                      <label class="quiz-option-label" data-qid="${q.id}" data-optindex="${optIndex}">
                        <input type="radio" name="quiz_opt_${q.id}" value="${optIndex}" style="accent-color: #7c3aed; width: 18px; height: 18px;" />
                        <span><strong>${String.fromCharCode(65 + optIndex)}.</strong> ${opt}</span>
                      </label>
                    `
                  )
                  .join("")}
              </div>
            `;
          }

          return `
            <div class="quiz-question-card" id="quizQuestion_${q.id}">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <h4 class="quiz-question-title" style="margin: 0;">Câu ${qIndex + 1}: ${q.question}</h4>
                ${badgeHtml}
              </div>
              ${inputGroupHtml}
            </div>
          `;
        })
        .join("");

      // Radio selection events (Trắc nghiệm)
      quizQuestionsContainer.querySelectorAll(".quiz-option-label").forEach((lbl) => {
        lbl.addEventListener("click", () => {
          const qid = lbl.dataset.qid;
          const optIdx = parseInt(lbl.dataset.optindex);
          userQuizAnswers[qid] = optIdx;
          lbl.parentElement.querySelectorAll(".quiz-option-label").forEach((l) => l.classList.remove("selected"));
          lbl.classList.add("selected");

          const pill = quizQuestionPills?.querySelector(`[data-target-q="quizQuestion_${qid}"]`);
          if (pill) pill.classList.add("answered");
          updateQuestionProgress();
        });
      });

      // Đúng / Sai button selection events
      quizQuestionsContainer.querySelectorAll(".quiz-tf-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const qid = btn.dataset.qid;
          const val = btn.dataset.val;
          userQuizAnswers[qid] = val;
          btn.parentElement.querySelectorAll(".quiz-tf-btn").forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");

          const pill = quizQuestionPills?.querySelector(`[data-target-q="quizQuestion_${qid}"]`);
          if (pill) pill.classList.add("answered");
          updateQuestionProgress();
        });
      });

      // Trả lời ngắn input events
      quizQuestionsContainer.querySelectorAll(".quiz-short-input").forEach((inp) => {
        inp.addEventListener("input", () => {
          const qid = inp.dataset.qid;
          const val = inp.value.trim();
          const pill = quizQuestionPills?.querySelector(`[data-target-q="quizQuestion_${qid}"]`);
          if (val) {
            userQuizAnswers[qid] = val;
            if (pill) pill.classList.add("answered");
          } else {
            delete userQuizAnswers[qid];
            if (pill) pill.classList.remove("answered");
          }
          updateQuestionProgress();
        });
      });

      // Tự luận ngắn textarea events
      quizQuestionsContainer.querySelectorAll(".quiz-essay-input").forEach((txt) => {
        txt.addEventListener("input", () => {
          const qid = txt.dataset.qid;
          const val = txt.value.trim();
          const pill = quizQuestionPills?.querySelector(`[data-target-q="quizQuestion_${qid}"]`);
          if (val) {
            userQuizAnswers[qid] = val;
            if (pill) pill.classList.add("answered");
          } else {
            delete userQuizAnswers[qid];
            if (pill) pill.classList.remove("answered");
          }
          updateQuestionProgress();
        });
      });

      // Viết bài văn chuyên sâu môn Ngữ văn (Essay Writing)
      quizQuestionsContainer.querySelectorAll(".quiz-essay-writing-input").forEach((txt) => {
        txt.addEventListener("input", () => {
          const qid = txt.dataset.qid;
          const val = txt.value;
          const trimmed = val.trim();
          const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
          const chars = val.length;
          const paras = trimmed ? trimmed.split(/\n+/).filter(Boolean).length : 0;

          const wcEl = document.getElementById(`wc_${qid}`);
          const ccEl = document.getElementById(`cc_${qid}`);
          const pcEl = document.getElementById(`pc_${qid}`);
          if (wcEl) wcEl.textContent = words;
          if (ccEl) ccEl.textContent = chars;
          if (pcEl) pcEl.textContent = paras;

          const pill = quizQuestionPills?.querySelector(`[data-target-q="quizQuestion_${qid}"]`);
          if (words > 0) {
            userQuizAnswers[qid] = val;
            if (pill) pill.classList.add("answered");
          } else {
            delete userQuizAnswers[qid];
            if (pill) pill.classList.remove("answered");
          }
          updateQuestionProgress();
        });
      });

      // Toolbar: Toggle Dàn ý gợi ý
      quizQuestionsContainer.querySelectorAll(".toggle-outline-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const targetId = btn.dataset.target;
          const panel = document.getElementById(targetId);
          if (panel) {
            panel.classList.toggle("hidden");
            btn.classList.toggle("active");
          }
        });
      });

      // Toolbar: Mở bài mẫu
      quizQuestionsContainer.querySelectorAll(".insert-intro-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const qid = btn.dataset.qid;
          const textarea = quizQuestionsContainer.querySelector(`.quiz-essay-writing-input[data-qid="${qid}"]`);
          if (!textarea) return;
          const sampleIntro = "Trong dòng chảy bất tận của thời gian và nhịp sống số hóa hiện đại, vấn đề được đặt ra mang một ý nghĩa vô cùng sâu sắc và thời sự: ";
          if (!textarea.value.trim()) {
            textarea.value = sampleIntro;
          } else {
            textarea.value += "\n" + sampleIntro;
          }
          textarea.focus();
          textarea.dispatchEvent(new Event("input"));
        });
      });

      // Toolbar: Từ nối đoạn
      quizQuestionsContainer.querySelectorAll(".insert-transition-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const qid = btn.dataset.qid;
          const textarea = quizQuestionsContainer.querySelector(`.quiz-essay-writing-input[data-qid="${qid}"]`);
          if (!textarea) return;
          const sampleTransition = "\nMặt khác, nhìn nhận từ góc độ thực tiễn đời sống hôm nay, chúng ta thấy rằng: ";
          textarea.value += sampleTransition;
          textarea.focus();
          textarea.dispatchEvent(new Event("input"));
        });
      });

      // Toolbar: Xóa viết lại
      quizQuestionsContainer.querySelectorAll(".clear-essay-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const qid = btn.dataset.qid;
          const textarea = quizQuestionsContainer.querySelector(`.quiz-essay-writing-input[data-qid="${qid}"]`);
          if (!textarea) return;
          if (confirm("Bạn có chắc chắn muốn xóa bài viết văn này để viết lại từ đầu?")) {
            textarea.value = "";
            textarea.dispatchEvent(new Event("input"));
          }
        });
      });
    }

    // Start Timer
    quizTimeRemaining = (activeQuiz.duration || 15) * 60;
    updateQuizTimerDisplay();
    clearInterval(quizTimerInterval);
    quizTimerInterval = setInterval(() => {
      quizTimeRemaining--;
      updateQuizTimerDisplay();
      if (quizTimeRemaining <= 0) {
        clearInterval(quizTimerInterval);
        submitQuiz();
      }
    }, 1000);

    openModalElement(takeQuizModal);

    // Request Fullscreen automatically after modal opens
    setTimeout(() => {
      const quizDialog = document.querySelector(".quiz-fullscreen-dialog");
      if (quizDialog && quizDialog.requestFullscreen) {
        quizDialog.requestFullscreen().catch(() => {});
      } else if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    }, 250);
  };

  const updateQuizTimerDisplay = () => {
    const quizTimerText = document.getElementById("quizTimerText");
    const quizTimerBox = document.getElementById("quizTimerBox");
    if (!quizTimerText) return;
    const mins = Math.floor(quizTimeRemaining / 60);
    const secs = quizTimeRemaining % 60;
    quizTimerText.textContent = `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;

    // Alert color if less than 2 minutes
    if (quizTimeRemaining < 120 && quizTimerBox) {
      quizTimerBox.style.background = "#fee2e2";
      quizTimerBox.style.color = "#b91c1c";
    } else if (quizTimerBox) {
      quizTimerBox.style.background = "#fef2f2";
      quizTimerBox.style.color = "#dc2626";
    }
  };

  const submitQuiz = () => {
    if (!activeQuiz) return;
    clearInterval(quizTimerInterval);

    let correctCount = 0;
    const totalCount = (activeQuiz.questions || []).length || 1;

    // Only count correct answers — NO solutions or answers revealed
    (activeQuiz.questions || []).forEach((q) => {
      const chosen = userQuizAnswers[q.id];
      const qType = q.type || "multiple_choice";

      if (qType === "multiple_choice") {
        if (chosen === q.answerIndex) {
          correctCount++;
        }
      } else if (qType === "true_false") {
        const correct = (q.correct || "Đúng").trim().toLowerCase();
        if (typeof chosen === "string" && chosen.trim().toLowerCase() === correct) {
          correctCount++;
        }
      } else if (qType === "short_answer") {
        const correct = (q.correctAnswer || "").trim().toLowerCase();
        if (typeof chosen === "string") {
          const userText = chosen.trim().toLowerCase();
          if (userText === correct || (correct.length > 0 && userText.includes(correct))) {
            correctCount++;
          }
        }
      } else if (qType === "essay") {
        // Tự luận: học sinh hoàn thành bài làm được ghi nhận điểm
        if (typeof chosen === "string" && chosen.trim().length > 0) {
          correctCount++;
        }
      } else if (qType === "essay_writing") {
        // Viết bài văn: học sinh hoàn thành bài làm (từ 10 từ trở lên) đạt trọn điểm câu hỏi, có viết bài nhận 0.8
        if (typeof chosen === "string") {
          const wordCount = chosen.trim().split(/\s+/).filter(Boolean).length;
          if (wordCount >= 10) {
            correctCount++;
          } else if (wordCount > 0) {
            correctCount += 0.8;
          }
        }
      }
    });

    const score10 = ((correctCount / totalCount) * 10).toFixed(1);
    const percentage = Math.round((correctCount / totalCount) * 100);

    const newGradeId = `grade-${Date.now()}`;
    const user = getCurrentUser();
    const studentName = user ? user.fullName : "Nguyễn Văn A";
    const studentEmail = user ? user.email : "nguyenvana@gmail.com";
    const studentGrade = (user && user.grade) || activeQuiz.grade || "12";

    // Save to Gradebook
    const grades = getStoredGrades();
    grades.unshift({
      id: newGradeId,
      quizTitle: activeQuiz.title,
      type: "quiz",
      score: score10,
      maxScore: "10",
      grade: studentGrade,
      subject: activeQuiz.course ? cleanSubjectName(activeQuiz.course) : "Trắc nghiệm",
      feedback: score10 >= 8 ? "Xuất sắc! Nắm vững toàn bộ kiến thức trọng tâm." : score10 >= 6.5 ? "Khá tốt! Tiếp tục rèn luyện để đạt điểm tối đa." : "Cần ôn tập thêm lý thuyết chuyên đề này.",
      date: new Date().toLocaleDateString("vi-VN"),
      studentName,
      studentEmail
    });
    saveStoredGrades(grades);

    // Save to Exam Submissions for Teacher Grading Hub
    const hasSubjective = (activeQuiz.questions || []).some((q) => q.type === "essay" || q.type === "essay_writing");
    const examSubs = getStoredExamSubmissions();
    const newExamSub = {
      id: `sub-exam-${Date.now()}`,
      gradeId: newGradeId,
      quizId: activeQuiz.id,
      quizTitle: activeQuiz.title,
      course: activeQuiz.course ? cleanSubjectName(activeQuiz.course) : "Tổng hợp",
      grade: studentGrade,
      studentName,
      studentEmail,
      submittedAt: new Date().toLocaleString("vi-VN"),
      status: hasSubjective ? "pending" : "graded",
      autoScore: score10,
      teacherScore: hasSubjective ? "" : score10,
      feedback: hasSubjective ? "" : (score10 >= 8 ? "Làm bài tốt! Nắm vững kiến thức trọng tâm." : "Cần ôn tập thêm chuyên đề này."),
      gradedBy: hasSubjective ? "" : "Hệ thống tự động",
      gradedAt: hasSubjective ? "" : new Date().toLocaleString("vi-VN"),
      questions: activeQuiz.questions || [],
      answers: { ...userQuizAnswers }
    };
    examSubs.unshift(newExamSub);
    saveStoredExamSubmissions(examSubs);

    // Tự động thoát toàn màn hình
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    // Tự động thoát modal làm bài
    closeModalElement(takeQuizModal);

    // Tự động chuyển sang tab Bảng điểm & cập nhật
    renderStudentGradebook();
    renderLeaderboard();
    const gradebookTabBtn = document.querySelector('.student-tab-btn[data-target-tab="tabStudentGradebook"]');
    if (gradebookTabBtn) {
      gradebookTabBtn.click();
    }

    // Hiển thị thông báo kết quả tức thì
    showToast(`🎉 Nộp bài thành công! Điểm: ${score10}/10 (${percentage}%). Bảng xếp hạng đã cập nhật!`);

    // Cuộn nhẹ tới góc học tập
    const studentDashboard = document.getElementById("studentDashboard");
    if (studentDashboard) {
      studentDashboard.scrollIntoView({ behavior: "smooth" });
    }
  };

  const closeTakeQuiz = () => {
    clearInterval(quizTimerInterval);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    closeModalElement(takeQuizModal);
  };

  const btnSubmitQuiz = document.getElementById("btnSubmitQuiz");
  if (btnSubmitQuiz) btnSubmitQuiz.addEventListener("click", submitQuiz);

  const btnViewGradebookFromQuiz = document.getElementById("btnViewGradebookFromQuiz");
  if (btnViewGradebookFromQuiz) {
    btnViewGradebookFromQuiz.addEventListener("click", () => {
      closeTakeQuiz();
      const gradebookTabBtn = document.querySelector('.student-tab-btn[data-target-tab="tabStudentGradebook"]');
      if (gradebookTabBtn) gradebookTabBtn.click();
    });
  }

  // Render Student Quizzes Tab (Dễ nhìn, có lọc môn học, dễ thao tác)
  const renderStudentQuizzes = (selectedSubject = activeQuizFilterSubject) => {
    activeQuizFilterSubject = selectedSubject;
    const studentQuizList = document.getElementById("studentQuizList");
    if (!studentQuizList) return;

    const currentUser = getCurrentUser();
    const activeGrade = currentUser?.grade || document.getElementById("dashboardGradeSelect")?.value || "12";
    const quizzes = getStoredQuizzes();

    // Filter by grade
    let filtered = quizzes.filter((q) => String(q.grade) === String(activeGrade));
    if (filtered.length === 0) filtered = quizzes;

    // Filter by subject
    if (selectedSubject !== "all") {
      filtered = filtered.filter((q) => (q.course || "").toLowerCase().includes(selectedSubject.toLowerCase()));
    }

    // Wire up subject filter chips
    const filterBar = document.getElementById("quizSubjectFilterBar");
    if (filterBar) {
      filterBar.querySelectorAll(".quiz-filter-chip").forEach((chip) => {
        chip.classList.toggle("active", chip.dataset.subject === selectedSubject);
        chip.onclick = () => renderStudentQuizzes(chip.dataset.subject);
      });
    }

    if (filtered.length === 0) {
      studentQuizList.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; background: #f8fafc; border-radius: 16px; border: 1px dashed #cbd5e1;">
          <span style="font-size: 2.2rem; display: block; margin-bottom: 8px;">📂</span>
          <p style="font-weight: 700; color: #475569; margin: 0 0 4px;">Chưa có đề thi nào cho môn ${selectedSubject} ở Lớp ${activeGrade}.</p>
          <small style="color: #94a3b8;">Vui lòng chọn môn khác hoặc chọn "Tất cả môn".</small>
        </div>
      `;
      return;
    }

    studentQuizList.innerHTML = filtered
      .map(
        (quiz) => `
          <div class="quiz-card">
            <div>
              <div class="quiz-card-top">
                <span class="type-chip exam">Lớp ${quiz.grade || "12"}</span>
                <span class="badge-course">${quiz.course ? quiz.course.split("-")[0].trim() : "Môn học"}</span>
              </div>
              <h4>${quiz.title}</h4>
              <div class="quiz-meta-info">
                <span>⏱ ${quiz.duration || 15} phút</span>
                <span>•</span>
                <span>📋 ${quiz.questions ? quiz.questions.length : 5} câu hỏi</span>
              </div>
            </div>
            <div class="quiz-card-footer" style="display: flex; gap: 8px; align-items: center;">
              <button class="btn btn-primary small-btn start-quiz-btn" data-id="${quiz.id}" style="flex: 1; justify-content: center;">
                <span>⚡ Bắt đầu làm bài</span>
              </button>
              <button type="button" class="btn-delete-item-sm delete-quiz-btn" data-id="${quiz.id}" title="Xóa bài kiểm tra">🗑️ Xóa</button>
            </div>
          </div>
        `
      )
      .join("");

    studentQuizList.querySelectorAll(".start-quiz-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const qid = e.currentTarget.dataset.id;
        openTakeQuiz(qid);
      });
    });

    studentQuizList.querySelectorAll(".delete-quiz-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteQuiz(e.currentTarget.dataset.id);
      });
    });
  };

  // ============ Leaderboard (Bảng Xếp Hạng Thi Đua) ============
  let currentLeaderboardScope = "all";

  const BASE_LEADERBOARD = [
    { id: "lb-1", name: "Đặng Hoàng Long", grade: "12", avatar: "👨‍🎓", testsCount: 15, avgScore: 9.9, title: "🏆 Thủ khoa xuất sắc" },
    { id: "lb-2", name: "Trần Bảo Ngọc", grade: "12", avatar: "👩‍🎓", testsCount: 13, avgScore: 9.7, title: "🌟 Á khoa tài năng" },
    { id: "lb-3", name: "Nguyễn Quốc Huy", grade: "11", avatar: "👨‍🎓", testsCount: 12, avgScore: 9.5, title: "⚡ Chiến binh học tập" },
    { id: "lb-4", name: "Lê Thùy Trang", grade: "12", avatar: "👩‍🎓", testsCount: 10, avgScore: 9.2, title: "🎓 Học sinh giỏi" },
    { id: "lb-5", name: "Phạm Nhật Minh", grade: "10", avatar: "👨‍🎓", testsCount: 9, avgScore: 9.0, title: "🚀 Bứt phá ấn tượng" },
    { id: "lb-6", name: "Vũ Hoàng Yến", grade: "12", avatar: "👩‍🎓", testsCount: 8, avgScore: 8.8, title: "⭐ Chăm chỉ xuất sắc" },
    { id: "lb-7", name: "Ngô Gia Bảo", grade: "11", avatar: "👨‍🎓", testsCount: 8, avgScore: 8.5, title: "📚 Tích cực rèn luyện" },
    { id: "lb-8", name: "Đỗ Khánh Linh", grade: "12", avatar: "👩‍🎓", testsCount: 7, avgScore: 8.3, title: "🎯 Nỗ lực vượt bậc" }
  ];

  const renderLeaderboard = (scope = currentLeaderboardScope) => {
    currentLeaderboardScope = scope;
    const podiumEl = document.getElementById("leaderboardPodium");
    const userBannerEl = document.getElementById("leaderboardUserBanner");
    const tableContainerEl = document.getElementById("leaderboardTableContainer");
    if (!podiumEl || !tableContainerEl) return;

    const currentUser = getCurrentUser();
    const userGrades = getStoredGrades().filter((g) => g.type === "quiz");
    const activeGrade = currentUser?.grade || document.getElementById("dashboardGradeSelect")?.value || "12";

    // Clone base data
    let list = JSON.parse(JSON.stringify(BASE_LEADERBOARD));

    // Incorporate current user if student
    if (currentUser && currentUser.accountType !== "teacher") {
      let userAvg = 0;
      let userCount = userGrades.length;
      if (userCount > 0) {
        const total = userGrades.reduce((sum, g) => sum + (parseFloat(g.score) || 0), 0);
        userAvg = parseFloat((total / userCount).toFixed(1));
      } else {
        userAvg = 8.8; // starter average
        userCount = 1;
      }

      const existingIdx = list.findIndex((u) => u.name === currentUser.fullName);
      const userEntry = {
        id: currentUser.id || "current-user",
        name: currentUser.fullName || "Bạn (Học sinh)",
        grade: String(currentUser.grade || activeGrade),
        avatar: "⭐",
        testsCount: userCount,
        avgScore: userAvg,
        title: userAvg >= 9 ? "🌟 Ngôi sao EduNova" : userAvg >= 8 ? "🚀 Tiến bộ vượt bậc" : "📖 Chăm chỉ học tập",
        isCurrentUser: true
      };

      if (existingIdx !== -1) {
        list[existingIdx] = userEntry;
      } else {
        list.push(userEntry);
      }
    }

    // Filter by scope
    if (scope === "grade") {
      list = list.filter((u) => String(u.grade) === String(activeGrade));
    }

    // Sort by avgScore descending, then testsCount descending
    list.sort((a, b) => b.avgScore - a.avgScore || b.testsCount - a.testsCount);

    // Assign ranks
    list.forEach((u, idx) => { u.rank = idx + 1; });

    // Render Top 3 Podium
    const top1 = list[0];
    const top2 = list[1];
    const top3 = list[2];

    if (top1 && top2 && top3) {
      podiumEl.innerHTML = `
        <!-- Top 2 (Bạc) -->
        <div class="podium-column podium-2">
          <div class="podium-avatar-wrap">
            <div class="podium-avatar">${top2.avatar}</div>
            <span class="podium-medal">🥈</span>
          </div>
          <div class="podium-name">${top2.name}</div>
          <div class="podium-grade">Lớp ${top2.grade} · ${top2.testsCount} bài</div>
          <div class="podium-block">
            <span class="podium-rank-number">2</span>
            <span class="podium-score-pill">${top2.avgScore}đ TB</span>
          </div>
        </div>

        <!-- Top 1 (Vàng) -->
        <div class="podium-column podium-1">
          <div class="podium-avatar-wrap">
            <span class="podium-crown">👑</span>
            <div class="podium-avatar">${top1.avatar}</div>
            <span class="podium-medal">🥇</span>
          </div>
          <div class="podium-name">${top1.name}</div>
          <div class="podium-grade">Lớp ${top1.grade} · ${top1.testsCount} bài</div>
          <div class="podium-block">
            <span class="podium-rank-number">1</span>
            <span class="podium-score-pill">${top1.avgScore}đ TB</span>
          </div>
        </div>

        <!-- Top 3 (Đồng) -->
        <div class="podium-column podium-3">
          <div class="podium-avatar-wrap">
            <div class="podium-avatar">${top3.avatar}</div>
            <span class="podium-medal">🥉</span>
          </div>
          <div class="podium-name">${top3.name}</div>
          <div class="podium-grade">Lớp ${top3.grade} · ${top3.testsCount} bài</div>
          <div class="podium-block">
            <span class="podium-rank-number">3</span>
            <span class="podium-score-pill">${top3.avgScore}đ TB</span>
          </div>
        </div>
      `;
    }

    // Render Current User Banner
    const myRankItem = list.find((u) => u.isCurrentUser);
    if (userBannerEl) {
      if (myRankItem) {
        userBannerEl.style.display = "flex";
        userBannerEl.innerHTML = `
          <div class="user-rank-left">
            <span class="user-rank-badge">Hạng #${myRankItem.rank}</span>
            <div>
              <strong>${myRankItem.name}</strong>
              <div style="font-size: 0.82rem; color: #64748b;">Khối: Lớp ${myRankItem.grade} · Danh hiệu: <span style="color: #7c3aed; font-weight: 700;">${myRankItem.title}</span></div>
            </div>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 1.15rem; font-weight: 800; color: #7c3aed;">${myRankItem.avgScore}/10</span>
            <div style="font-size: 0.78rem; color: #64748b;">Đã làm ${myRankItem.testsCount} đề thi</div>
          </div>
        `;
      } else {
        userBannerEl.style.display = "none";
      }
    }

    // Render Table
    tableContainerEl.innerHTML = `
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>Thứ hạng</th>
            <th>Học sinh</th>
            <th>Khối lớp</th>
            <th>Số bài làm</th>
            <th>Điểm trung bình</th>
            <th>Danh hiệu</th>
          </tr>
        </thead>
        <tbody>
          ${list
            .map((u) => {
              const medal = u.rank === 1 ? "🥇" : u.rank === 2 ? "🥈" : u.rank === 3 ? "🥉" : `#${u.rank}`;
              return `
                <tr class="${u.isCurrentUser ? "is-current-user" : ""}">
                  <td class="rank-medal-cell">${medal}</td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span>${u.avatar}</span>
                      <strong>${u.name}</strong>
                      ${u.isCurrentUser ? '<span class="status-badge" style="background: #ede9fe; color: #7c3aed; font-size: 0.72rem;">Bạn</span>' : ""}
                    </div>
                  </td>
                  <td>Lớp ${u.grade}</td>
                  <td>${u.testsCount} đề thi</td>
                  <td><strong style="color: #7c3aed; font-size: 1rem;">${u.avgScore}</strong></td>
                  <td><span style="font-size: 0.82rem; color: #475569;">${u.title}</span></td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    `;
  };

  // Wire up scope toggle buttons
  const btnLbScopeAll = document.getElementById("btnLbScopeAll");
  const btnLbScopeGrade = document.getElementById("btnLbScopeGrade");
  if (btnLbScopeAll && btnLbScopeGrade) {
    btnLbScopeAll.addEventListener("click", () => {
      btnLbScopeAll.classList.add("active");
      btnLbScopeGrade.classList.remove("active");
      renderLeaderboard("all");
    });
    btnLbScopeGrade.addEventListener("click", () => {
      btnLbScopeGrade.classList.add("active");
      btnLbScopeAll.classList.remove("active");
      renderLeaderboard("grade");
    });
  }

  // Render Student Gradebook
  const renderStudentGradebook = () => {
    const container = document.getElementById("studentGradebookContainer");
    if (!container) return;

    const grades = getStoredGrades();
    if (grades.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
          <span style="font-size: 2.5rem; display: block; margin-bottom: 8px;">📊</span>
          <p style="margin: 0; font-weight: 600;">Bạn chưa có bài kiểm tra nào được ghi nhận.</p>
          <small>Hãy hoàn thành các bài trắc nghiệm ở tab <strong>Luyện tập & Kiểm tra</strong> để xem điểm số tại đây.</small>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="gradebook-table-wrapper">
        <table class="gradebook-table">
          <thead>
            <tr>
              <th>Tên bài kiểm tra / Bài nộp</th>
              <th>Loại bài</th>
              <th>Điểm số</th>
              <th>Xếp loại</th>
              <th>Nhận xét của Giáo viên / Hệ thống</th>
              <th>Ngày làm</th>
            </tr>
          </thead>
          <tbody>
            ${grades
              .map((g) => {
                const num = parseFloat(g.score) || 0;
                const badgeClass = num >= 8 ? "excellent" : num >= 6.5 ? "good" : "average";
                const rankText = num >= 8.5 ? "Giỏi" : num >= 6.5 ? "Khá" : "Đạt";

                return `
                  <tr>
                    <td><strong>${g.quizTitle || g.assignmentTitle || "Bài kiểm tra"}</strong></td>
                    <td><span class="type-chip ${g.type === "quiz" ? "exam" : "document"}">${g.type === "quiz" ? "Trắc nghiệm" : "Tự luận"}</span></td>
                    <td><strong style="font-size: 1.1rem; color: var(--primary, #4361ee);">${g.score}/${g.maxScore || "10"}</strong></td>
                    <td><span class="grade-badge ${badgeClass}">${rankText}</span></td>
                    <td style="color: var(--text-muted); font-size: 0.85rem;">${g.feedback || "Đã hoàn thành"}</td>
                    <td style="color: var(--text-muted); font-size: 0.82rem;">${g.date || "Hôm nay"}</td>
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  };

  // Render Question Bank (Tra Cứu Câu Hỏi)
  const renderQuestionBank = (keyword = "", subjectFilter = "all") => {
    const qnaResultsList = document.getElementById("qnaResultsList");
    if (!qnaResultsList) return;

    let questions = DEFAULT_QUESTIONS;
    const kw = keyword.toLowerCase().trim();

    if (kw) {
      questions = questions.filter((q) =>
        q.question.toLowerCase().includes(kw) ||
        q.keyword.toLowerCase().includes(kw) ||
        q.solution.toLowerCase().includes(kw)
      );
    }

    if (subjectFilter !== "all") {
      questions = questions.filter((q) => q.subject.toLowerCase().includes(subjectFilter.toLowerCase()));
    }

    if (questions.length === 0) {
      qnaResultsList.innerHTML = `
        <div style="text-align: center; padding: 30px; color: var(--text-muted);">
          <span>🔍</span>
          <p>Không tìm thấy câu hỏi phù hợp với từ khóa "${keyword}". Vui lòng thử từ khóa khác.</p>
        </div>
      `;
      return;
    }

    qnaResultsList.innerHTML = questions
      .map(
        (q, idx) => `
          <div class="qna-card">
            <div class="qna-card-top">
              <span class="badge-course">${q.subject} · Lớp ${q.grade}</span>
              <span style="font-size: 0.78rem; color: var(--text-muted);">Mã: ${q.id}</span>
            </div>
            <h4 class="qna-question-text">Câu hỏi ${idx + 1}: ${q.question}</h4>
            <button type="button" class="qna-solution-toggle" data-target="sol_${q.id}">
              📖 Xem hướng dẫn giải chi tiết ▼
            </button>
            <div class="qna-solution-content hidden" id="sol_${q.id}">
              ${q.solution}
            </div>
          </div>
        `
      )
      .join("");

    qnaResultsList.querySelectorAll(".qna-solution-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.target;
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          const isHidden = targetContent.classList.contains("hidden");
          if (isHidden) {
            targetContent.classList.remove("hidden");
            btn.textContent = "📖 Thu gọn lời giải ▲";
          } else {
            targetContent.classList.add("hidden");
            btn.textContent = "📖 Xem hướng dẫn giải chi tiết ▼";
          }
        }
      });
    });
  };

  const btnSearchQnA = document.getElementById("btnSearchQnA");
  const qnaSearchKeyword = document.getElementById("qnaSearchKeyword");
  const qnaSubjectFilter = document.getElementById("qnaSubjectFilter");

  if (btnSearchQnA) {
    btnSearchQnA.addEventListener("click", () => {
      const kw = qnaSearchKeyword?.value || "";
      const subj = qnaSubjectFilter?.value || "all";
      renderQuestionBank(kw, subj);
    });
  }

  if (qnaSearchKeyword) {
    qnaSearchKeyword.addEventListener("input", (e) => {
      const kw = e.target.value;
      const subj = qnaSubjectFilter?.value || "all";
      renderQuestionBank(kw, subj);
    });
  }

  if (qnaSubjectFilter) {
    qnaSubjectFilter.addEventListener("change", (e) => {
      const subj = e.target.value;
      const kw = qnaSearchKeyword?.value || "";
      renderQuestionBank(kw, subj);
    });
  }
  // ============ Student Dashboard Tab Switching ============
  document.querySelectorAll(".student-tab-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".student-tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".student-tab-panel").forEach((p) => (p.style.display = "none"));

      btn.classList.add("active");
      const targetId = btn.dataset.targetTab;
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.style.display = "block";
      }

      if (targetId === "tabStudentQuizzes") renderStudentQuizzes();
      if (targetId === "tabStudentGradebook") renderStudentGradebook();
      if (targetId === "tabStudentLeaderboard") renderLeaderboard();
      if (targetId === "tabStudentQnA") renderQuestionBank();
      if (targetId === "tabStudentMaterials") renderStudentMaterials();
      if (targetId === "tabStudentAssignments") renderStudentAssignments();
    });
  });

  // Grade Selector in Dashboard
  const dashboardGradeSelect = document.getElementById("dashboardGradeSelect");
  if (dashboardGradeSelect) {
    dashboardGradeSelect.addEventListener("change", (e) => {
      const selectedGrade = e.target.value;
      const currentUser = getCurrentUser();
      if (currentUser) {
        currentUser.grade = selectedGrade;
        setCurrentUser(currentUser);
        const users = getStoredUsers();
        const idx = users.findIndex((u) => u.email === currentUser.email);
        if (idx !== -1) {
          users[idx].grade = selectedGrade;
          saveStoredUsers(users);
        }
      }
      const studentGradePill = document.getElementById("studentGradePill");
      if (studentGradePill) studentGradePill.textContent = `🎓 Lớp ${selectedGrade}`;

      renderStudentQuizzes();
      renderLeaderboard();
      renderStudentMaterials();
      renderStudentAssignments();
      renderQuestionBank();
    });
  }

  // ============ Teacher Dashboard: Create Quiz Handler ============
  const openCreateQuizBtn = document.getElementById("openCreateQuizBtn");
  const quickCreateQuizBtn = document.getElementById("quickCreateQuizBtn");
  if (openCreateQuizBtn) openCreateQuizBtn.addEventListener("click", () => openModalElement(createQuizModal));
  if (quickCreateQuizBtn) quickCreateQuizBtn.addEventListener("click", () => openModalElement(createQuizModal));

  // Các nút chèn mẫu câu hỏi nhanh
  const insertQuestionTemplate = (text) => {
    const rawInput = document.getElementById("newQuizQuestionsRaw");
    if (!rawInput) return;
    const current = rawInput.value.trim();
    rawInput.value = current ? current + "\n" + text : text;
    rawInput.focus();
    rawInput.scrollTop = rawInput.scrollHeight;
  };

  const btnTplMCQ = document.getElementById("btnTplMCQ");
  if (btnTplMCQ) btnTplMCQ.addEventListener("click", () => insertQuestionTemplate("[TN] Câu hỏi trắc nghiệm mới | A: Phương án A | B: Phương án B | C: Phương án C | D: Phương án D | Đáp án: A"));

  const btnTplTF = document.getElementById("btnTplTF");
  if (btnTplTF) btnTplTF.addEventListener("click", () => insertQuestionTemplate("[DS] Khẳng định cần xác định tính đúng sai | Đáp án: Đúng"));

  const btnTplShort = document.getElementById("btnTplShort");
  if (btnTplShort) btnTplShort.addEventListener("click", () => insertQuestionTemplate("[TLN] Đạo hàm của hàm số y = sin(x) là gì? | Đáp án: cos(x)"));

  const btnTplEssay = document.getElementById("btnTplEssay");
  if (btnTplEssay) btnTplEssay.addEventListener("click", () => insertQuestionTemplate("[TL] Đề bài tự luận yêu cầu học sinh trình bày chi tiết các bước giải"));

  const btnTplEssayWriting = document.getElementById("btnTplEssayWriting");
  if (btnTplEssayWriting) {
    btnTplEssayWriting.addEventListener("click", () => {
      insertQuestionTemplate("[VBV] Viết một bài văn hoàn chỉnh (khoảng 400 - 600 từ) bàn về: 'Lý tưởng sống và trách nhiệm của tuổi trẻ đối với quê hương đất nước' | Dàn ý: 1. Mở bài: Dẫn dắt vấn đề nghị luận... 2. Thân bài: Giải thích ý nghĩa, phân tích dẫn chứng thực tế, phản đề... 3. Kết bài: Bài học hành động và thông điệp tương lai.");
    });
  }

  const createQuizForm = document.getElementById("createQuizForm");
  if (createQuizForm) {
    createQuizForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("newQuizTitle")?.value.trim();
      const course = cleanSubjectName(document.getElementById("newQuizCourse")?.value);
      const grade = document.getElementById("newQuizGrade")?.value || "12";
      const duration = parseInt(document.getElementById("newQuizDuration")?.value) || 15;
      const raw = document.getElementById("newQuizQuestionsRaw")?.value.trim();
      const msg = document.getElementById("createQuizMessage");

      const currentUser = getCurrentUser();
      const teacherName = currentUser?.fullName || "Giáo viên EduNova";

      const lines = raw.split("\n").filter((l) => l.trim().length > 0);
      const questions = lines.map((line, idx) => {
        let cleanLine = line.trim();
        let qType = "multiple_choice";

        if (/^\[(DS|ĐÚNG SAI|DUNG SAI)\]/i.test(cleanLine) || /đáp án:\s*(đúng|sai)/i.test(cleanLine)) {
          qType = "true_false";
          cleanLine = cleanLine.replace(/^\[(DS|ĐÚNG SAI|DUNG SAI)\]/i, "").trim();
          const parts = cleanLine.split("|").map((p) => p.trim());
          const qText = parts[0] || `Khẳng định ${idx + 1}`;
          const ansPart = parts.find((p) => /đáp án:/i.test(p)) || "";
          const isTrue = !/sai/i.test(ansPart);
          return {
            id: `q_${Date.now()}_${idx}`,
            type: "true_false",
            question: qText,
            correct: isTrue ? "Đúng" : "Sai",
            explanation: "Khẳng định được giáo viên định nghĩa tính Đúng / Sai."
          };
        } else if (/^\[(TLN|TRẢ LỜI NGẮN|TRA LOI NGAN|NGẮN)\]/i.test(cleanLine)) {
          qType = "short_answer";
          cleanLine = cleanLine.replace(/^\[(TLN|TRẢ LỜI NGẮN|TRA LOI NGAN|NGẮN)\]/i, "").trim();
          const parts = cleanLine.split("|").map((p) => p.trim());
          const qText = parts[0] || `Câu hỏi ngắn ${idx + 1}`;
          let correctAns = "";
          const ansPart = parts.find((p) => /đáp án:/i.test(p));
          if (ansPart) {
            correctAns = ansPart.replace(/đáp án:\s*/i, "").trim();
          } else if (parts[1]) {
            correctAns = parts[1].trim();
          }
          return {
            id: `q_${Date.now()}_${idx}`,
            type: "short_answer",
            question: qText,
            correctAnswer: correctAns || "đáp án",
            explanation: `Đáp án chính xác: ${correctAns}`
          };
        } else if (/^\[(VBV|VIẾT VĂN|VIET VAN|BÀI VĂN|BAI VAN)\]/i.test(cleanLine)) {
          qType = "essay_writing";
          cleanLine = cleanLine.replace(/^\[(VBV|VIẾT VĂN|VIET VAN|BÀI VĂN|BAI VAN)\]/i, "").trim();
          const parts = cleanLine.split("|").map((p) => p.trim());
          const qText = parts[0] || `Phần viết bài văn ${idx + 1}`;
          const outlinePart = parts.find((p) => /dàn ý:/i.test(p));
          const outline = outlinePart
            ? [outlinePart.replace(/dàn ý:\s*/i, "").trim()]
            : [
                "1. Mở bài: Dẫn dắt vấn đề và nêu luận điểm chính.",
                "2. Thân bài: Giải thích - Phân tích dẫn chứng thực tế - Phản đề và bàn luận mở rộng.",
                "3. Kết bài: Khái quát tầm quan trọng và rút ra bài học cho bản thân."
              ];
          return {
            id: `q_${Date.now()}_${idx}`,
            type: "essay_writing",
            question: qText,
            outline,
            explanation: "Bài văn hoàn chỉnh do giáo viên chấm và nhận xét chi tiết."
          };
        } else if (/^\[(TL|TỰ LUẬN|TU LUAN)\]/i.test(cleanLine)) {
          qType = "essay";
          cleanLine = cleanLine.replace(/^\[(TL|TỰ LUẬN|TU LUAN)\]/i, "").trim();
          const parts = cleanLine.split("|").map((p) => p.trim());
          const qText = parts[0] || `Bài tập tự luận ${idx + 1}`;
          return {
            id: `q_${Date.now()}_${idx}`,
            type: "essay",
            question: qText,
            explanation: "Bài làm tự luận do giáo viên chấm và nhận xét chi tiết."
          };
        } else {
          // Trắc nghiệm nhiều lựa chọn
          cleanLine = cleanLine.replace(/^\[(TN|TRẮC NGHIỆM|TRAC NGHIEM)\]/i, "").trim();
          const parts = cleanLine.split("|").map((p) => p.trim());
          const qText = parts[0] || `Câu hỏi ${idx + 1}`;
          const options = parts.slice(1, 5).map((p) => p.replace(/^[A-D]:\s*/, "")) || ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"];
          while (options.length < 4) options.push(`Đáp án ${String.fromCharCode(65 + options.length)}`);

          let answerIndex = 0;
          const ansPart = parts.find((p) => /đáp án:\s*[A-D]/i.test(p));
          if (ansPart) {
            const letter = ansPart.replace(/.*đáp án:\s*([A-D]).*/i, "$1").toUpperCase();
            answerIndex = Math.max(0, letter.charCodeAt(0) - 65);
          }

          return {
            id: `q_${Date.now()}_${idx}`,
            type: "multiple_choice",
            question: qText,
            options,
            answerIndex,
            explanation: "Lời giải chi tiết do giáo viên hướng dẫn."
          };
        }
      });

      if (questions.length === 0) {
        questions.push({
          id: `q_${Date.now()}_0`,
          type: "multiple_choice",
          question: "Khảo sát hàm số đạt cực trị khi đạo hàm đổi dấu?",
          options: ["Đúng", "Sai", "Chỉ đúng với hàm bậc 2", "Chỉ đúng với hàm bậc 3"],
          answerIndex: 0,
          explanation: "Đạo hàm đổi dấu qua điểm x0 là điều kiện đủ để hàm số đạt cực trị."
        });
      }

      const newQuiz = {
        id: `quiz-${Date.now()}`,
        title,
        course,
        grade,
        duration,
        teacherName,
        questions
      };

      const quizzes = getStoredQuizzes();
      quizzes.unshift(newQuiz);
      saveStoredQuizzes(quizzes);

      if (msg) {
        msg.textContent = "✓ Đã xuất bản đề kiểm tra đa dạng thành công!";
        msg.className = "form-message success";
      }

      setTimeout(() => {
        closeModalElement(createQuizModal);
        createQuizForm.reset();
        if (msg) msg.textContent = "";
        renderTeacherDashboard();
        renderStudentQuizzes();
        showToast(`🎉 Đã xuất bản đề kiểm tra "${title}" thành công!`);
      }, 900);
    });
  }

  // ============ Teacher Dashboard: Create Material Handler ============
  const openCreateMaterialBtn = document.getElementById("openCreateMaterialBtn");
  const quickCreateMaterialBtn = document.getElementById("quickCreateMaterialBtn");
  if (openCreateMaterialBtn) openCreateMaterialBtn.addEventListener("click", () => openModalElement(createMaterialModal));
  if (quickCreateMaterialBtn) quickCreateMaterialBtn.addEventListener("click", () => openModalElement(createMaterialModal));

  const createMaterialForm = document.getElementById("createMaterialForm");
  if (createMaterialForm) {
    createMaterialForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("materialTitle")?.value.trim();
      const course = document.getElementById("materialCourse")?.value;
      const type = document.getElementById("materialType")?.value || "video";
      const url = document.getElementById("materialUrl")?.value.trim();
      const summary = document.getElementById("materialSummary")?.value.trim();
      const msg = document.getElementById("createMaterialMessage");

      const currentUser = getCurrentUser();
      const teacherName = currentUser?.fullName || "Giáo viên EduNova";

      const newMaterial = {
        id: `mat-${Date.now()}`,
        title,
        course,
        type,
        url,
        summary,
        teacherName,
        createdAt: new Date().toLocaleDateString("vi-VN")
      };

      const materials = getStoredMaterials();
      materials.unshift(newMaterial);
      saveStoredMaterials(materials);

      if (msg) {
        msg.textContent = "✓ Đã đăng tải học liệu thành công!";
        msg.className = "form-message success";
      }

      setTimeout(() => {
        closeModalElement(createMaterialModal);
        createMaterialForm.reset();
        if (msg) msg.textContent = "";
        renderTeacherDashboard();
      }, 1000);
    });
  }

  // ============ Teacher Dashboard: Create Assignment Handler ============
  const openCreateAssignmentBtn = document.getElementById("openCreateAssignmentBtn");
  const quickAssignBtn = document.getElementById("quickAssignBtn");
  if (openCreateAssignmentBtn) openCreateAssignmentBtn.addEventListener("click", () => openModalElement(createAssignmentModal));
  if (quickAssignBtn) quickAssignBtn.addEventListener("click", () => openModalElement(createAssignmentModal));

  const createAssignmentForm = document.getElementById("createAssignmentForm");
  if (createAssignmentForm) {
    createAssignmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("assignmentTitle")?.value.trim();
      const course = document.getElementById("assignmentCourse")?.value;
      const deadline = document.getElementById("assignmentDeadline")?.value;
      const desc = document.getElementById("assignmentDesc")?.value.trim();
      const link = document.getElementById("assignmentLink")?.value.trim();
      const msg = document.getElementById("createAssignmentMessage");

      const currentUser = getCurrentUser();
      const teacherName = currentUser?.fullName || "Giáo viên EduNova";

      const newAssignment = {
        id: `assign-${Date.now()}`,
        title,
        course,
        deadline,
        desc,
        link,
        teacherName
      };

      const assignments = getStoredAssignments();
      assignments.unshift(newAssignment);
      saveStoredAssignments(assignments);

      if (msg) {
        msg.textContent = "✓ Đã giao bài tập thành công!";
        msg.className = "form-message success";
      }

      setTimeout(() => {
        closeModalElement(createAssignmentModal);
        createAssignmentForm.reset();
        if (msg) msg.textContent = "";
        renderTeacherDashboard();
      }, 1000);
    });
  }

  // ============ Teacher Dashboard: Create Course Handler ============
  const openCreateCourseBtn = document.getElementById("openCreateCourseBtn");
  const quickCreateCourseBtn = document.getElementById("quickCreateCourseBtn");
  if (openCreateCourseBtn) openCreateCourseBtn.addEventListener("click", () => openModalElement(createCourseModal));
  if (quickCreateCourseBtn) quickCreateCourseBtn.addEventListener("click", () => openModalElement(createCourseModal));

  const createCourseForm = document.getElementById("createCourseForm");
  if (createCourseForm) {
    createCourseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("newCourseTitle")?.value.trim();
      const category = document.getElementById("newCourseCategory")?.value || "natural";
      const price = document.getElementById("newCoursePrice")?.value.trim();
      const desc = document.getElementById("newCourseDesc")?.value.trim();
      const msg = document.getElementById("createCourseMessage");

      const bgMap = { natural: "math-bg", social: "literature-bg", tech_lang: "it-bg" };
      const iconMap = { natural: "🔬", social: "📖", tech_lang: "💻" };

      const currentUser = getCurrentUser();
      const author = currentUser?.fullName ? `${currentUser.fullName} (Giáo viên)` : "Giáo viên EduNova";

      const newCourse = {
        id: `course-${Date.now()}`,
        title,
        category,
        price,
        rating: "5.0 ★",
        desc,
        bgClass: bgMap[category] || "math-bg",
        icon: iconMap[category] || "📚",
        author
      };

      const courses = getStoredCourses();
      courses.unshift(newCourse);
      saveStoredCourses(courses);

      if (msg) {
        msg.textContent = "✓ Xuất bản môn học thành công!";
        msg.className = "form-message success";
      }

      setTimeout(() => {
        closeModalElement(createCourseModal);
        createCourseForm.reset();
        if (msg) msg.textContent = "";
        renderCourses();
        populateCourseDropdowns();
        renderTeacherDashboard();
      }, 1000);
    });
  }

  // ============ View Material Modal ============
  const openViewMaterial = (materialId) => {
    const materials = getStoredMaterials();
    const mat = materials.find((m) => m.id === materialId);
    if (!mat) return;

    const viewMaterialTitle = document.getElementById("viewMaterialTitle");
    const viewMaterialCourseName = document.getElementById("viewMaterialCourseName");
    const viewMaterialCategoryBadge = document.getElementById("viewMaterialCategoryBadge");
    const materialVideoWrapper = document.getElementById("materialVideoWrapper");
    const materialVideoIframe = document.getElementById("materialVideoIframe");
    const materialSummaryContent = document.getElementById("materialSummaryContent");
    const materialDirectLink = document.getElementById("materialDirectLink");

    if (viewMaterialTitle) viewMaterialTitle.textContent = mat.title;
    if (viewMaterialCourseName) viewMaterialCourseName.textContent = `Môn: ${mat.course} · GV: ${mat.teacherName || "EduNova"}`;
    if (viewMaterialCategoryBadge) {
      viewMaterialCategoryBadge.textContent = mat.type === "video" ? "🎥 Video Bài Giảng" : mat.type === "exam" ? "📝 Đề Thi & Đề Cương" : "📄 Tài Liệu Lý Thuyết";
    }

    if (mat.type === "video" && mat.url) {
      const embed = getEmbedUrl(mat.url);
      if (materialVideoIframe) materialVideoIframe.src = embed;
      if (materialVideoWrapper) materialVideoWrapper.classList.remove("hidden");
    } else {
      if (materialVideoIframe) materialVideoIframe.src = "";
      if (materialVideoWrapper) materialVideoWrapper.classList.add("hidden");
    }

    if (materialSummaryContent) materialSummaryContent.textContent = mat.summary || "Chưa có tóm tắt.";
    if (materialDirectLink) {
      materialDirectLink.href = mat.url || "#";
      materialDirectLink.style.display = mat.url ? "inline-flex" : "none";
    }

    openModalElement(viewMaterialModal);
  };

  // ============ Submit Assignment Modal ============
  const openSubmitAssignment = (assignId) => {
    const assignments = getStoredAssignments();
    const assign = assignments.find((a) => a.id === assignId);
    if (!assign) return;

    const submitAssignmentId = document.getElementById("submitAssignmentId");
    const submitAssignmentCourseName = document.getElementById("submitAssignmentCourseName");
    const submitAssignmentInstruction = document.getElementById("submitAssignmentInstruction");

    if (submitAssignmentId) submitAssignmentId.value = assign.id;
    if (submitAssignmentCourseName) submitAssignmentCourseName.textContent = `Môn: ${assign.course} · Hạn nộp: ${assign.deadline || "Không giới hạn"}`;
    if (submitAssignmentInstruction) {
      submitAssignmentInstruction.innerHTML = `
        <strong>📝 Đề bài: ${assign.title}</strong>
        <p style="margin: 6px 0 0; color: var(--text-muted); font-size: 0.88rem;">${assign.desc}</p>
        ${assign.link ? `<a href="${assign.link}" target="_blank" style="display: inline-block; margin-top: 6px; font-size: 0.85rem; color: var(--primary);">🔗 Xem tài liệu đính kèm</a>` : ""}
      `;
    }

    openModalElement(submitAssignmentModal);
  };

  const submitAssignmentForm = document.getElementById("submitAssignmentForm");
  if (submitAssignmentForm) {
    submitAssignmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const assignId = document.getElementById("submitAssignmentId")?.value;
      const url = document.getElementById("submissionUrl")?.value.trim();
      const note = document.getElementById("submissionNote")?.value.trim();
      const msg = document.getElementById("submitAssignmentMessage");

      const currentUser = getCurrentUser();
      const studentName = currentUser?.fullName || "Học sinh";
      const studentEmail = currentUser?.email || "student@edunova.edu.vn";

      const assignments = getStoredAssignments();
      const assign = assignments.find((a) => a.id === assignId);

      const newSubmission = {
        id: `sub-${Date.now()}`,
        assignmentId: assignId,
        assignmentTitle: assign ? assign.title : "Bài tập",
        course: assign ? assign.course : "",
        studentName,
        studentEmail,
        submissionUrl: url,
        note,
        submittedAt: new Date().toLocaleDateString("vi-VN"),
        grade: "Chờ chấm",
        feedback: "Giáo viên đang xem xét bài làm của bạn."
      };

      const subs = getStoredSubmissions();
      subs.unshift(newSubmission);
      saveStoredSubmissions(subs);

      // Add to gradebook history
      const grades = getStoredGrades();
      grades.unshift({
        id: `grade-sub-${Date.now()}`,
        quizTitle: assign ? assign.title : "Bài tập tự luận",
        type: "assignment",
        score: "Chờ chấm",
        maxScore: "10",
        feedback: "Đã gửi bài thành công. Chờ giáo viên chấm.",
        date: new Date().toLocaleDateString("vi-VN")
      });
      saveStoredGrades(grades);

      if (msg) {
        msg.textContent = "✓ Nộp bài thành công! Giáo viên sẽ sớm phản hồi.";
        msg.className = "form-message success";
      }

      setTimeout(() => {
        closeModalElement(submitAssignmentModal);
        submitAssignmentForm.reset();
        if (msg) msg.textContent = "";
        renderStudentAssignments();
        renderStudentGradebook();
      }, 1000);
    });
  }

  // ============ Teacher Exam Grading Hub & Modal ============
  let currentGradingFilter = "all";
  let activeGradingSubId = null;

  const calculateGradeRank = (num) => {
    if (isNaN(num)) return { text: "Chưa xác định", color: "#64748b", bg: "#f1f5f9" };
    if (num >= 9.0) return { text: "Xếp loại: Xuất sắc", color: "#15803d", bg: "#dcfce7" };
    if (num >= 8.0) return { text: "Xếp loại: Giỏi", color: "#1d4ed8", bg: "#dbeafe" };
    if (num >= 6.5) return { text: "Xếp loại: Khá", color: "#b45309", bg: "#fef3c7" };
    if (num >= 5.0) return { text: "Xếp loại: Trung bình", color: "#854d0e", bg: "#fef9c3" };
    return { text: "Xếp loại: Yếu / Cần cố gắng", color: "#b91c1c", bg: "#fee2e2" };
  };

  const updateGradeRankDisplay = (scoreNum) => {
    if (!gradeRankTag) return;
    const rank = calculateGradeRank(scoreNum);
    gradeRankTag.textContent = rank.text;
    gradeRankTag.style.color = rank.color;
    gradeRankTag.style.background = rank.bg;
  };

  const renderTeacherGradingPanel = (filter = currentGradingFilter) => {
    if (!gradingSubmissionsList) return;
    const subs = getStoredExamSubmissions();
    const pendingSubs = subs.filter((s) => s.status === "pending");

    if (teacherPendingBadge) teacherPendingBadge.textContent = pendingSubs.length;
    if (filterPendingCount) filterPendingCount.textContent = pendingSubs.length;

    let displayList = subs;
    if (filter === "pending") {
      displayList = subs.filter((s) => s.status === "pending");
    } else if (filter === "graded") {
      displayList = subs.filter((s) => s.status === "graded");
    }

    if (displayList.length === 0) {
      gradingSubmissionsList.innerHTML = `
        <div style="text-align: center; padding: 36px 20px; color: #64748b; background: #f8fafc; border-radius: 12px; border: 1.5px dashed #cbd5e1;">
          <span style="font-size: 2.2rem; display: block; margin-bottom: 8px;">📂</span>
          <p style="margin: 0; font-weight: 600;">Không có bài thi nào trong mục này</p>
        </div>
      `;
      return;
    }

    gradingSubmissionsList.innerHTML = displayList
      .map((sub) => {
        const isPending = sub.status === "pending";
        const hasEssay = (sub.questions || []).some((q) => q.type === "essay_writing" || q.type === "essay");
        const statusHtml = isPending
          ? `<span class="grading-status-badge pending">⏳ Chờ chấm (Tạm tính: ${sub.autoScore || "0"}/10)</span>`
          : `<span class="grading-status-badge graded">✅ Đã chấm: ${sub.teacherScore || sub.autoScore || "10"}/10</span>`;

        const btnHtml = isPending
          ? `<button type="button" class="btn-grade-action primary btn-trigger-grade" data-sub-id="${sub.id}"><span>✍️</span> Chấm bài ngay</button>`
          : `<button type="button" class="btn-grade-action secondary btn-trigger-grade" data-sub-id="${sub.id}"><span>👁️</span> Xem & Sửa điểm</button>`;

        return `
          <div class="grading-sub-item">
            <div class="grading-sub-left">
              <div class="grading-sub-avatar">👨‍🎓</div>
              <div class="grading-sub-info">
                <h4>${sub.studentName || "Học sinh"} ${hasEssay ? '<span style="font-size: 0.78rem; background: #fef3c7; color: #b45309; padding: 2px 7px; border-radius: 6px; margin-left: 6px; font-weight: 800;">🖋️ Có bài viết văn</span>' : ''}</h4>
                <div class="grading-sub-meta">
                  <span class="grading-sub-meta-pill">Lớp ${sub.grade || "12"}</span>
                  <span class="grading-sub-meta-pill" style="background: #e0e7ff; color: #3730a3;">${sub.course || "Môn học"}</span>
                  <span style="color: #1e293b; font-weight: 600;">${sub.quizTitle || "Bài kiểm tra"}</span>
                  <span>• 🕒 ${sub.submittedAt || "Vừa nộp"}</span>
                </div>
              </div>
            </div>
            <div class="grading-sub-right">
              ${statusHtml}
              ${btnHtml}
            </div>
          </div>
        `;
      })
      .join("");

    gradingSubmissionsList.querySelectorAll(".btn-trigger-grade").forEach((btn) => {
      btn.addEventListener("click", () => {
        openGradeExamModal(btn.dataset.subId);
      });
    });
  };

  const openGradeExamModal = (subId) => {
    const subs = getStoredExamSubmissions();
    const sub = subs.find((s) => s.id === subId);
    if (!sub) return;

    activeGradingSubId = subId;

    const modalGradeStatusPill = document.getElementById("modalGradeStatusPill");
    const gradeExamTitle = document.getElementById("gradeExamTitle");
    const gradeStudentBar = document.getElementById("gradeStudentBar");
    const gradeQuestionCountInfo = document.getElementById("gradeQuestionCountInfo");
    const gradeExamQuestionsContainer = document.getElementById("gradeExamQuestionsContainer");

    const isPending = sub.status === "pending";
    if (modalGradeStatusPill) {
      modalGradeStatusPill.textContent = isPending ? "⏳ Chờ chấm điểm" : `✅ Đã chấm xong (${sub.teacherScore || sub.autoScore}/10)`;
      modalGradeStatusPill.className = `grade-status-pill ${isPending ? "" : "graded"}`;
    }

    if (gradeExamTitle) {
      gradeExamTitle.textContent = `Chấm bài thi: ${sub.quizTitle || "Đề kiểm tra"}`;
    }

    if (gradeStudentBar) {
      gradeStudentBar.innerHTML = `
        <span style="font-size: 1.3rem;">👨‍🎓</span>
        <strong style="color: #0f172a;">${sub.studentName || "Học sinh"}</strong>
        <span style="color: #64748b;">(${sub.studentEmail || "nguyenvana@gmail.com"})</span>
        <span style="margin: 0 4px; color: #cbd5e1;">|</span>
        <span class="grading-sub-meta-pill">Lớp ${sub.grade || "12"}</span>
        <span class="grading-sub-meta-pill" style="background: #e0e7ff; color: #3730a3;">Môn ${sub.course || "Tổng hợp"}</span>
        <span style="margin: 0 4px; color: #cbd5e1;">|</span>
        <span style="color: #64748b; font-size: 0.85rem;">Nộp bài lúc: <strong>${sub.submittedAt || "Hôm nay"}</strong></span>
      `;
    }

    const questions = sub.questions || [];
    const answers = sub.answers || {};

    if (gradeQuestionCountInfo) {
      gradeQuestionCountInfo.textContent = `Tổng cộng ${questions.length} câu hỏi`;
    }

    if (gradeExamQuestionsContainer) {
      gradeExamQuestionsContainer.innerHTML = questions
        .map((q, idx) => {
          const qType = q.type || "multiple_choice";
          const chosen = answers[q.id];

          let typeLabel = "Trắc nghiệm";
          let badgeClass = "mcq";
          if (qType === "true_false") { typeLabel = "Đúng / Sai"; badgeClass = "tf"; }
          else if (qType === "short_answer") { typeLabel = "Trả lời ngắn"; badgeClass = "short"; }
          else if (qType === "essay") { typeLabel = "Tự luận"; badgeClass = "essay"; }
          else if (qType === "essay_writing") { typeLabel = "Viết bài văn (Ngữ văn)"; badgeClass = "writing"; }

          let studentAnsHtml = "";

          if (qType === "multiple_choice") {
            const options = q.options || [];
            const chosenText = chosen !== undefined && options[chosen] ? options[chosen] : "Chưa chọn";
            const isCorrect = chosen === q.answerIndex;
            studentAnsHtml = `
              <div class="grade-q-student-answer" style="border-left: 4px solid ${isCorrect ? '#10b981' : '#f59e0b'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: #1e293b;">Đáp án học sinh chọn:</strong>
                  <span style="font-weight: 800; font-size: 0.82rem; color: ${isCorrect ? '#15803d' : '#b45309'};">
                    ${isCorrect ? '✓ Đúng (+điểm)' : '⚡ Cần xem xét'}
                  </span>
                </div>
                <div style="font-weight: 600; color: #0f172a;">${chosen !== undefined ? `[${String.fromCharCode(65 + chosen)}] ` : ''}${chosenText}</div>
              </div>
            `;
          } else if (qType === "true_false") {
            const userChoice = typeof chosen === "string" ? chosen : "Chưa chọn";
            const correctChoice = q.correct || "Đúng";
            const isCorrect = userChoice.trim().toLowerCase() === correctChoice.trim().toLowerCase();
            studentAnsHtml = `
              <div class="grade-q-student-answer" style="border-left: 4px solid ${isCorrect ? '#10b981' : '#f59e0b'};">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>Học sinh chọn: <strong style="color: #0f172a; font-size: 1rem;">${userChoice}</strong></div>
                  <span style="font-weight: 800; font-size: 0.82rem; color: ${isCorrect ? '#15803d' : '#b45309'};">
                    ${isCorrect ? '✓ Trùng khớp' : '⚡ Không khớp đáp án mẫu'}
                  </span>
                </div>
              </div>
            `;
          } else if (qType === "short_answer") {
            const userText = typeof chosen === "string" && chosen.trim() ? chosen.trim() : "(Chưa nhập câu trả lời)";
            studentAnsHtml = `
              <div class="grade-q-student-answer" style="border-left: 4px solid #3b82f6;">
                <div style="margin-bottom: 4px; font-size: 0.82rem; color: #64748b;">Nội dung câu trả lời của học sinh:</div>
                <div style="font-weight: 700; color: #1e293b; font-size: 1.02rem;">${userText}</div>
                ${q.correctAnswer ? `<div style="margin-top: 6px; font-size: 0.82rem; color: #10b981;">Đáp án chuẩn của đề: <strong>${q.correctAnswer}</strong></div>` : ''}
              </div>
            `;
          } else if (qType === "essay") {
            const essayText = typeof chosen === "string" && chosen.trim() ? chosen.trim() : "(Học sinh để trống câu này)";
            studentAnsHtml = `
              <div class="grade-q-student-answer" style="border-left: 4px solid #8b5cf6;">
                <div style="margin-bottom: 6px; font-weight: 700; color: #6d28d9;">Nội dung bài làm tự luận của học sinh:</div>
                <div style="white-space: pre-wrap; line-height: 1.7; color: #1e293b;">${essayText}</div>
              </div>
            `;
          } else if (qType === "essay_writing") {
            const essayContent = typeof chosen === "string" && chosen.trim() ? chosen.trim() : "(Chưa có bài văn nộp)";
            const words = essayContent.split(/\s+/).filter(Boolean).length;
            const chars = essayContent.length;
            const paragraphs = essayContent.split(/\n+/).filter(Boolean).length;

            let outlineHtml = "";
            if (Array.isArray(q.outline) && q.outline.length > 0) {
              outlineHtml = `
                <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 10px; padding: 12px 16px; margin-bottom: 12px; font-size: 0.85rem; color: #78350f;">
                  <strong style="color: #92400e; display: block; margin-bottom: 4px;">📋 Dàn ý hướng dẫn chấm của đề bài:</strong>
                  <ul style="margin: 0; padding-left: 18px; line-height: 1.5;">
                    ${q.outline.map((item) => `<li>${item}</li>`).join("")}
                  </ul>
                </div>
              `;
            }

            studentAnsHtml = `
              <div style="margin-top: 8px;">
                ${outlineHtml}
                <div style="font-size: 0.85rem; font-weight: 700; color: #b45309; margin-bottom: 4px;">
                  🖋️ Toàn văn bài viết văn của học sinh:
                </div>
                <div class="grade-essay-paper">${essayContent}</div>
                <div class="grade-essay-stats">
                  <span>📊 Thống kê bài viết: <strong>${words} từ</strong> | <strong>${chars} ký tự</strong> | <strong>${paragraphs} đoạn văn</strong></span>
                  <span style="color: #059669;">Độ hoàn thiện: ${words >= 150 ? "Đầy đủ dung lượng" : words >= 50 ? "Đạt yêu cầu cơ bản" : "Ngắn / Thiếu ý"}</span>
                </div>
              </div>
            `;
          }

          return `
            <div class="grade-question-card">
              <div class="grade-q-header">
                <span class="quiz-qtype-badge ${badgeClass}">${typeLabel}</span>
                <span style="font-size: 0.82rem; font-weight: 700; color: #64748b;">Câu ${idx + 1}</span>
              </div>
              <div class="grade-q-title"><strong>Câu ${idx + 1}:</strong> ${q.prompt || "Câu hỏi"}</div>
              ${studentAnsHtml}
            </div>
          `;
        })
        .join("");
    }

    // Set score
    const currentScore = sub.teacherScore !== "" && sub.teacherScore !== undefined ? sub.teacherScore : sub.autoScore || "8.5";
    if (inputTeacherScore) {
      inputTeacherScore.value = currentScore;
    }
    if (gradeAutoHint) {
      gradeAutoHint.textContent = `Hệ thống tính: ${sub.autoScore || "0"}/10`;
    }

    updateGradeRankDisplay(parseFloat(currentScore));

    // Set feedback
    if (teacherFeedbackText) {
      teacherFeedbackText.value = sub.feedback || "";
    }

    openModalElement(gradeExamModal);
  };

  // Score input change
  if (inputTeacherScore) {
    inputTeacherScore.addEventListener("input", () => {
      const val = parseFloat(inputTeacherScore.value);
      updateGradeRankDisplay(val);
    });
  }

  // Quick comments
  document.querySelectorAll(".quick-comment-tag").forEach((btn) => {
    btn.addEventListener("click", () => {
      const comment = btn.dataset.comment;
      if (!comment || !teacherFeedbackText) return;
      if (teacherFeedbackText.value.trim().length > 0) {
        teacherFeedbackText.value = teacherFeedbackText.value.trim() + " " + comment;
      } else {
        teacherFeedbackText.value = comment;
      }
      teacherFeedbackText.focus();
    });
  });

  // Save grading
  if (btnSaveGrading) {
    btnSaveGrading.addEventListener("click", () => {
      if (!activeGradingSubId) return;
      const subs = getStoredExamSubmissions();
      const subIndex = subs.findIndex((s) => s.id === activeGradingSubId);
      if (subIndex === -1) return;

      const scoreVal = parseFloat(inputTeacherScore.value);
      if (isNaN(scoreVal) || scoreVal < 0 || scoreVal > 10) {
        showToast("⚠️ Vui lòng nhập điểm số hợp lệ từ 0 đến 10");
        return;
      }

      const formattedScore = scoreVal.toFixed(1);
      const feedbackVal = teacherFeedbackText.value.trim() || (scoreVal >= 8 ? "Làm bài rất tốt! Tiếp tục phát huy." : "Cần rèn luyện thêm kỹ năng làm bài.");
      const currentUser = getCurrentUser();
      const teacherName = currentUser ? currentUser.fullName : "Thầy Nguyễn (Giảng viên)";

      // Update in edunovaExamSubmissions
      subs[subIndex].status = "graded";
      subs[subIndex].teacherScore = formattedScore;
      subs[subIndex].feedback = feedbackVal;
      subs[subIndex].gradedBy = teacherName;
      subs[subIndex].gradedAt = new Date().toLocaleString("vi-VN");
      saveStoredExamSubmissions(subs);

      // Synchronize into edunovaGrades
      const grades = getStoredGrades();
      let matchedGrade = grades.find((g) => g.id === subs[subIndex].gradeId);
      if (!matchedGrade) {
        matchedGrade = grades.find((g) => g.quizTitle === subs[subIndex].quizTitle && (g.studentEmail === subs[subIndex].studentEmail || g.studentName === subs[subIndex].studentName));
      }

      if (matchedGrade) {
        matchedGrade.score = formattedScore;
        matchedGrade.feedback = feedbackVal;
        matchedGrade.teacherName = teacherName;
      } else {
        grades.unshift({
          id: subs[subIndex].gradeId || `grade-${Date.now()}`,
          quizTitle: subs[subIndex].quizTitle,
          type: "quiz",
          score: formattedScore,
          maxScore: "10",
          grade: subs[subIndex].grade || "12",
          subject: subs[subIndex].course || "Tổng hợp",
          feedback: feedbackVal,
          date: new Date().toLocaleDateString("vi-VN"),
          studentName: subs[subIndex].studentName,
          studentEmail: subs[subIndex].studentEmail
        });
      }
      saveStoredGrades(grades);

      closeModalElement(gradeExamModal);
      renderTeacherDashboard();
      renderStudentGradebook();
      renderLeaderboard();

      showToast(`🎉 Đã lưu kết quả bài thi em ${subs[subIndex].studentName || "học sinh"}! Điểm: ${formattedScore}/10.`);
    });
  }

  // Filter tabs
  document.querySelectorAll(".btn-filter-grading").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".btn-filter-grading").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentGradingFilter = btn.dataset.gradeFilter || "all";
      renderTeacherGradingPanel(currentGradingFilter);
    });
  });

  // Open Grading Hub button
  if (openGradeExamsBtn) {
    openGradeExamsBtn.addEventListener("click", () => {
      const panel = document.getElementById("teacherGradingPanel");
      if (panel) {
        panel.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ============ Render Teacher Dashboard ============
  const renderTeacherDashboard = () => {
    const teacherCoursesCount = document.getElementById("teacherCoursesCount");
    const teacherQuizzesCount = document.getElementById("teacherQuizzesCount");
    const teacherMaterialsCount = document.getElementById("teacherMaterialsCount");
    const teacherSubmissionsCount = document.getElementById("teacherSubmissionsCount");
    const teacherQuizList = document.getElementById("teacherQuizList");
    const teacherMaterialList = document.getElementById("teacherMaterialList");
    const teacherAssignmentList = document.getElementById("teacherAssignmentList");
    const teacherCourseList = document.getElementById("teacherCourseList");

    const courses = getStoredCourses();
    const quizzes = getStoredQuizzes();
    const materials = getStoredMaterials();
    const assignments = getStoredAssignments();
    const examSubs = getStoredExamSubmissions();
    const pendingSubs = examSubs.filter((s) => s.status === "pending");

    if (teacherCoursesCount) teacherCoursesCount.textContent = courses.length;
    if (teacherQuizzesCount) teacherQuizzesCount.textContent = quizzes.length;
    if (teacherMaterialsCount) teacherMaterialsCount.textContent = materials.length;
    if (teacherSubmissionsCount) teacherSubmissionsCount.textContent = `${examSubs.length} (${pendingSubs.length} chờ chấm)`;
    if (teacherPendingBadge) teacherPendingBadge.textContent = pendingSubs.length;
    if (filterPendingCount) filterPendingCount.textContent = pendingSubs.length;

    // Render Sổ chấm bài thi
    renderTeacherGradingPanel(currentGradingFilter);

    // Render Quizzes in Teacher View
    if (teacherQuizList) {
      teacherQuizList.innerHTML = quizzes
        .map(
          (q) => `
            <div class="assignment-item" style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div class="assignment-top">
                  <h4 class="assignment-title">${q.title}</h4>
                  <span class="type-chip exam">Lớp ${q.grade || "12"}</span>
                </div>
                <div class="assignment-meta">
                  <span class="badge-course">${q.course ? cleanSubjectName(q.course) : "Môn học"}</span>
                  <span>⏱ ${q.duration || 15} phút</span>
                  <span>• ${q.questions ? q.questions.length : 5} câu hỏi</span>
                </div>
              </div>
              <button type="button" class="btn-delete-item delete-teacher-quiz-btn" data-id="${q.id}" title="Xóa bài kiểm tra">🗑️ Xóa</button>
            </div>
          `
        )
        .join("");

      teacherQuizList.querySelectorAll(".delete-teacher-quiz-btn").forEach((btn) => {
        btn.addEventListener("click", () => deleteQuiz(btn.dataset.id));
      });
    }

    // Render Materials in Teacher View
    if (teacherMaterialList) {
      teacherMaterialList.innerHTML = materials
        .map(
          (mat) => `
            <div class="material-item" style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div class="material-top">
                  <h4 class="material-title">${mat.title}</h4>
                  <span class="type-chip ${mat.type}">${mat.type === "video" ? "🎥 Video" : mat.type === "exam" ? "📝 Đề thi" : "📄 Tài liệu"}</span>
                </div>
                <div class="assignment-meta">
                  <span class="badge-course">${mat.course ? cleanSubjectName(mat.course) : "Môn học"}</span>
                  <span>${mat.createdAt || "Gần đây"}</span>
                </div>
              </div>
              <button type="button" class="btn-delete-item delete-teacher-mat-btn" data-id="${mat.id}" title="Xóa bài giảng">🗑️ Xóa</button>
            </div>
          `
        )
        .join("");

      teacherMaterialList.querySelectorAll(".delete-teacher-mat-btn").forEach((btn) => {
        btn.addEventListener("click", () => deleteMaterial(btn.dataset.id));
      });
    }

    // Render Assignments in Teacher View
    if (teacherAssignmentList) {
      teacherAssignmentList.innerHTML = assignments
        .map(
          (assign) => `
            <div class="assignment-item">
              <div class="assignment-top">
                <h4 class="assignment-title">${assign.title}</h4>
                <span class="badge-deadline active">Hạn: ${assign.deadline || "Không giới hạn"}</span>
              </div>
              <div class="assignment-meta">
                <span class="badge-course">${assign.course ? cleanSubjectName(assign.course) : "Môn học"}</span>
              </div>
            </div>
          `
        )
        .join("");
    }

    // Render Courses in Teacher View
    if (teacherCourseList) {
      teacherCourseList.innerHTML = courses
        .map(
          (c) => `
            <div class="assignment-item" style="flex-direction: row; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.5rem;">${c.icon || "📚"}</span>
                <div>
                  <h4 style="margin: 0; font-size: 0.95rem;">${c.title}</h4>
                  <small style="color: var(--text-muted);">${c.author || "EduNova"} · ${c.price}</small>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge-course">${c.category === "natural" ? "Tự nhiên" : c.category === "social" ? "Xã hội" : "Ngoại ngữ & Tin"}</span>
                <button type="button" class="btn-delete-item delete-teacher-course-btn" data-id="${c.id}" title="Xóa môn học">🗑️ Xóa</button>
              </div>
            </div>
          `
        )
        .join("");

      teacherCourseList.querySelectorAll(".delete-teacher-course-btn").forEach((btn) => {
        btn.addEventListener("click", () => deleteCourse(btn.dataset.id));
      });
    }
  };

  // ============ Render Student Materials Tab ============
  const renderStudentMaterials = () => {
    const studentMaterialList = document.getElementById("studentMaterialList");
    if (!studentMaterialList) return;

    const materials = getStoredMaterials();
    const currentUser = getCurrentUser();

    let filtered = materials;
    if (currentUser && currentUser.course) {
      const match = materials.filter((m) => cleanSubjectName(m.course) === cleanSubjectName(currentUser.course));
      if (match.length > 0) filtered = match;
    }

    studentMaterialList.innerHTML = filtered
      .map(
        (mat) => `
          <div class="student-material-item">
            <div class="student-material-header">
              <h4>${mat.title}</h4>
              <span class="type-chip ${mat.type}">${mat.type === "video" ? "🎥 Video bài giảng" : mat.type === "exam" ? "📝 Đề ôn tập" : "📄 Tài liệu"}</span>
            </div>
            <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">${mat.summary ? mat.summary.slice(0, 90) + "..." : "Tóm tắt bài học"}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
              <span style="font-size: 0.78rem; color: var(--text-muted);">GV: ${mat.teacherName || "EduNova"}</span>
              <div style="display: flex; gap: 6px; align-items: center;">
                <button class="btn btn-secondary small-btn view-mat-btn" data-id="${mat.id}">Học ngay</button>
                <button type="button" class="btn-delete-item-sm delete-student-mat-btn" data-id="${mat.id}" title="Xóa bài giảng">🗑️ Xóa</button>
              </div>
            </div>
          </div>
        `
      )
      .join("");

    studentMaterialList.querySelectorAll(".view-mat-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const mid = e.currentTarget.dataset.id;
        openViewMaterial(mid);
      });
    });

    studentMaterialList.querySelectorAll(".delete-student-mat-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        deleteMaterial(e.currentTarget.dataset.id);
      });
    });
  };

  // ============ Render Student Assignments Tab ============
  const renderStudentAssignments = () => {
    const studentAssignmentList = document.getElementById("studentAssignmentList");
    if (!studentAssignmentList) return;

    const assignments = getStoredAssignments();
    const submissions = getStoredSubmissions();
    const currentUser = getCurrentUser();

    studentAssignmentList.innerHTML = assignments
      .map((assign) => {
        const isSubmitted = submissions.some((s) => s.assignmentId === assign.id && s.studentEmail === currentUser?.email);

        return `
          <div class="student-material-item">
            <div class="student-material-header">
              <h4>${assign.title}</h4>
              <span class="badge-deadline ${isSubmitted ? "active" : ""}">${isSubmitted ? "✓ Đã nộp bài" : `Hạn: ${assign.deadline || "Tới hạn"}`}</span>
            </div>
            <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">${assign.desc ? assign.desc.slice(0, 100) + "..." : ""}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
              <span style="font-size: 0.78rem; color: var(--text-muted);">${assign.course ? assign.course.split("-")[0].trim() : ""}</span>
              <button class="btn btn-primary small-btn submit-task-btn" data-id="${assign.id}">
                ${isSubmitted ? "Cập nhật bài" : "Nộp bài ngay"}
              </button>
            </div>
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
  };

  // ============ Update Auth UI ============
  const updateAuthUI = () => {
    const currentUser = getCurrentUser();
    const dashboardStudentName = document.getElementById("dashboardStudentName");
    const studentGradePill = document.getElementById("studentGradePill");
    const studentCoursePill = document.getElementById("studentCoursePill");
    const dashboardGradeSelect = document.getElementById("dashboardGradeSelect");

    if (currentUser) {
      if (signupBtn) signupBtn.style.display = "none";
      if (loginBtn) loginBtn.style.display = "none";
      if (userProfile) userProfile.style.display = "flex";
      if (userName) userName.textContent = currentUser.fullName;

      const role = currentUser.accountType || "student";

      if (userRoleBadge) {
        userRoleBadge.style.display = "inline-flex";
        if (role === "teacher") {
          userRoleBadge.textContent = "👨‍🏫 Giảng viên";
          userRoleBadge.className = "role-badge teacher";
        } else if (role === "parent") {
          userRoleBadge.textContent = "👨‍👩‍👧 Phụ huynh";
          userRoleBadge.className = "role-badge parent";
        } else if (role === "school") {
          userRoleBadge.textContent = "🏫 Nhà trường";
          userRoleBadge.className = "role-badge school";
        } else {
          userRoleBadge.textContent = "👨‍🎓 Học sinh";
          userRoleBadge.className = "role-badge student";
        }
      }

      // Hide all dashboards and navs by default
      if (teacherDashboard) teacherDashboard.style.display = "none";
      if (studentDashboard) studentDashboard.style.display = "none";
      if (parentDashboard) parentDashboard.style.display = "none";
      if (schoolDashboard) schoolDashboard.style.display = "none";
      if (navTeacherLink) navTeacherLink.style.display = "none";
      if (navStudentLink) navStudentLink.style.display = "none";
      if (navParentLink) navParentLink.style.display = "none";
      if (navSchoolLink) navSchoolLink.style.display = "none";

      if (role === "teacher") {
        if (teacherDashboard) teacherDashboard.style.display = "block";
        if (navTeacherLink) navTeacherLink.style.display = "inline-block";
        if (openCreateLiveSessionBtn) openCreateLiveSessionBtn.style.display = "inline-flex";
        renderTeacherDashboard();
      } else if (role === "parent") {
        if (openCreateLiveSessionBtn) openCreateLiveSessionBtn.style.display = "none";
        if (parentDashboard) parentDashboard.style.display = "block";
        if (navParentLink) navParentLink.style.display = "inline-block";
        const parentGreeting = document.getElementById("parentGreetingName");
        if (parentGreeting) parentGreeting.textContent = `Phụ huynh: ${currentUser.fullName}`;
      } else if (role === "school") {
        if (openCreateLiveSessionBtn) openCreateLiveSessionBtn.style.display = "none";
        if (schoolDashboard) schoolDashboard.style.display = "block";
        if (navSchoolLink) navSchoolLink.style.display = "inline-block";
        const schoolGreeting = document.getElementById("schoolGreetingName");
        if (schoolGreeting) schoolGreeting.textContent = currentUser.schoolName || currentUser.fullName || "Trường THPT Chuyên EduNova";
      } else {
        // student
        if (openCreateLiveSessionBtn) openCreateLiveSessionBtn.style.display = "none";
        if (studentDashboard) studentDashboard.style.display = "block";
        if (navStudentLink) navStudentLink.style.display = "inline-block";
        if (dashboardStudentName) dashboardStudentName.textContent = currentUser.fullName;
        if (studentGradePill) studentGradePill.textContent = `🎓 Lớp ${currentUser.grade || "12"}`;
        if (studentCoursePill) studentCoursePill.textContent = currentUser.course ? currentUser.course.split("-")[0].trim() : "Tất cả môn";
        if (dashboardGradeSelect) dashboardGradeSelect.value = currentUser.grade || "12";

        renderStudentQuizzes();
        renderStudentGradebook();
        renderLeaderboard();
        renderQuestionBank();
        renderStudentMaterials();
        renderStudentAssignments();
      }
    } else {
      if (openCreateLiveSessionBtn) openCreateLiveSessionBtn.style.display = "none";
      if (signupBtn) signupBtn.style.display = "";
      if (loginBtn) loginBtn.style.display = "";
      if (userProfile) userProfile.style.display = "none";
      if (userRoleBadge) userRoleBadge.style.display = "none";
      if (teacherDashboard) teacherDashboard.style.display = "none";
      if (parentDashboard) parentDashboard.style.display = "none";
      if (schoolDashboard) schoolDashboard.style.display = "none";
      if (studentDashboard) studentDashboard.style.display = "block";
      if (navTeacherLink) navTeacherLink.style.display = "none";
      if (navStudentLink) navStudentLink.style.display = "none";
      if (navParentLink) navParentLink.style.display = "none";
      if (navSchoolLink) navSchoolLink.style.display = "none";
      if (dashboardStudentName) dashboardStudentName.textContent = "Học sinh EduNova";
      if (studentGradePill) studentGradePill.textContent = "🎓 Lớp 12";
      if (studentCoursePill) studentCoursePill.textContent = "Tất cả môn";
      if (dashboardGradeSelect) dashboardGradeSelect.value = "12";

      renderStudentQuizzes();
      renderStudentGradebook();
      renderLeaderboard();
      renderQuestionBank();
      renderStudentMaterials();
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

  // Keyboard accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      [
        signupModal,
        loginModal,
        createCourseModal,
        createAssignmentModal,
        submitAssignmentModal,
        viewSubmissionsModal,
        createMaterialModal,
        viewMaterialModal,
        takeQuizModal,
        createQuizModal,
        settingsModal,
        gradeExamModal,
        liveClassroomModal,
        createLiveSessionModal
      ].forEach((m) => {
        if (m === takeQuizModal) {
          closeTakeQuiz();
        } else if (m === liveClassroomModal) {
          leaveLiveClassroom();
        } else if (m) {
          closeModalElement(m);
        }
      });
    }
  });

  // ============ Initialize App ============
  renderCourses();
  populateCourseDropdowns();
  renderLiveSessionsGrid();
  updateAuthUI();

  const savedUser = getCurrentUser();
  if (savedUser && savedUser.course) {
    updateSchedule(savedUser.course);
  } else {
    updateSchedule("Toán học - Đại số & Hình học không gian");
  }
});
