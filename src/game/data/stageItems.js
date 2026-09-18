export const STAGE_ITEM_RULES = {
  "1911": { requiredGems: 3, chestCount: 0, lockedChests: [], gemsInChests: 0, fakeKeys: 0 },
  "1919-1920": { requiredGems: 4, chestCount: 2, lockedChests: [1], gemsInChests: 1, fakeKeys: 0 },
  "1925-1930": { requiredGems: 4, chestCount: 4, lockedChests: [1, 3], gemsInChests: 2, fakeKeys: 3 },
  "1935": { requiredGems: 3, chestCount: 12, lockedChests: [3, 5, 9, 11], gemsInChests: 3, fakeKeys: 3 },
  "1941-1945": { requiredGems: 3, chestCount: 1, lockedChests: [1], gemsInChests: 3, fakeKeys: 15 },
  "1946-1954": {
    requiredGems: 3,
    chestCount: 0,
    lockedChests: [],
    gemsInChests: 0,
    fakeKeys: 0,
    fakeGems: 15,
    convertedFakeGemIds: ["6.4", "6.5", "6.6", "6.7", "6.8"],
    deadlyFakeGem: true,
  },
  "1954-1966": { requiredGems: 3, chestCount: 4, lockedChests: [1, 3], gemsInChests: 2, fakeKeys: 8 },
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
