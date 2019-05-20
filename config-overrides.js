const { override, disableChunk, addBabelPlugins } = require('customize-cra');

module.exports = override(
  disableChunk(),
);