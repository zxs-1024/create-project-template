const fs = require('fs')
const path = require('path')
const util = require('util')
const { promisify } = require('util')
const mkdir = promisify(fs.mkdir)
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const featurePath = process.argv[2] || 'feature' // 功能文件名
let basePath = 'src/components' // 目标路径
let tempPath = './template' // 模板路径

// 递归处理模板文件
async function transTemplateFile(tempPath, depthPath = '') {
  if (!fs.existsSync(tempPath)) {
    return Promise.reject(`😂  没有找到 ${tempPath} 模板文件夹！`)
  }

  // 取出传入 tempPath 文件夹
  const files = await readdir(tempPath)

  // 循环处理 files
  for (const file of files) {
    const filePath = path.join(tempPath, file)
    const stats = await stat(filePath)

    if (stats.isFile()) {
      // 文件 => 读取、写入
      await readAndWriteFile(
        filePath,
        path.join(basePath, featurePath, depthPath, file)
      )
    }

    if (stats.isDirectory()) {
      // 文件夹 => 递归处理
      const featureFilePath = path.join(basePath, featurePath, file)
      if (!fs.existsSync(featureFilePath)) {
        await mkdir(featureFilePath).then(() =>
          console.log(`📂  创建 ${featureFilePath} 文件夹成功！`)
        )
      }
      await transTemplateFile(filePath, file)
    }
  }
}

// 循环创建文件夹
async function makeDirPath(dirPath) {
  const dirArr = dirPath.split(path.sep)
  const { length } = dirArr
  let index = -1
  while (++index < length) {
    // 路径拼接
    const current = path.join(dirArr.slice(0, index + 1).join(path.sep))

    if (!fs.existsSync(current)) {
      await mkdir(current).then(() =>
        console.log(`📂  创建 ${current} 文件夹成功！`)
      )
    }
  }
}

// 文件读取、写入
async function readAndWriteFile(source, copy) {
  const data = await readFile(source)
  if (fs.existsSync(copy)) {
    console.log(
      `😂  请注意，已经存在 ${copy} 文件，为了防止文件覆盖，已经帮你中断写入啦！`
    )
    return Promise.resolve()
  }
  await writeFile(copy, data).then(() =>
    console.log(`📄  写入 ${copy} 文件成功！`)
  )
}

// 主流程函数
async function main() {
  console.log('🔥  开始创建你的模板文件！')
  const totalPath = path.join(basePath, featurePath)

  // 循环创建文件夹
  await makeDirPath(totalPath)

  // 递归处理模板文件
  await transTemplateFile(tempPath)
    .then(() => console.log('🎉  你的模板文件已创建完毕 => 冲鸭！！！'))
    .catch(err => console.log(err))
}

main.use = ({ sourcePath, templatePath }) => {
  basePath = sourcePath || 'src/components'
  tempPath = templatePath ? `./${templatePath}` : './template'
}

module.exports = main
