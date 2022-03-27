const testsService = require("../services/tests");
const catchAsync = require("../utils/catchAsync");

const getTests = catchAsync(async (req, res, next) => {
    const dataSet = await testsService.getTests();
    res.json({ data: dataSet });
});

const getTestResult = catchAsync(async (req, res, next) => {
    const { testName, userTestResult } = req.body;
    const test = await testsService.getTestByName(testName);

    const isGoodDiagnose = test ? userTestResult < test.threshold : null;
    const name = test ? test.name : "unknown";

    const data = { isGoodDiagnose, name };

    res.json({ data, isFound: !!test });
});

module.exports = {
    getTests,
    getTestResult,
};
