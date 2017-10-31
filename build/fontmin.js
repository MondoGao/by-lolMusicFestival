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
  .src(srcPath) // 输入配置
  .use(Fontmin.glyph({ // 字型提取插件
    text, // 所需文字
  }))
  .use(Fontmin.ttf2eot()) // eot 转换插件
  .use(Fontmin.ttf2woff()) // woff 转换插件
  .use(Fontmin.ttf2svg()) // svg 转换插件
  .dest(destPath); // 输出配置
// 执行
fontmin.run((err, files, stream) => {
  if (err) { // 异常捕捉
    console.error(err);
  }
  console.log('done'); // 成功
});
