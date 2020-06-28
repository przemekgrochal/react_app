const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/static", express.static(path.join(__dirname, "./build/static")));

app.get("/", function (req, res) {
    res.sendFile("index.html", { root: path.join(__dirname, "./build/") });
});

const port = process.env.APP_PORT || 3003;
app.listen(port);
console.log("App is listening on port " + port);
