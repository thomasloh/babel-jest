var babel = require("babel-core");

module.exports = {
  process: function (src, filename) {
    // Allow the stage to be configured by an environment
    // variable, but use Babel's default stage (2) if
    // no environment variable is specified.
    var stage = process.env.BABEL_JEST_STAGE || 2;

    // Ignore all files within node_modules
    // babel files can be .js, .es, .jsx or .es6

    var isNotNodeModule = filename.indexOf("node_modules") === -1;
    var doesNotMatchIgnoreRegex = false;

    if (process.env.BABEL_IGNORE) {
      doesNotMatchIgnoreRegex = !filename.match(new RegExp(process.env.BABEL_IGNORE));
    }

    if ((isNotNodeModule && doesNotMatchIgnoreRegex) && babel.canCompile(filename)) {
      return babel.transform(src, { filename: filename, stage: stage, retainLines: true }).code;
    }

    return src;
  }
};
