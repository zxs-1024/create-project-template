const createTemplate = require('../src/index')
import createTemplate from '../src/index'
createTemplate.use({
  sourcePath: 'src/components',
  templatePath: 'template'
})

createTemplate()
