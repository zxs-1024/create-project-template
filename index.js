const fs = require('fs')
const path = require('path')
const util = require('util')
const { promisify } = require('util')
const mkdir = promisify(fs.mkdir)
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const featurePath = process.argv[2] // 功能文件名
const basePath = 'src/components' // 目标路径
const tempPath = './template' // 模板路径

// 递归处理模板文件
async function transTemplateFile(tempPath, depthPath = '') {
  // 循环创建目标文件夹
  await makeDirPath(basePath)
  // 取出传入 tempPath 文件夹
  const files = await readdir(tempPath)

  // 循环处理 files
  for (const file of files) {
    const filePath = path.join(tempPath, file)
    const stats = await stat(filePath)

    if (stats.isFile()) {
      // 文件 => 读取、写入
      await readAndWriteFile(filePath, path.join(featurePath, depthPath, file))
    }

    if (stats.isDirectory()) {
      // 文件夹 => 递归处理
      const featureFilePath = path.join(featurePath, file)
      if (!fs.existsSync(featureFilePath)) {
        await mkdir(featureFilePath).then(() =>
          console.log(`创建 ${featureFilePath} 文件夹成功！`)
        )
      }
      await transTemplateFile(filePath, file)
    }
  }
}

// 循环创建目标文件夹
async function makeDirPath(dirPath) {
  const dirArr = dirPath.split('/')
  const { length } = dirArr
  let index = -1
  while (++index < length) {
    // 路径拼接
    const current = path.join(
      __dirname,
      dirArr.slice(0, index + 1).join(path.sep)
    )

    if (!fs.existsSync(featurePath)) {
      await mkdir(featureFilePath).then(() =>
        console.log(`makeDirPath 创建 ${featureFilePath} 文件夹成功！`)
      )
    }
  }
}

// 文件读取、写入
async function readAndWriteFile(source, copy) {
  const data = await readFile(source)
  await writeFile(copy, data).then(() => console.log(`创建 ${copy} 文件成功！`))
}

// 主流程函数
async function main() {
  // 判断 featurePath 文件夹是否存在
  if (fs.existsSync(featurePath))
    return console.log(`已经存在 ${featurePath} 文件夹！`)

  // 创建 featurePath 文件夹
  await mkdir(featurePath).then(() =>
    console.log(`创建 ${featurePath} 文件夹成功！`)
  )

  // 递归处理模板文件
  await transTemplateFile(tempPath)
  console.log(`模板文件写入完毕 => 冲鸭！！！`)
}

main()
