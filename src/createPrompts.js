import prompts from 'prompts'
import createTemplate from './createTemplate.js'

const onCancel = prompt => {
  console.log('Never stop prompting!', prompt)
  return true
}

const nameQuestion = {
  type: 'text',
  name: 'name',
  message: '请输入文件名',
  validate: value => value.length < 1 ? '文件名不能为空' : true
}

async function createPrompts(questions, options) {
  const hasName = questions.some(question => question.name === 'name');

  if (hasName) {
    return console.warn('请不要将问题的 name 赋值为 "name"')
  }

  const response = await prompts([nameQuestion, ...questions], { onCancel })
  console.log('prompts result: ', response);

  // 需要将 name 转成小驼峰、大驼峰、中划线格式
  createTemplate(response, options)
}

export default createPrompts