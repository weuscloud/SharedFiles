import styles from '../styles/file.module.css'
import Modal from '../components/Modal'
import Button from '../components/Button'
import { useEffect, useState } from 'react';
import { getAllFileLists } from '../lib/io';
export default function FileShare({ fileLists: files }) {

    const [hide, setHide] = useState(true);
    const [fileName, setfileName] = useState('文件前10位...文件后10位(带扩展名)');

    //返回逻辑
    const [back, setBack] = useState(false);
    useEffect(() => { if (back === true) { window.location.href="/" } }, [back])

    //上传逻辑
    function upLoadFile() {

    }

    //重命名逻辑
    function remFile() {

    }

    return (
        <>
            <Modal hide={hide} text1='确认要删除以下文件吗？' text2={fileName} onCancel={() => { setHide(true) }} />
            <div className={styles.container}>
                <main className={styles.main}>
                    <div className={styles.headMenuContainer}>
                        <Button text="上传" onclick={upLoadFile()} />
                        <Button text="返回" onclick={() => { setBack(true) }} />
                    </div>
                    <div className={styles.filesContainer}>
                        {
                            files.length >0
                                ? files.map((file) => (
                                    <div className={styles.cardContainer} key={Math.random().toString()}>
                                        <a className={styles.card}>{file}</a>
                                        <div className={styles.buttonContainer}>
                                            <Button onclick={() => { setHide(false); setfileName(file); }} text="删除" type="warn" />
                                            <Button onclick={remFile()} text="重命名" type="normal" />
                                        </div>
                                    </div>
                                )) : (
                                    <div className={styles.cardContainer} key={Math.random().toString()}>
                                        <a className={styles.card}>没有文件。</a>
                                        <div className={styles.buttonContainer}>
                                            <Button  text="删除" type="disabled" />
                                            <Button  text="重命名" type="disabled" />
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </main>
            </div>
        </>
    )
}
export function getStaticProps() {
    const fileLists = getAllFileLists();
    return {
        props: {
            fileLists
        }
    }
}