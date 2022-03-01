import fs from 'fs'
import { mkdir, readdir, readFile, writeFile, stat } from 'fs/promises'
import ejs from 'ejs'
import { globby } from 'globby'

// 读取模板字符串，调用 ejs 渲染模板
async function renderFile(name, data, options = {}) {
  const template = await readFile(name, { encoding: 'utf8' })
  const finalTemplate = template.trim() + `\n`
  return ejs.render(finalTemplate, data, options)
}

// 尝试写入文件
async function attemptWriteFile(target, content) {
  if (fs.existsSync(target)) {
    console.log(`😂  请注意，已经存在 ${target} 文件，为了防止文件覆盖，已经帮你中断写入啦！`)
    return Promise.resolve()
  }
  await writeFile(target, content, { encoding: 'utf8' })
  console.log(`📄  写入 ${target} 文件成功！`)
}

// 获取文件所在文件夹地址
function getFileDirPath(filePath = '') {
  const arr = filePath.split('/')
  if (arr.length < 2) return ''
  return arr.slice(0, arr.length - 1).join('/')
}

// 处理模板文件
async function transTemplateFile(files, prompts, options) {
  const { sourcePath, targetPath } = options

  for (const file of files) {
    const stats = await stat(file)
    if (stats.isFile()) {
      const content = await renderFile(file, prompts, options)
      const writePath = file.replace(new RegExp(sourcePath), targetPath)
      const fileDirPath = getFileDirPath(writePath)
      if (!fs.existsSync(fileDirPath)) {
        await mkdir(fileDirPath, { recursive: true }).then(() =>
          console.log(`📂  创建 ${fileDirPath} 文件夹成功！`)
        )
      }
      await attemptWriteFile(writePath, content)
    }
  }
}

// 主流程函数
async function createTemplate(prompts, options = {}) {
  const { sourcePath, targetPath } = options
  if (!options.sourcePath) {
    return Promise.reject(`😂  请传入模板地址！`)
  }

  if (!options.targetPath) {
    return Promise.reject(`😂  请传入模板输出地址！`)
  }

  console.log('🔥  开始创建你的模板文件！')

  await mkdir(targetPath, { recursive: true })

  if (!fs.existsSync(sourcePath)) {
    return Promise.reject(`😂  没有找到 ${sourcePath} 模板文件夹！`)
  }

  const files = await globby([sourcePath + '/**/*'])

  // 循环模板文件
  await transTemplateFile(files, prompts, options)
    .then(() => console.log('🎉  你的模板文件已创建完毕 => 冲鸭！！！'))
    .catch(err => console.error(err))
}

export default createTemplate
