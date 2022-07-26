import styles from '../styles/Button.module.css'
import cn from 'classnames'
export default function NormalButton({ text, type,onclick }) {
    onclick=onclick instanceof Function?onclick:()=>{};
    switch (type) {
        case 'warn':
            return (<>
                <button onClick={onclick} className={cn(styles.normalButton, styles.warnColor)}>{text}</button>
            </>)
        case 'normal':
            return (<>
                <button onClick={onclick} className={cn(styles.normalButton, styles.nromalColor)}>{text}</button>
            </>)
        case 'disabled':
            return (<>
                <button className={cn(styles.normalButton, styles.disabledColor)}>{text}</button>
            </>)
    }
    return (<>
        <button onClick={onclick} className={cn(styles.normalButton, styles.whiteColor)}>{text}</button>
    </>)
}