document.addEventListener("DOMContentLoaded", () => {
  // ============ Year in Footer ============
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // ============ 9 Môn Học Phổ Biến: Toán, Lý, Hóa, Sinh, Văn, Anh, Sử, Địa, Tin ============
  const DEFAULT_COURSES = [
    {
      id: "course-math",
      title: "Toán học - Đại số & Hình học không gian",
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
      title: "Vật lý - Cơ học & Sóng điện từ",
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
      title: "Hóa học - Vô cơ & Hữu cơ trọng tâm",
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
      title: "Sinh học - Di truyền & Quần thể sinh thái",
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
      title: "Ngữ văn - Kỹ năng Đọc hiểu & Nghị luận xã hội",
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
      title: "Tiếng Anh - Ngữ pháp & Luyện thi THPT / IELTS",
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
      title: "Lịch sử - Lịch sử Việt Nam & Thế giới hiện đại",
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
      title: "Địa lý - Địa lý tự nhiên & Kinh tế Việt Nam",
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
      title: "Tin học - Lập trình Python & Tư duy thuật toán",
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
      course: "Toán học - Đại số & Hình học không gian",
      grade: "12",
      deadline: "2026-09-15",
      desc: "Làm bài tập trắc nghiệm 20 câu chương Hàm số và vẽ đồ thị hàm số bậc 3 trên vở, chụp ảnh hoặc nộp file PDF.",
      link: "https://drive.google.com",
      teacherName: "Thầy Hùng (Chuyên Toán)"
    },
    {
      id: "assign-eng-1",
      title: "Luyện đọc hiểu Reading Comprehension Unit 3",
      course: "Tiếng Anh - Ngữ pháp & Luyện thi THPT / IELTS",
      grade: "12",
      deadline: "2026-09-18",
      desc: "Hoàn thành 3 đoạn văn Reading Comprehension về chủ đề Môi trường và ghi chép tối thiểu 15 từ vựng mới.",
      link: "https://drive.google.com",
      teacherName: "Cô Linh (Tiếng Anh)"
    },
    {
      id: "assign-lit-1",
      title: "Viết đoạn văn 200 chữ: Tinh thần tự học trong kỷ nguyên số",
      course: "Ngữ văn - Kỹ năng Đọc hiểu & Nghị luận xã hội",
      grade: "12",
      deadline: "2026-09-20",
      desc: "Viết đoạn văn nghị luận xã hội khoảng 200 chữ nêu suy nghĩ của em về tầm quan trọng của việc chủ động tự học.",
      link: "",
      teacherName: "Cô Mai (Ngữ văn)"
    },
    {
      id: "assign-it-1",
      title: "Viết chương trình Python tìm số nguyên tố và sắp xếp mảng",
      course: "Tin học - Lập trình Python & Tư duy thuật toán",
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
      course: "Toán học - Đại số & Hình học không gian",
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
      course: "Vật lý - Cơ học & Sóng điện từ",
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
      course: "Ngữ văn - Kỹ năng Đọc hiểu & Nghị luận xã hội",
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
      course: "Tiếng Anh - Ngữ pháp & Luyện thi THPT / IELTS",
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
      course: "Tin học - Lập trình Python & Tư duy thuật toán",
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
      id: "quiz-math-12-1",
      title: "Kiểm tra 15 phút: Cực trị & Sự biến thiên Hàm số",
      course: "Toán học - Đại số & Hình học không gian",
      grade: "12",
      duration: 15,
      teacherName: "Thầy Hùng (Chuyên Toán)",
      questions: [
        {
          id: "q1",
          question: "Hàm số y = x³ - 3x² + 2 đạt cực đại tại điểm nào?",
          options: ["x = 0", "x = 2", "x = -1", "x = 1"],
          answerIndex: 0,
          explanation: "y' = 3x² - 6x = 3x(x - 2). y' đổi dấu từ (+) sang (-) qua x = 0 nên đạt cực đại tại x = 0."
        },
        {
          id: "q2",
          question: "Đồ thị hàm số y = (2x - 1) / (x + 1) có đường tiệm cận ngang là:",
          options: ["y = 2", "x = -1", "y = -1", "x = 2"],
          answerIndex: 0,
          explanation: "Tiệm cận ngang là y = lim(x->∞) (2x - 1)/(x + 1) = 2/1 = 2."
        },
        {
          id: "q3",
          question: "Số điểm cực trị của hàm số y = x⁴ - 2x² + 3 là:",
          options: ["3", "1", "2", "0"],
          answerIndex: 0,
          explanation: "y' = 4x³ - 4x = 4x(x² - 1) = 0 có 3 nghiệm phân biệt x = 0, x = 1, x = -1."
        },
        {
          id: "q4",
          question: "Giá trị lớn nhất của hàm số f(x) = x³ - 3x trên đoạn [0; 2] là:",
          options: ["2", "0", "-2", "4"],
          answerIndex: 0,
          explanation: "f'(x) = 3x² - 3 = 0 => x = 1 ∈ [0; 2]. Ta có f(0) = 0, f(1) = -2, f(2) = 2. Vậy Max = 2."
        },
        {
          id: "q5",
          question: "Khối đa diện đều loại {3; 3} có bao nhiêu mặt?",
          options: ["4 mặt (Tứ diện đều)", "6 mặt (Lập phương)", "8 mặt (Bát diện)", "12 mặt"],
          answerIndex: 0,
          explanation: "Khối {3; 3} là tứ diện đều, gồm 4 mặt là các tam giác đều."
        }
      ]
    },
    {
      id: "quiz-eng-12-1",
      title: "Kiểm tra 15 phút: 12 Thì & Mệnh đề quan hệ",
      course: "Tiếng Anh - Ngữ pháp & Luyện thi THPT / IELTS",
      grade: "12",
      duration: 15,
      teacherName: "Cô Linh (Tiếng Anh)",
      questions: [
        {
          id: "q1",
          question: "By the time we arrived at the cinema, the movie ______.",
          options: ["had already started", "has already started", "started", "was starting"],
          answerIndex: 0,
          explanation: "Hành động xảy ra trước một thời điểm trong quá khứ ('By the time + V-ed') dùng Quá khứ hoàn thành (had + V3/ed)."
        },
        {
          id: "q2",
          question: "The teacher ______ lectures are always inspiring won the best educator award.",
          options: ["whose", "who", "whom", "which"],
          answerIndex: 0,
          explanation: "Dùng 'whose' để chỉ sở hữu ('whose lectures' = các bài giảng của giáo viên đó)."
        },
        {
          id: "q3",
          question: "If I ______ harder last semester, I would have passed the scholarship exam.",
          options: ["had studied", "studied", "study", "would study"],
          answerIndex: 0,
          explanation: "Câu điều kiện loại 3 (vế if dùng Had + V3/ed, vế chính dùng Would have + V3/ed)."
        },
        {
          id: "q4",
          question: "She is the woman ______ I spoke to yesterday on the phone.",
          options: ["whom", "whose", "which", "where"],
          answerIndex: 0,
          explanation: "'whom' làm tân ngữ chỉ người sau giới từ to (to whom / whom I spoke to)."
        },
        {
          id: "q5",
          question: "Look at those dark clouds! It ______ rain soon.",
          options: ["is going to", "will", "is raining", "must"],
          answerIndex: 0,
          explanation: "Dự đoán có bằng chứng ở hiện tại (dark clouds) dùng cấu trúc 'be going to'."
        }
      ]
    },
    {
      id: "quiz-phys-12-1",
      title: "Luyện tập: Dao động điều hòa & Con lắc lò xo",
      course: "Vật lý - Cơ học & Sóng điện từ",
      grade: "12",
      duration: 15,
      teacherName: "Thầy Tuấn (Vật lý)",
      questions: [
        {
          id: "q1",
          question: "Công thức tính chu kỳ dao động của con lắc lò xo là:",
          options: ["T = 2π√(m/k)", "T = 2π√(k/m)", "T = 2π√(g/l)", "T = 2π√(l/g)"],
          answerIndex: 0,
          explanation: "Chu kỳ con lắc lò xo là T = 2π√(m/k)."
        },
        {
          id: "q2",
          question: "Trong dao động điều hòa, gia tốc a biến thiên:",
          options: ["Ngược pha với li độ x", "Cùng pha với li độ x", "Sớm pha π/2 so với vận tốc", "Trễ pha π so với vận tốc"],
          answerIndex: 0,
          explanation: "Ta có a = -ω²x, do đó gia tốc a luôn ngược pha với li độ x."
        },
        {
          id: "q3",
          question: "Khi vật đi qua vị trí cân bằng thì:",
          options: ["Vận tốc đạt độ lớn cực đại, gia tốc bằng 0", "Vận tốc bằng 0, gia tốc cực đại", "Thế năng cực đại", "Cơ năng bằng 0"],
          answerIndex: 0,
          explanation: "Tại VTCB (x = 0): |v| = vmax = ωA, a = 0, thế năng Wt = 0, động năng Wd cực đại."
        }
      ]
    },
    {
      id: "quiz-math-9-1",
      title: "Ôn thi vào 10: Rút gọn biểu thức & Phương trình bậc 2",
      course: "Toán học - Đại số & Hình học không gian",
      grade: "9",
      duration: 15,
      teacherName: "Thầy Hùng (Toán THCS)",
      questions: [
        {
          id: "q1",
          question: "Phương trình x² - 5x + 6 = 0 có hai nghiệm là:",
          options: ["x1 = 2, x2 = 3", "x1 = -2, x2 = -3", "x1 = 1, x2 = 6", "x1 = -1, x2 = -6"],
          answerIndex: 0,
          explanation: "Δ = 25 - 24 = 1. Nghiệm x1 = (5+1)/2 = 3, x2 = (5-1)/2 = 2."
        },
        {
          id: "q2",
          question: "Biểu thức √(x - 3) xác định khi và chỉ khi:",
          options: ["x ≥ 3", "x > 3", "x ≤ 3", "x < 3"],
          answerIndex: 0,
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

  const getStoredMaterials = () => {
    const materials = safeGetJSON("edunovaMaterials", null);
    if (!materials || !Array.isArray(materials) || materials.length === 0) {
      safeSetJSON("edunovaMaterials", DEFAULT_MATERIALS);
      return DEFAULT_MATERIALS;
    }
    return materials;
  };

  const saveStoredMaterials = (materials) => {
    safeSetJSON("edunovaMaterials", materials);
  };

  const getStoredQuizzes = () => {
    const quizzes = safeGetJSON("edunovaQuizzes", null);
    if (!quizzes || !Array.isArray(quizzes) || quizzes.length === 0) {
      safeSetJSON("edunovaQuizzes", DEFAULT_QUIZZES);
      return DEFAULT_QUIZZES;
    }
    return quizzes;
  };

  const saveStoredQuizzes = (quizzes) => {
    safeSetJSON("edunovaQuizzes", quizzes);
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
    "Tin học - Lập trình Python & Tư duy thuật toán": {
      title: "Tin học - Lập trình Python & Tư duy thuật toán",
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
    const selectedCourse = scheduleMap[courseTitle] || scheduleMap["Toán học - Đại số & Hình học không gian"];
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
                <a href="#contact" data-open-signup data-course="${course.title}">Đăng ký</a>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    courseGrid.querySelectorAll("[data-open-signup]").forEach((button) => {
      button.addEventListener("click", openSignupModal);
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
  const navTeacherLink = document.getElementById("navTeacherLink");
  const navStudentLink = document.getElementById("navStudentLink");

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
  document.querySelectorAll("[data-close-create-course]").forEach((b) => b.addEventListener("click", () => closeModalElement(createCourseModal)));
  document.querySelectorAll("[data-close-create-assignment]").forEach((b) => b.addEventListener("click", () => closeModalElement(createAssignmentModal)));
  document.querySelectorAll("[data-close-submit-assignment]").forEach((b) => b.addEventListener("click", () => closeModalElement(submitAssignmentModal)));
  document.querySelectorAll("[data-close-view-submissions]").forEach((b) => b.addEventListener("click", () => closeModalElement(viewSubmissionsModal)));
  document.querySelectorAll("[data-close-create-material]").forEach((b) => b.addEventListener("click", () => closeModalElement(createMaterialModal)));
  document.querySelectorAll("[data-close-view-material]").forEach((b) => b.addEventListener("click", () => closeModalElement(viewMaterialModal)));
  document.querySelectorAll("[data-close-take-quiz]").forEach((b) => b.addEventListener("click", () => closeTakeQuiz()));
  document.querySelectorAll("[data-close-create-quiz]").forEach((b) => b.addEventListener("click", () => closeModalElement(createQuizModal)));
  document.querySelectorAll("[data-close-settings]").forEach((b) => b.addEventListener("click", () => closeModalElement(settingsModal)));

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

    const isTeacher = user.accountType === "teacher";
    if (settingsAvatar) settingsAvatar.textContent = isTeacher ? "👨‍🏫" : "👨‍🎓";
    if (settingsDisplayFullName) settingsDisplayFullName.textContent = user.fullName || "Người dùng";
    if (settingsRoleBadge) {
      settingsRoleBadge.textContent = isTeacher ? "Giáo viên giảng dạy" : "Học sinh học tập";
      settingsRoleBadge.className = `role-badge ${isTeacher ? "teacher" : "student"}`;
    }

    const shortId = user.id ? `EDU-${user.id.replace(/\D/g, "").slice(-6) || "888666"}` : "EDU-888666";
    if (settingsUserId) settingsUserId.textContent = shortId;
    if (settingsFullName) settingsFullName.value = user.fullName || "";
    if (settingsEmail) settingsEmail.value = user.email || "";
    if (settingsRole) settingsRole.value = isTeacher ? "Giáo viên giảng dạy" : "Học sinh học tập";
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

  // Signup Form Handler
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim().toLowerCase();
      const accountType = signupForm.querySelector('input[name="accountType"]:checked')?.value || "student";
      const grade = document.getElementById("signupGrade")?.value || "12";
      const course = document.getElementById("course").value;
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
        updateAuthUI();
        if (course) updateSchedule(course);
      }, 1000);
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
        updateAuthUI();
        if (user.course) updateSchedule(user.course);
      }, 800);
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

    if (takeQuizTitle) takeQuizTitle.textContent = activeQuiz.title;
    if (takeQuizCategoryBadge) takeQuizCategoryBadge.textContent = `⚡ ${activeQuiz.course || "Trắc nghiệm"}`;
    if (takeQuizMetaText) takeQuizMetaText.textContent = `Khối lớp: Lớp ${activeQuiz.grade || "12"} · Thời gian: ${activeQuiz.duration || 15} phút · Số câu: ${activeQuiz.questions ? activeQuiz.questions.length : 5} câu`;

    if (quizResultBox) quizResultBox.classList.add("hidden");
    if (quizFooterActions) quizFooterActions.style.display = "block";

    // Render questions
    if (quizQuestionsContainer) {
      quizQuestionsContainer.innerHTML = (activeQuiz.questions || [])
        .map((q, qIndex) => `
          <div class="quiz-question-card" id="quizQuestion_${q.id}">
            <h4 class="quiz-question-title">Câu ${qIndex + 1}: ${q.question}</h4>
            <div class="quiz-options-group">
              ${(q.options || [])
                .map(
                  (opt, optIndex) => `
                    <label class="quiz-option-label" data-qid="${q.id}" data-optindex="${optIndex}">
                      <input type="radio" name="quiz_opt_${q.id}" value="${optIndex}" style="accent-color: var(--primary, #4361ee);" />
                      <span><strong>${String.fromCharCode(65 + optIndex)}.</strong> ${opt}</span>
                    </label>
                  `
                )
                .join("")}
            </div>
            <div class="quiz-explanation-box hidden" id="explanation_${q.id}">
              <strong>💡 Lời giải chi tiết:</strong> ${q.explanation || "Chưa có giải thích"}
            </div>
          </div>
        `)
        .join("");

      // Radio selection events
      quizQuestionsContainer.querySelectorAll(".quiz-option-label").forEach((lbl) => {
        lbl.addEventListener("click", () => {
          const qid = lbl.dataset.qid;
          const optIdx = parseInt(lbl.dataset.optindex);
          userQuizAnswers[qid] = optIdx;
          lbl.parentElement.querySelectorAll(".quiz-option-label").forEach((l) => l.classList.remove("selected"));
          lbl.classList.add("selected");
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
  };

  const updateQuizTimerDisplay = () => {
    const quizTimerText = document.getElementById("quizTimerText");
    if (!quizTimerText) return;
    const mins = Math.floor(quizTimeRemaining / 60);
    const secs = quizTimeRemaining % 60;
    quizTimerText.textContent = `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  const submitQuiz = () => {
    if (!activeQuiz) return;
    clearInterval(quizTimerInterval);

    let correctCount = 0;
    const totalCount = (activeQuiz.questions || []).length || 1;

    (activeQuiz.questions || []).forEach((q) => {
      const chosen = userQuizAnswers[q.id];
      const qCard = document.getElementById(`quizQuestion_${q.id}`);
      const explBox = document.getElementById(`explanation_${q.id}`);

      if (explBox) explBox.classList.remove("hidden");

      if (qCard) {
        qCard.querySelectorAll(".quiz-option-label").forEach((lbl) => {
          const optIdx = parseInt(lbl.dataset.optindex);
          if (optIdx === q.answerIndex) {
            lbl.classList.add("correct");
          } else if (optIdx === chosen) {
            lbl.classList.add("incorrect");
          }
        });
      }

      if (chosen === q.answerIndex) {
        correctCount++;
      }
    });

    const score10 = ((correctCount / totalCount) * 10).toFixed(1);
    const percentage = Math.round((correctCount / totalCount) * 100);

    // Save to Gradebook
    const grades = getStoredGrades();
    grades.unshift({
      id: `grade-${Date.now()}`,
      quizTitle: activeQuiz.title,
      type: "quiz",
      score: score10,
      maxScore: "10",
      grade: activeQuiz.grade || "12",
      subject: activeQuiz.course || "Trắc nghiệm",
      feedback: score10 >= 8 ? "Rất xuất sắc! Nắm vững toàn bộ kiến thức cốt lõi." : score10 >= 6.5 ? "Khá tốt! Cần xem lại các câu giải thích để tối ưu điểm số." : "Cần ôn tập lại lý thuyết chuyên đề này.",
      date: new Date().toLocaleDateString("vi-VN")
    });
    saveStoredGrades(grades);

    // Show Result Box
    const quizResultBox = document.getElementById("quizResultBox");
    const quizResultScore = document.getElementById("quizResultScore");
    const quizResultPercentage = document.getElementById("quizResultPercentage");
    const quizResultFeedback = document.getElementById("quizResultFeedback");
    const quizFooterActions = document.getElementById("quizFooterActions");

    if (quizResultScore) quizResultScore.textContent = `${score10}/10`;
    if (quizResultPercentage) quizResultPercentage.textContent = `${percentage}% (${correctCount}/${totalCount} câu đúng)`;
    if (quizResultFeedback) {
      quizResultFeedback.textContent = score10 >= 8 ? "🎉 Chúc mừng bạn đạt điểm Giỏi! Kết quả đã tự động lưu vào Bảng điểm." : "👍 Bạn đã hoàn thành bài thi! Kết quả đã được lưu vào Bảng điểm.";
    }

    if (quizResultBox) quizResultBox.classList.remove("hidden");
    if (quizFooterActions) quizFooterActions.style.display = "none";

    renderStudentGradebook();
  };

  const closeTakeQuiz = () => {
    clearInterval(quizTimerInterval);
    closeModalElement(takeQuizModal);
  };

  const btnSubmitQuiz = document.getElementById("btnSubmitQuiz");
  if (btnSubmitQuiz) btnSubmitQuiz.addEventListener("click", submitQuiz);

  const btnReviewQuizAnswers = document.getElementById("btnReviewQuizAnswers");
  if (btnReviewQuizAnswers) {
    btnReviewQuizAnswers.addEventListener("click", () => {
      const container = document.getElementById("quizQuestionsContainer");
      if (container) container.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Render Student Quizzes Tab
  const renderStudentQuizzes = () => {
    const studentQuizList = document.getElementById("studentQuizList");
    if (!studentQuizList) return;

    const currentUser = getCurrentUser();
    const activeGrade = currentUser?.grade || document.getElementById("dashboardGradeSelect")?.value || "12";
    const quizzes = getStoredQuizzes();

    let filtered = quizzes.filter((q) => String(q.grade) === String(activeGrade));
    if (filtered.length === 0) filtered = quizzes;

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
                <span>•</span>
                <span>👨‍🏫 ${quiz.teacherName || "Giáo viên"}</span>
              </div>
            </div>
            <div class="quiz-card-footer">
              <span style="font-size: 0.82rem; font-weight: 700; color: #10b981;">⚡ Tự động chấm</span>
              <button class="btn btn-primary small-btn start-quiz-btn" data-id="${quiz.id}">Bắt đầu làm bài</button>
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
  };

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

  const createQuizForm = document.getElementById("createQuizForm");
  if (createQuizForm) {
    createQuizForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("newQuizTitle")?.value.trim();
      const course = document.getElementById("newQuizCourse")?.value;
      const grade = document.getElementById("newQuizGrade")?.value || "12";
      const duration = parseInt(document.getElementById("newQuizDuration")?.value) || 15;
      const raw = document.getElementById("newQuizQuestionsRaw")?.value.trim();
      const msg = document.getElementById("createQuizMessage");

      const currentUser = getCurrentUser();
      const teacherName = currentUser?.fullName || "Giáo viên EduNova";

      const lines = raw.split("\n").filter((l) => l.trim().length > 0);
      const questions = lines.map((line, idx) => {
        const parts = line.split("|").map((p) => p.trim());
        const qText = parts[0] || `Câu hỏi ${idx + 1}`;
        const options = parts.slice(1, 5).map((p) => p.replace(/^[A-D]:\s*/, "")) || ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"];
        while (options.length < 4) options.push(`Đáp án ${String.fromCharCode(65 + options.length)}`);
        return {
          id: `q_${Date.now()}_${idx}`,
          question: qText,
          options,
          answerIndex: 0,
          explanation: "Lời giải chi tiết do giáo viên hướng dẫn."
        };
      });

      if (questions.length === 0) {
        questions.push({
          id: `q_${Date.now()}_0`,
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
        msg.textContent = "✓ Đã tạo đề kiểm tra trắc nghiệm thành công!";
        msg.className = "form-message success";
      }

      setTimeout(() => {
        closeModalElement(createQuizModal);
        createQuizForm.reset();
        if (msg) msg.textContent = "";
        renderTeacherDashboard();
      }, 1000);
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
    const submissions = getStoredSubmissions();

    if (teacherCoursesCount) teacherCoursesCount.textContent = courses.length;
    if (teacherQuizzesCount) teacherQuizzesCount.textContent = quizzes.length;
    if (teacherMaterialsCount) teacherMaterialsCount.textContent = materials.length;
    if (teacherSubmissionsCount) teacherSubmissionsCount.textContent = submissions.length;

    // Render Quizzes in Teacher View
    if (teacherQuizList) {
      teacherQuizList.innerHTML = quizzes
        .map(
          (q) => `
            <div class="assignment-item">
              <div class="assignment-top">
                <h4 class="assignment-title">${q.title}</h4>
                <span class="type-chip exam">Lớp ${q.grade || "12"}</span>
              </div>
              <div class="assignment-meta">
                <span class="badge-course">${q.course ? q.course.split("-")[0].trim() : "Môn học"}</span>
                <span>⏱ ${q.duration || 15} phút</span>
                <span>• ${q.questions ? q.questions.length : 5} câu hỏi</span>
              </div>
            </div>
          `
        )
        .join("");
    }

    // Render Materials in Teacher View
    if (teacherMaterialList) {
      teacherMaterialList.innerHTML = materials
        .map(
          (mat) => `
            <div class="material-item">
              <div class="material-top">
                <h4 class="material-title">${mat.title}</h4>
                <span class="type-chip ${mat.type}">${mat.type === "video" ? "🎥 Video" : mat.type === "exam" ? "📝 Đề thi" : "📄 Tài liệu"}</span>
              </div>
              <div class="assignment-meta">
                <span class="badge-course">${mat.course ? mat.course.split("-")[0].trim() : "Môn học"}</span>
                <span>${mat.createdAt || "Gần đây"}</span>
              </div>
            </div>
          `
        )
        .join("");
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
                <span class="badge-course">${assign.course ? assign.course.split("-")[0].trim() : "Môn học"}</span>
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
              <span class="badge-course">${c.category === "natural" ? "Tự nhiên" : c.category === "social" ? "Xã hội" : "Ngoại ngữ & Tin"}</span>
            </div>
          `
        )
        .join("");
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
      const match = materials.filter((m) => m.course === currentUser.course);
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
              <button class="btn btn-secondary small-btn view-mat-btn" data-id="${mat.id}">Học ngay</button>
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
        if (studentGradePill) studentGradePill.textContent = `🎓 Lớp ${currentUser.grade || "12"}`;
        if (studentCoursePill) studentCoursePill.textContent = currentUser.course ? currentUser.course.split("-")[0].trim() : "Tất cả môn";
        if (dashboardGradeSelect) dashboardGradeSelect.value = currentUser.grade || "12";

        renderStudentQuizzes();
        renderStudentGradebook();
        renderQuestionBank();
        renderStudentMaterials();
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
      if (studentGradePill) studentGradePill.textContent = "🎓 Lớp 12";
      if (studentCoursePill) studentCoursePill.textContent = "Tất cả môn";
      if (dashboardGradeSelect) dashboardGradeSelect.value = "12";

      renderStudentQuizzes();
      renderStudentGradebook();
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
        settingsModal
      ].forEach((m) => {
        if (m === takeQuizModal) {
          closeTakeQuiz();
        } else if (m) {
          closeModalElement(m);
        }
      });
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
