const log4js = require("log4js");

log4js.configure({
    appenders: {
      everything: { type: "file", filename: "logs/chatterApp.log" },
    },
    categories: {
      default: { appenders: ["everything"], level: "debug" },
    },
  });

const logger = log4js.getLogger("chatterApp");
  
module.exports = logger;