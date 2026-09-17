/* =========================================================
   BACKGROUND IMPORTS
========================================================= */

import bg1911 from "../../assets/game/backgrounds/bg_1911.jpg";

import bg1920 from "../../assets/game/backgrounds/bg_1920.jpg";

import bg1930 from "../../assets/game/backgrounds/bg_1930.jpg";

import bg1935 from "../../assets/game/backgrounds/bg_1935.jpg";

import bg1945 from "../../assets/game/backgrounds/bg_1945.jpg";

import bg1954 from "../../assets/game/backgrounds/bg_1954.jpg";

import bg1966 from "../../assets/game/backgrounds/bg_1966.jpg";

import bg1969 from "../../assets/game/backgrounds/bg_1969.jpg";

/* =========================================================
   GAME STAGES
========================================================= */

export const GAME_STAGES = [
  /* =======================================================
     STAGE 1
     1911
  ======================================================= */

  {
    id: "1911",

    year: "1911",

    range: "1911",

    title: "Ra đi tìm đường cứu nước",

    x: 1800,

    theme: "harbor",

    background: bg1911,

    backgroundName: "BẾN CẢNG · KHỞI ĐẦU HÀNH TRÌNH",

    description:
      "Ngày 5/6/1911 mở đầu hành trình tìm kiếm một con đường cứu nước mới.",

    story: [
      "Đầu thế kỷ XX, nhiều phong trào yêu nước đã diễn ra nhưng chưa tìm được con đường giải phóng dân tộc phù hợp.",

      "Nguyễn Tất Thành khâm phục tinh thần yêu nước của các bậc tiền bối nhưng không lựa chọn đi theo hoàn toàn những phương pháp cũ.",

      "Ngày 5/6/1911, Người ra đi tìm đường cứu nước, bắt đầu quá trình khảo sát thực tiễn thế giới.",
    ],

    question:
      "Ý nghĩa quan trọng của quyết định ra đi năm 1911 đối với sự phát triển tư tưởng là gì?",

    options: [
      "Tiếp tục hoàn toàn các phương pháp cứu nước cũ",

      "Mở ra quá trình khảo sát thực tiễn thế giới để tìm một con đường cứu nước mới",

      "Chấm dứt việc tìm kiếm con đường giải phóng dân tộc",

      "Chỉ tập trung nghiên cứu tình hình trong nước",
    ],

    answer: 1,

    hint: "Hãy chú ý sự chuyển biến từ lòng yêu nước sang chủ động tìm một con đường mới.",

    unlock: "TÌM ĐƯỜNG CỨU NƯỚC",

    transformation: "Yêu nước → Chủ động tìm con đường cứu nước mới",
  },

  /* =======================================================
     STAGE 2
     1919 - 1920
  ======================================================= */

  {
    id: "1919-1920",

    year: "1919–1920",

    range: "1919–1920",

    title: "Từ yêu nước đến cách mạng vô sản",

    x: 4800,

    theme: "paris",

    background: bg1920,

    backgroundName: "PARIS · BƯỚC NGOẶT NHẬN THỨC",

    description:
      "Hoạt động tại Pháp và tiếp cận Luận cương của Lênin tạo nên bước chuyển quan trọng về nhận thức.",

    story: [
      "Năm 1919, Nguyễn Ái Quốc gửi Yêu sách của nhân dân An Nam tới Hội nghị Vécxây.",

      "Qua thực tiễn, Người nhận thấy các cường quốc không tự trao quyền độc lập cho các dân tộc thuộc địa.",

      "Tháng 7/1920, việc nghiên cứu Luận cương của Lênin giúp Người xác định rõ phương hướng giải phóng dân tộc.",

      "Cuối năm 1920, tại Đại hội Tua, Nguyễn Ái Quốc lựa chọn đứng về Quốc tế Cộng sản.",
    ],

    question: "Bước ngoặt cốt lõi của giai đoạn 1919–1920 là gì?",

    options: [
      "Từ chủ nghĩa yêu nước đến lập trường cách mạng vô sản",

      "Từ hoạt động cách mạng sang hoạt động kinh tế",

      "Từ quốc tế trở lại con đường phong kiến",

      "Từ giải phóng dân tộc sang từ bỏ vấn đề dân tộc",
    ],

    answer: 0,

    hint: "Đây là giai đoạn chủ nghĩa yêu nước gắn với một hệ tư tưởng và con đường cách mạng mới.",

    unlock: "CÁCH MẠNG VÔ SẢN",

    transformation: "Chủ nghĩa yêu nước → Lập trường cách mạng vô sản",
  },

  /* =======================================================
     STAGE 3
     1925 - 1930
  ======================================================= */

  {
    id: "1925-1930",

    year: "1925–1930",

    range: "1925–1930",

    title: "Từ tìm đường đến xây dựng đường lối",

    x: 8000,

    theme: "books",

    background: bg1930,

    backgroundName: "LÝ LUẬN · TỔ CHỨC · ĐƯỜNG LỐI",

    description:
      "Các hoạt động lý luận, đào tạo cán bộ và tổ chức cách mạng từng bước cụ thể hóa con đường đã lựa chọn.",

    story: [
      "Năm 1925, Bản án chế độ thực dân Pháp được xuất bản.",

      "Hội Việt Nam Cách mạng Thanh niên được thành lập nhằm truyền bá lý luận và đào tạo cán bộ.",

      "Năm 1927, Đường Cách mệnh hệ thống nhiều quan điểm về tổ chức và lực lượng cách mạng.",

      "Đầu năm 1930, Đảng Cộng sản Việt Nam được thành lập và Cương lĩnh chính trị đầu tiên được thông qua.",
    ],

    question: "Sự chuyển biến quan trọng nhất của giai đoạn 1925–1930 là gì?",

    options: [
      "Từ tìm ra con đường sang cụ thể hóa thành lý luận, tổ chức và đường lối cách mạng",

      "Từ hoạt động chính trị sang ngừng hoạt động",

      "Từ giải phóng dân tộc sang chỉ nghiên cứu kinh tế",

      "Từ xây dựng tổ chức sang loại bỏ vai trò tổ chức",
    ],

    answer: 0,

    hint: "Hãy nghĩ tới Đường Cách mệnh, tổ chức cán bộ và Cương lĩnh năm 1930.",

    unlock: "ĐƯỜNG LỐI CÁCH MẠNG",

    transformation:
      "Tìm thấy con đường → Hình thành đường lối và tổ chức lãnh đạo",
  },

  /* =======================================================
     STAGE 4
     1935
  ======================================================= */

  {
    id: "1935",

    year: "1935",

    range: "7/1935",

    title: "Đại hội VII Quốc tế Cộng sản – Tư tưởng từng bước được nhìn nhận",

    x: 11500,

    theme: "moscow",

    background: bg1935,

    backgroundName: "MOSCOW · THỬ THÁCH VÀ KIÊN ĐỊNH",

    description:
      "Sau một thời gian gặp nhiều khó khăn và chưa được nhìn nhận đầy đủ, năm 1935 đánh dấu một chuyển biến quan trọng khi Nguyễn Ái Quốc tham gia Đại hội VII Quốc tế Cộng sản và những quan điểm về vấn đề dân tộc, giải phóng thuộc địa ngày càng có điều kiện được nhìn nhận phù hợp hơn.",

    story: [
      "Trong những năm 1934–1938, Nguyễn Ái Quốc tiếp tục học tập và hoạt động tại Liên Xô trong hoàn cảnh còn gặp nhiều khó khăn và chưa được giao trực tiếp nhiều nhiệm vụ cách mạng.",

      "Tháng 7/1935, Nguyễn Ái Quốc tham dự Đại hội VII Quốc tế Cộng sản với tư cách đại biểu tư vấn. Người tham gia chuẩn bị Đại hội, đóng góp ý kiến về tình hình Viễn Đông và Đông Nam Á, đồng thời hỗ trợ Đoàn đại biểu Đảng Cộng sản Đông Dương.",

      "Đại hội VII nhấn mạnh sự liên hệ giữa phong trào công nhân quốc tế với phong trào giải phóng dân tộc, đồng thời yêu cầu các đảng cộng sản tích cực ủng hộ cuộc đấu tranh của các dân tộc thuộc địa và nửa thuộc địa.",

      "Những chuyển biến đó tạo điều kiện để quan điểm của Nguyễn Ái Quốc về sự kết hợp giữa vấn đề dân tộc và vấn đề giai cấp ngày càng được nhìn nhận phù hợp hơn với thực tiễn cách mạng thuộc địa.",
    ],

    question:
      "Ý nghĩa nổi bật của mốc Đại hội VII Quốc tế Cộng sản năm 1935 đối với hành trình tư tưởng của Nguyễn Ái Quốc là gì?",

    options: [
      "Nguyễn Ái Quốc từ bỏ quan điểm về giải phóng dân tộc để chỉ tập trung vào đấu tranh giai cấp",

      "Quan điểm về cách mạng giải phóng dân tộc và mối quan hệ giữa vấn đề dân tộc với vấn đề giai cấp ngày càng có điều kiện được nhìn nhận phù hợp hơn",

      "Nguyễn Ái Quốc chấm dứt hoạt động trong phong trào cộng sản quốc tế",

      "Từ năm 1935, Nguyễn Ái Quốc đã trực tiếp trở về Việt Nam lãnh đạo cách mạng",
    ],

    answer: 1,

    hint: "Hãy chú ý sự thay đổi trong cách Quốc tế Cộng sản nhìn nhận vấn đề thuộc địa và phong trào giải phóng dân tộc tại Đại hội VII.",

    unlock: "TƯ TƯỞNG TỪNG BƯỚC ĐƯỢC KHẲNG ĐỊNH",

    transformation:
      "Gặp thử thách và chưa được nhìn nhận đầy đủ → tiếp tục kiên trì hoạt động → quan điểm về dân tộc và giai cấp từng bước được nhìn nhận phù hợp hơn",

    source: [
      "Hồ Chí Minh Toàn tập, Tập 14, tr. 767",

      "Lịch sử Biên niên Đảng Cộng sản Việt Nam, Tập 2",
    ],
  },

  /* =======================================================
     STAGE 5
     1941 - 1945
  ======================================================= */

  {
    id: "1941-1945",

    year: "1941–1945",

    range: "1941–1945",

    title: "Giải phóng dân tộc trở thành nhiệm vụ hàng đầu",

    x: 14500,

    theme: "mountain",

    background: bg1945,

    backgroundName: "PÁC BÓ → CÁCH MẠNG THÁNG TÁM",

    description:
      "Tư tưởng giải phóng dân tộc được cụ thể hóa thành chiến lược, lực lượng và hành động cách mạng.",

    story: [
      "Năm 1941, Hồ Chí Minh trở về nước và chủ trì Hội nghị Trung ương tại Pác Bó.",

      "Nhiệm vụ giải phóng dân tộc được đặt lên hàng đầu.",

      "Mặt trận Việt Minh được thành lập để tập hợp lực lượng toàn dân.",

      "Lực lượng chính trị và lực lượng vũ trang từng bước được chuẩn bị.",

      "Tháng 8/1945, Tổng khởi nghĩa giành thắng lợi.",

      "Ngày 2/9/1945, nước Việt Nam Dân chủ Cộng hòa ra đời.",
    ],

    question: "Chuỗi chuyển biến nào thể hiện rõ nhất giai đoạn 1941–1945?",

    options: [
      "Lý luận → tổ chức lực lượng → giành chính quyền",

      "Giành chính quyền → tìm đường cứu nước",

      "Xây dựng CNXH → tìm hiểu thế giới",

      "Ngoại giao → từ bỏ nhiệm vụ giải phóng dân tộc",
    ],

    answer: 0,

    hint: "Tư tưởng giải phóng dân tộc lúc này được chuyển thành tổ chức và hành động thực tiễn.",

    unlock: "GIÀNH ĐỘC LẬP",

    transformation:
      "Đường lối giải phóng dân tộc → Tổ chức lực lượng → Thắng lợi thực tiễn",
  },

  /* =======================================================
     STAGE 6
     1946 - 1954
  ======================================================= */

  {
    id: "1946-1954",

    year: "1946–1954",

    range: "1946–1954",

    title: "Bảo vệ nền độc lập",

    x: 17500,

    theme: "resistance",

    background: bg1954,

    backgroundName: "KHÁNG CHIẾN · BẢO VỆ ĐỘC LẬP",

    description:
      "Sau khi giành chính quyền, trọng tâm chuyển sang giữ vững chính quyền và bảo vệ nền độc lập.",

    story: [
      "Nhà nước mới phải đối diện với nhiều khó khăn trong và ngoài nước.",

      "Hồ Chí Minh kết hợp kiên định mục tiêu với sách lược linh hoạt.",

      "Từ cuối năm 1946, cuộc kháng chiến chống thực dân Pháp được triển khai.",

      "Đường lối kháng chiến được xác định theo hướng lâu dài, toàn dân, toàn diện và tự lực cánh sinh.",

      "Năm 1954, hòa bình được lập lại ở miền Bắc.",
    ],

    question:
      "Sau thắng lợi năm 1945, trọng tâm tư tưởng và nhiệm vụ cách mạng chuyển sang đâu?",

    options: [
      "Trở lại giai đoạn tìm đường cứu nước",

      "Giữ vững chính quyền, bảo vệ độc lập và phát triển đường lối kháng chiến",

      "Chỉ tập trung hoạt động ở nước ngoài",

      "Không còn nhiệm vụ cách mạng",
    ],

    answer: 1,

    hint: "Giành được chính quyền chưa đồng nghĩa với việc thành quả cách mạng đã được bảo đảm.",

    unlock: "BẢO VỆ ĐỘC LẬP",

    transformation: "Giành chính quyền → Giữ vững chính quyền → Bảo vệ độc lập",
  },

  /* =======================================================
     STAGE 7
     1954 - 1966
  ======================================================= */

  {
    id: "1954-1966",

    year: "1954–1966",

    range: "1954–1966",

    title: "Hai nhiệm vụ chiến lược",

    x: 20500,

    theme: "nation",

    background: bg1966,

    backgroundName: "XÂY DỰNG · ĐẤU TRANH THỐNG NHẤT",

    description:
      "Cách mạng Việt Nam bước vào hoàn cảnh mới với hai nhiệm vụ chiến lược được tiến hành đồng thời.",

    story: [
      "Sau năm 1954, miền Bắc bước vào thời kỳ quá độ lên chủ nghĩa xã hội.",

      "Miền Nam tiếp tục cách mạng dân tộc dân chủ nhân dân.",

      "Hai nhiệm vụ cùng hướng tới hòa bình, độc lập và thống nhất đất nước.",

      "Ngày 17/7/1966, Hồ Chí Minh khẳng định: “Không có gì quý hơn độc lập, tự do”.",
    ],

    question:
      "Hai nhiệm vụ chiến lược từ sau năm 1954 cùng hướng tới mục tiêu chung nào?",

    options: [
      "Hòa bình, độc lập và thống nhất đất nước",

      "Chỉ phát triển miền Bắc",

      "Chỉ hoạt động ngoại giao",

      "Tách biệt lâu dài hai miền",
    ],

    answer: 0,

    hint: "Hai chiến lược khác nhau về nhiệm vụ trực tiếp nhưng cùng hướng tới một mục tiêu chung.",

    unlock: "XÂY DỰNG & THỐNG NHẤT",

    transformation:
      "Bảo vệ độc lập → Xây dựng miền Bắc + đấu tranh thống nhất đất nước",
  },

  /* =======================================================
     STAGE 8
     1969
  ======================================================= */

  {
    id: "1969",

    year: "1969",

    range: "1969",

    title: "Di chúc – sự kết tinh của hành trình tư tưởng",

    x: 24000,

    theme: "legacy",

    background: bg1969,

    backgroundName: "DI CHÚC · DI SẢN TƯ TƯỞNG",

    description:
      "Di chúc thể hiện những định hướng và mong muốn lâu dài đối với sự nghiệp cách mạng Việt Nam.",

    story: [
      "Trước khi đi xa, Hồ Chí Minh để lại Di chúc.",

      "Văn kiện thể hiện những suy nghĩ về Đảng, nhân dân, đoàn kết và tương lai đất nước.",

      "Mục tiêu được nhấn mạnh là xây dựng một nước Việt Nam hòa bình, thống nhất, độc lập, dân chủ và giàu mạnh.",
    ],

    question:
      "Nếu nhìn lại toàn bộ hành trình 1911–1969, chuỗi phát triển nào phù hợp nhất?",

    options: [
      "Yêu nước → tìm đường cứu nước → cách mạng vô sản → hình thành đường lối → giành chính quyền → bảo vệ độc lập → xây dựng và thống nhất đất nước",

      "Tìm đường cứu nước → kết thúc cách mạng năm 1920",

      "Giành chính quyền → quay trở lại tìm con đường cứu nước",

      "Chỉ có một tư tưởng không thay đổi qua các giai đoạn",
    ],

    answer: 0,

    hint: "Hãy nhìn lại tất cả những mảnh tư tưởng mà bạn đã mở khóa.",

    unlock: "DI SẢN TƯ TƯỞNG",

    transformation:
      "Một hành trình từ tìm đường cứu nước đến định hướng xây dựng và phát triển đất nước",
  },
];
