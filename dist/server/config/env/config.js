var extension = "js";
if (process.env.NODE_ENV === "dev") {
    extension = "ts";
}
module.exports = function () { return require("./" + process.env.NODE_ENV + ".env." + extension); };
