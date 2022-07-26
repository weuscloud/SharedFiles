import fs from 'fs'
import { join } from 'path'
const postsDirectory = join(process.cwd(), '_static')

export function getRawFileByPath(fileName = 'helloworld') {
    const fullPath = join(postsDirectory, `${fileName}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return {
        data,
        content
    }
}

export function getAllFileLists() {
    return fs.readdirSync(postsDirectory)
}
