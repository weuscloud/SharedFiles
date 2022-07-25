import styles from '../styles/Button.module.css'
import cn from 'classnames'
export default function NormalButton({ text, type }) {
    let color = "whiteColor";
    switch (type) {
        case 'warn':
            return (<>
                <button className={cn(styles.normalButton, styles.warnColor)}>{text}</button>
            </>)
        case 'normal':
            return (<>
                <button className={cn(styles.normalButton, styles.nromalColor)}>{text}</button>
            </>)
        case 'disabled':
            return (<>
                <button className={cn(styles.normalButton, styles.nromalColor)}>{text}</button>
            </>)
    }
    return (<>
        <button className={cn(styles.normalButton, styles.whiteColor)}>{text}</button>
    </>)
}