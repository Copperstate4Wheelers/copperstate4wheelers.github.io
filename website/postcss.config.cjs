const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    require('cssnano'),
    postcssPresetEnv({
      browsers: 'last 4 versions'
    }),
  ],
};
