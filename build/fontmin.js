const { resolve } = require('path');
const fs = require('fs');
const glob = require('glob');
const Fontmin = require('fontmin');

const srcPath = resolve(__dirname, '../bak/*.ttf');
const destPath = resolve(__dirname, '../src/fonts/');

const files = glob.sync('src/**/*.@(js|html|css)');
let text = 'abcdefjhigklmnopqrstuvwxyzABCDEFJHIGKLMNOPQRSTUVWXYZ';

files.forEach((filePath) => {
  text += fs.readFileSync(resolve(__dirname, '..', filePath));
});

const fontmin = new Fontmin()
  .src(srcPath)
  .use(Fontmin.glyph({
    text,
  }))
  .use(Fontmin.ttf2eot())
  .use(Fontmin.ttf2woff())
  .use(Fontmin.ttf2svg())
  .dest(destPath);

fontmin.run((err, files, stream) => {
  if (err) {
    console.error(err);
  }
  console.log('font compress finish');
});
