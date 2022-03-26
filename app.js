const express = require("express");
const cors = require("cors");

const settingsRouter = require("./routers/settings");
const testsRouter = require("./routers/tests");
const AppErr = require("./utils/appErr");

const app = express();
app.enable("trust proxy");
app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/api/v1/settings", settingsRouter);
app.use("/api/v1/tests", testsRouter);

app.all("*", (req, res, next) => {
    next(new AppErr(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Server error",
    });
});

module.exports = app;
