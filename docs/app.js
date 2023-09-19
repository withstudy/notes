const { dir } = require("console")
const fs = require("fs")
const path =require("path")

const rootPath = path.resolve(__dirname,"../")
const toDirPath = path.resolve(rootPath,'docs')
const jsShowDir = ['数据结构', '自动化构建']
const exludeDir = ["node_modules","docs", "*.json"]
function getMdFileList(rootPath){
    const sides = []
    const files = fs.readdirSync(rootPath)
    const dirs = files.filter(name => !name.startsWith('.') && fs.statSync(path.resolve(rootPath, name)).isDirectory() && !exludeDir.includes(name))
    dirs.forEach(dirname => {
        const side = {text: dirname, items: []}
        const dirPath = path.resolve(rootPath, dirname)
        getFiles(dirPath, dirname)
        function getFiles(dirPath, dirname){
            const files = fs.readdirSync(dirPath)
            files.forEach(filename => {
                const item = { text: filename.split('.')[0], link: '/' + dirname + '/' + filename }
                const fileDirPath = path.resolve(toDirPath, dirname)
                const filePath = path.resolve(dirPath, filename)
                const newFilePath = path.resolve(fileDirPath, filename)
                if (!fs.existsSync(fileDirPath)) {
                    fs.mkdirSync(fileDirPath)
                }
                if (filename.endsWith('.md')) {
                    const fileContent = fs.readFileSync(filePath, 'utf-8')
                    fs.writeFileSync(newFilePath, fileContent)

                    side.items.push(item)
                }

                if (filename.endsWith('.js')) {
                    const fileContent = fs.readFileSync(filePath, 'utf-8')
                    fs.writeFileSync(newFilePath.replace('.js', '.md'), `# ${item.text}\n\`\`\`js\n${fileContent}\n\`\`\``)
                    item.link = item.link.replace('.js', '.md')
                    side.items.push(item)
                }

                const _dir = fs.statSync(filePath)
                if (_dir.isDirectory() && jsShowDir.includes(dirname)) {
                    getFiles(filePath, filename)
                }
            })
        }
        sides.push(side)
    })
    return sides
}

const sides = getMdFileList(rootPath, 0)
const sidesFilePath = path.resolve(toDirPath, 'sides.js')
fs.writeFileSync(sidesFilePath, `export default ${JSON.stringify(sides)}`)