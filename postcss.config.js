module.exports = {
  plugins: [
    require('postcss-cssnext')(),
    require('postcss-adaptive')({
      remUnit: 75,
      autoRem: true,
    }),
  ],
};
