import styles from '../styles/file.module.css'
import Modal from '../components/Modal'
import Button from '../components/Button'
import { useEffect, useState } from 'react';
import { getAllFileLists } from '../lib/io';

//'文件前20位...文件后10位(带扩展名)'
function strHandler(files) {
    if (files instanceof Array) {
        return files.map(handleEach)
    }
    return [{ rawName: "NULL" }]
}
function handleEach(file) {
    let showName, rawName;
    let headStr = "", endStr;
    if (typeof file !== "string") return { rawName: "NULL" }
    if (file.length > 31) {
        //1.没有扩展名 abcdef
        //2.扩展名极长abcdef.0123456789A
        //3.普通情况 abcdef.0123456789

        let splitStrArr = file.split(".");


        //处理尾部
        endStr = splitStrArr[splitStrArr.length - 1];
        if (endStr.length > 10) {
            endStr = endStr.slice(-10)
        }

        //处理首部
        for (let i = 0; i < splitStrArr.length - 1; i++) {
            headStr += splitStrArr[i] + ".";
        }

        if (headStr.length > 21) {
            headStr = headStr.slice(0, 20)

            return {
                showName: headStr + "..." + endStr,
                rawName: file,
            }
        }
        if (headStr.length > 0) return {
            showName: headStr + ".." + endStr,
            rawName: file,
        }
        //没有扩展名 abcdef
        return {
            showName: endStr,
            rawName: file
        }
    }

    showName = 0
    rawName = file
    return {
        showName,
        rawName
    }
}
//确认删除后触发
function onDeleteFile({ textContent: fileName }) {
    console.log(fileName)
}
//上传逻辑
function onDownlloadFile() {

}
//下载逻辑
function onUploadFile() {

}
//预览文件
function onOpenFile(){

}
//重命名逻辑
function onUpdateName() {

}
//获取数据并处理
async function getViewData(page = 0) {
    let resp = await fetch(`/api/file?page=${page}`)
    let data = await resp.json()
    return {
        page: data.cur || 0,
        files: strHandler(data.fileLists)
    }
}
// const Context = createContext({
//     modalActive:false,
//     pageBack:false,
//     data:[{ files: [], page: 0 }]
// })
export default function FileShare({ }) {
  
    
    const [hide, setHide] = useState(true)


    //返回--状态
    const [back, setBack] = useState(false)
    useEffect(() => { if (back === true) { window.location.href = "/" } }, [back])



    
    
    const [data, setData] = useState([{ files: [], page: 0 }])
    useEffect(() => { getViewData().then(v => { setData([v]) }) }, [])


    const [fileName, setfileName] = useState('')
    
    return (
        <>
            <Modal
                hide={hide}
                textHeader='确认要删除以下文件吗？'
                textContent={fileName}
                onCancel={() => { setHide(true) }}
                onTrue={(textContent) => { setHide(true); onDeleteFile(textContent) }} />
            <div className={styles.container}>
                <main className={styles.main}>
                    <div className={styles.headMenuContainer}>
                        <Button text="上传" onclick={onUploadFile()} />
                        <Button text="返回" onclick={() => { setBack(true) }} />
                    </div>
                    <div className={styles.filesContainer}>
                        <div className={styles.pageLayout}>
                            {
                                data instanceof Array && data[0].files.length > 0
                                    ? data[0].files.map((file) => (
                                        <div className={styles.cardContainer} key={Math.random().toString()}>
                                            <a className={styles.card}>{file.showName ? file.showName : file.rawName}</a>
                                            <div className={styles.buttonContainer}>
                                                <Button onclick={() => { setHide(false); setfileName(file.rawName) }} text="删除" type={file.rawName === "NULL" ? "disabled" : "warn"} />
                                                <Button onclick={() => { }} text="重命名" type={file.rawName === "NULL" ? "disabled" : "warn"} />
                                            </div>
                                        </div>
                                    )) : (
                                        <div className={styles.cardContainer} key={Math.random().toString()}>
                                            <a className={styles.card}>没有文件。</a>
                                            <div className={styles.buttonContainer}>
                                                <Button text="删除" type="disabled" />
                                                <Button text="重命名" type="disabled" />
                                            </div>
                                        </div>
                                    )
                            }
                        </div>
                    </div>

                </main>
            </div>
        </>
    )
}
export async function getStaticProps() {

    return {
        props: await getAllFileLists(-1)
    }
}
