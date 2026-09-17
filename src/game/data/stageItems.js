export const STAGE_ITEM_RULES = {
  "1911": {
    requiredGems: 3,
    chestCount: 0,
    lockedChests: [],
    gemsInChests: 0,
    fakeKeys: 0,
  },
  "1919-1920": {
    requiredGems: 4,
    chestCount: 2,
    lockedChests: [1],
    gemsInChests: 1,
    fakeKeys: 0,
  },
  "1925-1930": {
    requiredGems: 6,
    chestCount: 4,
    lockedChests: [1, 3],
    gemsInChests: 2,
    fakeKeys: 3,
    specialQuestions: [
      {
        id: "3.5",
        question:
          "Việc Hồ Chí Minh thành lập Đảng Cộng sản Việt Nam với Cương lĩnh chính trị đúng đắn và sáng tạo đầu năm 1930 có ý nghĩa lịch sử gì quan trọng nhất?",
        options: [
          "Đưa cách mạng Việt Nam trở thành lực lượng lãnh đạo cách mạng thế giới.",
          "Chấm dứt cuộc khủng hoảng về đường lối cứu nước và tổ chức lãnh đạo cách mạng Việt Nam kéo dài từ cuối thế kỷ XIX.",
          "Đánh đuổi hoàn toàn chủ nghĩa thực dân Pháp ra khỏi cõi Đông Dương.",
          "Hoàn thành triệt để cuộc cách mạng ruộng đất cho nhân dân lao động.",
        ],
        answer: 1,
      },
      {
        id: "3.6",
        question:
          "Theo tác phẩm Đường kách mệnh, lực lượng nòng cốt của cách mạng giải phóng dân tộc Việt Nam được Hồ Chí Minh xác định là gì?",
        options: [
          "Giai cấp tư sản dân tộc và tiểu tư sản.",
          "Liên minh công nông.",
          "Toàn thể các giai cấp trong xã hội thuộc địa.",
          "Giai cấp công nhân và tầng lớp trí thức.",
        ],
        answer: 1,
      },
    ],
  },
  "1935": {
    requiredGems: 8,
    chestCount: 12,
    lockedChests: [3, 5, 9, 11],
    gemsInChests: 4,
    fakeKeys: 3,
    specialQuestions: [
      {
        id: "4.5",
        question:
          "Cương lĩnh chính trị đầu tiên do Hồ Chí Minh khởi thảo ban đầu bị một số người phê phán và gán cho nhãn mác gì?",
        options: [
          '"Xét lại" và "Cơ hội chủ nghĩa".',
          '"Hữu khuynh" và "Dân tộc chủ nghĩa".',
          '"Phiêu lưu" và "Tả khuynh".',
          '"Cực đoan" và "Vô chính phủ".',
        ],
        answer: 1,
      },
      {
        id: "4.6",
        question:
          "Ban Chấp hành Trung ương Đảng họp tháng 10/1930 đã đưa ra nhận định sai lầm nào về Hội nghị hợp nhất Đảng do Nguyễn Ái Quốc chủ trì?",
        options: [
          "Đã đánh giá quá cao vai trò của giai cấp địa chủ.",
          "Chỉ lo đến việc phản đế, mà quên mất lợi ích giai cấp tranh đấu ấy là một sự rất nguy hiểm.",
          "Quá chú trọng vào cuộc đấu tranh của giai cấp công nhân chính quốc.",
          "Không đề ra mục tiêu giải phóng các dân tộc trên toàn Đông Dương.",
        ],
        answer: 1,
      },
      {
        id: "4.7",
        question:
          "Trong khoảng thời gian từ năm 1934 đến năm 1938 ở Liên Xô, tình cảnh của Hồ Chí Minh như thế nào?",
        options: [
          "Trực tiếp lãnh đạo các phong trào cách mạng ở Đông Dương từ xa.",
          "Vẫn còn bị hiểu lầm về một số hoạt động thực tế và quan điểm cách mạng.",
          "Được Quốc tế Cộng sản cử làm Trưởng Ban Đông Dương.",
          "Giữ chức Tổng thư ký Quốc tế Cộng sản.",
        ],
        answer: 1,
      },
      {
        id: "4.8",
        question:
          "Ngày 6/6/1938, Hồ Chí Minh gửi thư cho lãnh đạo Quốc tế Cộng sản với nguyện vọng chính là gì?",
        options: [
          "Tiếp tục kéo dài thời gian làm nghiên cứu sinh.",
          "Được phân công công tác tại các nước châu Âu.",
          "Được giúp đỡ để trở về nước trực tiếp tham gia lãnh đạo cách mạng Việt Nam.",
          "Triệu tập Đại hội toàn quốc tại Mátxcơva.",
        ],
        answer: 2,
      },
    ],
  },
  "1941-1945": {
    requiredGems: 6,
    chestCount: 1,
    lockedChests: [1],
    gemsInChests: 4,
    fakeKeys: 15,
  },
  "1946-1954": {
    requiredGems: 8,
    chestCount: 0,
    lockedChests: [],
    gemsInChests: 0,
    fakeKeys: 0,
    fakeGems: 15,
    deadlyFakeGem: true,
    specialQuestions: [
      {
        id: "6.6",
        question:
          "Trong giai đoạn 1946–1954, đường lối kháng chiến chống thực dân Pháp gồm những nội dung cốt lõi nào?",
        options: [
          "Đánh nhanh thắng nhanh, toàn dân, toàn diện, tự lực cánh sinh.",
          "Toàn dân, toàn diện, lâu dài, tự lực cánh sinh.",
          "Lâu dài, tập trung lực lượng quân sự, tranh thủ viện trợ tối đa.",
          "Toàn dân, toàn diện, phòng ngự thụ động, tự lực cánh sinh.",
        ],
        answer: 1,
      },
      {
        id: "6.7",
        question:
          "Ngày 19/12/1946, Chủ tịch Hồ Chí Minh ra văn kiện nào vừa khái quát đường lối kháng chiến chống Pháp, vừa thể hiện lời thề bảo vệ Tổ quốc?",
        options: [
          "Tuyên ngôn Độc lập.",
          "Lời kêu gọi đồng bào và chiến sĩ cả nước.",
          "Lời kêu gọi toàn quốc kháng chiến.",
          "Kháng chiến nhất định thắng lợi.",
        ],
        answer: 2,
      },
      {
        id: "6.8",
        question:
          "Thắng lợi của cuộc kháng chiến chống thực dân Pháp năm 1954 có ý nghĩa quốc tế to lớn như thế nào?",
        options: [
          "Chấm dứt hoàn toàn ảnh hưởng của chủ nghĩa tư bản ở châu Á.",
          "Mở ra thời kỳ sụp đổ của hệ thống thuộc địa kiểu cũ trên phạm vi toàn thế giới.",
          "Làm thất bại hoàn toàn chủ nghĩa thực dân kiểu mới của Mỹ.",
          "Đánh dấu sự ra đời của hệ thống các nước xã hội chủ nghĩa.",
        ],
        answer: 1,
      },
    ],
  },
  "1954-1966": {
    requiredGems: 6,
    chestCount: 4,
    lockedChests: [1, 3],
    gemsInChests: 2,
    fakeKeys: 8,
    specialQuestions: [
      {
        id: "7.5",
        question:
          "Trong Lời kêu gọi ngày 17/7/1966, Chủ tịch Hồ Chí Minh thể hiện niềm tin vào thắng lợi tương lai qua câu nói nào?",
        options: [
          "Đến ngày thắng lợi, nhân dân ta sẽ xây dựng lại đất nước ta đàng hoàng hơn, to đẹp hơn!",
          "Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước.",
          "Đoàn kết, đoàn kết, đại đoàn kết; Thành công, thành công, đại thành công.",
          "Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người.",
        ],
        answer: 0,
      },
      {
        id: "7.6",
        question:
          "Ngày 17/7/1966, Chủ tịch Hồ Chí Minh ra Lời kêu gọi trong bối cảnh lịch sử nào?",
        options: [
          "Thực dân Pháp quay lại xâm lược Việt Nam lần thứ hai.",
          "Mỹ tăng cường quân đội vào miền Nam và đẩy mạnh đánh phá miền Bắc bằng không quân, hải quân.",
          "Quân dân ta vừa giành chiến thắng Điện Biên Phủ.",
          "Miền Bắc bắt đầu Kế hoạch 5 năm lần thứ nhất.",
        ],
        answer: 1,
      },
    ],
  },
  "1969": {
    requiredGems: 3,
    chestCount: 20,
    lockedChests: Array.from({ length: 20 }, (_, index) => index + 1),
    gemsInChests: 3,
    fakeKeys: 9,
  },
};

export const DEADLY_GEM_QUESTION = {
  id: "deadly-1946",
  deadly: true,
  question: "Chủ tịch Hồ Chí Minh đã đọc bản Tuyên ngôn Độc lập vào năm nào?",
  options: ["1945", "1946", "1947", "1944"],
  answer: 0,
};
