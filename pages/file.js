import styles from '../styles/file.module.css'
import Modal from '../components/Modal'
import Button from '../components/Button'
export default function FileShare() {
    let hide=false;
    return (
        <>
            <Modal hide={hide} text1='确认要删除以下文件吗？' text2='文件前10位...文件后10位(带扩展)' />
            <div className={styles.container}>
                <main className={styles.main}>
                    <div className={styles.headMenuContainer}>
                        <Button text="上传" />
                        <Button text="返回" />
                    </div>
                    <div className={styles.filesContainer}>
                        <div className={styles.cardContainer}>
                            <a className={styles.card}>没有文件</a>
                            <div className={styles.buttonContainer}>
                                <Button text="删除" type="warn" />
                                <Button text="重命名" type="normal" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}