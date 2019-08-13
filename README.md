<!--
 * @Author: hao.zhang
 * @Date: 2019-08-13 15:01:03
 * @LastEditors: hao.zhang
 * @LastEditTime: 2019-08-13 15:06:43
 -->
# create-project-template

📄 Help you create your project template file.

## Install

```javascript
// use npm
npm install create-project-template -save-dev

// use yarn
yarn add create-project-template --dev
```

## Quick use

```javascript
// index.js
const createTemplate = require('create-project-template')

createTemplate()
```

### Command：

```javascript
// Default create feature folder.
node index.js [feature-file]
```

## Path config

> You can configure your template file path and input path by calling the use method.

Import `create-project-template`

```javascript
const createTemplate = require('create-project-template')

// use config
createTemplate.use({
  sourcePath: 'src/components',
  templatePath: 'template'
})

createTemplate()
```

## Quick command

Add quick command in package.json:

```json
"scripts": {
  "file": "node test.js"
}
```

Execute on the command line:

```javascript
// use npm
npm run file feature
// use yarn
yarn file feature
```

## Replacing

Replacing them with kebabCase、camelCase strings.

```js
<div class="$kebabCase$">
  <h1>$camelCase$</h1>
</div>
```

```bash
$kebabCase$-table.vue
```

You can add strings of $camelCase$, $kebabCase$ to the template file. After running the script, the strings are replaced by camelCase and kebabCase.

## Update records

- 2018-12-08  🎉 v1.0.0 create-project-template.
- 2018-12-12  ✨ v1.0.2 You can add strings of $camelCase$, $kebabCase$ to the template file. After running the script, the strings are replaced by camelCase and kebabCase.

## LICENSE

[MIT](LICENSE)
