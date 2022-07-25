import fs from 'fs'
import { join } from 'path'
const postsDirectory = join(process.cwd(), 'static')
export async function readfileInfoAsync(fileName) {
    let date;
    fs.stat(fileName, function (err, stats) {
        if (err) {
            return console.error(err);
        }
        
    })
}