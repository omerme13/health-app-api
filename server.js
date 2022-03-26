const app = require("./app");

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('Uncaught Exception!');
    process.exit(1);
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("Unhandled Rejection!");
    server.close(() => process.exit(1));
});
