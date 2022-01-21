import prompts from 'prompts'
import createTemplate from './createTemplate.js'

const questions = [
  {
    type: 'text',
    name: 'name',
    message: '请输入目录名称',
    validate: value => value.length < 1 ? '请重新输入' : true
  },
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
  },
  {
    type: 'confirm',
    name: 'hasDetail',
    message: '是否需要详情页面',
  },
]

const onCancel = prompt => {
  console.log('Never stop prompting!', prompt)
  return true
}

async function main() {
  const response = await prompts(questions, { onCancel })
  console.log('prompts: ', response);
  // 需要将 name 转成小驼峰、大驼峰、中划线格式
  createTemplate(response)
}

export default main