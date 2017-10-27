module.exports = {
  plugins: [
    require('postcss-plugin-px2rem')({
      rootValue: 75,
    }),
    require('postcss-cssnext')(),
  ],
};
