import createPrompts from '../src/createPrompts.js'

const sourcePath = 'examples/source'
const targetPath = 'examples/target'
const questions = [
  {
    type: 'multiselect',
    name: 'features',
    message: '请选择表单功能',
    choices: [
      { title: '导入', value: 'import' },
      { title: '导出', value: 'export' },
      { title: '编辑', value: 'edit' },
      { title: '操作日志', value: 'operation' }
    ],
    hint: '- Space to select. Return to submit',
  },
  {
    type: 'confirm',
    name: 'hasDetailPage',
    message: '是否需要详情页面',
  },
]

createPrompts(questions, { sourcePath, targetPath })
