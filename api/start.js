const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const AppServer = require('./server')

new AppServer().start()