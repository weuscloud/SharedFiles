import fs from 'fs'
import { join } from 'path'
const workDir = join(process.cwd(), '_static')
async function files(dir) {
    function check(fileFullPath) {
        return new Promise((r, j) => {
            fs.stat(fileFullPath, function (err, stats) {
                if (err) {

                    j("文件无读取权限或不存在。")
                }
                else if (stats.isFile()) {
                    r(true)
                }
                else r(false)
            })

        })
    }
    const lists = fs.readdirSync(dir)
    let res = []
    for (const file of lists) {
        let isf = await check(join(dir, file))
        if (isf) {
            res.push(file)
        }
    }
    return res;
}
//每页返回最多20个文件
export async function getAllFileLists(page) {
    page = parseInt(page)
    let fileLists = await files(workDir);

    let eachPageNum = 20,
        total = Math.floor(fileLists.length / eachPageNum) + fileLists.length % eachPageNum == 0 ? 0 : 1;

    if (typeof page != "number" || page < 0 || page > total) return {}
    return {
        fileLists: fileLists.slice(page * 20, page * 20 + 20 - 1),
        total,
        cur: page,
    }
}
export function creatFiles(passwd){
   return new Promise(resolve=>{
    //check password here.



    fs.writeFile(join(dir, "test.txt"), '我是通 过fs.writeFile 写入文件的内容',  function(err) {
        if (err) {
            return console.error(err);
        }
        fs.readFile('input.txt', function (err, data) {
           if (err) {
              return console.error(err);
           }
           resolve();
        });
     });
   })
}