const testsService = require("../services/tests");
const catchAsync = require("../utils/catchAsync");

const getTests = catchAsync(async (req, res, next) => {
    const dataSet = await testsService.getTests();
    res.json({ data: dataSet });
});

const getTestResult = catchAsync(async (req, res, next) => {
    const { testName, userTestResult } = req.body;
    const test = await testsService.getTestByName(testName);
    
    const data = test
        ? {
              isGoodDiagnose: userTestResult < test.threshold,
              name: test.name,
          }
        : {
              isGoodDiagnose: null,
              name: "unknown",
          };

    res.json({ data, isFound: !!test });
});

module.exports = {
    getTests,
    getTestResult,
};
