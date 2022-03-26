const axios = require("axios");
const additionalTests = require("../tests.json");
const AppErr = require('../utils/AppErr')

const datasetUrl =
    "https://s3.amazonaws.com/s3.helloheart.home.assignment/bloodTestConfig.json";

const getTestsSettings = async () => {
    try {
        const res = await axios.get(datasetUrl);
        return [...res.data.bloodTestConfig, ...additionalTests];
    } catch (err) {
        throw new AppErr("Data service is not available", 503)
    }
};

module.exports = {
    getTestsSettings,
};
