// camelCase 驼峰
// kebabCase 短横线
const camelCase = require('lodash.camelcase')
const kebabCase = require('lodash.kebabcase')

function replaceString(string, name) {
  if (Buffer.isBuffer(string)) string = string.toString('utf8')
  return string
    .replace(/\$camelCase\$/g, function(match, index, str) {
      return camelCase(name)
    })
    .replace(/\$kebabCase\$/g, function(match, index, str) {
      return kebabCase(name)
    })
}

module.exports = { replaceString }
