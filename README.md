# create-project-template

📄 帮助你创建你的项目模板文件。

## 安装

```javascript
// use npm
npm install create-project-template -save-dev

// use yarn
yarn add create-project-template --dev
```

## 快速使用

```javascript
// index.js
const createTemplate = require('create-project-template')

createTemplate()
```

命令行：

```javascript
// 默认生成 feature 文件夹
node index.js [feature-file]
```

## 路径配置

> 你可以通过调用 use 方法，来配置你的模板文件路径、输入路径。

引入 create-project-template：

```javascript
const createTemplate = require('create-project-template')

// use config
createTemplate.use({
  sourcePath: 'src/components',
  templatePath: 'template1'
})

createTemplate()
```

## 快捷命令

增加快捷命令，在 package.json 增加 scripts：

```json
"scripts": {
  "file": "node test.js"
}
```

在命令行执行：

```javascript
// use npm
npm run file feature
// use yarn
yarn file feature
```

## LICENSE

[MIT](LICENSE)
