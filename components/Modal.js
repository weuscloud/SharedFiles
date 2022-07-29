import styles from '../styles/modal.module.css'
import Button from './Button'
import cn from 'classnames'
export default function Modal({ hide, textHeader = '', textContent = '' ,onCancel,onTrue}) {
    return (
        <>
            <div onClick={onCancel} className={cn(styles.modalMask, hide==true ? styles.modalInactive : "")}>
            </div>
            <div className={cn(styles.modal,hide==true ? styles.modalInactive : "")}>
                <div className={styles.modalHeader}>
                    提示
                </div>
                <div className={styles.modalContent}>
                    {textHeader}
                    
                </div>
                <div className={styles.modalContentFile}>
                        {textContent}
                    </div>
                <div className={styles.modalFooter}>
                    <div className={cn(styles.buttonContainer)}>
                        <div><Button onclick={()=>{typeof onCancel=="function"? onCancel({textContent}):0;}} text="取消" type="normal"/></div>
                        <div><Button onclick={()=>{typeof onTrue=="function"? onTrue({textContent}):0;}} text="确定" type="warn" /></div>
                    </div>
                </div>
            </div>
        </>
    )
}