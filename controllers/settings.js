const settingsService = require("../services/settings");
const catchAsync = require("../utils/catchAsync");

const getTestsSettings = catchAsync(async (req, res, next) => {
  const dataSet = await settingsService.getTestsSettings();
  res.json({data: dataSet});
});

module.exports = {
    getTestsSettings,
};
