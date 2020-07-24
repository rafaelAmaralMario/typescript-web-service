let extension: string = "js";
if (process.env.NODE_ENV === "dev") {
  extension = "ts";
}
module.exports = () => require(`./${process.env.NODE_ENV}.env.${extension}`);
