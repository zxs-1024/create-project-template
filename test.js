const createTemplate = require('./index')

createTemplate.use({
  sourcePath: 'src/components',
  templatePath: 'template'
})

createTemplate()
