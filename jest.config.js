module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  watchman: true,
  testPathIgnorePatterns: ["build"],
};
