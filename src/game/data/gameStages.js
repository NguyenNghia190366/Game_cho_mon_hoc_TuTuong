import bg1911 from "../../assets/game/backgrounds/bg_1911.jpg";
import bg1920 from "../../assets/game/backgrounds/bg_1920.jpg";
import bg1930 from "../../assets/game/backgrounds/bg_1930.jpg";
import bg1935 from "../../assets/game/backgrounds/bg_1935.jpg";
import bg1945 from "../../assets/game/backgrounds/bg_1945.jpg";
import bg1954 from "../../assets/game/backgrounds/bg_1954.jpg";
import bg1966 from "../../assets/game/backgrounds/bg_1966.jpg";
import bg1969 from "../../assets/game/backgrounds/bg_1969.jpg";

export const GAME_STAGES = [
  {
    id: "1911",
    year: "1911",
    range: "1911",
    title: "Ra đi tìm đường cứu nước",
    x: 1800,
    theme: "harbor",
    background: bg1911,
    backgroundName: "BẾN CẢNG · KHỞI ĐẦU HÀNH TRÌNH",
    description: "Ngày 5/6/1911 mở đầu hành trình tìm kiếm một con đường cứu nước mới.",
    story: ["Lòng yêu nước và trải nghiệm thời trẻ hình thành chí hướng cứu nước.", "Ngày 5/6/1911, Nguyễn Tất Thành ra đi tìm một con đường mới."],
    unlock: "TÌM ĐƯỜNG CỨU NƯỚC",
  },
  {
    id: "1911-1920",
    year: "1911–1920",
    range: "1911–1920",
    title: "Từ khảo sát thực tiễn đến con đường cách mạng vô sản",
    x: 4800,
    theme: "paris",
    background: bg1920,
    backgroundName: "THẾ GIỚI · BƯỚC NGOẶT NHẬN THỨC",
    description: "Thực tiễn thế giới, Yêu sách năm 1919 và Luận cương của Lênin dẫn tới bước ngoặt năm 1920.",
    story: ["Nguyễn Ái Quốc khảo sát thực tiễn nhiều nước và hoạt động tại Pháp.", "Năm 1920, Người xác định phương hướng giải phóng dân tộc theo con đường cách mạng vô sản."],
    unlock: "CÁCH MẠNG VÔ SẢN",
  },
  {
    id: "1920-1930",
    year: "1920–1930",
    range: "1920–1930",
    title: "Từ lựa chọn con đường đến xây dựng đường lối",
    x: 8000,
    theme: "books",
    background: bg1930,
    backgroundName: "LÝ LUẬN · TỔ CHỨC · ĐƯỜNG LỐI",
    description: "Lý luận, tổ chức và đào tạo cán bộ chuẩn bị cho sự ra đời của Đảng và Cương lĩnh đầu tiên.",
    story: ["Hoạt động báo chí và lý luận phê phán chủ nghĩa thực dân.", "Tổ chức, cán bộ và Cương lĩnh năm 1930 cụ thể hóa con đường đã lựa chọn."],
    unlock: "ĐƯỜNG LỐI CÁCH MẠNG",
  },
  {
    id: "1930-1941",
    year: "1930–1941",
    range: "1930–1941",
    title: "Giữ vững đường lối qua thử thách",
    x: 11500,
    theme: "moscow",
    background: bg1935,
    backgroundName: "THỬ THÁCH · KIÊN ĐỊNH · KHẲNG ĐỊNH",
    description: "Đường lối trải qua thử thách và được khẳng định trong điều kiện mới tại Hội nghị tháng 5/1941.",
    story: ["Cương lĩnh đầu tiên chịu những phê phán giáo điều, tả khuynh.", "Hội nghị tháng 5/1941 khẳng định và cụ thể hóa đường lối giải phóng dân tộc."],
    unlock: "KIÊN ĐỊNH ĐƯỜNG LỐI",
  },
  {
    id: "1941-1969",
    year: "1941–1969",
    range: "1941–1969",
    title: "Tư tưởng được thực hiện và tiếp tục phát triển",
    x: 24000,
    theme: "legacy",
    background: bg1945,
    backgroundName: "GIẢI PHÓNG · BẢO VỆ · XÂY DỰNG · DI SẢN",
    description: "Một chặng đường dài từ giải phóng dân tộc, bảo vệ độc lập đến xây dựng đất nước và Di chúc năm 1969.",
    story: ["Đường lối giải phóng dân tộc được tổ chức thực hiện và dẫn tới thắng lợi năm 1945.", "Tư tưởng tiếp tục phát triển qua kháng chiến, xây dựng chủ nghĩa xã hội và đấu tranh thống nhất đất nước.", "Di chúc năm 1969 kết tinh tư tưởng và định hướng lâu dài cho tương lai đất nước."],
    unlock: "DI SẢN TƯ TƯỞNG",
  },
];

// Năm mốc khám phá nhưng tám vùng hình ảnh. Chặng cuối giữ bốn background
// của bốn giai đoạn cũ để tạo cảm giác đây là một bản đồ dài, liên tục.
export const GAME_BACKGROUND_ZONES = [
  { id: "bg-1911", startX: 0, background: bg1911 },
  { id: "bg-1911-1920", startX: 2070, background: bg1920 },
  { id: "bg-1920-1930", startX: 5070, background: bg1930 },
  { id: "bg-1930-1941", startX: 8270, background: bg1935 },
  { id: "bg-1941-1945", startX: 11770, background: bg1945 },
  { id: "bg-1946-1954", startX: 14770, background: bg1954 },
  { id: "bg-1954-1966", startX: 17770, background: bg1966 },
  { id: "bg-1969", startX: 20770, background: bg1969 },
];
