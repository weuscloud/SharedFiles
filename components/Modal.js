import styles from '../styles/modal.module.css'
import Button from './Button'
import cn from 'classnames'
export default function Modal({ hide, text1 = 'text1', text2 = 'text2' ,onCancel,onTrue}) {
    return (
        <>
            <div onClick={onCancel} className={cn(styles.modalMask, hide==true ? styles.modalInactive : "")}>
            </div>
            <div className={cn(styles.modal,hide==true ? styles.modalInactive : "")}>
                <div className={styles.modalHeader}>
                    提示
                </div>
                <div className={styles.modalContent}>
                    {text1}
                    <div className={styles.modalContentFile}>
                        {text2}
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    <div className={cn(styles.buttonContainer)}>
                        <div><Button onclick={onCancel} text="取消" type="normal"/></div>
                        <div><Button onclick={onTrue} text="确定" type="warn" /></div>
                    </div>
                </div>
            </div>
        </>
    )
}